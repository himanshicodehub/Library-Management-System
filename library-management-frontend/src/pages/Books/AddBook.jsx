import { useState } from "react";
import { addBook } from "../../services/bookService";
import MainLayout from "../../layouts/MainLayout";
import Swal from "sweetalert2";

function AddBook() {

    const [book, setBook] = useState({
        book_id: "",
        title: "",
        author: "",
        category: "",
        isbn: "",
        publisher: "",
        total_quantity: "",
        available_quantity: "",
        image: ""
    });

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await addBook(book);

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Book Added Successfully"
            });

            setBook({
                book_id: "",
                title: "",
                author: "",
                category: "",
                isbn: "",
                publisher: "",
                total_quantity: "",
                available_quantity: "",
                image: ""
            });

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.detail || "Something went wrong"
            });

        }
    };

    return (
        <MainLayout>

            <div className="container">

                <h2 className="mb-4">Add Book</h2>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <label>Book ID</label>
                            <input
                                type="text"
                                name="book_id"
                                className="form-control"
                                value={book.book_id}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={book.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Author</label>
                            <input
                                type="text"
                                name="author"
                                className="form-control"
                                value={book.author}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Category</label>
                            <input
                                type="text"
                                name="category"
                                className="form-control"
                                value={book.category}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                className="form-control"
                                value={book.isbn}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Publisher</label>
                            <input
                                type="text"
                                name="publisher"
                                className="form-control"
                                value={book.publisher}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Total Quantity</label>
                            <input
                                type="number"
                                name="total_quantity"
                                className="form-control"
                                value={book.total_quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Available Quantity</label>
                            <input
                                type="number"
                                name="available_quantity"
                                className="form-control"
                                value={book.available_quantity}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <button className="btn btn-primary">
                        Add Book
                    </button>

                </form>

            </div>

        </MainLayout>
    );
}

export default AddBook;