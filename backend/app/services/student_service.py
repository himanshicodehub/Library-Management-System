from fastapi import HTTPException
from app.config.database import db
from app.schemas.student_schema import StudentCreate
from app.config.database import db
from passlib.context import CryptContext

student_collection = db["students"]
user_collection = db["users"]

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

student_collection = db["students"]

async def generate_user_id():

    last_user = await user_collection.find_one(
        sort=[("user_id", -1)]
    )

    if (
        last_user
        and last_user.get("user_id")
        and last_user["user_id"].startswith("US")
    ):

        number = int(last_user["user_id"][2:])

        return f"US{number+1:03d}"

    return "US001"


async def generate_student_id():

    last_student = await student_collection.find_one(
        sort=[("student_id", -1)]
    )

    if (
        last_student
        and last_student.get("student_id")
        and last_student["student_id"].startswith("ST")
    ):

        number = int(last_student["student_id"][2:])

        return f"ST{number+1:03d}"

    return "ST001"




async def create_student(student):


    existing_user = await user_collection.find_one(
        {
            "email": student.email
        }
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists."
        )

   
    user_id = await generate_user_id()

    student_id = await generate_student_id()

    
    hashed_password = pwd_context.hash(
        student.password
    )

    
    user_data = {

        "user_id": user_id,

        "name": student.name,

        "email": student.email,

        "password": hashed_password,

        "role": "Student",

        "status": "Active"

    }

    

    student_data = {

        "student_id": student_id,

        "user_id": user_id,

        "name": student.name,

        "email": student.email,

        "phone": student.phone,

        "department": student.department,

        "semester": student.semester,

        "address": student.address

    }

    try:

       

        await user_collection.insert_one(
            user_data
        )

        # Save Student

        result = await student_collection.insert_one(
            student_data
        )

    except Exception as e:

        

        await user_collection.delete_one(
            {
                "user_id": user_id
            }
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    created_student = await student_collection.find_one(
        {
            "_id": result.inserted_id
        }
    )

    created_student["_id"] = str(
        created_student["_id"]
    )

    return created_student


async def get_all_students():

    students = []

    async for student in student_collection.find():
        student["_id"] = str(student["_id"])
        students.append(student)

    return students



async def get_student(student_id: str):

    student = await student_collection.find_one(
        {"student_id": student_id}
    )

    if student:
        student["_id"] = str(student["_id"])

    return student



async def update_student(student_id: str, student: StudentCreate):

    result = await student_collection.update_one(
        {"student_id": student_id},
        {"$set": student.model_dump()}
    )

    if result.matched_count == 0:
        return None

    return await get_student(student_id)



async def delete_student(student_id: str):

    result = await student_collection.delete_one(
        {"student_id": student_id}
    )

    return result.deleted_count



async def search_students(keyword: str):

    students = []

    query = {
        "$or": [
            {"name": {"$regex": keyword, "$options": "i"}},
            {"course": {"$regex": keyword, "$options": "i"}},
            {"email": {"$regex": keyword, "$options": "i"}},
            {"student_id": {"$regex": keyword, "$options": "i"}}
        ]
    }

    async for student in student_collection.find(query):
        student["_id"] = str(student["_id"])
        students.append(student)

    return students



#async def get_student_pagination(page: int, limit: int):

    skip = (page - 1) * limit

    students = []

    async for student in student_collection.find().skip(skip).limit(limit):
        student["_id"] = str(student["_id"])
        students.append(student)

    total_students = await student_collection.count_documents({})

    return {
        "page": page,
        "limit": limit,
        "total_students": total_students,
        "students": students
    }#