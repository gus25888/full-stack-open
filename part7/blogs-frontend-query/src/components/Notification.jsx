import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const { notificationText, notificationType } = useNotificationValue()

  if (!notificationText || !notificationType) {
    return null
  }

  return (
    <div className={`notification ${notificationType}`}>{notificationText}</div>
  )
}

export default Notification
