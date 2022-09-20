import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAllUsers } from "../reducers/allUsersReducer";

const SingleUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAllUsers());
    }, []);

    const id = useParams().id;

    const allUsers = useSelector(({ allUsers }) => {
        return allUsers.find((user) => user.id === id);
    });

    return (
        <>
            <h3>added blgos</h3>
            <ul>
                {allUsers?.blogs.map((blog) => {
                    return <li ley={blog.id}>{blog.title}</li>;
                })}
            </ul>
        </>
    );
};

export default SingleUser;
