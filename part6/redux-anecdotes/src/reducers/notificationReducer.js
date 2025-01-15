import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification: (state, action) => {
      state = action.payload
      return state
    },
    hideNotification: (state) => {
      state = ''
      return state
    },
  }
})

export const setNotification = (notificationContent, notificationSecondsDuration = 5) => {
  return async (dispatch) => {
    dispatch(showNotification(notificationContent))
    setTimeout(() => { dispatch(hideNotification()) }, notificationSecondsDuration * 1000)
  }
}
export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer