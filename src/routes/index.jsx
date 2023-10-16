import { Route, Routes } from "react-router-dom";
import { DashboardPage, ErrorPage, LoginPage, RegisterPage } from "../pages";
import { useState } from "react";


export default () => {

    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}