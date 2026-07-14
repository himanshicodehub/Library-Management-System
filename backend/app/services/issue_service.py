from datetime import datetime

from fastapi import HTTPException

from app.config.database import db
from app.schemas.issue_schema import IssueBookCreate


# ==================================
# Collections
# ==================================

issue_collection = db["issue_books"]
book_collection = db["books"]
student_collection = db["students"]
reservation_collection = db["reservations"]
notification_collection = db["notifications"]


# ==================================
# Issue Book
# ==================================

async def issue_book(issue: IssueBookCreate):

    # -----------------------------
    # Validate Dates
    # -----------------------------
    if issue.issue_date > issue.due_date:
        raise HTTPException(
            status_code=400,
            detail="Issue date cannot be greater than due date."
        )

    # -----------------------------
    # Check Student
    # -----------------------------
    student = await student_collection.find_one(
        {
            "student_id": issue.student_id
        }
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    # -----------------------------
    # Check Book
    # -----------------------------
    book = await book_collection.find_one(
        {
            "book_id": issue.book_id
        }
    )

    if not book:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    # -----------------------------
    # Book Stock
    # -----------------------------
    if book["available_quantity"] <= 0:
        raise HTTPException(
            status_code=400,
            detail="Book is out of stock"
        )

    # -----------------------------
    # Already Issued
    # -----------------------------
    already_issued = await issue_collection.find_one(
        {
            "student_id": issue.student_id,
            "book_id": issue.book_id,
            "status": "Issued"
        }
    )

    if already_issued:
        raise HTTPException(
            status_code=400,
            detail="Book already issued to this student."
        )

    # -----------------------------
    # Reservation Queue Check
    # -----------------------------
    reservation = await reservation_collection.find_one(
        {
            "book_id": issue.book_id,
            "status": "Reserved"
        },
        sort=[("reservation_date", 1)]
    )

    if reservation:

        if reservation["student_id"] != issue.student_id:

            raise HTTPException(
                status_code=400,
                detail=f"This book is reserved for Student {reservation['student_id']}."
            )

    # -----------------------------
    # Generate Issue ID
    # -----------------------------
    last_issue = await issue_collection.find_one(
        sort=[("issue_id", -1)]
    )

    if (
        last_issue
        and last_issue.get("issue_id")
        and last_issue["issue_id"].startswith("ISS")
    ):

        last_number = int(last_issue["issue_id"][3:])

        new_issue_id = f"ISS{last_number + 1:03d}"

    else:

        new_issue_id = "ISS001"

    # -----------------------------
    # Reduce Book Quantity
    # -----------------------------
    await book_collection.update_one(
        {
            "book_id": issue.book_id
        },
        {
            "$inc": {
                "available_quantity": -1
            }
        }
    )

    # -----------------------------
    # Prepare Issue Data
    # -----------------------------
    issue_data = issue.model_dump()

    issue_data["issue_id"] = new_issue_id
    issue_data["issue_date"] = issue.issue_date.strftime("%Y-%m-%d")
    issue_data["due_date"] = issue.due_date.strftime("%Y-%m-%d")
    issue_data["status"] = "Issued"
    issue_data["return_date"] = None
    issue_data["fine"] = 0

    # -----------------------------
    # Save Issue
    # -----------------------------
    result = await issue_collection.insert_one(
        issue_data
    )

    # -----------------------------
    # Complete Reservation
    # -----------------------------
    await reservation_collection.update_one(
        {
            "student_id": issue.student_id,
            "book_id": issue.book_id,
            "status": "Reserved"
        },
        {
            "$set": {
                "status": "Completed"
            }
        }
    )

    created_issue = await issue_collection.find_one(
        {
            "_id": result.inserted_id
        }
    )

    created_issue["_id"] = str(created_issue["_id"])

    return created_issue
# ==================================
# Return Book
# ==================================

async def return_book(book_id: str, student_id: str):

    issue = await issue_collection.find_one(
        {
            "book_id": book_id,
            "student_id": student_id,
            "status": "Issued"
        }
    )

    if not issue:
        raise HTTPException(
            status_code=404,
            detail="Issue record not found"
        )

    today = datetime.now().date()

    due_date = datetime.strptime(
        issue["due_date"],
        "%Y-%m-%d"
    ).date()

    fine = 0

    if today > due_date:
        late_days = (today - due_date).days
        fine = late_days * 10

    # Update Issue Status
    await issue_collection.update_one(
        {
            "issue_id": issue["issue_id"]
        },
        {
            "$set": {
                "status": "Returned",
                "return_date": today.strftime("%Y-%m-%d"),
                "fine": fine
            }
        }
    )

    # Increase Available Quantity
    await book_collection.update_one(
        {
            "book_id": book_id
        },
        {
            "$inc": {
                "available_quantity": 1
            }
        }
    )

    # Check Waiting Reservation
    reservation = await reservation_collection.find_one(
        {
            "book_id": book_id,
            "status": "Reserved"
        },
        sort=[("reservation_date", 1)]
    )

    if reservation:

        await notification_collection.insert_one(
            {
                "student_id": reservation["student_id"],

                "title": "Reserved Book Available",

                "message":
                    f"The book {book_id} is now available for you.",

                "is_read": False,

                "created_at": datetime.now().strftime(
                    "%d-%m-%Y %I:%M %p"
                )
            }
        )

    return {
        "message": "Book Returned Successfully",
        "fine": fine
    }


# ==================================
# Get All Issued Books
# ==================================

async def get_all_issued_books():

    issues = []

    async for issue in issue_collection.find():

        issue["_id"] = str(issue["_id"])

        issues.append(issue)

    return issues


# ==================================
# Get Single Issue
# ==================================

async def get_issue(issue_id: str):

    issue = await issue_collection.find_one(
        {
            "issue_id": issue_id
        }
    )

    if issue:

        issue["_id"] = str(issue["_id"])

    return issue


# ==================================
# Update Issue
# ==================================

async def update_issue(
    issue_id: str,
    issue: IssueBookCreate
):

    existing_issue = await issue_collection.find_one(
        {
            "issue_id": issue_id
        }
    )

    if not existing_issue:
        return None

    issue_data = issue.model_dump()

    issue_data["issue_id"] = issue_id
    issue_data["issue_date"] = issue.issue_date.strftime("%Y-%m-%d")
    issue_data["due_date"] = issue.due_date.strftime("%Y-%m-%d")

    issue_data["status"] = existing_issue["status"]
    issue_data["return_date"] = existing_issue["return_date"]
    issue_data["fine"] = existing_issue["fine"]

    await issue_collection.update_one(
        {
            "issue_id": issue_id
        },
        {
            "$set": issue_data
        }
    )

    updated_issue = await issue_collection.find_one(
        {
            "issue_id": issue_id
        }
    )

    updated_issue["_id"] = str(updated_issue["_id"])

    return updated_issue


# ==================================
# Delete Issue
# ==================================

async def delete_issue(issue_id: str):

    issue = await issue_collection.find_one(
        {
            "issue_id": issue_id
        }
    )

    if not issue:
        return 0

    # Return Book Quantity if Still Issued
    if issue["status"] == "Issued":

        await book_collection.update_one(
            {
                "book_id": issue["book_id"]
            },
            {
                "$inc": {
                    "available_quantity": 1
                }
            }
        )

    deleted = await issue_collection.delete_one(
        {
            "issue_id": issue_id
        }
    )

    return deleted.deleted_count


# ==================================
# Search Issues
# ==================================

async def search_issues(keyword: str):

    issues = []

    query = {
        "$or": [

            {
                "issue_id": {
                    "$regex": keyword,
                    "$options": "i"
                }
            },

            {
                "student_id": {
                    "$regex": keyword,
                    "$options": "i"
                }
            },

            {
                "book_id": {
                    "$regex": keyword,
                    "$options": "i"
                }
            },

            {
                "status": {
                    "$regex": keyword,
                    "$options": "i"
                }
            }

        ]
    }

    async for issue in issue_collection.find(query):

        issue["_id"] = str(issue["_id"])

        issues.append(issue)

    return issues