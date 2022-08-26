const Notification = (notification) => (
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

export default Notification;
