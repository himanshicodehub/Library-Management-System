import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import {
    FaMoon,
    FaSun,
    FaBell,
    FaLanguage,
    FaSave,
    FaUndo
} from "react-icons/fa";

function Settings() {

    const [settings, setSettings] = useState({

        darkMode: false,

        notifications: true,

        language: "English"

    });

    const handleChange = (e) => {

        const { name, type, checked, value } = e.target;

        setSettings({

            ...settings,

            [name]: type === "checkbox" ? checked : value

        });

    };

    const saveSettings = () => {

        alert("Settings Saved Successfully");

    };

    const resetSettings = () => {

        setSettings({

            darkMode: false,

            notifications: true,

            language: "English"

        });

    };

    return (

        <MainLayout>

            <div className="container-fluid">

                <div className="card shadow border-0 rounded-4">

                    <div className="card-header bg-warning text-dark">

                        <h3>

                            Library Settings

                        </h3>

                    </div>

                    <div className="card-body">
                                            <div className="row">

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-bold">

                                    Theme

                                </label>

                                <div className="form-check form-switch">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="darkMode"
                                        checked={settings.darkMode}
                                        onChange={handleChange}
                                    />

                                    <label className="form-check-label">

                                        {
                                            settings.darkMode ?

                                            <>

                                                <FaMoon className="me-2"/>

                                                Dark Mode

                                            </>

                                            :

                                            <>

                                                <FaSun className="me-2"/>

                                                Light Mode

                                            </>

                                        }

                                    </label>

                                </div>

                            </div>

                            <div className="col-md-6 mb-4">

                                <label className="form-label fw-bold">

                                    Notifications

                                </label>

                                <div className="form-check form-switch">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="notifications"
                                        checked={settings.notifications}
                                        onChange={handleChange}
                                    />

                                    <label className="form-check-label">

                                        <FaBell className="me-2"/>

                                        Enable Notifications

                                    </label>

                                </div>

                            </div>

                        </div>

                        <div className="mb-4">

                            <label className="form-label fw-bold">

                                Language

                            </label>

                            <div className="input-group">

                                <span className="input-group-text">

                                    <FaLanguage/>

                                </span>

                                <select
                                    className="form-select"
                                    name="language"
                                    value={settings.language}
                                    onChange={handleChange}
                                >

                                    <option value="English">

                                        English

                                    </option>

                                    <option value="Hindi">

                                        Hindi

                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="d-flex gap-3">

                            <button
                                className="btn btn-warning"
                                onClick={saveSettings}
                            >

                                <FaSave className="me-2"/>

                                Save Settings

                            </button>

                            <button
                                className="btn btn-secondary"
                                onClick={resetSettings}
                            >

                                <FaUndo className="me-2"/>

                                Reset

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </MainLayout>

    );

}

export default Settings;