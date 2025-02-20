import { createContext, useContext, useReducer } from 'react'

import notificationReducer, { NOTIFICATION_TYPES } from '../reducers/notificationReducer'

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { notificationText: '', notificationType: NOTIFICATION_TYPES.HIDDEN })

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch, NOTIFICATION_TYPES]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const valAndFn = useContext(NotificationContext)
  return valAndFn[0]
}

export const useNotificationDispatch = () => {
  const valAndFn = useContext(NotificationContext)
  return valAndFn[1]
}

export const useNotificationTypes = () => {
  const valAndFn = useContext(NotificationContext)
  return valAndFn[2]
}

export default NotificationContext