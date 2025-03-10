import { get } from "../Config/Config";

export const CarsApi = {
    list: (data) => get(`cars`, { params: data }),
    detail: (slug) => get(`cars/${slug}`),
    combinationData: (slug,data) => get(`combination-page/${slug}`),
    combinationList: (slug,data) => get(`/combination-page/cars/${slug}`)
}

