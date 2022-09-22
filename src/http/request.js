import { HttpErrors } from "../errors/httpe"

export default function makeGET(url, queryParameterObject = {}) {
    if(!url) {
        return Promise.reject(HttpErrors.URL_CANNOT_BE_EMPTY);
    }else {
        const queryString = new URLSearchParams(queryParameterObject).toString();
        const networkRequestURL = `${url}?${queryString}`;
        return fetch(networkRequestURL)
            .then(response => response.json())
    }
}