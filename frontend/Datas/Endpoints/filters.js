import { get } from "../Config/Config";

export const FilterApi = {
    filters: (data) => get(`car-filter`, { params: data }),
    locationFilters: (data) => get(`car-filter/filter`, { params: data }),
    brands: (data) => get(`car-filter/search-brand`, { params: data }),
    models: (data) => get(`car-filter/search-model`, { params: data }),
    locationData: (data) => get(`car-filter/static-content/${data?.location || ''}`, { params: data }),
}

