import api from "../api/axios";

// Get all books
export const getBooks = () => api.get("/books");

// Get one book
export const getBook = (bookId) => api.get(`/books/${bookId}`);

// Add book
export const addBook = (data) => api.post("/books", data);

// Update book
export const updateBook = (bookId, data) =>
    api.put(`/books/${bookId}`, data);

// Delete book
export const deleteBook = (bookId) =>
    api.delete(`/books/${bookId}`);


export const searchBook = (keyword) => {
    return api.get(`/books/search/${keyword}`);
};