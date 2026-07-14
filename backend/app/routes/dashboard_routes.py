from fastapi import APIRouter

from app.services.dashboard_service import (
    get_admin_dashboard,
    get_librarian_dashboard,
    get_student_dashboard
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/admin")
async def admin_dashboard():

    return await get_admin_dashboard()


@router.get("/librarian")
async def librarian_dashboard():

    return await get_librarian_dashboard()


@router.get("/student/{student_id}")
async def student_dashboard(student_id: str):

    return await get_student_dashboard(student_id)