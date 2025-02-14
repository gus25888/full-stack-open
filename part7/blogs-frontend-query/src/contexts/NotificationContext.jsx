import { createContext, useContext, useReducer } from 'react'

const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  HIDDEN: ''
}

const notificationReducer = (state, action) => {
  const { notificationText } = action
  switch (action.type) {
    case NOTIFICATION_TYPES.SUCCESS:
      state = {
        notificationText,
        notificationType: NOTIFICATION_TYPES.SUCCESS,
      }
      return state
    case NOTIFICATION_TYPES.ERROR:
      state = {
        notificationText,
        notificationType: NOTIFICATION_TYPES.ERROR,
      }
      return state
    case NOTIFICATION_TYPES.HIDDEN:
      state = {
        notificationText: '',
        notificationType: NOTIFICATION_TYPES.HIDDEN,
      }
      return state
    default:
      return state
  }
}

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