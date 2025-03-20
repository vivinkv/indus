
import { get } from "../Config/Config";

export const StaticPageApi = {
    page: (data) => get(`static-page/${data?.slug}`, { params: data }),
}

