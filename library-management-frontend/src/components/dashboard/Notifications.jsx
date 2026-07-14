import {
    FaBell,
    FaBook,
    FaUserGraduate,
    FaExchangeAlt,
    FaExclamationTriangle
} from "react-icons/fa";

import "../../styles/Dashboard.css";

function Notifications({ dashboard }) {

    const notifications = [

        {
            title: "Books Overdue",
            count: dashboard?.overdue_books || 0,
            icon: <FaExclamationTriangle />,
            color: "danger"
        },

        {
            title: "Pending Reservations",
            count: dashboard?.pending_reservations || 0,
            icon: <FaBook />,
            color: "warning"
        },

        {
            title: "New Students",
            count: dashboard?.new_students || 0,
            icon: <FaUserGraduate />,
            color: "success"
        },

        {
            title: "Books Issued Today",
            count: dashboard?.today_issue || 0,
            icon: <FaExchangeAlt />,
            color: "primary"
        }

    ];

    return (

        <div className="dashboard-box mt-4">

            <div className="box-header d-flex justify-content-between align-items-center">

                <h4>

                    <FaBell className="me-2"/>

                    Notifications

                </h4>

            </div>

            {

                notifications.map((item,index)=>(

                    <div
                        className={`notification-item border-start border-5 border-${item.color}`}
                        key={index}
                    >

                        <div className="notification-icon">

                            {item.icon}

                        </div>

                        <div className="notification-content">

                            <h6>

                                {item.title}

                            </h6>

                            <small>

                                {item.count} Record(s)

                            </small>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default Notifications;