export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  HIDDEN: '',
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

export default notificationReducer
