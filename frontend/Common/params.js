export const Params = {
    populate: '*'
}

export const getParams = (key) => {
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get(key); // Get 'search' parameter value
    return paramValue
}
