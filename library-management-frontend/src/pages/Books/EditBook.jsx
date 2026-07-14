import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import { getBook, updateBook } from "../../services/bookService";

function EditBook() {

    const { bookId } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({
        book_id: "",
        title: "",
        author: "",
        category: "",
        isbn: "",
        publisher: "",
        total_quantity: "",
        available_quantity: "",
    });

    useEffect(() => {
        loadBook();
    }, []);

    const loadBook = async () => {
        try {

            const response = await getBook(bookId);

            setBook(response.data);

        } catch (error) {

            console.log(error);

            Swal.fire(
                "Error",
                "Unable to load book",
                "error"
            );

        }
    };

    const handleChange = (e) => {

        setBook({
            ...book,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateBook(bookId, book);

            Swal.fire({
                icon: "success",
                title: "Book Updated Successfully"
            });

            navigate("/books");

        }

        catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Update Failed"
            });

        }

    };

    return (

        <MainLayout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>Edit Book</h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Book ID</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="book_id"
                                        value={book.book_id}
                                        readOnly
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Title</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={book.title}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Author</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="author"
                                        value={book.author}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Category</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="category"
                                        value={book.category}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>ISBN</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="isbn"
                                        value={book.isbn}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Publisher</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        name="publisher"
                                        value={book.publisher}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Total Quantity</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="total_quantity"
                                        value={book.total_quantity}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Available Quantity</label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="available_quantity"
                                        value={book.available_quantity}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="btn btn-success me-2"
                            >
                                Update Book
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/books")}
                            >
                                Cancel
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default EditBook;