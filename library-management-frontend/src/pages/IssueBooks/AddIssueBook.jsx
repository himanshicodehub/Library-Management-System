import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import { issueBook } from "../../services/issueBookService";
import { getBooks } from "../../services/bookService";
import { getStudents } from "../../services/studentService";

function AddIssueBook() {

    const navigate = useNavigate();

    const [books, setBooks] = useState([]);
    const [students, setStudents] = useState([]);

    const [issue, setIssue] = useState({

        student_id: "",
        book_id: "",
        issue_date: "",
        due_date: ""

    });

    useEffect(() => {

        loadBooks();
        loadStudents();

    }, []);

    const loadBooks = async () => {

        try {

            const response = await getBooks();

            setBooks(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const loadStudents = async () => {

        try {

            const response = await getStudents();

            setStudents(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setIssue({

            ...issue,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await issueBook(issue);

            Swal.fire({

                icon: "success",

                title: "Book Issued Successfully"

            });

            navigate("/issue-books");

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: error.response?.data?.detail || "Unable to Issue Book"

            });

        }

    };

    return (

        <MainLayout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        <h3>Issue Book</h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            {/* Student */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Student

                                </label>

                                <select

                                    className="form-select"

                                    name="student_id"

                                    value={issue.student_id}

                                    onChange={handleChange}

                                    required

                                >

                                    <option value="">

                                        Select Student

                                    </option>

                                    {

                                        students.map(student => (

                                            <option

                                                key={student._id}

                                                value={student.student_id}

                                            >

                                                {student.student_id} - {student.name}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            {/* Book */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Book

                                </label>

                                <select

                                    className="form-select"

                                    name="book_id"

                                    value={issue.book_id}

                                    onChange={handleChange}

                                    required

                                >

                                    <option value="">

                                        Select Book

                                    </option>

                                    {

                                        books

                                        .filter(book => book.available_quantity > 0)

                                        .map(book => (

                                            <option

                                                key={book._id}

                                                value={book.book_id}

                                            >

                                                {book.book_id} - {book.title}

                                                ({book.available_quantity})

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

                            {/* Issue Date */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Issue Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="issue_date"

                                    value={issue.issue_date}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            {/* Due Date */}

                            <div className="mb-3">

                                <label className="form-label">

                                    Due Date

                                </label>

                                <input

                                    type="date"

                                    className="form-control"

                                    name="due_date"

                                    value={issue.due_date}

                                    onChange={handleChange}

                                    required

                                />

                            </div>

                            <button

                                className="btn btn-success me-2"

                                type="submit"

                            >

                                Issue Book

                            </button>

                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={() => navigate("/issue-books")}

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

export default AddIssueBook;