import { Link } from "react-router-dom";

import {
    FaBook,
    FaUserGraduate,
    FaExchangeAlt,
    FaUserPlus
} from "react-icons/fa";

import "../../styles/Dashboard.css";

function QuickActions() {

    const actions = [

        {
            title: "Add Book",
            icon: <FaBook />,
            path: "/books/add",
            color: "#2563eb"
        },

        {
            title: "Add Student",
            icon: <FaUserGraduate />,
            path: "/students/add",
            color: "#10b981"
        },

        {
            title: "Issue Book",
            icon: <FaExchangeAlt />,
            path: "/issue-books/add",
            color: "#f59e0b"
        },

        {
            title: "Add User",
            icon: <FaUserPlus />,
            path: "/users/add",
            color: "#8b5cf6"
        }

    ];

    return (

        <div className="dashboard-box mt-4">

            <div className="box-header">

                <h4>

                    Quick Actions

                </h4>

            </div>

            <div className="row">

                {

                    actions.map((item,index)=>(

                        <div
                            className="col-lg-3 col-md-6 mb-3"
                            key={index}
                        >

                            <Link
                                to={item.path}
                                className="quick-action-card"
                            >

                                <div
                                    className="quick-icon"
                                    style={{
                                        background:item.color
                                    }}
                                >

                                    {item.icon}

                                </div>

                                <h6>

                                    {item.title}

                                </h6>

                            </Link>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default QuickActions;