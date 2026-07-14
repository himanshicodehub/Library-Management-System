from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

from app.config.database import db
from app.config.settings import SECRET_KEY, ALGORITHM


security = HTTPBearer()

user_collection = db["users"]


# ==========================================
# Get Current User
# ==========================================

async def get_current_user(

    credentials: HTTPAuthorizationCredentials = Depends(
        security
    )

):

    token = credentials.credentials

    try:

        payload = jwt.decode(

            token,

            SECRET_KEY,

            algorithms=[ALGORITHM]

        )

        user_id = payload.get("user_id")

        if user_id is None:

            raise HTTPException(

                status_code=status.HTTP_401_UNAUTHORIZED,

                detail="Invalid Token"

            )

    except JWTError:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Token Expired or Invalid"

        )

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

    if user["status"] != "Active":

        raise HTTPException(

            status_code=403,

            detail="Account is inactive."

        )

    user["_id"] = str(user["_id"])

    user.pop("password")

    return user
# ==========================================
# Admin Only
# ==========================================

async def require_admin(

    current_user = Depends(get_current_user)

):

    if current_user["role"] != "Admin":

        raise HTTPException(

            status_code=403,

            detail="Admin access required."

        )

    return current_user


# ==========================================
# Librarian Only
# ==========================================

async def require_librarian(

    current_user = Depends(get_current_user)

):

    if current_user["role"] != "Librarian":

        raise HTTPException(

            status_code=403,

            detail="Librarian access required."

        )

    return current_user


# ==========================================
# Student Only
# ==========================================

async def require_student(

    current_user = Depends(get_current_user)

):

    if current_user["role"] != "Student":

        raise HTTPException(

            status_code=403,

            detail="Student access required."

        )

    return current_user


# ==========================================
# Admin OR Librarian
# ==========================================

async def require_staff(

    current_user = Depends(get_current_user)

):

    if current_user["role"] not in [

        "Admin",

        "Librarian"

    ]:

        raise HTTPException(

            status_code=403,

            detail="Staff access required."

        )

    return current_user