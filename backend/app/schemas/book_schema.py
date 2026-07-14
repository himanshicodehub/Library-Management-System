from pydantic import BaseModel
from typing import Optional

class BookCreate(BaseModel):
    book_id: str
    title: str
    author: str
    category: str
    isbn: str
    publisher: str
    total_quantity: int
    available_quantity: int
    image: Optional[str] = None

class BookResponse(BookCreate):
    pass