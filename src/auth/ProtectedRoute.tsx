import { Navigate } from "react-router";

type Props = {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
    const token = localStorage.getItem("token");

    if (token) {
        return children
    } else {

        return <Navigate to="/" replace />
    }
}