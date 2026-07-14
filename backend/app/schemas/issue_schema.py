from pydantic import BaseModel
from datetime import date

class IssueBookCreate(BaseModel):
    student_id: str
    book_id: str
    issue_date: date
    due_date: date


class ReturnBook(BaseModel):
    student_id: str
    book_id: str