import { Link } from "react-router-dom";
import {
    FaBook,
    FaUserGraduate,
    FaUsers,
    FaExchangeAlt,
    FaChartBar,
    FaBell
} from "react-icons/fa";

function AdminQuickAction() {

    const actions = [

        {
            title: "Add Book",
            icon: <FaBook />,
            color: "primary",
            link: "/books/add"
        },

        {
            title: "Add Student",
            icon: <FaUserGraduate />,
            color: "success",
            link: "/students/add"
        },

        {
            title: "Users",
            icon: <FaUsers />,
            color: "info",
            link: "/users"
        },

        {
            title: "Issue Book",
            icon: <FaExchangeAlt />,
            color: "warning",
            link: "/issue-books/add"
        },

        {
            title: "Reports",
            icon: <FaChartBar />,
            color: "secondary",
            link: "/reports"
        },

        {
            title: "Notifications",
            icon: <FaBell />,
            color: "danger",
            link: "/notifications"
        }

    ];

    return (
        <div className="row mt-4">

            {

                actions.map((action,index)=>(

                    <div
                        className="col-lg-2 col-md-4 col-6 mb-3"
                        key={index}
                    >

                        <Link
                            to={action.link}
                            className="btn btn-light shadow w-100 h-100 p-3"
                        >

                            <div className={`text-${action.color} mb-2`}>

                                {action.icon}

                            </div>

                            {action.title}

                        </Link>

                    </div>

                ))

            }

        </div>
    );

}

export default AdminQuickAction;