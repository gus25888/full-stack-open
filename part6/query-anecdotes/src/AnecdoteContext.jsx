/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'show':
      return action.payload
    case 'hide':
      return ''
    default:
      return state
  }
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteContext