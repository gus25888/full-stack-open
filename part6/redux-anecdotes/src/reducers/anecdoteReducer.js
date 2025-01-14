import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      const anecdote = action.payload
      state.push(anecdote)
    },
    voteAnecdote: (state, action) => {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const anecdoteModified = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : anecdoteModified)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { createAnecdote, setAnecdotes, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer