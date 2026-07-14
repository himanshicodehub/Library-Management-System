from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import MONGODB_URL, DATABASE_NAME

client = AsyncIOMotorClient(MONGODB_URL)

db = client[DATABASE_NAME]

book_collection = db["books"]

student_collection = db["students"]

user_collection = db["users"]

issue_book_collection = db["issue_books"]