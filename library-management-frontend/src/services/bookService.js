import api from "../api/axios";


export const getBooks = () => api.get("/books");


export const getBook = (bookId) => api.get(`/books/${bookId}`);


export const addBook = (data) => api.post("/books", data);


export const updateBook = (bookId, data) =>
    api.put(`/books/${bookId}`, data);


export const deleteBook = (bookId) =>
    api.delete(`/books/${bookId}`);


export const searchBook = (keyword) => {
    return api.get(`/books/search/${keyword}`);
};
