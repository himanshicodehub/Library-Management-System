import { FaUserGraduate } from "react-icons/fa";

import "../../styles/Dashboard.css";

function RecentStudents({ students = [] }) {

    return (

        <div className="dashboard-box mt-4">

            <div className="box-header">

                <h4>

                    Recent Students

                </h4>

            </div>

            <table className="table align-middle">

                <thead>

                    <tr>

                        <th>Student</th>

                        <th>ID</th>

                        <th>Email</th>

                        <th>Phone</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        students.length > 0 ?

                        students.map((student)=>(

                            <tr key={student.student_id}>

                                <td>

                                    <div className="d-flex align-items-center">

                                        <div className="student-icon">

                                            <FaUserGraduate/>

                                        </div>

                                        <div className="ms-3">

                                            <strong>

                                                {student.name}

                                            </strong>

                                        </div>

                                    </div>

                                </td>

                                <td>

                                    {student.student_id}

                                </td>

                                <td>

                                    {student.email}

                                </td>

                                <td>

                                    {student.phone}

                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td
                                colSpan="4"
                                className="text-center py-4"
                            >

                                No Students Found

                            </td>

                        </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default RecentStudents;