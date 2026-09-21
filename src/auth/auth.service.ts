
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

