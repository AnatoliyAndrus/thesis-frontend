import api from "../utils/api.js";
import {getAuthenticationHeader} from "./authService.js";

export function getUserBasicInfo(userId){
    return api.get(
        `users/${userId}`
    )
}

export function setOrChangeAvatar(avatarFile, userId){
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    return api.post(
        `users/${userId}/avatar`,
        formData,
        {
            headers:{
                "Authorization": getAuthenticationHeader()
            }
        }
    )
}