import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import {
    getBooks,
    deleteBook,
    searchBook,
} from "../../services/bookService";

function Books() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");

    // =========================
    // Fetch Books
    // =========================

    const fetchBooks = async () => {

        try {

            const response = await getBooks();

            setBooks(response.data);

        }

        catch (error) {

    Swal.fire({

        icon: "error",

        title: "Search Failed"

    });

}

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchBooks();

    }, []);

    // =========================
    // Search Books
    // =========================

    const handleSearch = async (e) => {

        const value = e.target.value;

        setKeyword(value);

        if (value.trim() === "") {

            fetchBooks();

            return;

        }

        try {

            const response = await searchBook(value);

            setBooks(response.data);

        }

        catch (error) {

    Swal.fire({

        icon: "error",

        title: "Error",

        text: "Unable to load books."

    });

}

    };

    // =========================
    // Delete Book
    // =========================

    const handleDelete = async (bookId) => {

        const result = await Swal.fire({

            title: "Delete Book?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#d33",

            cancelButtonColor: "#3085d6",

            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed) return;

        try {

            await deleteBook(bookId);

            Swal.fire({

                icon: "success",

                title: "Deleted Successfully"

            });

            fetchBooks();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Unable to delete book"

            });

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

    <h2 className="fw-bold">

        📚 Books

    </h2>

    <Link
        to="/books/add"
        className="btn btn-success btn-lg"
    >

        + Add Book

    </Link>

</div>

<div className="mb-4">

    <input

        type="text"

        className="form-control form-control-lg"

        placeholder="Search Book..."

        value={keyword}

        onChange={handleSearch}

    />

</div>
                {

                    loading ?

                        <div className="text-center">

                            <div className="spinner-border text-primary"></div>

                        </div>

                        :

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">


                                <thead className="table-dark">

                                    <tr>

                                        <th>Book ID</th>

                                        <th>Title</th>

                                        <th>Author</th>

                                        <th>Category</th>

                                        <th>ISBN</th>

                                        <th>Publisher</th>

                                        <th>Total</th>

                                        <th>Available</th>

                                        <th width="180">

                                            Action

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        books.length > 0 ?

                                            books.map((book) => (

                                                <tr key={book._id}>

                                                    <td className="title-column">
                                                        {book.book_id}</td>

                                                   <td className="title-column">
                                                        {book.title}</td>

                                                    <td className="title-column">
                                                        {book.author}</td>

                                                   <td className="title-column">
                                                        {book.category}</td>

                                                   <td className="title-column">
                                                        {book.isbn}</td>

                                                  <td className="title-column">
                                                        {book.publisher}</td>

                                                   <td className="title-column">
                                                        {book.total_quantity}</td>

                                                   <td className="title-column">


                                                        {

                                                            book.available_quantity > 0 ?

                                                                <span className="badge bg-success">

                                                                    {book.available_quantity}

                                                                </span>

                                                                :

                                                                <span className="badge bg-danger">

                                                                    Out of Stock

                                                                </span>

                                                        }

                                                    </td>

                                                   <td className="title-column">


                                                        <Link

                                                            to={`/books/edit/${book.book_id}`}

                                                            className="btn btn-primary btn-sm me-2"

                                                        >

                                                            Edit

                                                        </Link>

                                                        <button

                                                            className="btn btn-danger btn-sm"

                                                            onClick={() => handleDelete(book.book_id)}

                                                        >

                                                            Delete

                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                            :

                                            <tr>

                                                <td
                                                    colSpan="9"
                                                    className="text-center"
                                                >

                                                    No Books Found

                                                </td>

                                            </tr>

                                    }

                                </tbody>

                            </table>

                        </div>

                }

            </div>

        </MainLayout>

    );

}

export default Books;