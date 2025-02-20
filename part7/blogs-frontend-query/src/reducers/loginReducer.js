import blogService from '../services/blogs'
import loginService from '../services/login'

const USER_LOGIN = 'blogListUser'

const ACTION_TYPES = {
  SET: 1,
  REMOVE: 0,
}
// const loginReducer = (state, action) => {
//   if (action.type === ACTION_TYPES.SET) {
//     (state, action) => {
//       console.log('setUser encontrado')

//       state = { ...action.payload }
//       return state
//     }
//   } else if (action.type === ACTION_TYPES.REMOVE) {
//     (state, action) => {
//       console.log('removeUser encontrado')
//       state = {}
//       return state
//     }
//   } else {
//     console.log('default action')
//     console.log(action)

//     return state
//   }
// }

const loginReducer = (state, action) => {
  const actionType = action.type
  switch (actionType) {
    case ACTION_TYPES.SET: {
      state = { ...action.payload }
      return state
    }
    case ACTION_TYPES.REMOVE: {
      state = {}
      return state
    }
    default: {
      return state
    }
  }
}

export const setUserSession = (userDispatch) => {
  const loggedUserJSON = window.localStorage.getItem(USER_LOGIN)
  console.log(loggedUserJSON)

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    userDispatch({ type: ACTION_TYPES.SET, payload: user })
  }
}

export const login = async (userDispatch, username, password) => {
  const user = await loginService.login({ username, password })
  window.localStorage.setItem(USER_LOGIN, JSON.stringify(user))
  blogService.setToken(user.token)
  userDispatch({ type: ACTION_TYPES.SET, payload: user })
}


export const logout = (userDispatch) => {
  window.localStorage.removeItem(USER_LOGIN)
  userDispatch({ type: ACTION_TYPES.REMOVE })
}


export default loginReducer