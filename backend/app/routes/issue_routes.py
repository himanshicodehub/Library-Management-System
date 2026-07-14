from fastapi import APIRouter, HTTPException, Depends

from app.dependencies.auth import (
    require_admin,
    require_staff,
    get_current_user
)

from app.schemas.issue_schema import IssueBookCreate
from app.services.issue_service import (
    issue_book,
    return_book,
    get_all_issued_books,
    get_issue,
    search_issues,
    update_issue,
    delete_issue,
)

router = APIRouter(
    prefix="/issue-books",
    tags=["Issue Books"]
)


@router.post("/")
async def issue(
    issue: IssueBookCreate,
    current_user=Depends(require_staff)
):
    return await issue_book(issue)


@router.put("/return")
async def return_issue_book(
    student_id: str,
    book_id: str,
    current_user=Depends(require_staff)
):
    return await return_book(
        book_id,
        student_id
    )

@router.get("/")
async def all_issued_books(
    current_user=Depends(require_staff)
):
    return await get_all_issued_books()

@router.get("/record/{issue_id}")
async def single_issue(
    issue_id: str,
    current_user=Depends(require_staff)
):

    issue = await get_issue(issue_id)

    if not issue:
        raise HTTPException(
            status_code=404,
            detail="Issue record not found"
        )

    return issue

@router.put("/{issue_id}")
async def edit_issue(
    issue_id: str,
    issue: IssueBookCreate,
    current_user=Depends(require_staff)
):

    updated_issue = await update_issue(
        issue_id,
        issue
    )

    if not updated_issue:
        raise HTTPException(
            status_code=404,
            detail="Issue record not found"
        )

    return updated_issue


@router.delete("/{issue_id}")
async def remove_issue(
    issue_id: str,
    current_user=Depends(require_admin)
):

    deleted = await delete_issue(issue_id)

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Issue record not found"
        )

    return {
        "message": "Issue deleted successfully"
    }


@router.get("/search/{keyword}")
async def search(
    keyword: str,
    current_user=Depends(require_staff)
):
    return await search_issues(keyword)