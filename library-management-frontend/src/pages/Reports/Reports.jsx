import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

function Reports() {

    const reports = [

        {
            title: "Book Report",
            icon: "📚",
            color: "primary",
            path: "/reports/books"
        },

        {
            title: "Student Report",
            icon: "👨‍🎓",
            color: "success",
            path: "/reports/students"
        },

        {
            title: "Issue Report",
            icon: "📖",
            color: "warning",
            path: "/reports/issues"
        },

        {
            title: "Return Report",
            icon: "🔄",
            color: "info",
            path: "/reports/returns"
        },

        {
            title: "Fine Report",
            icon: "💰",
            color: "danger",
            path: "/reports/fines"
        }

    ];

    return (

        <MainLayout>

            <div className="container-fluid">

                <h2 className="fw-bold mb-4">

                    📊 Reports Dashboard

                </h2>

                <div className="row">

                    {

                        reports.map((report,index)=>(

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={index}
                            >

                                <div className="card shadow border-0 h-100">

                                    <div className="card-body text-center">

                                        <div
                                            style={{
                                                fontSize:"60px"
                                            }}
                                        >

                                            {report.icon}

                                        </div>

                                        <h3 className="mt-3">

                                            {report.title}

                                        </h3>

                                        <Link

                                            to={report.path}

                                            className={`btn btn-${report.color} mt-3`}

                                        >

                                            View Report

                                        </Link>

                                    </div>

                                </div>

                            </div>

                        ))

                    }

                </div>

            </div>

        </MainLayout>

    );

}

export default Reports;