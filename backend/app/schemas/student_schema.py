from pydantic import BaseModel, EmailStr

class StudentCreate(BaseModel):

    name: str

    email: EmailStr

    password: str

    phone: str

    department: str

    semester: str

    address: str
    
class StudentUpdate(BaseModel):
    
    name: str

    email: EmailStr

    phone: str

    department: str

    semester: str

    address: str