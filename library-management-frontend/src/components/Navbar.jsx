import { useState, useEffect, useRef } from "react";
import {
    FaBars,
    FaBell,
    FaUserCircle,
    FaCog,
    FaSignOutAlt,
    FaUser,
    FaMoon,
    FaSun
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar({ toggleSidebar }) {

    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        const closeMenu = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }

        };

        document.addEventListener("mousedown", closeMenu);

        return () => {

            document.removeEventListener(
                "mousedown",
                closeMenu
            );

        };

    }, []);

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

    };

    return (

        <nav className="navbar-container">

            <div className="navbar-left">

                <button
                    className="menu-btn"
                    onClick={toggleSidebar}
                >

                    <FaBars />

                </button>

                <h4>

                    Library Management System

                </h4>

            </div>

            <div className="navbar-right">

                <button
                    className="icon-btn"
                    onClick={() =>
                        setDarkMode(!darkMode)
                    }
                >

                    {

                        darkMode ?

                        <FaSun />

                        :

                        <FaMoon />

                    }

                </button>

               <button
                     className="icon-btn notification"
                    onClick={() => navigate("/notifications")}
                    >

                    <FaBell />

                    <span className="badge">
                         0
                     </span>

                </button>

                <div
                    className="profile-area"
                    ref={dropdownRef}
                >

                    <button
                        className="profile-btn"
                        onClick={() =>
                            setDropdownOpen(
                                !dropdownOpen
                            )
                        }
                    >

                        <FaUserCircle />

                        <div className="profile-info">

                            <span>

                                {user?.name}

                            </span>

                            <small>

                                {user?.role}

                            </small>

                        </div>

                    </button>
                                        {

                        dropdownOpen && (

                            <div className="profile-dropdown">

                                <button
                                    onClick={() =>
                                        navigate("/profile")
                                    }
                                >

                                    <FaUser />

                                    My Profile

                                </button>

                                <button
                                    onClick={() =>
                                        navigate("/change-password")
                                    }
                                >

                                    <FaCog />

                                    Change Password

                                </button>

                                <hr />

                                <button
                                    className="logout-btn"
                                    onClick={logout}
                                >

                                    <FaSignOutAlt />

                                    Logout

                                </button>

                            </div>

                        )

                    }

                </div>

            </div>

        </nav>

    );

}

export default Navbar;