import { Route, Routes } from "react-router-dom";
import { DashboardPage, ErrorPage, LoginPage, RegisterPage } from "../pages";
import { PrivateRoutes } from './PrivateRoutes/index';
import { PublicRoutes } from './PublicRoutes/index';


export default () => {

    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="/dashboard" element={<PrivateRoutes />} >
                <Route index element={<DashboardPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}