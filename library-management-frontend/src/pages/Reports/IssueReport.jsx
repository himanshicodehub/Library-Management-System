import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getIssueReport } from "../../services/reportService";

function IssueReport() {

    const [issues, setIssues] = useState([]);

    useEffect(() => {
        loadIssues();
    }, []);

    const loadIssues = async () => {

        try {

            const response = await getIssueReport();

            setIssues(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <h2 className="mb-4">

                    📖 Issue Report

                </h2>

                <div className="table-responsive">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Issue ID</th>

                                <th>Student ID</th>

                                <th>Book ID</th>

                                <th>Issue Date</th>

                                <th>Due Date</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                issues.map((issue) => (

                                    <tr key={issue._id}>

                                        <td>{issue.issue_id}</td>

                                        <td>{issue.student_id}</td>

                                        <td>{issue.book_id}</td>

                                        <td>{issue.issue_date}</td>

                                        <td>{issue.due_date}</td>

                                        <td>

                                            {

                                                issue.status === "Issued"

                                                    ?

                                                    <span className="badge bg-warning text-dark">

                                                        Issued

                                                    </span>

                                                    :

                                                    <span className="badge bg-success">

                                                        Returned

                                                    </span>

                                            }

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>

    );

}

export default IssueReport;