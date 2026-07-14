import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import { getBooks } from "../../services/bookService";
import { createReservation } from "../../services/reservationService";

function ReserveBook() {

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadBooks();

    }, []);

    const loadBooks = async () => {

        try {

            const response = await getBooks();

           
            const unavailableBooks = response.data.filter(
                (book) => book.available_quantity === 0
            );

            setBooks(unavailableBooks);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleReserve = async (bookId) => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            await createReservation({

                student_id: user.student_id,

                book_id: bookId,

                reservation_date: new Date()
                    .toISOString()
                    .split("T")[0]

            });

            Swal.fire({

                icon: "success",

                title: "Book Reserved Successfully"

            });

            loadBooks();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title:
                    error.response?.data?.detail ||
                    "Unable to reserve book"

            });

        }

    };

    if (loading) {

        return (

            <MainLayout>

                <div className="text-center mt-5">

                    <div className="spinner-border text-primary"></div>

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="card shadow border-0">

                    <div className="card-header bg-warning">

                        <h3>

                            📚 Reserve Books

                        </h3>

                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover">

                                <thead className="table-dark">

                                    <tr>

                                        <th>Book ID</th>

                                        <th>Title</th>

                                        <th>Author</th>

                                        <th>Category</th>

                                        <th>Publisher</th>

                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        books.length ?

                                        books.map((book)=>(

                                            <tr key={book.book_id}>

                                                <td>

                                                    {book.book_id}

                                                </td>

                                                <td>

                                                    {book.title}

                                                </td>

                                                <td>

                                                    {book.author}

                                                </td>

                                                <td>

                                                    {book.category}

                                                </td>

                                                <td>

                                                    {book.publisher}

                                                </td>

                                                <td>

                                                    <button

                                                        className="btn btn-warning"

                                                        onClick={() =>
                                                            handleReserve(
                                                                book.book_id
                                                            )
                                                        }

                                                    >

                                                        Reserve

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

                                                No Books Available For Reservation

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

export default ReserveBook;
