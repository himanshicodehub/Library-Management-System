from fastapi import APIRouter

from app.services.student_book_service import (
    get_student_books
)

router = APIRouter(
    prefix="/student",
    tags=["Student"]
)


# =====================================
# My Books
# =====================================

@router.get("/{student_id}/books")
async def my_books(student_id: str):

    return await get_student_books(student_id)