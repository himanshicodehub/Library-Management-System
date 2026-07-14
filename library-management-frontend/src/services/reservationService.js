import api from "../api/axios";



export const getReservations = async() => {

    const response = await api.get(
        "/reservations"
    );

    return response.data;

};




export const getReservation = async(
    reservationId
) => {

    const response = await api.get(
        `/reservations/${reservationId}`
    );

    return response.data;

};



export const createReservation = async(
    data
) => {

    const response = await api.post(
        "/reservations",
        data
    );

    return response.data;

};




export const updateReservation = async(
    reservationId,
    data
) => {

    const response = await api.put(
        `/reservations/${reservationId}`,
        data
    );

    return response.data;

};




export const deleteReservation = async(
    reservationId
) => {

    const response = await api.delete(
        `/reservations/${reservationId}`
    );

    return response.data;

};


export const searchReservation = async(
    keyword
) => {

    const response = await api.get(
        `/reservations/search/${keyword}`
    );

    return response.data;

};



export const getStudentReservations = async(
    studentId
) => {

    const response = await api.get(
        `/student/${studentId}/reservations`
    );

    return response.data;

};
