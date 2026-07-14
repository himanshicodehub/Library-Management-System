from fastapi import APIRouter, Depends

from app.dependencies.auth import require_admin

from app.services.report_service import (
    get_book_report,
    get_student_report,
    get_issue_report,
    get_return_report,
    get_fine_report,
    get_dashboard_report
)

router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)

@router.get("/books")
async def book_report(
    current_user=Depends(require_admin)
):
    return await get_book_report()

@router.get("/students")
async def student_report(
    current_user=Depends(require_admin)
):
    return await get_student_report()

@router.get("/issues")
async def issue_report(
    current_user=Depends(require_admin)
):
    return await get_issue_report()


@router.get("/returns")
async def return_report(
    current_user=Depends(require_admin)
):
    return await get_return_report()

@router.get("/fines")
async def fine_report(
    current_user=Depends(require_admin)
):
    return await get_fine_report()

@router.get("/dashboard")
async def dashboard_report(
    current_user=Depends(require_admin)
):
    return await get_dashboard_report()