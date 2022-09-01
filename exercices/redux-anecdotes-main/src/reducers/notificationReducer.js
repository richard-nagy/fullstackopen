const notificationReducer = (state = "null", action) => {
    switch (action.type) {
        case "NEW_FILTER":
            return action.text;
        default:
            return state;
    }
};

export const newNotification = (text) => {
    return {
        type: "NEW_FILTER",
        text: text,
    };
};

export default notificationReducer;
