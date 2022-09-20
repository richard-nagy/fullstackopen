import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { initializeAllUsers } from "../reducers/allUsersReducer";

const Users = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAllUsers());
    }, []);

    const allUsers = useSelector(({ allUsers }) => {
        console.log(allUsers);
        return allUsers;
    });

    const users = allUsers;

    if (!users) {
        return "Loading";
    }

    return (
        <>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <td>
                            <b>user</b>
                        </td>
                        <td>
                            <b>blogs created</b>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Users;
