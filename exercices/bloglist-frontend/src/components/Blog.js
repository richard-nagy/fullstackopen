import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateBlog, deleteBlog } from "../reducers/blogReducer";
import Togglable from "./Togglable";
import { Link } from "react-router-dom";
import { newNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
    const dispatch = useDispatch();

    const noteFormRef = useRef();

    const handleDelete = () => {
        try {
            dispatch(deleteBlog(blog.id));
            dispatch(newNotification({ message: "succesfull delete", color: "green" }));
        } catch {
            dispatch(newNotification({ message: "failed delete", color: "red" }));
        }
    };

    const handleLike = () => {
        try {
            dispatch(updateBlog({ id: blog.id, object: { ...blog, likes: blog.likes + 1 } }));
            dispatch(newNotification({ message: "succesfull like", color: "green" }));
        } catch {
            dispatch(newNotification({ message: "failed like", color: "red" }));
        }
    };

    return (
        <div
            style={{
                backgroundColor: "lightgray",
                margin: "5px 0 5px 0",
                padding: "5px",
            }}
        >
            <Togglable buttonLabel="info" refs={noteFormRef} header={blog.title}>
                <div>{blog.author}</div>
                <div>{blog.url}</div>
                <div className="likes">{blog.likes}</div>
                <button onClick={handleDelete}>delete</button>
                <button onClick={handleLike}>like</button>
                <Link to={`/blogs/${blog.id}`}>Check out the page 😎</Link>
            </Togglable>
        </div>
    );
};

export default Blog;
