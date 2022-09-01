import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";

const Notification = () => {
    const notification = useSelector(({ notification }) => {
        console.log(notification);
        return notification;
    });

    const dispatch = useDispatch();
    let message = notification;

    useEffect(() => {
        if (notification === null) {
            return;
        }

        message = notification;
        setTimeout(() => {
            dispatch(newNotification(null));
        }, 5000);
    }, [notification]);

    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
    };

    return <div style={message && style}>{message}</div>;
};

export default Notification;
