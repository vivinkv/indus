import { get, post } from "../Config/Config";

export const ContactApi = {
    save: (data) => post(`leads/generate-lead`, data),
    excellenceForm: (data) => get(`contact-form-ui/excellence`, { params: data }),
    page: (data) => get(`contact`, { params: data }),
}

