import { createSlice } from '@reduxjs/toolkit'

const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error'
}

const NOTIFICATION_DURATION = 2

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { content: '', type: '' },
  reducers: {
    showSuccessNotification: (state, action) => {
      const content = action.payload
      state = { content, type: NOTIFICATION_TYPES.SUCCESS }
      return state
    },
    showErrorNotification: (state, action) => {
      const content = action.payload
      state = { content, type: NOTIFICATION_TYPES.ERROR }
      return state
    },
    hideNotification: (state) => {
      state = { content: '', type: '' }
      return state
    },
  }
})

export const printSuccessMessage = (content) => {
  return async (dispatch) => {
    dispatch(showSuccessNotification(content))
    setTimeout(() => { dispatch(hideNotification()) }, NOTIFICATION_DURATION * 1000)
  }
}

export const printErrorMessage = (content) => {
  return async (dispatch) => {
    dispatch(showErrorNotification(content))
    setTimeout(() => { dispatch(hideNotification()) }, NOTIFICATION_DURATION * 1000)
  }
}
export const { showSuccessNotification, showErrorNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer