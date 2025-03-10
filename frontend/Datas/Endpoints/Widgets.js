import { get } from "../Config/Config";

export const widgetsApi = {
    moments: (data) => get(`widgets/moments`, { params: data }),
    cta: (data) => get(`widgets/cta`, { params: data }),
}

