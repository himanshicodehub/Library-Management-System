import api from "../api/axios";

export const getAdminDashboard = async() => {

    const response = await api.get("/dashboard/admin");

    return response.data;

};

export const getLibrarianDashboard = async() => {

    const response = await api.get("/dashboard/librarian");

    return response.data;

};

export const getStudentDashboard = async(studentId) => {

    const response = await api.get(
        `/dashboard/student/${studentId}`
    );

    return response.data;

};