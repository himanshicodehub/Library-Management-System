import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import { createStudent } from "../../services/studentService";

function AddStudent() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({

        name: "",

        email: "",

        password: "",

        phone: "",

        department: "",

        semester: "",

        address: ""

    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setStudent({

            ...student,

            [name]: value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createStudent(student);

            Swal.fire({

                icon: "success",

                title: "Student Added Successfully"

            });

            navigate("/students");

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: error.response?.data?.detail || "Unable to Add Student"

            });

        }

    };

    return (

        <MainLayout>

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-success text-white">

                        <h3>Add Student</h3>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Name

                                    </label>

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

                                    <label className="form-label">

                                        Email

                                    </label>

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

                                    <label className="form-label">

                                        Password

                                    </label>

                                    <input

                                        type="password"

                                        className="form-control"

                                        name="password"

                                        value={student.password}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Phone

                                    </label>

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

                                    <label className="form-label">

                                        Department

                                    </label>

                                    <input

                                        type="text"

                                        className="form-control"

                                        name="department"

                                        value={student.department}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Semester

                                    </label>

                                    <select

                                        className="form-select"

                                        name="semester"

                                        value={student.semester}

                                        onChange={handleChange}

                                        required

                                    >

                                        <option value="">

                                            Select Semester

                                        </option>

                                        <option value="1">Semester 1</option>

                                        <option value="2">Semester 2</option>

                                        <option value="3">Semester 3</option>

                                        <option value="4">Semester 4</option>

                                        <option value="5">Semester 5</option>

                                        <option value="6">Semester 6</option>

                                        <option value="7">Semester 7</option>

                                        <option value="8">Semester 8</option>

                                    </select>

                                </div>

                                <div className="col-md-12 mb-3">

                                    <label className="form-label">

                                        Address

                                    </label>

                                    <textarea

                                        className="form-control"

                                        rows="3"

                                        name="address"

                                        value={student.address}

                                        onChange={handleChange}

                                        required

                                    ></textarea>

                                </div>

                            </div>

                            <button

                                type="submit"

                                className="btn btn-success me-2"

                            >

                                Save Student

                            </button>

                            <button

                                type="button"

                                className="btn btn-secondary"

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

export default AddStudent;