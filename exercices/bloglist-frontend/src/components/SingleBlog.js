import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, updateBlog } from "../reducers/blogReducer";
import blogs from "../services/blogs";
import { newNotification } from "../reducers/notificationReducer";

const SingleBlog = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    const id = useParams().id;

    const blog = useSelector(({ blogs }) => {
        console.log(blogs);
        return blogs.find((blog) => blog.id === id);
    });

    const handleLike = () => {
        try {
            dispatch(updateBlog({ id: blog.id, object: { ...blog, likes: blog.likes + 1 } }));
            dispatch(newNotification({ message: "succesfull like", color: "green" }));
        } catch {
            dispatch(newNotification({ message: "failed like", color: "red" }));
        }
    };

    const handeComment = (e) => {
        e.preventDefault();

        try {
            const comment = document.getElementById("comment");
            dispatch(
                updateBlog({
                    id: blog.id,
                    object: { ...blog, comments: [...blog.comments, comment.value] },
                })
            );
            dispatch(newNotification({ message: "succesfull comment", color: "green" }));
        } catch {
            dispatch(newNotification({ message: "failed comment", color: "red" }));
        }
    };

    return (
        <>
            <h3>{blog?.title}</h3>
            <div>{blog?.url}</div>
            <div>
                {blog?.likes} likes <button onClick={handleLike}>like</button>
            </div>
            <div>added by {blog?.author}</div>
            <form onSubmit={handeComment}>
                <h3>comments</h3>
                comment
                <input type="text" id="comment" />
                <button type="submit">comment</button>
                <ul>
                    {blog?.comments.map((comment) => {
                        return <li key={comment}>{comment}</li>;
                    })}
                </ul>
            </form>
        </>
    );
};

export default SingleBlog;
