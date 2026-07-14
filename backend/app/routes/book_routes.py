from fastapi import APIRouter, HTTPException, Depends

from app.dependencies.auth import (
    require_admin,
    require_staff,
    get_current_user
)

from app.schemas.book_schema import BookCreate
from app.services.book_service import (
    create_book,
    get_all_books,
    get_book,
    update_book,
    delete_book,
    search_books,
    #get_book_pagination
)

router = APIRouter(
    prefix="/books",
    tags=["Books"]
)


@router.post("/")
async def add_book(
    book: BookCreate,
    current_user=Depends(require_staff)
):
    return await create_book(book)

@router.get("/")
async def all_books(
    current_user=Depends(get_current_user)
):
    return await get_all_books()

@router.get("/search/{keyword}")
async def search_book(
    keyword: str,
    current_user=Depends(get_current_user)
):
    return await search_books(keyword)

@router.get("/{book_id}")
async def single_book(
    book_id: str,
    current_user=Depends(get_current_user)
):

    book = await get_book(book_id)

    if not book:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    return book

@router.put("/{book_id}")
async def edit_book(
    book_id: str,
    book: BookCreate,
    current_user=Depends(require_staff)
):

    updated_book = await update_book(book_id, book)

    if not updated_book:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    return updated_book

@router.delete("/{book_id}")
async def remove_book(
    book_id: str,
    current_user=Depends(require_admin)
):

    deleted = await delete_book(book_id)

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )
        
        

    return {
        "message": "Book deleted successfully"
    }
    
#@router.get("/page/")
#async def pagination(page: int = 1, limit: int = 10):

    return await get_book_pagination(page, limit)#
