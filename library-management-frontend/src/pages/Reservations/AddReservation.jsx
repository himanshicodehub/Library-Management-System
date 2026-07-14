import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import { getStudents } from "../../services/studentService";
import { getBooks } from "../../services/bookService";
import { createReservation } from "../../services/reservationService";

function AddReservation() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const [books, setBooks] = useState([]);

    const [formData, setFormData] = useState({

        student_id: "",

        book_id: "",

        reservation_date: ""

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const studentResponse = await getStudents();

            const bookResponse = await getBooks();

            setStudents(studentResponse.data);

            setBooks(bookResponse.data);

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

            await createReservation(formData);

            Swal.fire({

                icon: "success",

                title: "Reservation Added Successfully"

            });

            navigate("/reservations");

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: error.response?.data?.detail ||
                       "Unable to Add Reservation"

            });

        }

    };

    return (

        <MainLayout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        <h3>Add Reservation</h3>

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

                                    required

                                >

                                    <option value="">

                                        Select Student

                                    </option>

                                    {

                                        students.map((student)=>(

                                            <option

                                                key={student.student_id}

                                                value={student.student_id}

                                            >

                                                {student.student_id} - {student.name}

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

                                    required

                                >

                                    <option value="">

                                        Select Book

                                    </option>

                                    {

                                        books.map((book)=>(

                                            <option

                                                key={book.book_id}

                                                value={book.book_id}

                                            >

                                                {book.book_id} - {book.title}

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

                                    required

                                />

                            </div>

                            <button

                                className="btn btn-success"

                            >

                                Save Reservation

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default AddReservation;