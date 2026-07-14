import { FaBook } from "react-icons/fa";
import "../../styles/Dashboard.css";

function RecentBooks({ books = [] }) {

    return (

        <div className="dashboard-box mt-4">

            <div className="box-header">

                <h4>Recent Books</h4>

            </div>

            <table className="table align-middle">

                <thead>

                    <tr>

                        <th>Book</th>

                        <th>Author</th>

                        <th>Category</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        books.length > 0 ?

                        books.map((book) => (

                            <tr key={book.book_id}>

                                <td>

                                    <div className="d-flex align-items-center">

                                        <div className="book-icon">

                                            <FaBook />

                                        </div>

                                        <div className="ms-3">

                                            <strong>

                                                {book.book_name}

                                            </strong>

                                        </div>

                                    </div>

                                </td>

                                <td>{book.author}</td>

                                <td>{book.category}</td>

                                <td>

                                    {

                                        book.available_quantity > 0 ?

                                        <span className="badge bg-success">

                                            Available

                                        </span>

                                        :

                                        <span className="badge bg-danger">

                                            Out of Stock

                                        </span>

                                    }

                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td colSpan="4" className="text-center py-4">

                                No Books Found

                            </td>

                        </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default RecentBooks;