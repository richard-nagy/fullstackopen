import axios from "axios";

// * use this if we use this in development
// const baseUrl = "http://localhost:3001/api/persons/";

// * use this if we turn it into a build
const baseUrl = "/api/persons/";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(baseUrl + id, newObject);
    return request.then((response) => response.data);
};

const remove = (id) => {
    const request = axios.delete(baseUrl + id);
    return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
