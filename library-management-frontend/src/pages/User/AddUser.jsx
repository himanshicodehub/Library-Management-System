import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";
import { createUser } from "../../services/userService";

//import "../styles/User.css";//

function AddUser() {

    const navigate = useNavigate();

    const {

        register,
        handleSubmit,
        reset,

        formState: { errors, isSubmitting }

    } = useForm({

        defaultValues: {

            user_id: "",
            name: "",
            email: "",
            password: "",
            phone: "",
            role: "Student",
            department: "",
            address: "",
            profile_image: "",
            status: "Active"

        }

    });

    const onSubmit = async (data) => {

        try {

            await createUser(data);

            Swal.fire({

                icon: "success",

                title: "Success",

                text: "User Created Successfully",

                timer: 1800,

                showConfirmButton: false

            });

            reset();

            navigate("/users");

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Error",

                text:
                    error.response?.data?.detail ||
                    "Unable to create user"

            });

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="card shadow border-0">

                    <div className="card-header bg-warning">

                        <h3 className="mb-0 text-white">

                            Add New User

                        </h3>

                    </div>

                    <div className="card-body">

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >

                            <div className="row">
                                {/* User ID */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    User ID

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    placeholder="Enter User ID"

                                    {...register("user_id", {

                                         required: "User ID is required"

                                    })}

                                />

                                <small className="text-danger">

                                    {errors.user_id?.message}

                                </small>

                            </div>

                            {/* Name */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Full Name

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    placeholder="Enter Full Name"

                                    {...register("name", {

                                        required: "Name is required"

                                    })}

                                />

                                <small className="text-danger">

                                     {errors.name?.message}

                                </small>

                            </div>

                            {/* Email */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Email

                                </label>

                                <input

                                    type="email"

                                    className="form-control"

                                    placeholder="Enter Email"

                                    {...register("email", {

                                        required: "Email is required"

                                    })}

                                />

                                <small className="text-danger">

                                    {errors.email?.message}

                                </small>

                            </div>

                            {/* Phone */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Phone Number

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    placeholder="Enter Phone Number"

                                    {...register("phone", {

                                        required: "Phone Number is required",

                                            minLength: {

                                                value: 10,

                                                message: "Phone number must be 10 digits"

                                            }

                                    })}

                                />

                                <small className="text-danger">

                                    {errors.phone?.message}

                                </small>

                            </div>

                            {/* Password */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Password

                                </label>

                                <input

                                    type="password"

                                    className="form-control"

                                    placeholder="Enter Password"

                                    {...register("password", {

                                        required: "Password is required",

                                        minLength: {

                                            value: 6,

                                            message: "Minimum 6 characters"

                                        }

                                    })}

                                />

                                <small className="text-danger">

                                    {errors.password?.message}

                                </small>

                            </div>
                            {/* Department */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Department

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    placeholder="Enter Department"

                                    {...register("department")}

                                />

                            </div>

                            {/* Role */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Role

                                </label>

                                <select

                                    className="form-select"

                                    {...register("role")}

                                >

                                    <option value="Admin">

                                        Admin

                                    </option>

                                    <option value="Librarian">

                                        Librarian

                                    </option>

                                    <option value="Student">

                                        Student

                                    </option>

                                </select>

                            </div>

                            {/* Address */}

                            <div className="col-12 mb-3">

                                <label className="form-label">

                                    Address

                                </label>

                                <textarea

                                    rows="3"

                                    className="form-control"

                                    placeholder="Enter Address"

                                    {...register("address")}

                                ></textarea>

                            </div>

                            {/* Profile Image */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Profile Image URL

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    placeholder="Paste Image URL"

                                    {...register("profile_image")}

                                />

                            </div>

                            {/* Status */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Status

                                </label>

                                <select

                                    className="form-select"

                                    {...register("status")}

                                >

                                    <option value="Active">

                                        Active

                                    </option>

                                    <option value="Inactive">

                                        Inactive

                                    </option>

                                </select>

                            </div>

                        </div>

                        <hr />

                        <div className="d-flex justify-content-end gap-3">

                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={() => reset()}

                            >

                                Reset

                            </button>

                            <button

                                type="submit"

                                className="btn btn-warning"

                                disabled={isSubmitting}

                            >

                                {

                                    isSubmitting

                                        ?

                                        "Saving..."

                                        :

                                        "Save User"

                                }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default AddUser;