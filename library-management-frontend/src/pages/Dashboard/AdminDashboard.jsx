import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
    FaBook,
    FaUsers,
    FaUserShield,
    FaExchangeAlt,
    FaBookOpen,
    FaClipboardList,
    FaExclamationTriangle,
    FaMoneyBillWave
} from "react-icons/fa";

import { getAdminDashboard } from "../../services/dashboardService";

import StatCard from "../../components/dashboard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentBooks from "../../components/dashboard/RecentBooks";
import RecentStudents from "../../components/dashboard/RecentStudents";
import Notifications from "../../components/dashboard/Notifications";

function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

          const data = await getAdminDashboard();
            setDashboard(data);

        }

        catch (error) {

            console.log(error);

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

                <h2 className="fw-bold mb-4">

                    Admin Dashboard

                </h2>

                

                <div className="row">

                    <StatCard
                        title="Books"
                        value={dashboard?.total_books || 0}
                        subtitle="Total Books"
                        color="linear-gradient(135deg,#2563eb,#3b82f6)"
                        icon={<FaBook />}
                    />

                    <StatCard
                        title="Students"
                        value={dashboard?.total_students || 0}
                        subtitle="Registered Students"
                        color="linear-gradient(135deg,#10b981,#059669)"
                        icon={<FaUsers />}
                    />

                    <StatCard
                        title="Users"
                        value={dashboard?.total_users || 0}
                        subtitle="System Users"
                        color="linear-gradient(135deg,#8b5cf6,#7c3aed)"
                        icon={<FaUserShield />}
                    />

                    <StatCard
                        title="Issued"
                        value={dashboard?.issued_books || 0}
                        subtitle="Issued Books"
                        color="linear-gradient(135deg,#f59e0b,#fbbf24)"
                        icon={<FaExchangeAlt />}
                    />

                    <StatCard
                        title="Available"
                        value={dashboard?.available_books || 0}
                        subtitle="Available Books"
                        color="linear-gradient(135deg,#14b8a6,#0f766e)"
                        icon={<FaBookOpen />}
                    />

                    <StatCard
                        title="Reserved"
                        value={dashboard?.reserved_books || 0}
                        subtitle="Reserved Books"
                        color="linear-gradient(135deg,#ec4899,#db2777)"
                        icon={<FaClipboardList />}
                    />

                    <StatCard
                        title="Overdue"
                        value={dashboard?.overdue_books || 0}
                        subtitle="Overdue Books"
                        color="linear-gradient(135deg,#ef4444,#dc2626)"
                        icon={<FaExclamationTriangle />}
                    />

                    <StatCard
                        title="Fine"
                        value={`₹${dashboard?.total_fine || 0}`}
                        subtitle="Fine Collection"
                        color="linear-gradient(135deg,#0ea5e9,#0284c7)"
                        icon={<FaMoneyBillWave />}
                    />

                </div>

                

                <QuickActions />

                

                <div className="row mt-4">

                    <div className="col-lg-6">

                        <RecentBooks
                            books={dashboard?.recent_books || []}
                        />

                    </div>

                    <div className="col-lg-6">

                        <RecentStudents
                            students={dashboard?.recent_students || []}
                        />

                    </div>

                </div>

                
                <div className="row mt-4">

                    <div className="col-lg-8">

                        <div className="card shadow border-0">

                            <div className="card-header bg-primary text-white">

                                <h5 className="mb-0">

                                    Recent Book Issues

                                </h5>

                            </div>

                            <div className="card-body">

                                <table className="table table-hover">

                                    <thead>

                                        <tr>

                                            <th>Student</th>

                                            <th>Book</th>

                                            <th>Issue Date</th>

                                            <th>Status</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            dashboard?.recent_issues?.length ?

                                            dashboard.recent_issues.map((issue,index)=>(

                                                <tr key={index}>

                                                    <td>{issue.student_name}</td>

                                                    <td>{issue.book_title}</td>

                                                    <td>{issue.issue_date}</td>

                                                    <td>

                                                        <span className="badge bg-success">

                                                            {issue.status}

                                                        </span>

                                                    </td>

                                                </tr>

                                            ))

                                            :

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center"
                                                >

                                                    No Recent Issues

                                                </td>

                                            </tr>

                                        }

                                    </tbody>

                                </table>

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

export default AdminDashboard;
