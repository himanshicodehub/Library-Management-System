import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getReturnReport } from "../../services/reportService";

function ReturnReport() {

    const [returns, setReturns] = useState([]);

    useEffect(() => {

        loadReturns();

    }, []);

    const loadReturns = async () => {

        try {

            const response = await getReturnReport();

            setReturns(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <h2 className="mb-4">

                    🔄 Return Report

                </h2>

                <div className="table-responsive">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Issue ID</th>

                                <th>Student ID</th>

                                <th>Book ID</th>

                                <th>Return Date</th>

                                <th>Fine</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                returns.map((issue) => (

                                    <tr key={issue._id}>

                                        <td>{issue.issue_id}</td>

                                        <td>{issue.student_id}</td>

                                        <td>{issue.book_id}</td>

                                        <td>{issue.return_date}</td>

                                        <td>

                                            ₹ {issue.fine}

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

export default ReturnReport;