import api from "../api/axios";


export const getIssuedBooks = () =>
    api.get("/issue-books");


export const getIssuedBook = (issueId) =>
    api.get(`/issue-books/record/${issueId}`);


export const issueBook = (data) =>
    api.post("/issue-books", data);


export const updateIssueBook = (issueId, data) =>
    api.put(`/issue-books/${issueId}`, data);


export const deleteIssueBook = (issueId) =>
    api.delete(`/issue-books/${issueId}`);


export const searchIssueBook = (keyword) =>
    api.get(`/issue-books/search/${keyword}`);


export const returnBook = (studentId, bookId) =>
    api.put(
        `/issue-books/return?student_id=${studentId}&book_id=${bookId}`
    );
