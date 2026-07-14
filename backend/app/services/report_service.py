from app.config.database import db

book_collection = db["books"]
student_collection = db["students"]
issue_collection = db["issue_books"]


# ==========================
# Book Report
# ==========================

async def get_book_report():

    books = []

    async for book in book_collection.find():

        book["_id"] = str(book["_id"])

        books.append(book)

    return books


# ==========================
# Student Report
# ==========================

async def get_student_report():

    students = []

    async for student in student_collection.find():

        student["_id"] = str(student["_id"])

        students.append(student)

    return students


# ==========================
# Issue Report
# ==========================

async def get_issue_report():

    issues = []

    async for issue in issue_collection.find():

        issue["_id"] = str(issue["_id"])

        issues.append(issue)

    return issues


# ==========================
# Return Report
# ==========================

async def get_return_report():

    returned_books = []

    async for issue in issue_collection.find(
        {"status": "Returned"}
    ):

        issue["_id"] = str(issue["_id"])

        returned_books.append(issue)

    return returned_books


# ==========================
# Fine Report
# ==========================

async def get_fine_report():

    fines = []

    async for issue in issue_collection.find():

        issue["_id"] = str(issue["_id"])

        fine = issue.get("fine", 0)

        if fine > 0:

            fines.append(issue)

    return fines


async def get_dashboard_report():

    total_books = await book_collection.count_documents({})

    total_students = await student_collection.count_documents({})

    total_issued = await issue_collection.count_documents(
        {"status": "Issued"}
    )

    total_returned = await issue_collection.count_documents(
        {"status": "Returned"}
    )

    total_fine = 0

    async for issue in issue_collection.find():

        total_fine += issue.get("fine", 0)

    return {

        "total_books": total_books,

        "total_students": total_students,

        "total_issued_books": total_issued,

        "total_returned_books": total_returned,

        "total_fine": total_fine

    }