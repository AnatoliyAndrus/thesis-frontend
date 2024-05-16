
import {backendBaseLink} from "../utils/constants.js";
import api from "../utils/api.js";

export async function signUp({userId, nickname, email, password}) {
    try {
        await api.post(
            `${backendBaseLink}/auth/sign-up`,
            {userId, nickname, email, password}
        );
        return { success: true, message: "User saved successfully" };

    } catch (error) {
        return { success: false, message: error.response.data };
    }
}

export async function signIn({userId, password}) {
    try {
        const response = await api.post(
            `${backendBaseLink}/auth/sign-in`,
            {userId, password}
        );
        return { success: true, message: "Authenticated successfully", token:response.data.accessToken};

    } catch (error) {
        return { success: false, message: error.response.data };
    }
}

export function getToken(){
    return localStorage.getItem("token");
}

export function setToken(token){
    localStorage.setItem("token", token)
}

export function isAuthenticated(){
    return localStorage.getItem("token")!=null
}

export function getAuthenticationHeader(){
    if(isAuthenticated()){
        return `Bearer ${getToken()}`
    }
    else return null
}
export function getCurrentUserInfo(){
    return api.get(
        `users/profile`,
        {
            headers: {
                "Authorization": getAuthenticationHeader()
            }
        })
}

export function deleteToken(){
    localStorage.removeItem("token")
}