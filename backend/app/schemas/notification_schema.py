from pydantic import BaseModel
from typing import Optional


class NotificationCreate(BaseModel):

    student_id: Optional[str] = None

    title: str

    message: str

    is_read: bool = False