from app.config.database import db
from app.schemas.book_schema import BookCreate
from fastapi import HTTPException
book_collection = db["books"]

async def create_book(book: BookCreate):
    existing_book = await book_collection.find_one(
        {"book_id": book.book_id}
    )

    if existing_book:
        raise HTTPException(
            status_code=400,
            detail="Book ID already exists"
        )
    if book.available_quantity>book.total_quantity:
        raise HTTPException(
            status_code=400,
            detail="avaliable quantity cannot be greater than total quantity "
        )
    book_dict = book.model_dump()

    result = await book_collection.insert_one(book_dict)

    created_book = await book_collection.find_one(
        {"_id": result.inserted_id}
    )

    created_book["_id"] = str(created_book["_id"])

    return created_book


async def get_all_books():
    books = []

    async for book in book_collection.find():
        book["_id"] = str(book["_id"])
        books.append(book)

    return books


async def get_book(book_id: str):

    book = await book_collection.find_one(
        {"book_id": book_id}
    )

    if book:
        book["_id"] = str(book["_id"])

    return book


async def update_book(book_id: str, book: BookCreate):

    result = await book_collection.update_one(
        {"book_id": book_id},
        {"$set": book.model_dump()}
    )

    if result.matched_count == 0:
        return None

    return await get_book(book_id)


async def delete_book(book_id: str):

    result = await book_collection.delete_one(
        {"book_id": book_id}
    )

    return result.deleted_count

#async def get_book_pagination(page: int, limit: int):
    skip = (page-1)*limit
    books=[]
    async for book in book_collection.find().skip(skip).limit(limit):
        book["_id"] = str(book["_id"])
        books.append(book)

    total_books = await book_collection.count_documents({})

    return {
        "page": page,
        "limit": limit,
        "total_books": total_books,
        "books": books
    }#
async def search_books(keyword: str):

    books = []

    query = {
        "$or": [
            {"book_id": {"$regex": keyword, "$options": "i"}},
            {"title": {"$regex": keyword, "$options": "i"}},
            {"author": {"$regex": keyword, "$options": "i"}},
            {"category": {"$regex": keyword, "$options": "i"}},
            {"publisher": {"$regex": keyword, "$options": "i"}},
            {"isbn": {"$regex": keyword, "$options": "i"}}
        ]
    }

    async for book in book_collection.find(query):
        book["_id"] = str(book["_id"])
        books.append(book)

    return books





