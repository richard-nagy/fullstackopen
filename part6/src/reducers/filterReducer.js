const filterReducer = (state = "ALL", action) => {
    switch (action.type) {
        case "SET_FILTER":
            return action.filter;
        default:
            return state;
    }
};

export const filterChange = (filter) => {
    return {
        type: " ",
        filter,
    };
};

export default filterReducer;
