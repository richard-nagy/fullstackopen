import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setAllUsers(state, action) {
            return action.payload;
        },
    },
});

export const initializeAllUsers = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAllUsers();
        dispatch(setAllUsers(blogs));
    };
};

export const { setAllUsers } = blogSlice.actions;
export default blogSlice.reducer;
