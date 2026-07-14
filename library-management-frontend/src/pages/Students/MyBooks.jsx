import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import { getMyBooks } from "../../services/studentService";

function MyBooks() {

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadBooks();

    }, []);

    const loadBooks = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user || !user.student_id) {

                setLoading(false);

                return;

            }

            const data = await getMyBooks(
                user.student_id
            );

            setBooks(data);

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Unable to load books"

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

                    <div className="spinner-border text-primary"></div>

                </div>

            </MainLayout>

        );

    }
        return (

        <MainLayout>

            <div className="container-fluid">

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">

                        <h3 className="mb-0">

                            📚 My Books

                        </h3>

                        <span className="badge bg-light text-dark">

                            {books.length} Books

                        </span>

                    </div>

                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>Book ID</th>

                                        <th>Title</th>

                                        <th>Author</th>

                                        <th>Category</th>

                                        <th>Issue Date</th>

                                        <th>Due Date</th>

                                        <th>Fine</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        books.length > 0 ?

                                        books.map((book) => (

                                            <tr key={book.issue_id}>

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

                                                    {book.issue_date}

                                                </td>

                                                <td>

                                                    {book.due_date}

                                                </td>

                                                <td>

                                                    ₹{book.fine || 0}

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${
                                                            book.status === "Issued"
                                                                ? "bg-success"
                                                                : "bg-secondary"
                                                        }`}
                                                    >

                                                        {book.status}

                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                        :

                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="text-center text-muted py-4"
                                            >

                                                No Books Issued

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

export default MyBooks;