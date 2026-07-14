from fastapi import HTTPException
from app.config.database import db
from app.schemas.reservation_schema import (
    ReservationCreate,
    ReservationUpdate
)

reservation_collection = db["reservations"]
student_collection = db["students"]
book_collection = db["books"]


async def generate_reservation_id():

    last = await reservation_collection.find_one(
        sort=[("reservation_id", -1)]
    )

    if (
        last
        and last.get("reservation_id")
        and last["reservation_id"].startswith("RES")
    ):

        number = int(last["reservation_id"][3:])
        return f"RES{number+1:03d}"

    return "RES001"


# =====================================
# Reserve Book
# =====================================

async def reserve_book(data: ReservationCreate):

    # ==========================
    # Check Student
    # ==========================

    student = await student_collection.find_one(
        {
            "student_id": data.student_id
        }
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    # ==========================
    # Check Book
    # ==========================

    book = await book_collection.find_one(
        {
            "book_id": data.book_id
        }
    )

    if not book:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    # ==========================
    # Already Reserved
    # ==========================

    already_reserved = await reservation_collection.find_one(
        {
            "student_id": data.student_id,
            "book_id": data.book_id,
            "status": "Reserved"
        }
    )

    if already_reserved:
        raise HTTPException(
            status_code=400,
            detail="Book already reserved by this student."
        )

    # ==========================
    # Already Issued
    # ==========================

    issue_collection = db["issue_books"]

    already_issued = await issue_collection.find_one(
        {
            "student_id": data.student_id,
            "book_id": data.book_id,
            "status": "Issued"
        }
    )

    if already_issued:
        raise HTTPException(
            status_code=400,
            detail="Book is already issued to this student."
        )

    # ==========================
    # Book Availability
    # ==========================

    if book["available_quantity"] > 0:
        raise HTTPException(
            status_code=400,
            detail="Book is available. Please issue it instead of reserving."
        )

    # ==========================
    # Create Reservation
    # ==========================

    reservation = data.model_dump()

    reservation["reservation_id"] = await generate_reservation_id()

    reservation["reservation_date"] = data.reservation_date.strftime(
        "%Y-%m-%d"
    )

    reservation["status"] = "Reserved"

    result = await reservation_collection.insert_one(
        reservation
    )

    created = await reservation_collection.find_one(
        {
            "_id": result.inserted_id
        }
    )

    created["_id"] = str(created["_id"])

    return created


# =====================================
# Get All Reservations
# =====================================

async def get_all_reservations():

    reservations = []

    async for reservation in reservation_collection.find():

        reservation["_id"] = str(reservation["_id"])

        reservations.append(reservation)

    return reservations


# =====================================
# Get Single Reservation
# =====================================

async def get_reservation(reservation_id: str):

    reservation = await reservation_collection.find_one(
        {
            "reservation_id": reservation_id
        }
    )

    if reservation:

        reservation["_id"] = str(reservation["_id"])

    return reservation


# =====================================
# Update Reservation
# =====================================

async def update_reservation(
    reservation_id: str,
    data: ReservationUpdate
):

    result = await reservation_collection.update_one(
        {
            "reservation_id": reservation_id
        },
        {
            "$set": data.model_dump()
        }
    )

    if result.matched_count == 0:
        return None

    return await get_reservation(
        reservation_id
    )


# =====================================
# Delete Reservation
# =====================================

async def delete_reservation(
    reservation_id: str
):

    result = await reservation_collection.delete_one(
        {
            "reservation_id": reservation_id
        }
    )

    return result.deleted_count


# =====================================
# Search Reservation
# =====================================

async def search_reservations(
    keyword: str
):

    reservations = []

    query = {
        "$or": [

            {
                "reservation_id": {
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

    async for reservation in reservation_collection.find(query):

        reservation["_id"] = str(reservation["_id"])

        reservations.append(
            reservation
        )

    return reservations