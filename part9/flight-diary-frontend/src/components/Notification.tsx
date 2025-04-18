interface NotificationProps {
    message: string;
}
const Notification = (props: NotificationProps) => {
    const { message } = props;
    if (!message) {
        return null;
    }
    return (
        <div
            style={{
                color: "red",
                fontWeight: "bold",
                marginBottom: "0.5em",
                border: "3px solid red",
                padding: "1em",
            }}
        >
            {message}
        </div>
    );
};

export default Notification;
