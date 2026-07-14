import api from "../api/axios";

/* ===========================
   Authentication
=========================== */

export const loginUser = async(data) => {
    const response = await api.post("/users/login", data);
    return response.data;
};

/* ===========================
   Users
=========================== */

export const createUser = async(data) => {
    const response = await api.post("/users", data);
    return response.data;
};

export const getUsers = async() => {
    const response = await api.get("/users");
    return response.data;
};

export const getUser = async(userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

export const getUsersByRole = async(role) => {
    const response = await api.get(`/users/role/${role}`);
    return response.data;
};

/* ===========================
   Admin Edit User
=========================== */

export const updateUser = async(userId, data) => {
    const response = await api.put(
        `/users/${userId}`,
        data
    );

    return response.data;
};

/* ===========================
   Profile
=========================== */

export const getProfile = async(userId) => {
    const response = await api.get(
        `/users/profile/${userId}`
    );

    return response.data;
};

export const updateProfile = async(
    userId,
    data
) => {

    const response = await api.put(
        `/users/profile/${userId}`,
        data
    );

    return response.data;

};

/* ===========================
   Password
=========================== */

export const changePassword = async(
    userId,
    data
) => {

    const response = await api.put(
        `/users/change-password/${userId}`,
        data
    );

    return response.data;

};

export const resetPassword = async(
    userId
) => {

    const response = await api.put(
        `/users/${userId}/reset-password`
    );

    return response.data;

};

/* ===========================
   Status
=========================== */

export const activateUser = async(
    userId
) => {

    const response = await api.put(
        `/users/${userId}/activate`
    );

    return response.data;

};

export const deactivateUser = async(
    userId
) => {

    const response = await api.put(
        `/users/${userId}/deactivate`
    );

    return response.data;

};

export const deleteUser = async(
    userId
) => {

    const response = await api.delete(
        `/users/${userId}`
    );

    return response.data;

};