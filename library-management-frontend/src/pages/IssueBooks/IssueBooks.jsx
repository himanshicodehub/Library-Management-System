import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import {
    getIssuedBooks,
    deleteIssueBook,
    searchIssueBook,
    returnBook
} from "../../services/issueBookService";

function IssueBooks() {

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");

    const fetchIssues = async () => {

        try {

            const response = await getIssuedBooks();

            setIssues(response.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchIssues();

    }, []);

    // Search

    const handleSearch = async (e) => {

        const value = e.target.value;

        setKeyword(value);

        if (value.trim() === "") {

            fetchIssues();

            return;

        }

        try {

            const response = await searchIssueBook(value);

            setIssues(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    // Delete

    const handleDelete = async (issueId) => {

        const result = await Swal.fire({

            title: "Delete Issue?",

            icon: "warning",

            showCancelButton: true

        });

        if (!result.isConfirmed) return;

        await deleteIssueBook(issueId);

        Swal.fire(

            "Deleted",

            "",

            "success"

        );

        fetchIssues();

    };

    // Return Book

    const handleReturn = async (studentId, bookId) => {

        try {

            const response = await returnBook(

                studentId,

                bookId

            );

            Swal.fire({

                icon: "success",

                title: response.data.message,

                text: `Fine &#8377;${response.data.fine}`

            });

            fetchIssues();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: error.response.data.detail

            });

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between mb-3">

                    <h2>

                        Issue Books

                    </h2>

                    <Link
                        to="/issue-books/add"
                        className="btn btn-success"
                    >

                        + Issue Book

                    </Link>

                </div>

                <input

                    className="form-control mb-3"

                    placeholder="Search..."

                    value={keyword}

                    onChange={handleSearch}

                />

                {

                    loading ?

                        <div className="spinner-border"></div>

                        :

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>Issue ID</th>

                                    <th>Student</th>

                                    <th>Book</th>

                                    <th>Issue Date</th>

                                    <th>Due Date</th>

                                    <th>Status</th>

                                    <th>Fine</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    issues.map((issue) => (

                                        <tr key={issue._id}>

                                            <td>{issue.issue_id}</td>

                                            <td>{issue.student_id}</td>

                                            <td>{issue.book_id}</td>

                                            <td>{issue.issue_date}</td>

                                            <td>{issue.due_date}</td>

                                            <td>{issue.status}</td>

                                            <td>₹ {issue.fine}</td>

                                            <td>

                                                <Link

                                                    to={`/issue-books/edit/${issue.issue_id}`}

                                                    className="btn btn-primary btn-sm me-2"

                                                >

                                                    Edit

                                                </Link>

                                                {

                                                    issue.status === "Issued" &&

                                                    <button

                                                        className="btn btn-warning btn-sm me-2"

                                                        onClick={() =>

                                                            handleReturn(

                                                                issue.student_id,

                                                                issue.book_id

                                                            )

                                                        }

                                                    >

                                                        Return

                                                    </button>

                                                }

                                                <button

                                                    className="btn btn-danger btn-sm"

                                                    onClick={() =>

                                                        handleDelete(issue.issue_id)

                                                    }

                                                >

                                                    Delete

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                }

            </div>

        </MainLayout>

    );

}

export default IssueBooks;