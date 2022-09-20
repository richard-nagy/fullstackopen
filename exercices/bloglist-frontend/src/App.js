import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { newUser } from "./reducers/userReducer";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Users from "./components/Users";
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog";

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(({ user }) => {
        return user;
    });

    const [username, setUsername] = useState("user0");
    const [password, setPassword] = useState("password0");
    const noteFormRef = useRef();

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(newUser(user));
            blogService.setToken(user.token);
        }
    }, []);

    useEffect(() => {
        //! If user is null, dont try to get blogs
        if (!user) {
            return;
        }

        dispatch(initializeBlogs());
    }, [user]);

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h1>blog app</h1>
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
        dispatch(newUser(null));
        localStorage.clear();
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
            dispatch(newUser(user));
            setUsername("");
            setPassword("");
        } catch (exception) {
            alert("error");
        }
    };

    return (
        <div>
            {user === null ? (
                loginForm()
            ) : (
                <>
                    <div style={{ backgroundColor: "lightGray", padding: 5 }}>
                        <Link to="/">home</Link>
                        {" - "}
                        <Link to="/users">users</Link>
                        {" - "}
                        {user?.name} logged in <button onClick={() => logOut()}>log out</button>
                    </div>
                    <h1>blog app</h1>
                    <Notification />
                    <Routes>
                        <Route path="/" element={<BlogList noteFormRef={noteFormRef} />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<SingleUser />} />
                        <Route path="/blogs/:id" element={<SingleBlog />} />
                    </Routes>
                </>
            )}
        </div>
    );
};

export default App;
