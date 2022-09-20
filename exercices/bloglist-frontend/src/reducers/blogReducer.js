import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { newNotification } from "./notificationReducer";

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload);
        },
        setBlogs(state, action) {
            return action.payload;
        },
        updateBlogReducer(state, action) {
            return state.map((e) => (e.id === action.payload.id ? action.payload : e));
        },
        deleteBlogReducer(state, action) {
            return state.filter((e) => e.id !== action.payload);
        },
    },
});

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content);
        dispatch(appendBlog(newBlog));
    };
};

export const updateBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.update(content.id, content.object);
        dispatch(updateBlogReducer(newBlog));
    };
};

export const deleteBlog = (content) => {
    return async (dispatch) => {
        const answer = await blogService.remove(content);
        if (answer) {
            dispatch(deleteBlogReducer(content));
        }
    };
};

export const { toggleImportanceOf, appendBlog, setBlogs, updateBlogReducer, deleteBlogReducer } =
    blogSlice.actions;
export default blogSlice.reducer;
