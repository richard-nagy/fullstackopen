import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { newNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
    const dispatch = useDispatch();

    const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

    const handleChange = (event, parameter) => {
        setNewBlog((oldAddBlog) => ({ ...oldAddBlog, [parameter]: event.target.value }));
    };

    const addBlog = (event) => {
        event.preventDefault();

        try {
            dispatch(createBlog(newBlog));
            setNewBlog({ title: "", author: "", url: "" });
            dispatch(newNotification({ message: "succesfull add", color: "green" }));
        } catch {
            dispatch(newNotification({ message: "failed add", color: "red" }));
        }
    };

    return (
        <form onSubmit={addBlog}>
            <div>
                title
                <input
                    type="text"
                    value={newBlog.title}
                    name="title"
                    onChange={(event) => handleChange(event, "title")}
                />
            </div>
            <div>
                author
                <input
                    type="author"
                    value={newBlog.author}
                    name="author"
                    onChange={(event) => handleChange(event, "author")}
                />
            </div>
            <div>
                url
                <input
                    type="url"
                    value={newBlog.url}
                    name="url"
                    onChange={(event) => handleChange(event, "url")}
                />
            </div>
            <button type="submit">add</button>
        </form>
    );
};

export default BlogForm;
