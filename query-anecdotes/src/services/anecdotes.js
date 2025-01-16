import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error(error)
    return
  }
}

const createAnecdote = async (newAnecdote) => {
  try {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
  } catch (error) {
    console.error(error)
    return
  }
}

const updateAnecdote = async (anecdote) => {
  try {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
  } catch (error) {
    console.error(error)
    return
  }
}

export { getAnecdotes, createAnecdote, updateAnecdote }