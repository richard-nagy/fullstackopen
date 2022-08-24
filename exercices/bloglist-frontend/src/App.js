import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
    const [notification, setNotification] = useState();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    useEffect(() => {
        //! If user is null, dont try to get blogs
        if (!user) {
            return;
        }

        blogService
            .getAll()
            .then((initialBlogs) => {
                setBlogs(initialBlogs);
                console.log(initialBlogs);
            })
            .catch(() => {
                //! If the token is not good:
                //! Clear local storage, and reset user
                localStorage.clear();
                setUser(null);
            });
    }, [user]);

    const handleNotification = (message, color) => {
        setNotification({ message: message, color: color });

        setTimeout(() => {
            setNotification({});
        }, "5000");
    };

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    );

    const logOut = () => {
        setUser(null);
        setBlogs([]);
        localStorage.clear();
    };

    const addBlog = (event) => {
        event.preventDefault();
        const noteObject = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
        };

        blogService
            .create(noteObject)
            .then((returnedNote) => {
                setBlogs(blogs.concat(returnedNote));
                setNewBlog({ title: "", author: "", url: "" });
                handleNotification("Succesfully added blog", "green");
            })
            .catch(() => {
                handleNotification("Failed adding blog", "red");
            });
    };

    const addNewBlog = () => (
        <form onSubmit={addBlog}>
            <div>
                title
                <input
                    type="text"
                    value={newBlog.title}
                    name="title"
                    onChange={({ target }) =>
                        setNewBlog((oldAddBlog) => ({ ...oldAddBlog, title: target.value }))
                    }
                />
            </div>
            <div>
                author
                <input
                    type="author"
                    value={newBlog.author}
                    name="author"
                    onChange={({ target }) =>
                        setNewBlog((oldAddBlog) => ({ ...oldAddBlog, author: target.value }))
                    }
                />
            </div>
            <div>
                url
                <input
                    type="url"
                    value={newBlog.url}
                    name="url"
                    onChange={({ target }) =>
                        setNewBlog((oldAddBlog) => ({ ...oldAddBlog, url: target.value }))
                    }
                />
            </div>
            <button type="submit">add</button>
        </form>
    );

    const blogInterface = () => (
        <>
            <p>
                {user.name} logged in <button onClick={() => logOut()}>log out</button>
            </p>
            {addNewBlog()}
            {blogs.map((blog) => {
                return <Blog key={blog.id} blog={blog} />;
            })}
        </>
    );

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            alert("error");
        }
    };

    const notificationPanel = () => (
        <div
            style={{
                backgroundColor: "lightgray",
                color: notification.color,
                border: `2px solid ${notification.color}`,
                borderRadius: "2px",
                padding: "10px",
                fontWeight: "bold",
            }}
        >
            {notification.message}
        </div>
    );

    return (
        <div>
            <h1>blogs</h1>
            {notification.message && notificationPanel()}
            {user === null && loginForm()}
            {user !== null && blogInterface()}
        </div>
    );
};

export default App;
