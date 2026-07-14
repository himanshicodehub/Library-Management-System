import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { getBookReport } from "../../services/reportService";

function BookReport(){

    const [books,setBooks]=useState([]);

    useEffect(()=>{

        loadBooks();

    },[]);

    const loadBooks=async()=>{

        const response=await getBookReport();

        setBooks(response.data);

    };

    return(

        <MainLayout>

<div className="container-fluid">

<h2 className="mb-4">

📚 Book Report

</h2>

<div className="table-responsive">

<table className="table table-bordered table-hover">

<thead className="table-dark">

<tr>

<th>ID</th>

<th>Title</th>

<th>Author</th>

<th>Category</th>

<th>Publisher</th>

<th>Total</th>

<th>Available</th>

</tr>

</thead>

<tbody>

{

books.map(book=>(

<tr key={book._id}>

<td>{book.book_id}</td>

<td>{book.title}</td>

<td>{book.author}</td>

<td>{book.category}</td>

<td>{book.publisher}</td>

<td>{book.total_quantity}</td>

<td>{book.available_quantity}</td>

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

export default BookReport;