import api from "../api/axios";

/
export const getNotifications = async() => {

    const response = await api.get(
        "/notifications"
    );

    return response.data;

};




export const getStudentNotifications = async(
    studentId
) => {

    const response = await api.get(
        `/notifications/student/${studentId}`
    );

    return response.data;

};




export const getNotification = async(
    notificationId
) => {

    const response = await api.get(
        `/notifications/${notificationId}`
    );

    return response.data;

};




export const markAsRead = async(
    notificationId
) => {

    const response = await api.put(
        `/notifications/${notificationId}/read`
    );

    return response.data;

};



export const deleteNotification = async(
    notificationId
) => {

    const response = await api.delete(
        `/notifications/${notificationId}`
    );

    return response.data;

};
