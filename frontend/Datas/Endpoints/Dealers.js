import { list } from "postcss";
import { get } from "../Config/Config";

export const DealerApi = {
    page: (data) => get(`dealer`, { params: data }),
    list: (data) => get(`dealer-list/list`, { params: data }),
    detail: (data) => get(`dealer-list/${data?.slug}`, { params: data }),
}
