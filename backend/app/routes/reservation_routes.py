from fastapi import APIRouter, HTTPException, Depends

from app.dependencies.auth import (
    require_admin,
    require_staff,
    get_current_user
)

from app.schemas.reservation_schema import (
    ReservationCreate,
    ReservationUpdate
)

from app.services.reservation_service import (
    reserve_book,
    get_all_reservations,
    get_reservation,
    update_reservation,
    delete_reservation,
    search_reservations
)

router = APIRouter(
    prefix="/reservations",
    tags=["Reservations"]
)


# ======================================
# Reserve Book
# ======================================

@router.post("/")
async def create_reservation(
    reservation: ReservationCreate,
    current_user=Depends(get_current_user)
):

    return await reserve_book(reservation)


# ======================================
# Get All Reservations
# ======================================

@router.get("/")
async def all_reservations(
    current_user=Depends(require_staff)
):

    return await get_all_reservations()


# ======================================
# Get Single Reservation
# ======================================

@router.get("/{reservation_id}")
async def single_reservation(
    reservation_id: str,
    current_user=Depends(require_staff)
):

    reservation = await get_reservation(
        reservation_id
    )

    if not reservation:

        raise HTTPException(
            status_code=404,
            detail="Reservation not found"
        )

    return reservation


# ======================================
# Update Reservation
# ======================================

@router.put("/{reservation_id}")
async def edit_reservation(
    reservation_id: str,
    reservation: ReservationUpdate,
    current_user=Depends(require_staff)
):

    updated = await update_reservation(
        reservation_id,
        reservation
    )

    if not updated:

        raise HTTPException(
            status_code=404,
            detail="Reservation not found"
        )

    return updated


# ======================================
# Delete Reservation
# ======================================

@router.delete("/{reservation_id}")
async def remove_reservation(
    reservation_id: str,
    current_user=Depends(require_admin)
):

    deleted = await delete_reservation(
        reservation_id
    )

    if deleted == 0:

        raise HTTPException(
            status_code=404,
            detail="Reservation not found"
        )

    return {
        "message": "Reservation deleted successfully"
    }


# ======================================
# Search Reservation
# ======================================

@router.get("/search/{keyword}")
async def search(
    keyword: str,
    current_user=Depends(require_staff)
):

    return await search_reservations(
        keyword
    )