const notificationReducer = (state = {}, action) => {
    switch (action.type) {
        case "NEW_NOTIFICATION":
            return action.text;
        default:
            return state;
    }
};

export const newNotification = (text) => {
    return {
        type: "NEW_NOTIFICATION",
        text: text,
    };
};

export default notificationReducer;
