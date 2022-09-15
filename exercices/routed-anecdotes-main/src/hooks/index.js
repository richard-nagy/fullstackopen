import { useState } from "react";

const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const clearInput = (event) => {
        setValue("");
    };

    return {
        type,
        value,
        onChange,
        clearInput,
    };
};

export { useField };
