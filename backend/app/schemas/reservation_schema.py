from pydantic import BaseModel
from datetime import date
from typing import Optional


class ReservationCreate(BaseModel):

    student_id: str
    book_id: str
    reservation_date: date


class ReservationUpdate(BaseModel):

    status: str


class ReservationResponse(BaseModel):

    reservation_id: str
    student_id: str
    book_id: str
    reservation_date: str
    status: str