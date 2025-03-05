import { createSlice } from '@reduxjs/toolkit'

import usersService from '../services/users'

const userReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    },
  }
})

export const getInitialUsers = () => {
  return async (dispatch) => {
    const usersObtained = await usersService.getAll()
    dispatch(setUsers(usersObtained))
  }
}
export const { setUsers } = userReducer.actions
export default userReducer.reducer