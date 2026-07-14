import api from "../api/axios";

// Dashboard Summary
export const getDashboardReport = () =>
    api.get("/reports/dashboard");

// Book Report
export const getBookReport = () =>
    api.get("/reports/books");

// Student Report
export const getStudentReport = () =>
    api.get("/reports/students");

// Issue Report
export const getIssueReport = () =>
    api.get("/reports/issues");

// Return Report
export const getReturnReport = () =>
    api.get("/reports/returns");

// Fine Report
export const getFineReport = () =>
    api.get("/reports/fines");