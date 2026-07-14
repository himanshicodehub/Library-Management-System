import api from "../api/axios";

// Get all issued books
export const getIssuedBooks = () =>
    api.get("/issue-books");

// Get one issue record
export const getIssuedBook = (issueId) =>
    api.get(`/issue-books/record/${issueId}`);

// Issue a book
export const issueBook = (data) =>
    api.post("/issue-books", data);

// Update issue record
export const updateIssueBook = (issueId, data) =>
    api.put(`/issue-books/${issueId}`, data);

// Delete issue record
export const deleteIssueBook = (issueId) =>
    api.delete(`/issue-books/${issueId}`);

// Search issue records
export const searchIssueBook = (keyword) =>
    api.get(`/issue-books/search/${keyword}`);

// Return book
export const returnBook = (studentId, bookId) =>
    api.put(
        `/issue-books/return?student_id=${studentId}&book_id=${bookId}`
    );