from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.book_routes import router as book_router
from app.routes.student_routes import router as student_router
from app.routes.issue_routes import router as issue_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.user_routes import router as user_router
from app.routes.report_routes import router as report_router
from app.routes.notification_routes import router as notification_router
from app.routes.reservation_routes import router as reservation_router
from app.routes.student_book_routes import router as student_book_router
from app.routes.student_reservation_routes import router as student_reservation_router
app = FastAPI(
    title="Library Management System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(book_router)
app.include_router(student_router)
app.include_router(issue_router)
app.include_router(dashboard_router)
app.include_router(user_router)
app.include_router(report_router)
app.include_router(notification_router)
app.include_router(reservation_router)
app.include_router(student_book_router)
app.include_router(student_reservation_router)
@app.get("/")
async def root():
    return {"message": "Library Management System API Running"}