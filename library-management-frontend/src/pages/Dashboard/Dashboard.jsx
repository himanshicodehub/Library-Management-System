import AdminDashboard from "./AdminDashboard";
import LibrarianDashboard from "./LibrarianDashboard";
import StudentDashboard from "./StudentDashboard";

function Dashboard() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    if (!user) {

        return <h3>Login First</h3>;

    }

    switch (user.role) {

        case "Admin":

            return <AdminDashboard />;

        case "Librarian":

            return <LibrarianDashboard />;

        case "Student":

            return <StudentDashboard />;

        default:

            return <h3>Invalid User</h3>;

    }

}

export default Dashboard;