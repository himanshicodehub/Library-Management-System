import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

import {
    getUsers,
    deleteUser,
    activateUser,
    deactivateUser,
    resetPassword
} from "../../services/userService";

import {
    FaUserPlus,
    FaEdit,
    FaTrash,
    FaCheckCircle,
    FaTimesCircle,
    FaKey,
    FaSearch
} from "react-icons/fa";

//import "../../styles/User.css";//

function Users() {

    const [users, setUsers] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadUsers();

    }, []);

    useEffect(() => {

        const result = users.filter((user) =>

            user.name.toLowerCase().includes(search.toLowerCase()) ||

            user.email.toLowerCase().includes(search.toLowerCase()) ||

            user.role.toLowerCase().includes(search.toLowerCase())

        );

        setFilteredUsers(result);

    }, [search, users]);

    const loadUsers = async () => {

        try {

            const response = await getUsers();

            setUsers(response);

            setFilteredUsers(response);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this user?")) return;

        await deleteUser(id);

        loadUsers();

    };

    const handleActivate = async (id) => {

        await activateUser(id);

        loadUsers();

    };

    const handleDeactivate = async (id) => {

        await deactivateUser(id);

        loadUsers();

    };

    const handleReset = async (id) => {

        if (!window.confirm("Reset Password?")) return;

        await resetPassword(id);

        alert("Password Reset Successfully");

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

                <div className="users-header">

                    <h2>

                        User Management

                    </h2>

                    <Link

                        to="/users/add"

                        className="btn btn-warning"

                    >

                        <FaUserPlus />

                        &nbsp;

                        Add User

                    </Link>

                </div>

                <div className="search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search User..."

                        value={search}

                        onChange={(e)=>

                            setSearch(e.target.value)

                        }

                    />

                </div>
                                <div className="table-responsive mt-4">

                    <table className="table table-hover align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th>#</th>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Phone</th>

                                <th>Role</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredUsers.length > 0 ?

                                    filteredUsers.map((user,index)=>(

                                        <tr key={user._id}>

                                            <td>

                                                {index+1}

                                            </td>

                                            <td>

                                                <div className="d-flex align-items-center">

                                                    <img

                                                        src={
                                                            user.profile_image ||

                                                            "https://ui-avatars.com/api/?name="+user.name
                                                        }

                                                        alt=""

                                                        className="user-avatar"

                                                    />

                                                    <div className="ms-3">

                                                        <strong>

                                                            {user.name}

                                                        </strong>

                                                    </div>

                                                </div>

                                            </td>

                                            <td>

                                                {user.email}

                                            </td>

                                            <td>

                                                {user.phone}

                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        `badge ${
                                                            user.role==="Admin"

                                                            ?

                                                            "bg-danger"

                                                            :

                                                            user.role==="Librarian"

                                                            ?

                                                            "bg-primary"

                                                            :

                                                            "bg-success"
                                                        }`
                                                    }
                                                >

                                                    {user.role}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    user.is_active ?

                                                    <span className="badge bg-success">

                                                        Active

                                                    </span>

                                                    :

                                                    <span className="badge bg-secondary">

                                                        Inactive

                                                    </span>

                                                }

                                            </td>

                                            <td>

                                                <div className="action-buttons">

                                                    <Link

                                                        to={`/users/edit/${user._id}`}

                                                        className="btn btn-sm btn-primary"

                                                    >

                                                        <FaEdit/>

                                                    </Link>

                                                    <button

                                                        className="btn btn-sm btn-danger"

                                                        onClick={()=>

                                                            handleDelete(user._id)

                                                        }

                                                    >

                                                        <FaTrash/>

                                                    </button>

                                                    {

                                                        user.is_active ?

                                                        <button

                                                            className="btn btn-sm btn-warning"

                                                            onClick={()=>

                                                                handleDeactivate(user._id)

                                                            }

                                                        >

                                                            <FaTimesCircle/>

                                                        </button>

                                                        :

                                                        <button

                                                            className="btn btn-sm btn-success"

                                                            onClick={()=>

                                                                handleActivate(user._id)

                                                            }

                                                        >

                                                            <FaCheckCircle/>

                                                        </button>

                                                    }

                                                    <button

                                                        className="btn btn-sm btn-dark"

                                                        onClick={()=>

                                                            handleReset(user._id)

                                                        }

                                                    >

                                                        <FaKey/>

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                    :

                                    <tr>

                                        <td

                                            colSpan="7"

                                            className="text-center py-5"

                                        >

                                            No Users Found

                                        </td>

                                    </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>

    );

}

export default Users;