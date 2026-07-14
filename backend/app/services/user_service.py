from datetime import datetime

from fastapi import HTTPException

from app.config.database import db

from app.schemas.user_schema import (
    UserCreate,
    UserLogin,
    UserUpdate,
    ChangePassword
)

from app.utils.security import (
    hash_password,
    verify_password
)

from app.utils.jwt_handler import (
    create_access_token
)


user_collection = db["users"]

student_collection = db["students"]

async def register_user(user: UserCreate):

    # Check User ID

    existing_user = await user_collection.find_one(
        {
            "user_id": user.user_id
        }
    )

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="User ID already exists."
        )

    
    existing_email = await user_collection.find_one(
        {
            "email": user.email
        }
    )

    if existing_email:

        raise HTTPException(
            status_code=400,
            detail="Email already exists."
        )

    user_data = user.model_dump()

    

    user_data["password"] = hash_password(
        user.password
    )

    

    user_data["created_at"] = datetime.utcnow()

    user_data["last_login"] = None

    user_data["status"] = "Active"

    result = await user_collection.insert_one(
        user_data
    )

    created_user = await user_collection.find_one(
        {
            "_id": result.inserted_id
        }
    )

    created_user["_id"] = str(
        created_user["_id"]
    )

    created_user.pop("password")

    return created_user


async def login_user(user: UserLogin):

    existing = await user_collection.find_one(
        {
            "email": user.email
        }
    )

    if not existing:

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    if existing["status"] != "Active":

        raise HTTPException(
            status_code=403,
            detail="Account is inactive."
        )

    if not verify_password(
        user.password,
        existing["password"]
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid Password."
        )

    # Update last login

    await user_collection.update_one(
        {
            "user_id": existing["user_id"]
        },
        {
            "$set": {
                "last_login": datetime.utcnow()
            }
        }
    )

    # Get student_id if role is Student

    student_id = None

    if existing["role"] == "Student":

        student = await student_collection.find_one(
            {
                "user_id": existing["user_id"]
            }
        )

        if student:

            student_id = student["student_id"]

    token = create_access_token(
        {
            "user_id": existing["user_id"],
            "email": existing["email"],
            "role": existing["role"]
        }
    )

    return {

        "access_token": token,

        "token_type": "bearer",

        "user": {

            "user_id": existing["user_id"],

            "student_id": student_id,

            "name": existing["name"],

            "email": existing["email"],

            "phone": existing.get("phone"),

            "role": existing["role"],

            "status": existing["status"]

        }

    }

async def get_profile(user_id: str):

    user = await user_collection.find_one(

        {
            "user_id": user_id
        }

    )

    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found."

        )

    user["_id"] = str(user["_id"])

    user.pop("password")

    return user

async def get_user(user_id: str):

    user = await user_collection.find_one(

        {

            "user_id": user_id

        }

    )

    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found."

        )

    user["_id"] = str(user["_id"])

    user.pop("password")

    return user

async def get_all_users():

    users = []

    async for user in user_collection.find():

        user["_id"] = str(user["_id"])

        user.pop("password")

        users.append(user)

    return users
# ==========================================
# Get Users By Role
# ==========================================

async def get_users_by_role(role: str):

    users = []

    async for user in user_collection.find(
        {
            "role": role
        }
    ):

        user["_id"] = str(user["_id"])

        user.pop("password")

        users.append(user)

    return users


# ==========================================
# Update Profile
# ==========================================

async def update_profile(
    user_id: str,
    data: UserUpdate
):

    user = await user_collection.find_one(
        {
            "user_id": user_id
        }
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    await user_collection.update_one(

        {
            "user_id": user_id
        },

        {
            "$set": data.model_dump()
        }

    )

    updated_user = await user_collection.find_one(
        {
            "user_id": user_id
        }
    )

    updated_user["_id"] = str(updated_user["_id"])

    updated_user.pop("password")

    return updated_user


# ==========================================
# Change Password
# ==========================================

async def change_password(
    user_id: str,
    data: ChangePassword
):

    user = await user_collection.find_one(
        {
            "user_id": user_id
        }
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    if not verify_password(
        data.old_password,
        user["password"]
    ):

        raise HTTPException(
            status_code=400,
            detail="Old password is incorrect."
        )

    if data.old_password == data.new_password:

        raise HTTPException(
            status_code=400,
            detail="New password must be different."
        )

    hashed_password = hash_password(
        data.new_password
    )

    await user_collection.update_one(

        {
            "user_id": user_id
        },

        {
            "$set": {
                "password": hashed_password
            }
        }

    )

    return {

        "message": "Password changed successfully."

    }


# ==========================================
# Delete User
# ==========================================

async def delete_user(user_id: str):

    user = await user_collection.find_one(
        {
            "user_id": user_id
        }
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    await user_collection.delete_one(
        {
            "user_id": user_id
        }
    )

    return {

        "message": "User deleted successfully."

    }


# ==========================================
# Activate User
# ==========================================

async def activate_user(user_id: str):

    user = await user_collection.find_one(
        {
            "user_id": user_id
        }
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    await user_collection.update_one(

        {
            "user_id": user_id
        },

        {
            "$set": {
                "status": "Active"
            }
        }

    )

    return {

        "message": "User activated successfully."

    }


# ==========================================
# Deactivate User
# ==========================================

async def deactivate_user(user_id: str):

    user = await user_collection.find_one(
        {
            "user_id": user_id
        }
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    await user_collection.update_one(

        {
            "user_id": user_id
        },

        {
            "$set": {
                "status": "Inactive"
            }
        }

    )

    return {

        "message": "User deactivated successfully."

    }


# ==========================================
# Reset Password
# ==========================================

async def reset_password(user_id: str):

    user = await user_collection.find_one(
        {
            "user_id": user_id
        }
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    default_password = hash_password(
        "Library@123"
    )

    await user_collection.update_one(

        {
            "user_id": user_id
        },

        {
            "$set": {
                "password": default_password
            }
        }

    )

    return {

        "message": "Password reset successfully.",
        "default_password": "Library@123"

    }