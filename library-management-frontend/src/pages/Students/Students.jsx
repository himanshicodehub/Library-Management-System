import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import {
    getStudents,
    deleteStudent,
    searchStudent
} from "../../services/studentService";

function Students() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");

    // ==========================
    // Fetch Students
    // ==========================

    const fetchStudents = async () => {

        try {

            const response = await getStudents();

            setStudents(response.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchStudents();

    }, []);

    // ==========================
    // Search Student
    // ==========================

    const handleSearch = async (e) => {

        const value = e.target.value;

        setKeyword(value);

        if (value.trim() === "") {

            fetchStudents();

            return;

        }

        try {

            const response = await searchStudent(value);

            setStudents(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    // ==========================
    // Delete Student
    // ==========================

    const handleDelete = async (studentId) => {

        const result = await Swal.fire({

            title: "Delete Student?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete",

            confirmButtonColor: "#d33",

            cancelButtonColor: "#3085d6"

        });

        if (!result.isConfirmed) return;

        try {

            await deleteStudent(studentId);

            Swal.fire({

                icon: "success",

                title: "Student Deleted Successfully"

            });

            fetchStudents();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Unable to Delete Student"

            });

            console.log(error);

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>Students</h2>

                    <Link
                        to="/students/add"
                        className="btn btn-success"
                    >
                        + Add Student
                    </Link>

                </div>

                <div className="mb-3">

                    <input

                        type="text"

                        className="form-control"

                        placeholder="Search Student..."

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

                       <table className="table table-hover align-middle">

                            <thead className="table-dark">

                                <tr>

                                    <th>Student ID</th>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Phone</th>

                                    <th>Course</th>

                                    <th>Year</th>

                                    <th>Address</th>

                                    <th width="180">Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    students.length > 0 ?

                                        students.map((student) => (

                                            <tr key={student._id}>

                                               <td className="course-column">
                                                {student.student_id}</td>

                                                <td className="course-column">
                                                    {student.name}</td>

                                                <td className="course-column">
                                                    {student.email}</td>

                                                <td className="course-column">
                                                    {student.phone}</td>

                                              <td className="course-column">
                                                    {student.course}</td>

                                                <td className="course-column">
                                                    {student.year}</td>

                                                <td className="course-column">
                                                    {student.address}</td>

                                             <td className="course-column">

                                                    <Link

                                                        to={`/students/edit/${student.student_id}`}

                                                        className="btn btn-primary btn-sm me-2"

                                                    >
                                                        Edit
                                                    </Link>

                                                    <button

                                                        className="btn btn-danger btn-sm"

                                                        onClick={() => handleDelete(student.student_id)}

                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                        :

                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="text-center"
                                            >

                                                No Students Found

                                            </td>

                                        </tr>

                                }

                            </tbody>

                        </table>

                }

            </div>

        </MainLayout>

    );

}

export default Students;