import axios from "axios";
import { useState, useEffect } from "react";

const useCountry = (filter) => {
    const [value, setValue] = useState([]);

    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/name/${filter}?fullText=true`)
            .then((response) => {
                setValue(response.data);
            });
    }, [filter]);

    return value;
};

export { useCountry };
