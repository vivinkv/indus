import { get } from "../Config/Config";

export const MenuApi = {
    menu: (data) => get(`menu/main`, { params: data }),
    general: (data) => get(`general`, { params: data }),
    search: (data) => get(`menu/search`, { params: data }),
}

