import { useEffect,useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getStudentReport } from "../../services/reportService";

function StudentReport(){

const[students,setStudents]=useState([]);

useEffect(()=>{

loadStudents();

},[]);

const loadStudents=async()=>{

const response=await getStudentReport();

setStudents(response.data);

};

return(

<MainLayout>

<div className="container-fluid">

<h2 className="mb-4">

👨‍🎓 Student Report

</h2>

<div className="table-responsive">

<table className="table table-bordered table-hover">

<thead className="table-dark">

<tr>

<th>ID</th>

<th>Name</th>

<th>Email</th>

<th>Phone</th>

<th>Course</th>

<th>Year</th>

</tr>

</thead>

<tbody>

{

students.map(student=>(

<tr key={student._id}>

<td>{student.student_id}</td>

<td>{student.name}</td>

<td>{student.email}</td>

<td>{student.phone}</td>

<td>{student.course}</td>

<td>{student.year}</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

</MainLayout>

);

}

export default StudentReport;