import api from "../api/axios";

// =====================================
// Admin & Librarian - All Notifications
// =====================================

export const getNotifications = async() => {

    const response = await api.get(
        "/notifications"
    );

    return response.data;

};


// =====================================
// Student Notifications
// =====================================

export const getStudentNotifications = async(
    studentId
) => {

    const response = await api.get(
        `/notifications/student/${studentId}`
    );

    return response.data;

};


// =====================================
// Get Single Notification
// =====================================

export const getNotification = async(
    notificationId
) => {

    const response = await api.get(
        `/notifications/${notificationId}`
    );

    return response.data;

};


// =====================================
// Mark As Read
// =====================================

export const markAsRead = async(
    notificationId
) => {

    const response = await api.put(
        `/notifications/${notificationId}/read`
    );

    return response.data;

};


// =====================================
// Delete Notification
// =====================================

export const deleteNotification = async(
    notificationId
) => {

    const response = await api.delete(
        `/notifications/${notificationId}`
    );

    return response.data;

};