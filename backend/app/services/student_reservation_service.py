from app.config.database import db

reservation_collection = db["reservations"]
book_collection = db["books"]


# =====================================
# Student Reservations
# =====================================

async def get_student_reservations(student_id: str):

    reservations = []

    async for reservation in reservation_collection.find(
        {
            "student_id": student_id
        }
    ):

        reservation["_id"] = str(reservation["_id"])

        book = await book_collection.find_one(
            {
                "book_id": reservation["book_id"]
            }
        )

        if book:

            reservation["title"] = book.get("title", "")
            reservation["author"] = book.get("author", "")
            reservation["category"] = book.get("category", "")
            reservation["publisher"] = book.get("publisher", "")
            reservation["isbn"] = book.get("isbn", "")
            reservation["image"] = book.get("image", "")
            reservation["total_quantity"] = book.get("total_quantity", 0)
            reservation["available_quantity"] = book.get("available_quantity", 0)

        else:

            reservation["title"] = "Unknown Book"
            reservation["author"] = ""
            reservation["category"] = ""
            reservation["publisher"] = ""
            reservation["isbn"] = ""
            reservation["image"] = ""
            reservation["total_quantity"] = 0
            reservation["available_quantity"] = 0

        reservations.append(reservation)

    return reservations