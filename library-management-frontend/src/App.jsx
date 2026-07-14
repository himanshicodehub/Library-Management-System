import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";

// Books
import Books from "./pages/Books/Books";
import AddBook from "./pages/Books/AddBook";
import EditBook from "./pages/Books/EditBook";

// Students
import Students from "./pages/Students/Students";
import AddStudent from "./pages/Students/AddStudent";
import EditStudent from "./pages/Students/EditStudent";
import MyBooks from "./pages/Students/MyBooks";
import MyReservations from "./pages/Students/MyReservations";
import ReserveBook from "./pages/Students/ReserveBook";

// Issue Books
import IssueBooks from "./pages/IssueBooks/IssueBooks";
import AddIssueBook from "./pages/IssueBooks/AddIssueBook";
import EditIssueBook from "./pages/IssueBooks/EditIssueBook";

// Reservations
import Reservations from "./pages/Reservations/Reservations";
import AddReservation from "./pages/Reservations/AddReservation";
import EditReservation from "./pages/Reservations/EditReservation";

// Reports
import Reports from "./pages/Reports/Reports";
import BookReport from "./pages/Reports/BookReport";
import StudentReport from "./pages/Reports/StudentReport";
import IssueReport from "./pages/Reports/IssueReport";
import ReturnReport from "./pages/Reports/ReturnReport";
import FineReport from "./pages/Reports/FineReport";

// Users
import Users from "./pages/User/Users";
import AddUser from "./pages/User/AddUser";
import EditUser from "./pages/User/EditUser";
import Profile from "./pages/User/Profile";
import ChangePassword from "./pages/User/ChangePassword";

// Notifications
import Notifications from "./pages/Notifications/Notifications";

// Settings
import Settings from "./pages/Settings/Settings";

// Auth
import Login from "./pages/Auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Dashboard */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* ================= Books ================= */}

                <Route
                    path="/books"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <Books />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/books/add"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <AddBook />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/books/edit/:bookId"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <EditBook />
                        </ProtectedRoute>
                    }
                />

                {/* ================= Students ================= */}

                <Route
                    path="/students"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <Students />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/students/add"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <AddStudent />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/students/edit/:studentId"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <EditStudent />
                        </ProtectedRoute>
                    }
                />

                {/* ================= Issue Books ================= */}

                <Route
                    path="/issue-books"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <IssueBooks />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/issue-books/add"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <AddIssueBook />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/issue-books/edit/:issueId"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <EditIssueBook />
                        </ProtectedRoute>
                    }
                />

                {/* ================= Reservations ================= */}

                <Route
                    path="/reservations"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <Reservations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reservations/add"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <AddReservation />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reservations/edit/:reservationId"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian"]}>
                            <EditReservation />
                        </ProtectedRoute>
                    }
                />

                {/* ================= Student ================= */}

                <Route
                    path="/reserve-book"
                    element={
                        <ProtectedRoute allowedRoles={["Student"]}>
                            <ReserveBook />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-books"
                    element={
                        <ProtectedRoute allowedRoles={["Student"]}>
                            <MyBooks />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-reservations"
                    element={
                        <ProtectedRoute allowedRoles={["Student"]}>
                            <MyReservations />
                        </ProtectedRoute>
                    }
                />

                {/* ================= Reports ================= */}

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <Reports />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports/books"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <BookReport />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports/students"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <StudentReport />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports/issues"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <IssueReport />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports/returns"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <ReturnReport />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports/fines"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <FineReport />
                        </ProtectedRoute>
                    }
                />

                {/* ================= Users ================= */}

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <Users />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/users/add"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <AddUser />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/users/edit/:userId"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <EditUser />
                        </ProtectedRoute>
                    }
                />

                {/* ================= Profile ================= */}

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute allowedRoles={["Admin","Librarian","Student"]}>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/change-password"
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                />

                {/* ================= Notifications ================= */}

                <Route
                    path="/notifications"
                    element={
                        <ProtectedRoute>
                            <Notifications />
                        </ProtectedRoute>
                    }
                />

                {/* ================= Settings ================= */}

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute allowedRoles={["Admin"]}>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;