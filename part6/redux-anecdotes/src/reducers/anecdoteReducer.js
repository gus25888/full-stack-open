import { createSlice } from "@reduxjs/toolkit"

import anecdotesService from "../services/anecdotes"
import { setNotification } from "./notificationReducer"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote: (state, action) => {
      const anecdote = action.payload
      state.push(anecdote)
    },
    modifyAnecdote: (state, action) => {
      const anecdoteModified = action.payload
      return state.map(anecdote => anecdote.id !== anecdoteModified.id ? anecdote : anecdoteModified)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotesList = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotesList))
  }
}

export const createAnecdote = (anecdoteContent) => {
  return async (dispatch) => {
    const anecdoteCreated = await anecdotesService.create(anecdoteContent)
    if (!anecdoteCreated) {
      dispatch(setNotification(`ERROR: "content" must have a value`, 5))
    }
    else {
      dispatch(addAnecdote(anecdoteCreated))
      dispatch(setNotification(`"${anecdoteCreated.content}" created`, 5))
    }
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const anecdoteUpdated = await anecdotesService.updateData(changedAnecdote)
    dispatch(modifyAnecdote(anecdoteUpdated))
    dispatch(setNotification(`you voted "${anecdoteUpdated.content}"`, 5))
  }
}
export const { addAnecdote, setAnecdotes, modifyAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer