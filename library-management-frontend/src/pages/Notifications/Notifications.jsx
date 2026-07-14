import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import MainLayout from "../../layouts/MainLayout";

import {

    getNotifications,

    getStudentNotifications,

    markAsRead,

    deleteNotification

} from "../../services/notificationService";

import {

    FaBell,

    FaCheckCircle,

    FaTrash

} from "react-icons/fa";

function Notifications() {

    const [notifications, setNotifications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadNotifications();

    }, []);

    const loadNotifications = async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            let data = [];

            if (user?.role === "Student") {

                data = await getStudentNotifications(
                    user.student_id
                );

            }

            else {

                data = await getNotifications();

            }

            setNotifications(data);

        }

        catch (error) {

            console.error(error);

            Swal.fire({

                icon: "error",

                title: "Unable to load notifications"

            });

        }

        finally {

            setLoading(false);

        }

    };

    const handleRead = async (id) => {

        try {

            await markAsRead(id);

            loadNotifications();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Unable to mark notification"

            });

        }

    };

    const handleDelete = async (id) => {

        const result = await Swal.fire({

            title: "Delete Notification?",

            icon: "warning",

            showCancelButton: true,

            confirmButtonText: "Delete"

        });

        if (!result.isConfirmed) return;

        try {

            await deleteNotification(id);

            Swal.fire({

                icon: "success",

                title: "Deleted"

            });

            loadNotifications();

        }

        catch (error) {

            Swal.fire({

                icon: "error",

                title: "Unable to delete notification"

            });

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

                <div className="card shadow border-0">

                    <div className="card-header bg-warning">

                        <h3>

                            🔔 Notifications

                        </h3>

                    </div>

                    <div className="card-body">

                        {

                            notifications.length === 0 ?

                            (

                                <div className="text-center py-5">

                                    <FaBell

                                        size={60}

                                        className="text-secondary mb-3"

                                    />

                                    <h5>

                                        No Notifications Available

                                    </h5>

                                </div>

                            )

                            :

                            notifications.map((notification) => (

                                <div

                                    key={notification._id}

                                    className="card mb-3 shadow-sm border-0"

                                >

                                    <div className="card-body d-flex justify-content-between align-items-center">

                                        <div>

                                            <h5>

                                                {notification.title}

                                            </h5>

                                            <p className="text-muted mb-1">

                                                {notification.message}

                                            </p>

                                            <small>

                                                {notification.created_at}

                                            </small>

                                        </div>

                                        <div className="d-flex gap-2">

                                            {

                                                notification.is_read ?

                                                (

                                                    <span className="badge bg-success">

                                                        Read

                                                    </span>

                                                )

                                                :

                                                (

                                                    <button

                                                        className="btn btn-warning"

                                                        onClick={() =>

                                                            handleRead(

                                                                notification._id

                                                            )

                                                        }

                                                    >

                                                        <FaCheckCircle className="me-2" />

                                                        Mark Read

                                                    </button>

                                                )

                                            }

                                            <button

                                                className="btn btn-danger"

                                                onClick={() =>

                                                    handleDelete(

                                                        notification._id

                                                    )

                                                }

                                            >

                                                <FaTrash />

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Notifications;