from pydantic import BaseModel
from typing import List, Dict


class DashboardResponse(BaseModel):

    total_books: int

    total_students: int

    issued_books: int

    available_books: int

    total_users: int

    total_librarians: int

    pending_reservations: int

    overdue_books: int

    today_issue: int

    new_students: int

    recent_books: List[Dict]

    recent_students: List[Dict]

    recent_issues: List[Dict]