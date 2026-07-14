from datetime import datetime

from app.config.database import db

# =====================================
# Collections
# =====================================

book_collection = db["books"]
student_collection = db["students"]
user_collection = db["users"]
issue_collection = db["issue_books"]
notification_collection = db["notifications"]
reservation_collection = db["reservations"]


# =====================================
# Admin Dashboard
# =====================================

async def get_admin_dashboard():

    total_books = await book_collection.count_documents({})

    total_students = await student_collection.count_documents({})

    total_users = await user_collection.count_documents({})

    issued_books = await issue_collection.count_documents(
        {
            "status": "Issued"
        }
    )

    available_books = await book_collection.count_documents(
        {
            "available_quantity": {
                "$gt": 0
            }
        }
    )

    reserved_books = await reservation_collection.count_documents(
        {
            "status": "Reserved"
        }
    )

    overdue_books = await issue_collection.count_documents(
        {
            "status": "Overdue"
        }
    )

    total_fine = 0

    async for issue in issue_collection.find():

        total_fine += issue.get("fine", 0)

    recent_books = []

    async for book in book_collection.find().sort(
        "_id",
        -1
    ).limit(5):

        book["_id"] = str(book["_id"])

        recent_books.append(book)

    recent_students = []

    async for student in student_collection.find().sort(
        "_id",
        -1
    ).limit(5):

        student["_id"] = str(student["_id"])

        recent_students.append(student)

    recent_issues = []

    async for issue in issue_collection.find().sort(
        "_id",
        -1
    ).limit(5):

        issue["_id"] = str(issue["_id"])

        recent_issues.append(issue)

    notifications = []

    async for item in notification_collection.find().sort(
        "_id",
        -1
    ).limit(5):

        item["_id"] = str(item["_id"])

        notifications.append(item)

    return {

        "total_books": total_books,

        "total_students": total_students,

        "total_users": total_users,

        "issued_books": issued_books,

        "available_books": available_books,

        "reserved_books": reserved_books,

        "overdue_books": overdue_books,

        "total_fine": total_fine,

        "recent_books": recent_books,

        "recent_students": recent_students,

        "recent_issues": recent_issues,

        "notifications": notifications

    }


# =====================================
# Librarian Dashboard
# =====================================

async def get_librarian_dashboard():

    total_books = await book_collection.count_documents({})

    total_students = await student_collection.count_documents({})

    issued_books = await issue_collection.count_documents(
        {
            "status": "Issued"
        }
    )

    available_books = await book_collection.count_documents(
        {
            "available_quantity": {
                "$gt": 0
            }
        }
    )

    reserved_books = await reservation_collection.count_documents(
        {
            "status": "Reserved"
        }
    )

    overdue_books = await issue_collection.count_documents(
        {
            "status": "Overdue"
        }
    )

    recent_books = []

    async for book in book_collection.find().sort(
        "_id",
        -1
    ).limit(5):

        book["_id"] = str(book["_id"])

        recent_books.append(book)

    recent_issues = []

    async for issue in issue_collection.find().sort(
        "_id",
        -1
    ).limit(5):

        issue["_id"] = str(issue["_id"])

        recent_issues.append(issue)

    notifications = []

    async for item in notification_collection.find().sort(
        "_id",
        -1
    ).limit(5):

        item["_id"] = str(item["_id"])

        notifications.append(item)

    return {

        "total_books": total_books,

        "total_students": total_students,

        "issued_books": issued_books,

        "available_books": available_books,

        "reserved_books": reserved_books,

        "overdue_books": overdue_books,

        "recent_books": recent_books,

        "recent_issues": recent_issues,

        "notifications": notifications

    }
    # =====================================
# Student Dashboard
# =====================================

async def get_student_dashboard(student_id: str):

    # ==========================
    # Student Details
    # ==========================

    student = await student_collection.find_one(
        {
            "student_id": student_id
        }
    )

    if not student:
        return {
            "message": "Student not found"
        }

    student_name = student["name"]

    # ==========================
    # Dashboard Statistics
    # ==========================

    my_books = await issue_collection.count_documents(
        {
            "student_id": student_id,
            "status": "Issued"
        }
    )

    my_reservations = await reservation_collection.count_documents(
        {
            "student_id": student_id,
            "status": "Reserved"
        }
    )

    my_fine = 0
    due_books = 0

    today = datetime.now().date()

    my_issued_books = []

    # ==========================
    # My Issued Books
    # ==========================

    async for issue in issue_collection.find(
        {
            "student_id": student_id,
            "status": "Issued"
        }
    ):

        issue["_id"] = str(issue["_id"])

        book = await book_collection.find_one(
            {
                "book_id": issue["book_id"]
            }
        )

        if book:

            issue["title"] = book.get("title", "")
            issue["author"] = book.get("author", "")
            issue["category"] = book.get("category", "")
            issue["publisher"] = book.get("publisher", "")
            issue["isbn"] = book.get("isbn", "")
            issue["image"] = book.get("image", "")
            issue["available_quantity"] = book.get(
                "available_quantity",
                0
            )

        else:

            issue["title"] = "Unknown Book"
            issue["author"] = ""
            issue["category"] = ""
            issue["publisher"] = ""
            issue["isbn"] = ""
            issue["image"] = ""
            issue["available_quantity"] = 0

        my_fine += issue.get("fine", 0)

        due_date = datetime.strptime(
            issue["due_date"],
            "%Y-%m-%d"
        ).date()

        if due_date < today:
            due_books += 1

        my_issued_books.append(issue)

    # ==========================
    # Student Notifications
    # ==========================

    notifications = []

    async for item in notification_collection.find(
        {
            "student_id": student_id
        }
    ).sort(
        "_id",
        -1
    ).limit(5):

        item["_id"] = str(item["_id"])

        notifications.append(item)

    # ==========================
    # Return Dashboard
    # ==========================

    return {

        "student_name": student_name,

        "my_books": my_books,

        "my_reservations": my_reservations,

        "due_books": due_books,

        "my_fine": my_fine,

        "my_issued_books": my_issued_books,

        "notifications": notifications

    }