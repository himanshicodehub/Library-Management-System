import api from "../api/axios";

export const getStudents = () => api.get("/students");

export const getStudent = (id) => api.get(`/students/${id}`);

export const createStudent = async(student) => {

    const response = await api.post("/students", student);

    return response.data;

};

export const updateStudent = (id, student) =>
    api.put(`/students/${id}`, student);

export const deleteStudent = (id) =>
    api.delete(`/students/${id}`);

export const searchStudent = (keyword) =>
    api.get(`/students/search/${keyword}`);
// =========================
// Student My Books
// =========================

export const getMyBooks = async(studentId) => {

    const response = await api.get(
        `/student/${studentId}/books`
    );

    return response.data;

};


// =========================
// Student Reservations
// =========================

export const getMyReservations = async(studentId) => {

    const response = await api.get(
        `/student/${studentId}/reservations`
    );

    return response.data;

};