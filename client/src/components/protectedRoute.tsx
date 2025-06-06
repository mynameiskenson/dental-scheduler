import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import type { ReactNode } from "react";
import type { RootState, AppDispatch } from "@/state/store";
import { logout } from "@/state/authSlice";
import { isTokenExpired } from "@/utils/tokenUtils";

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem("token");

    useEffect(() => {
        if (token && isTokenExpired(token)) {
            dispatch(logout());
        }
    }, [token, dispatch]);

    if (!user || !token) {
        // Not authenticated or token expired (logged out in useEffect)
        return <Navigate to="/login" replace />;
    }

    // Render the protected component if authenticated
    return <>{children}</>;
}

export default ProtectedRoute;