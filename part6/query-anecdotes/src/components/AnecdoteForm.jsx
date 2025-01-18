import { useContext } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import AnecdoteContext from '../AnecdoteContext'
import { createAnecdote } from '../services/anecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [, dispatch] = useContext(AnecdoteContext)

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: (err) => {
      const errorMessage = err.response.data.error
      dispatch({ payload: errorMessage, type: 'show' })
      setTimeout(() => { dispatch({ type: 'hide' }) }, 5000)
    },
    onSuccess: (anecdoteCreated) => {
      const anecdotesList = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotesList.concat(anecdoteCreated))
      dispatch({ payload: `anecdote "${anecdoteCreated.content}" created`, type: 'show' })
      setTimeout(() => { dispatch({ type: 'hide' }) }, 5000)
    },

  })
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = { content, votes: 0 }
    createAnecdoteMutation.mutate(newAnecdote)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
