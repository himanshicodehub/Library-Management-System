import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import {
    getUser,
    updateUser
} from "../../services/userService";


//import "../../styles/User.css";//

function EditUser() {

    const navigate = useNavigate();

    const { userId } = useParams();

    const {

        register,

        handleSubmit,

        reset,

        formState: {
            errors,
            isSubmitting
        }

    } = useForm({

        defaultValues: {

            name: "",

            phone: "",

            department: "",

            address: "",

            profile_image: ""

        }

    });

    useEffect(() => {

        loadUser();

    }, []);

    const loadUser = async () => {

        try {

            const response = await getUser(userId);

            reset({

                name: response.name,

                phone: response.phone,

                department: response.department,

                address: response.address,

                profile_image:
                    response.profile_image

            });

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Error",

                text: "Unable to load user."

            });

        }

    };

    const onSubmit = async (data) => {

        try {

            await updateUser(

                userId,

                data

            );

            Swal.fire({

                icon: "success",

                title: "Updated",

                text: "User Updated Successfully",

                timer: 1800,

                showConfirmButton: false

            });

            navigate("/users");

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Update Failed",

                text:
                    error.response?.data?.detail ||

                    "Something went wrong"

            });

        }

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="card shadow border-0">

                    <div className="card-header bg-primary text-white">

                        <h3>

                            Edit User

                        </h3>

                    </div>

                    <div className="card-body">

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >

                            <div className="row">

                                {/* Name */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Full Name

                                    </label>

                                    <input

                                        className="form-control"

                                        placeholder="Enter Name"

                                        {...register(

                                            "name",

                                            {

                                                required:

                                                    "Name is required"

                                            }

                                        )}

                                    />

                                    <small className="text-danger">

                                        {

                                            errors.name?.message

                                        }

                                    </small>

                                </div>

                                {/* Phone */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">

                                        Phone

                                    </label>

                                    <input

                                        className="form-control"

                                        placeholder="Phone"

                                        {...register(

                                            "phone",

                                            {

                                                required:

                                                    "Phone is required"

                                            }

                                        )}

                                    />

                                    <small className="text-danger">

                                        {

                                            errors.phone?.message

                                        }

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
                                        placeholder="Department"
                                        {...register("department")}
                                    />

                                </div>

                                {/* Profile Image */}

                                <div className="col-md-6 mb-3">

                                    <label className="form-label">
                                        Profile Image URL
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Profile Image URL"
                                        {...register("profile_image")}
                                    />

                                </div>

                                {/* Address */}

                                <div className="col-12 mb-3">

                                    <label className="form-label">
                                        Address
                                    </label>

                                    <textarea
                                        rows="4"
                                        className="form-control"
                                        placeholder="Enter Address"
                                        {...register("address")}
                                    ></textarea>

                                </div>

                            </div>

                            <hr />

                            <div className="d-flex justify-content-end gap-3">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => navigate("/users")}
                                >

                                    Cancel

                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >

                                    {

                                        isSubmitting

                                            ?

                                            "Updating..."

                                            :

                                            "Update User"

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

export default EditUser;