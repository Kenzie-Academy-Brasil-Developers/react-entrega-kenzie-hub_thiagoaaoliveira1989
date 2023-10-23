import { useContext } from "react";
import { UserContext } from "../../providers/UserContext";
import { Navigate, Outlet } from "react-router-dom"

export const PublicRoutes = () => {
    const { user } = useContext(UserContext);

    return user === null ? <Outlet /> : <Navigate to="/dashboard" />
 

}