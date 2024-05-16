import api from "../utils/api.js";

export const fetchAllTags = async () => {

    const response = await api
        .get(
            `/tags`
        ).catch(reason => {
            console.error(reason)
            return []
        })

    return response.data
}