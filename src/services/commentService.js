import * as authService from "./authService.js";
import api from "../utils/api.js";

export const toggleLike = async (commentId) => {
    const authHeader = authService.getAuthenticationHeader()
    const response = await api.patch(
        `comments/${commentId}/toggle-like`,
        null,
        {
            headers:{
                "Authorization":authHeader
            }
        }
    )
    return response.data
}

export const createComment = (content, postId, replyTo) => {
    return api.post(
        `posts/${postId}/comments`,
        {
            content:content
        },
        {
            params:{
                replyTo
            },
            headers:{
                "Authorization":authService.getAuthenticationHeader()
            }
        }
    )
}