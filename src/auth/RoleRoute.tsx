import { Navigate } from "react-router";
import { getRole } from "./auth.service"

type Props = {
    roles: string[],
    children: React.ReactNode
}

export function RoleRoute({ roles, children }: Props) {

    const isAuthorize = roles.includes(getRole());

    if (isAuthorize) {
        return children
    } else {

        return <Navigate to="/" replace />
    }
}