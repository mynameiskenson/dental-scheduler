import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { RootState } from "@/state/store";

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.user !== null);

    if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the protected component if authenticated
    return <>{children}</>;
}

export default ProtectedRoute;