interface NotificationProps {
    message: string;
}
const Notification = (props: NotificationProps) => {
    const { message } = props;
    const notificationStyle = {
        color: "red",
        fontWeight: "bold",
        marginBottom: "0.5em",
        border: "3px solid red",
        padding: "1em",
    };

    if (!message) {
        return null;
    }
    return <div style={notificationStyle}>{message}</div>;
};

export default Notification;
