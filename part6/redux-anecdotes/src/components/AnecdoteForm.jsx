import { useDispatch } from 'react-redux'

import anecdotesService from '../services/anecdotes'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { hideNotification, showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdoteCreated = await anecdotesService.create(anecdote)
    if (!anecdoteCreated) {
      dispatch(showNotification(`ERROR: "content" must have a value`))
      setTimeout(() => { dispatch(hideNotification()) }, 5000)
      return
    }
    dispatch(createAnecdote(anecdoteCreated))
    dispatch(showNotification(`"${anecdoteCreated.content}" created`))
    setTimeout(() => { dispatch(hideNotification()) }, 5000)
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm