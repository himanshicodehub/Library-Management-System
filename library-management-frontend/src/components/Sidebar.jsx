import {
    FaHome,
    FaBook,
    FaUsers,
    FaExchangeAlt,
    FaChartBar,
    FaUserCog,
    FaUserCircle,
    FaCog,
    FaSignOutAlt,
    FaClipboardList,
    FaBookmark
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "../styles/Sidebar.css";

function Sidebar({ isOpen }) {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>

            <div className="sidebar-logo">

                <FaBook />

                <span>LMS</span>

            </div>

            <ul className="sidebar-menu">

                {/* Dashboard */}

                <li>

                    <NavLink to="/">

                        <FaHome />

                        <span>Dashboard</span>

                    </NavLink>

                </li>

                {/* Admin & Librarian */}

                {(user?.role === "Admin" ||
                    user?.role === "Librarian") && (

                    <>

                        <li>

                            <NavLink to="/books">

                                <FaBook />

                                <span>Books</span>

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/students">

                                <FaUsers />

                                <span>Students</span>

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/issue-books">

                                <FaExchangeAlt />

                                <span>Issue Books</span>

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/reservations">

                                <FaBookmark />

                                <span>Reservations</span>

                            </NavLink>

                        </li>

                    </>

                )}

                {/* Admin Only */}

                {user?.role === "Admin" && (

                    <>

                        <li>

                            <NavLink to="/users">

                                <FaUserCog />

                                <span>Users</span>

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/reports">

                                <FaChartBar />

                                <span>Reports</span>

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/settings">

                                <FaCog />

                                <span>Settings</span>

                            </NavLink>

                        </li>

                    </>

                )}

                {/* Student */}

                {user?.role === "Student" && (

                    <>

                        <li>

                            <NavLink to="/reserve-book">

                                <FaBookmark />

                                <span>Reserve Book</span>

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/my-books">

                                <FaClipboardList />

                                <span>My Books</span>

                            </NavLink>

                        </li>

                        <li>

                            <NavLink to="/my-reservations">

                                <FaBook />

                                <span>My Reservations</span>

                            </NavLink>

                        </li>

                    </>

                )}

                {/* Profile */}

                <li>

                    <NavLink to="/profile">

                        <FaUserCircle />

                        <span>Profile</span>

                    </NavLink>

                </li>

                {/* Logout */}

                <li>

                    <button
                        className="logout-button"
                        onClick={logout}
                    >

                        <FaSignOutAlt />

                        <span>Logout</span>

                    </button>

                </li>

            </ul>

        </aside>

    );

}

export default Sidebar;