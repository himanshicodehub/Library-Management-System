from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "Admin"
    LIBRARIAN = "Librarian"
    STUDENT = "Student"

class UserCreate(BaseModel):
    user_id: str
    name: str
    email: EmailStr
    password: str
    phone: str

    role: UserRole

    address: Optional[str] = ""
    department: Optional[str] = ""
    profile_image: Optional[str] = ""
    status: Optional[str] = "Active"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    name: str
    phone: str
    address: str
    department: str
    profile_image: Optional[str] = ""


class ChangePassword(BaseModel):
    old_password: str
    new_password: str