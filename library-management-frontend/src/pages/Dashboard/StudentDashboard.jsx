import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import {
    FaBook,
    FaClock,
    FaMoneyBillWave,
    FaUserGraduate
} from "react-icons/fa";

import { getStudentDashboard } from "../../services/dashboardService";

import StatCard from "../../components/dashboard/StatCard";
import Notifications from "../../components/dashboard/Notifications";

function StudentDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        student_name: "",
        my_books: 0,
        my_reservations: 0,
        due_books: 0,
        my_fine: 0,
        my_issued_books: [],
        notifications: []
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user || !user.student_id) {

                setLoading(false);

                return;

            }

            const data = await getStudentDashboard(
                user.student_id
            );

            setDashboard(data);

        }

        catch (error) {

            console.error(error);

            setDashboard({

                student_name: "",

                my_books: 0,

                my_reservations: 0,

                due_books: 0,

                my_fine: 0,

                my_issued_books: [],

                notifications: []

            });

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <MainLayout>

                <div className="text-center mt-5">

                    <div className="spinner-border text-warning"></div>

                </div>

            </MainLayout>

        );

    }
        return (

        <MainLayout>

            <div className="container-fluid">

                

                <div className="card shadow border-0 mb-4">

                    <div className="card-body">

                        <h2 className="fw-bold">

                            Welcome, {dashboard.student_name}

                        </h2>

                        <p className="text-muted mb-0">

                            Manage your library account here.

                        </p>

                    </div>

                </div>

                

                <div className="row g-4">

                    <StatCard
                        title="My Books"
                        value={dashboard.my_books}
                        subtitle="Issued Books"
                        color="linear-gradient(135deg,#2563eb,#3b82f6)"
                        icon={<FaBook />}
                        onClick={() => navigate("/my-books")}
                    />

                    <StatCard
                        title="Due Books"
                        value={dashboard.due_books}
                        subtitle="Pending Return"
                        color="linear-gradient(135deg,#f59e0b,#fbbf24)"
                        icon={<FaClock />}
                    />

                    <StatCard
                        title="Fine"
                        value={`₹${dashboard.my_fine}`}
                        subtitle="Pending Fine"
                        color="linear-gradient(135deg,#ef4444,#dc2626)"
                        icon={<FaMoneyBillWave />}
                    />

                    <StatCard
                        title="Reservations"
                        value={dashboard.my_reservations}
                        subtitle="Reserved Books"
                        color="linear-gradient(135deg,#10b981,#059669)"
                        icon={<FaUserGraduate />}
                        onClick={() => navigate("/my-reservations")}
                    />

                </div>

                

                <div className="row mt-4">

                    <div className="col-lg-8">

                        <div className="card shadow border-0">

                            <div className="card-header bg-primary text-white">

                                <h5 className="mb-0">

                                    My Issued Books

                                </h5>

                            </div>

                            <div className="card-body">

                                <div className="table-responsive">

                                    <table className="table table-hover align-middle">

                                        <thead>

                                            <tr>

                                                <th>Book</th>

                                                <th>Issue Date</th>

                                                <th>Due Date</th>

                                                <th>Fine</th>

                                                <th>Status</th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {

                                                dashboard.my_issued_books.length > 0 ?

                                                dashboard.my_issued_books.map((book,index)=>(

                                                    <tr key={index}>

                                                        <td>

                                                            {book.title}

                                                        </td>

                                                        <td>

                                                            {book.issue_date}

                                                        </td>

                                                        <td>

                                                            {book.due_date}

                                                        </td>

                                                        <td>

                                                            ₹{book.fine || 0}

                                                        </td>

                                                        <td>

                                                            <span
                                                                className={`badge ${
                                                                    book.status === "Issued"
                                                                        ? "bg-success"
                                                                        : "bg-secondary"
                                                                }`}
                                                            >

                                                                {book.status}

                                                            </span>

                                                        </td>

                                                    </tr>

                                                ))

                                                :

                                                <tr>

                                                    <td
                                                        colSpan="5"
                                                        className="text-center text-muted"
                                                    >

                                                        No Issued Books

                                                    </td>

                                                </tr>

                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="col-lg-4">

                        <Notifications
                            dashboard={dashboard}
                        />

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default StudentDashboard;
