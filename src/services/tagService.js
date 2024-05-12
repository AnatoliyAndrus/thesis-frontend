import api from "../utils/api.js";
import {backendBaseLink} from "../utils/constants.js";


export const fetchAllTags = async () => {

    const response = await api
        .get(
            `${backendBaseLink}/tags`
        ).catch(reason => {
            console.error(reason)
            return []
        })

    return response.data
}