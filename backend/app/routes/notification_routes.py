from fastapi import APIRouter

from app.schemas.notification_schema import NotificationCreate

from app.services.notification_service import (
    create_notification,
    get_notifications,
    get_student_notifications,
    get_notification,
    mark_as_read,
    delete_notification
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


# =====================================
# Create Notification
# =====================================

@router.post("/")
async def add_notification(
    notification: NotificationCreate
):

    return await create_notification(
        notification
    )


# =====================================
# Admin - Get All Notifications
# =====================================

@router.get("/")
async def all_notifications():

    return await get_notifications()


# =====================================
# Student Notifications
# =====================================

@router.get("/student/{student_id}")
async def student_notifications(
    student_id: str
):

    return await get_student_notifications(
        student_id
    )


# =====================================
# Get Single Notification
# =====================================

@router.get("/{notification_id}")
async def single_notification(
    notification_id: str
):

    return await get_notification(
        notification_id
    )


# =====================================
# Mark Notification Read
# =====================================

@router.put("/{notification_id}/read")
async def read_notification(
    notification_id: str
):

    return await mark_as_read(
        notification_id
    )


# =====================================
# Delete Notification
# =====================================

@router.delete("/{notification_id}")
async def remove_notification(
    notification_id: str
):

    return await delete_notification(
        notification_id
    )