import axios from "axios";

// const baseUrl = "/api/blogs";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
};

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    };

    const request = axios.get(baseUrl, config);
    return request.then((response) => response.data);
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    const request = axios.put(`${baseUrl}/${id}`, newObject, config);
    return request.then((response) => response.data);
};

const remove = (id) => {
    const config = {
        headers: { Authorization: token },
    };
    const request = axios.delete(`${baseUrl}/${id}`, config);
    return request.then((response) => response.data);
};

const getAllUsers = () => {
    const config = {
        headers: { Authorization: token },
    };

    const request = axios.get("http://localhost:3003/api/users", config);
    return request.then((response) => response.data);
};

export default { getAll, create, update, setToken, remove, getAllUsers };
