import BlogForm from "./BlogForm";
import Blog from "./Blog";
import Togglable from "./Togglable";

const BlogList = (user, logOut, noteFormRef, addBlog, blogs, deleteBlog, updateBlog) => (
    <div>
        <p>
            {user.name} logged in <button onClick={() => logOut()}>log out</button>
        </p>
        <Togglable buttonLabel="new note" ref={noteFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs
            .sort((a, b) => {
                return b.likes - a.likes;
            })
            .map((blog) => {
                return (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        deleteBlog={deleteBlog}
                        updateBlog={updateBlog}
                    />
                );
            })}
    </div>
);

export default BlogList;
