from app.config.database import db

book_collection = db["books"]
issue_collection = db["issue_books"]


# =====================================
# Student Books
# =====================================

async def get_student_books(student_id: str):

    books = []

    async for issue in issue_collection.find(
        {
            "student_id": student_id
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
            issue["total_quantity"] = book.get("total_quantity", 0)
            issue["available_quantity"] = book.get("available_quantity", 0)

        else:

            issue["title"] = "Unknown Book"
            issue["author"] = ""
            issue["category"] = ""
            issue["publisher"] = ""
            issue["isbn"] = ""
            issue["image"] = ""
            issue["total_quantity"] = 0
            issue["available_quantity"] = 0

        books.append(issue)

    return books