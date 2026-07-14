import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import { getStudents } from "../../services/studentService";
import { getBooks } from "../../services/bookService";

import {
    getReservation,
    updateReservation
} from "../../services/reservationService";

function EditReservation() {

    const navigate = useNavigate();

    const { reservationId } = useParams();

    const [students, setStudents] = useState([]);

    const [books, setBooks] = useState([]);

    const [formData, setFormData] = useState({

        student_id: "",

        book_id: "",

        reservation_date: "",

        status: ""

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const studentResponse = await getStudents();

            const bookResponse = await getBooks();

            const reservationResponse =
                await getReservation(reservationId);

            setStudents(studentResponse.data);

            setBooks(bookResponse.data);

            setFormData(reservationResponse);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateReservation(

                reservationId,

                formData

            );

            Swal.fire({

                icon: "success",

                title: "Reservation Updated"

            });

            navigate("/reservations");

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title:

                    error.response?.data?.detail ||

                    "Unable to Update Reservation"

            });

        }

    };

    return (

        <MainLayout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>

                            Edit Reservation

                        </h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">

                                <label>

                                    Student

                                </label>

                                <select

                                    className="form-select"

                                    name="student_id"

                                    value={formData.student_id}

                                    onChange={handleChange}

                                >

                                    {

                                        students.map((student)=>(

                                            <option

                                                key={student.student_id}

                                                value={student.student_id}

                                            >

                                                {student.student_id}

                                                {" - "}

                                                {student.name}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>

                                    Book

                                </label>

                                <select

                                    className="form-select"

                                    name="book_id"

                                    value={formData.book_id}

                                    onChange={handleChange}

                                >

                                    {

                                        books.map((book)=>(

                                            <option

                                                key={book.book_id}

                                                value={book.book_id}

                                            >

                                                {book.book_id}

                                                {" - "}

                                                {book.title}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            <div className="mb-3">

                                <label>

                                    Reservation Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="reservation_date"

                                    value={formData.reservation_date}

                                    onChange={handleChange}

                                />

                            </div>

                            <div className="mb-3">

                                <label>

                                    Status

                                </label>

                                <select

                                    className="form-select"

                                    name="status"

                                    value={formData.status}

                                    onChange={handleChange}

                                >

                                    <option value="Reserved">

                                        Reserved

                                    </option>

                                    <option value="Completed">

                                        Completed

                                    </option>

                                    <option value="Cancelled">

                                        Cancelled

                                    </option>

                                </select>

                            </div>

                            <button

                                className="btn btn-primary"

                            >

                                Update Reservation

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default EditReservation;