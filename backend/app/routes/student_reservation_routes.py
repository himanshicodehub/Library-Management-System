from fastapi import APIRouter

from app.services.student_reservation_service import (
    get_student_reservations
)

router = APIRouter(
    prefix="/student",
    tags=["Student"]
)


# =====================================
# My Reservations
# =====================================

@router.get("/{student_id}/reservations")
async def my_reservations(student_id: str):

    return await get_student_reservations(student_id)