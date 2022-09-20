import BlogForm from "./BlogForm";
import Blog from "./Blog";
import Togglable from "./Togglable";
import { useSelector } from "react-redux";

const BlogList = ({ noteFormRef }) => {
    const blogs = useSelector(({ blogs }) => {
        return [...blogs].sort((a, b) => {
            return b.likes - a.likes;
        });
    });

    return (
        <div>
            <Togglable buttonLabel="new note" ref={noteFormRef}>
                <BlogForm />
            </Togglable>
            {blogs.map((blog) => {
                return <Blog key={blog.id} blog={blog} />;
            })}
        </div>
    );
};

export default BlogList;
