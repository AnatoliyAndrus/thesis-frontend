import api from "../utils/api.js";
import * as authService from "./authService.js"

export const fetchPostsByFilters = async (filters) => {
    let params = {};
    if (filters.authorId) params.authorId = filters.authorId
    if (filters.minDate) params.minDate = filters.minDate
    if (filters.maxDate) params.maxDate = filters.maxDate
    if (filters.title) params.title = filters.title
    if (filters.tagIds && filters.tagIds.length > 0) params.tagIds = filters.tagIds.join(",")
    if (filters.page) params.page = filters.page
    if (filters.size) params.size = filters.size
    console.log(params)
    return await api
        .get(`/posts`,
            {
                params: params,
                headers: {
                    "Authorization": authService.getAuthenticationHeader()
                }
            });
}

export const toggleLike = async (postId) => {
    const authHeader = authService.getAuthenticationHeader()
    const response = await api.patch(
        `posts/${postId}/toggle-like`,
        null,
        {
            headers:{
                "Authorization":authHeader
            }
        }
    )
    return response.data
}

export const createPost = ({title, content, tags}) => {
    return api.post(
        `posts`,
        {
            title, content, tags
        },
        {
            headers: {
                "Authorization": authService.getAuthenticationHeader()
            }
        }
    )
}

export const getPost = (postId) => {
    return api.get(
        `posts/${postId}`,
        {
            headers:{
                "Authorization": authService.getAuthenticationHeader()
            }
        }
    )
}

export const getLikedPosts = (userId) => {
    return api.get(
        `users/${userId}/liked-posts`,
        {
            headers:{
                "Authorization": authService.getAuthenticationHeader()
            }
        }
    )
}

export const getPostsAuthoredBy = (userId) => {
    return api.get(
        `users/${userId}/posts`
    )
}