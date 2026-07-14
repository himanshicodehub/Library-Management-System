import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
    FaBook,
    FaUsers,
    FaExchangeAlt,
    FaBookOpen
} from "react-icons/fa";

import { getLibrarianDashboard } from "../../services/dashboardService";

import StatCard from "../../components/dashboard/StatCard";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentBooks from "../../components/dashboard/RecentBooks";
import Notifications from "../../components/dashboard/Notifications";

function LibrarianDashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getLibrarianDashboard();
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

                    Librarian Dashboard

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

                </div>

                <QuickActions />

                <div className="row mt-4">

                    <div className="col-lg-8">

                        <RecentBooks
                            books={dashboard?.recent_books || []}
                        />

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

export default LibrarianDashboard;