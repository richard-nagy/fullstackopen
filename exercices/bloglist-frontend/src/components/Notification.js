import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer";

const Notification = () => {
    const notification = useSelector(({ notification }) => {
        return notification;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(notification).length === 0 || null) {
            return;
        }

        console.log("notif", notification);

        setTimeout(() => {
            dispatch(newNotification({}));
        }, 5000);
    }, [notification]);

    const style = {
        border: `5px solid ${notification?.color}`,
        padding: 10,
    };

    if (Object.keys(notification).length === 0) {
        return null;
    }

    return <div style={style}>{notification.message}</div>;
};

export default Notification;
