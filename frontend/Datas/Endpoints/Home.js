import { get } from "../Config/Config";

export const HomeApi = {
    index: (data) => get(`homes/index`, { params: data }),
    outlets: (data) => get(`outlets/list`, { params: data }),
}

