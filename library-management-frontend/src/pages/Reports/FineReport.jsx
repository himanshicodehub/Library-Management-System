import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getFineReport } from "../../services/reportService";

function FineReport() {

    const [fines, setFines] = useState([]);

    useEffect(() => {

        loadFine();

    }, []);

    const loadFine = async () => {

        try {

            const response = await getFineReport();

            setFines(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <h2 className="mb-4">

                    💰 Fine Report

                </h2>

                <div className="table-responsive">

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Issue ID</th>

                                <th>Student ID</th>

                                <th>Book ID</th>

                                <th>Fine Amount</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                fines.map((issue) => (

                                    <tr key={issue._id}>

                                        <td>{issue.issue_id}</td>

                                        <td>{issue.student_id}</td>

                                        <td>{issue.book_id}</td>

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

export default FineReport;