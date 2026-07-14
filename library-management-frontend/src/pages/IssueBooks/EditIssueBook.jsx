import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import {
    getIssuedBook,
    updateIssueBook
} from "../../services/issueBookService";

import { getBooks } from "../../services/bookService";
import { getStudents } from "../../services/studentService";

function EditIssueBook() {

    const { issueId } = useParams();

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

        loadIssue();
        loadBooks();
        loadStudents();

    }, []);

    const loadIssue = async () => {

        try {

            const response = await getIssuedBook(issueId);

            setIssue(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

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

            await updateIssueBook(issueId, issue);

            Swal.fire({

                icon: "success",

                title: "Issue Updated Successfully"

            });

            navigate("/issue-books");

        }

        catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: error.response?.data?.detail || "Unable to Update"

            });

        }

    };

    return (

        <MainLayout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>Edit Issue Book</h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

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

                                    {

                                        books.map(book => (

                                            <option

                                                key={book._id}

                                                value={book.book_id}

                                            >

                                                {book.book_id} - {book.title}

                                            </option>

                                        ))

                                    }

                                </select>

                            </div>

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

                                className="btn btn-primary me-2"

                                type="submit"

                            >

                                Update Issue

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

export default EditIssueBook;