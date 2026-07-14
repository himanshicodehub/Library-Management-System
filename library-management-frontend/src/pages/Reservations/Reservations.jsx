import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import {
    getReservations,
    deleteReservation,
    searchReservation
} from "../../services/reservationService";

function Reservations() {

    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {

        try {

            const data = await getReservations();

            setReservations(data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleSearch = async (e) => {

        const value = e.target.value;

        setKeyword(value);

        if (value === "") {

            fetchReservations();

            return;

        }

        const data = await searchReservation(value);

        setReservations(data);

    };

    const handleDelete = async (reservationId) => {

        const result = await Swal.fire({

            title: "Delete Reservation?",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed) return;

        await deleteReservation(reservationId);

        Swal.fire({

            icon: "success",

            title: "Deleted Successfully"

        });

        fetchReservations();

    };

    if (loading) {

        return (

            <MainLayout>

                <div className="text-center mt-5">

                    <div className="spinner-border"></div>

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Reservations</h2>

                    <Link
                        to="/reservations/add"
                        className="btn btn-success"
                    >

                        + Add Reservation

                    </Link>

                </div>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search Reservation..."
                    value={keyword}
                    onChange={handleSearch}
                />

                <div className="table-responsive">

                    <table className="table table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Reservation ID</th>
                                <th>Student ID</th>
                                <th>Book ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th width="170">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                reservations.length > 0 ?

                                reservations.map((reservation) => (

                                    <tr key={reservation.reservation_id}>

                                        <td>{reservation.reservation_id}</td>

                                        <td>{reservation.student_id}</td>

                                        <td>{reservation.book_id}</td>

                                        <td>{reservation.reservation_date}</td>

                                        <td>

                                            <span className="badge bg-warning text-dark">

                                                {reservation.status}

                                            </span>

                                        </td>

                                        <td>

                                            <Link
                                                to={`/reservations/edit/${reservation.reservation_id}`}
                                                className="btn btn-primary btn-sm me-2"
                                            >

                                                Edit

                                            </Link>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(
                                                        reservation.reservation_id
                                                    )
                                                }
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center"
                                    >

                                        No Reservations Found

                                    </td>

                                </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>

    );

}

export default Reservations;