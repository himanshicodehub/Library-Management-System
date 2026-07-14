import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import {
    getStudent,
    updateStudent
} from "../../services/studentService";

function EditStudent() {

    const { studentId } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({

        student_id: "",
        name: "",
        email: "",
        phone: "",
        course: "",
        year: "",
        address: ""

    });

    useEffect(() => {

        loadStudent();

    }, []);

    const loadStudent = async () => {

        try {

            const response = await getStudent(studentId);

            setStudent(response.data);

        }

        catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Unable to Load Student"

            });

        }

    };

    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateStudent(studentId, student);

            Swal.fire({

                icon: "success",

                title: "Student Updated Successfully"

            });

            navigate("/students");

        }

        catch (error) {

            console.log(error);

            Swal.fire({

                icon: "error",

                title: "Unable to Update Student"

            });

        }

    };

    return (

        <MainLayout>

            <div className="container">

                <div className="card shadow">

                    <div className="card-header bg-primary text-white">

                        <h3>Edit Student</h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label>Student ID</label>

                                    <input

                                        type="text"

                                        className="form-control"

                                        value={student.student_id}

                                        readOnly

                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Name</label>

                                    <input

                                        type="text"

                                        className="form-control"

                                        name="name"

                                        value={student.name}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Email</label>

                                    <input

                                        type="email"

                                        className="form-control"

                                        name="email"

                                        value={student.email}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Phone</label>

                                    <input

                                        type="text"

                                        className="form-control"

                                        name="phone"

                                        value={student.phone}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Course</label>

                                    <input

                                        type="text"

                                        className="form-control"

                                        name="course"

                                        value={student.course}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label>Year</label>

                                    <select

                                        className="form-select"

                                        name="year"

                                        value={student.year}

                                        onChange={handleChange}

                                        required

                                    >

                                        <option value="">Select Year</option>
                                        <option value="1">1st Year</option>
                                        <option value="2">2nd Year</option>
                                        <option value="3">3rd Year</option>
                                        <option value="4">4th Year</option>

                                    </select>

                                </div>

                                <div className="col-md-12 mb-3">

                                    <label>Address</label>

                                    <textarea

                                        className="form-control"

                                        rows="3"

                                        name="address"

                                        value={student.address}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                            </div>

                            <button
                                className="btn btn-primary me-2"
                                type="submit"
                            >
                                Update Student
                            </button>

                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() => navigate("/students")}
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

export default EditStudent;