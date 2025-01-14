import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error(error)
    return
  }

}

const create = async (content) => {
  try {
    if (!content) {
      throw new Error(`content must have a value`)
    }


    const anecdote = {
      content,
      votes: 0
    }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
  } catch (error) {
    console.error(error)
    return
  }
}

export default { create, getAll }