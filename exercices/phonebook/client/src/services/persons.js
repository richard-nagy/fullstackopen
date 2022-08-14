import axios from "axios";
const baseUrl = "http://localhost:3001/";

const getAll = () => {
    const request = axios.get(baseUrl + "api/persons");
    return request.then((response) => response.data);
};

const create = (newObject) => {
    const request = axios.post(baseUrl + "api/person", newObject);
    return request.then((response) => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};

const remove = (id) => {
    const request = axios.delete(baseUrl + "api/persons/" + id);
    return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
