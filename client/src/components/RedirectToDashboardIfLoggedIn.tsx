import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/state/store";
import Home from "@/pages/Home";

export default function RedirectToDashboardIfLoggedIn() {
    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem("token");

    if (user && token) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Home />;
}