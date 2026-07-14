from fastapi import APIRouter, HTTPException, Depends

from app.dependencies.auth import (
    require_admin,
    require_staff,
    get_current_user
)

from app.schemas.student_schema import (
    StudentCreate,
    StudentUpdate
)

from app.services.student_service import (
    create_student,
    get_all_students,
    get_student,
    update_student,
    delete_student,
    search_students,
)

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


@router.post("/")
async def add_student(
    student: StudentCreate,
    current_user=Depends(require_staff)
):
    return await create_student(student)


@router.get("/")
async def all_students(
    current_user=Depends(get_current_user)
):
    return await get_all_students()


@router.get("/search/{keyword}")
async def search(
    keyword: str,
    current_user=Depends(get_current_user)
):
    return await search_students(keyword)


@router.get("/{student_id}")
async def single_student(
    student_id: str,
    current_user=Depends(get_current_user)
):

    student = await get_student(student_id)

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return student


@router.put("/{student_id}")
async def edit_student(
    student_id: str,
    student: StudentUpdate,
    current_user=Depends(require_staff)
):

    updated_student = await update_student(student_id, student)

    if not updated_student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return updated_student


@router.delete("/{student_id}")
async def remove_student(
    student_id: str,
    current_user=Depends(require_admin)
):

    deleted = await delete_student(student_id)

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    return {
        "message": "Student deleted successfully"
    }