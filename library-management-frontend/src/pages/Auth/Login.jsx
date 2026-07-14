import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

import { loginUser } from "../../services/userService";
import "../../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    
    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {

            navigate("/");

        }

    }, [navigate]);

    

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

   

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (

            formData.email.trim() === "" ||

            formData.password.trim() === ""

        ) {

            Swal.fire({

                icon: "warning",

                title: "Missing Fields",

                text: "Please enter Email and Password."

            });

            return;

        }

        setLoading(true);

        try {

            const response = await loginUser(formData);

            if (

                !response ||

                !response.access_token ||

                !response.user

            ) {

                throw new Error("Invalid Login Response");

            }

            

            localStorage.setItem(

                "token",

                response.access_token

            );

            localStorage.setItem(

                "user",

                JSON.stringify(response.user)

            );

            Swal.fire({

                icon: "success",

                title: "Login Successful",

                timer: 1200,

                showConfirmButton: false

            });

            navigate("/");

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Login Failed",

                text:

                    error.response?.data?.detail ||

                    "Invalid Email or Password"

            });

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="login-left">

                <div>

                    <FaBookOpen className="library-icon" />

                    <h1>

                        Library Management System

                    </h1>

                    <p>

                        Manage books, students, librarians,

                        reservations, reports and all

                        library activities efficiently.

                    </p>

                </div>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <h2>

                        Welcome Back

                    </h2>

                    <p>

                        Login to continue

                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>

                                Email

                            </label>

                            <input

                                type="email"

                                className="form-control"

                                placeholder="Enter Email"

                                name="email"

                                value={formData.email}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="mb-4">

                            <label>

                                Password

                            </label>

                            <div className="input-group">

                                <input

                                    type={

                                        showPassword

                                            ? "text"

                                            : "password"

                                    }

                                    className="form-control"

                                    placeholder="Enter Password"

                                    name="password"

                                    value={formData.password}

                                    onChange={handleChange}

                                    required

                                />

                                <button

                                    type="button"

                                    className="btn btn-outline-secondary"

                                    onClick={() =>

                                        setShowPassword(

                                            !showPassword

                                        )

                                    }

                                >

                                    {

                                        showPassword

                                            ?

                                            <FaEyeSlash />

                                            :

                                            <FaEye />

                                    }

                                </button>

                            </div>

                        </div>

                        <button

                            className="btn btn-warning w-100"

                            disabled={loading}

                        >

                            {

                                loading

                                    ?

                                    "Signing In..."

                                    :

                                    "Login"

                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Login;
