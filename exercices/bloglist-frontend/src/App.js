import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [notificationType, setNotificationType] = useState({});
    const noteFormRef = useRef();

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
            })
            .catch(() => {
                //! If the token is not good:
                //! Clear local storage, and reset user
                localStorage.clear();
                setUser(null);
            });
    }, [user]);

    const handleNotification = (message, color) => {
        setNotificationType({ message: message, color: color });

        setTimeout(() => {
            setNotificationType({});
        }, "5000");
    };

    const addBlog = (blogObject) => {
        noteFormRef.current.toggleVisibility();
        blogService.create(blogObject).then((returnedBlog) => {
            setBlogs(blogs.concat(returnedBlog));
            handleNotification("Succesfully added new blog", "green");
        });
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

    const deleteBlog = (id) => {
        blogService
            .remove(id)
            .then((returnedBlog) => {
                setBlogs(returnedBlog);
                handleNotification("Succesfully deleted blog", "green");
            })
            .catch(() => {
                handleNotification("Failed deleting blog", "red");
            });
    };

    const updateBlog = (id, blogObject) => {
        blogService
            .update(id, blogObject)
            .then((returnedBlog) => {
                // setBlogs(returnedBlog);
                handleNotification("Succesfully updated post", "green");
            })
            .catch(() => {
                handleNotification("Failed updating blog", "red");
            });
    };

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

    return (
        <div>
            <h1>blogs</h1>
            {notificationType.message && Notification(notificationType)}
            {user === null && loginForm()}
            {user !== null &&
                BlogList(user, logOut, noteFormRef, addBlog, blogs, deleteBlog, updateBlog)}
        </div>
    );
};

export default App;
