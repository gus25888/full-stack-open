import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'

const USER_LOGIN = 'blogListUser'

const loginReducer = createSlice({
  name: 'login',
  initialState: {
    user: {},
    username: '',
    password: '',
  },
  reducers: {
    setUsername: (state, action) => {
      const username = action.payload
      state.username = username
      return state
    },
    setPassword: (state, action) => {
      const password = action.payload
      state.password = password
      return state
    },
    setUser: (state, action) => {
      const user = action.payload
      state.user = user
      return state
    },
    removeUser: (state, action) => {
      state = {
        user: {},
        username: '',
        password: '',
      }
      return state
    }
  }
})


export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(USER_LOGIN, JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser({ user, username, password }))
    } catch (exception) {
      console.error(exception)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(USER_LOGIN)
    dispatch(removeUser())
  }
}

export const setUserSession = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem(USER_LOGIN)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const { setUser, setUsername, setPassword, removeUser } = loginReducer.actions
export default loginReducer.reducer