from datetime import datetime

from bson import ObjectId
from fastapi import HTTPException

from app.config.database import db
from app.schemas.notification_schema import NotificationCreate

notification_collection = db["notifications"]


# =====================================
# Create Notification
# =====================================

async def create_notification(
    notification: NotificationCreate
):

    data = notification.model_dump()

    data["created_at"] = datetime.now().strftime(
        "%d-%m-%Y %I:%M %p"
    )

    result = await notification_collection.insert_one(
        data
    )

    created = await notification_collection.find_one(
        {
            "_id": result.inserted_id
        }
    )

    created["_id"] = str(created["_id"])

    return created


# =====================================
# Get All Notifications (Admin)
# =====================================

async def get_notifications():

    notifications = []

    async for item in notification_collection.find().sort(
        "_id",
        -1
    ):

        item["_id"] = str(item["_id"])

        notifications.append(item)

    return notifications


# =====================================
# Get Student Notifications
# =====================================

async def get_student_notifications(student_id: str):

    notifications = []

    async for item in notification_collection.find(
        {
            "student_id": student_id
        }
    ).sort(
        "_id",
        -1
    ):

        item["_id"] = str(item["_id"])

        notifications.append(item)

    return notifications


# =====================================
# Get Single Notification
# =====================================

async def get_notification(notification_id: str):

    notification = await notification_collection.find_one(
        {
            "_id": ObjectId(notification_id)
        }
    )

    if not notification:

        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    notification["_id"] = str(notification["_id"])

    return notification


# =====================================
# Mark Notification as Read
# =====================================

async def mark_as_read(notification_id: str):

    result = await notification_collection.update_one(
        {
            "_id": ObjectId(notification_id)
        },
        {
            "$set": {
                "is_read": True
            }
        }
    )

    if result.matched_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    notification = await notification_collection.find_one(
        {
            "_id": ObjectId(notification_id)
        }
    )

    notification["_id"] = str(notification["_id"])

    return notification


# =====================================
# Delete Notification
# =====================================

async def delete_notification(notification_id: str):

    result = await notification_collection.delete_one(
        {
            "_id": ObjectId(notification_id)
        }
    )

    if result.deleted_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    return {
        "message": "Notification deleted successfully"
    }