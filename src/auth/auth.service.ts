
import { httpClient } from "../api/http-client"

type Success = {
    success: true,
    token: string
}

export type Invalid = {
    success: false,
    error: string
}

export async function login(username: string, password: string): Promise<Success | Invalid> {

    return httpClient.post("/auth/login", {
        username,
        password
    }).then((response) => {
        localStorage.setItem("token", response.data.token);
        return {
            success: true,
            token: response.data.token
        } as Success


    }).catch(error => {
        return {
            success: false,
            error: error.message
        }
    })
}

export function logoutUser() {
    localStorage.removeItem("token");
}


export function hasRole(role: "USER" | "ADMIN") {
    const userRole = getRole();
    const currentRole = `ROLE_${role}`;

    if (userRole === currentRole) {
        return true;
    } else {
        return false;
    }
}

export function hasRoleIn(roles: string[]) {

}



export function getRole() {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("utilisateur non authentifié");
    }
    const payload = token.split(".")[1];
    const data = window.atob(payload);
    const parsedData = JSON.parse(data);
    const scope = parsedData.scope;
    const role = scope.split(" ")[0];
    return role as string;
}