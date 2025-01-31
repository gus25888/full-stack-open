/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react'

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


const urlList = {
  'HOME': '/',
  'ANECDOTE_DETAILS': '/anecdote/:id',
  'ANECDOTE_LIST': '/anecdotes',
  'ANECDOTE_CREATE': '/create',
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const showNotification = (message, durationInSeconds = 5) => {
    notificationDispatch({ payload: message, type: 'show' })
    setTimeout(() => { notificationDispatch({ type: 'hide' }) }, durationInSeconds * 1000)
  }

  return (
    <AnecdoteContext.Provider value={[notification, showNotification, urlList]}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

export default AnecdoteContext