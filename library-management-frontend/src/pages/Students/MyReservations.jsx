import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import { getMyReservations } from "../../services/studentService";

function MyReservations() {

    const [reservations, setReservations] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadReservations();

    }, []);

    const loadReservations = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user || !user.student_id) {

                setLoading(false);

                return;

            }

            const data = await getMyReservations(
                user.student_id
            );

            setReservations(data);

        }

        catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Unable to load reservations"

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

                    <div className="spinner-border text-success"></div>

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="card shadow border-0">

                    <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">

                        <h3 className="mb-0">

                            📚 My Reservations

                        </h3>

                        <span className="badge bg-light text-dark">

                            {reservations.length} Reservations

                        </span>

                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>Reservation ID</th>

                                        <th>Book ID</th>

                                        <th>Book Title</th>

                                        <th>Author</th>

                                        <th>Reservation Date</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        reservations.length > 0 ?

                                        reservations.map((item) => (

                                            <tr key={item.reservation_id}>

                                                <td>

                                                    {item.reservation_id}

                                                </td>

                                                <td>

                                                    {item.book_id}

                                                </td>

                                                <td>

                                                    {item.title || item.book_name}

                                                </td>

                                                <td>

                                                    {item.author}

                                                </td>

                                                <td>

                                                    {item.reservation_date}

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${
                                                            item.status === "Reserved"
                                                                ? "bg-warning text-dark"
                                                                : item.status === "Completed"
                                                                ? "bg-success"
                                                                : "bg-danger"
                                                        }`}
                                                    >

                                                        {item.status}

                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                        :

                                        <tr>

                                            <td
                                                colSpan="6"
                                                className="text-center py-4 text-muted"
                                            >

                                                No Reservations Found

                                            </td>

                                        </tr>

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default MyReservations;