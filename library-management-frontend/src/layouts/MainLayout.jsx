import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/MainLayout.css";

function MainLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (

        <div className="layout">

            <Sidebar isOpen={sidebarOpen} />

            <div
                className={
                    sidebarOpen
                        ? "main-content"
                        : "main-content expanded"
                }
            >

                <Navbar
                    toggleSidebar={toggleSidebar}
                />

                <main className="page-content">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default MainLayout;