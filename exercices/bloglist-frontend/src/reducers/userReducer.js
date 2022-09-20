const userReducer = (state = null, action) => {
    switch (action.type) {
        case "NEW_USER":
            return action.user;
        default:
            return state;
    }
};

export const newUser = (user) => {
    return {
        type: "NEW_USER",
        user: user,
    };
};

export default userReducer;
