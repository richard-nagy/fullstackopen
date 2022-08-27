import { useEffect, useRef, useState } from "react";
import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, deleteBlog, updateBlog }) => {
    const [likes, setLikes] = useState(blog.likes);
    const noteFormRef = useRef();

    const handleDelete = () => {
        deleteBlog(blog.id);
    };

    const handleLike = () => {
        setLikes(likes + 1);
        console.log(likes + 1);
        updateBlog(blog.id, { ...blog, likes: likes + 1 });
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
                <div className="likes">{likes}</div>
                <button onClick={handleDelete}>delete</button>
                <button onClick={handleLike}>like</button>
            </Togglable>
        </div>
    );
};

export default Blog;
