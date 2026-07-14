from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Book(BaseModel):
    book_id: str
    title: str
    author: str
    category: str
    isbn: str
    publisher: str
    total_quantity: int
    available_quantity: int
    image: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)