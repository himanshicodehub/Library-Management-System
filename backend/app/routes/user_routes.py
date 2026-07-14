from fastapi import APIRouter

from app.schemas.user_schema import (
    UserCreate,
    UserLogin,
    UserUpdate,
    ChangePassword
)

from app.services.user_service import (
    register_user,
    login_user,
    get_profile,
    update_profile,
    change_password,
    get_all_users,
    get_user,
    get_users_by_role,
    delete_user,
    activate_user,
    deactivate_user,
    reset_password
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/")
async def create_user(user: UserCreate):
    return await register_user(user)



@router.post("/login")
async def login(user: UserLogin):
    return await login_user(user)


@router.get("/")
async def all_users():
    return await get_all_users()

@router.get("/role/{role}")
async def users_by_role(role: str):
    return await get_users_by_role(role)

@router.get("/profile/{user_id}")
async def profile(user_id: str):
    return await get_profile(user_id)

@router.put("/{user_id}")
async def edit_user(
    user_id: str,
    user: UserUpdate
):
    return await update_profile(
        user_id,
        user
    )

@router.put("/change-password/{user_id}")
async def password(
    user_id: str,
    data: ChangePassword
):
    return await change_password(
        user_id,
        data
    )
    
@router.get("/{user_id}")
async def single_user(user_id: str):
    return await get_user(user_id)   

@router.put("/{user_id}")
async def update_user(
    user_id: str,
    user: UserUpdate
):
    return await update_profile(
        user_id,
        user
    )

@router.delete("/{user_id}")
async def remove_user(user_id: str):
    return await delete_user(user_id)

@router.put("/{user_id}/activate")
async def activate(user_id: str):
    return await activate_user(user_id)


@router.put("/{user_id}/deactivate")
async def deactivate(user_id: str):
    return await deactivate_user(user_id)

@router.put("/{user_id}/reset-password")
async def reset(user_id: str):
    return await reset_password(user_id)