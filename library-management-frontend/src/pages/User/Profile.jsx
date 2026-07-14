import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import { getProfile } from "../../services/userService";

import {
    FaUserCircle,
    FaPhone,
    FaEnvelope,
    FaBuilding,
    FaMapMarkerAlt,
    FaUserShield,
    FaEdit,
    FaKey
} from "react-icons/fa";

//import "../../styles/User.css";//

function Profile() {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const currentUser = JSON.parse(
                localStorage.getItem("user")
            );

            const response = await getProfile(
                currentUser.user_id
            );

            setUser(response);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <MainLayout>

                <div className="text-center mt-5">

                    <div className="spinner-border text-warning"></div>

                </div>

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="profile-card">

                    <div className="profile-header">

                        {

                            user.profile_image ?

                            <img

                                src={user.profile_image}

                                alt="Profile"

                                className="profile-image"

                            />

                            :

                            <FaUserCircle className="default-avatar"/>

                        }

                        <h2>

                            {user.name}

                        </h2>

                        <span className="badge bg-warning">

                            {user.role}

                        </span>

                    </div>

                    <div className="row mt-5">
                                                <div className="col-md-6 mb-4">

                            <div className="profile-info-box">

                                <FaEnvelope className="profile-icon" />

                                <div>

                                    <small>Email</small>

                                    <h6>{user.email}</h6>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="profile-info-box">

                                <FaPhone className="profile-icon" />

                                <div>

                                    <small>Phone</small>

                                    <h6>{user.phone}</h6>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="profile-info-box">

                                <FaBuilding className="profile-icon" />

                                <div>

                                    <small>Department</small>

                                    <h6>

                                        {user.department || "Not Available"}

                                    </h6>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-6 mb-4">

                            <div className="profile-info-box">

                                <FaUserShield className="profile-icon" />

                                <div>

                                    <small>Status</small>

                                    <h6>

                                        <span
                                            className={`badge ${
                                                user.status === "Active"
                                                    ? "bg-success"
                                                    : "bg-danger"
                                            }`}
                                        >
                                            {user.status}
                                        </span>

                                    </h6>

                                </div>

                            </div>

                        </div>

                        <div className="col-12 mb-4">

                            <div className="profile-info-box">

                                <FaMapMarkerAlt className="profile-icon" />

                                <div>

                                    <small>Address</small>

                                    <h6>

                                        {user.address || "Not Available"}

                                    </h6>

                                </div>

                            </div>

                        </div>

                    </div>

                    <hr />

                    <div className="d-flex justify-content-center gap-3 flex-wrap">

                        <Link
                            to={`/profile/edit/${user.user_id}`}
                            className="btn btn-warning"
                        >

                            <FaEdit />

                            &nbsp;

                            Edit Profile

                        </Link>

                        <Link
                            to="/change-password"
                            className="btn btn-dark"
                        >

                            <FaKey />

                            &nbsp;

                            Change Password

                        </Link>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Profile;