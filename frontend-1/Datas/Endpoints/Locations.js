import { get } from "../Config/Config";

export const LocationApi = {
    location: (data) => get(`Location`, { params: data }),
}

