import { get } from "../Config/Config";

export const ResponseApi = {
    response: (data) => get(`response-pages`, { params: data }),
    responsePage: (slug) => get(`response-pages/${slug}`),
}

