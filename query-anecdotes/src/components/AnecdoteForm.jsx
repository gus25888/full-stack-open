import { useQueryClient, useMutation } from '@tanstack/react-query'

import { createAnecdote } from '../services/anecdotes'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdoteCreated) => {
      const anecdotesList = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotesList.concat(anecdoteCreated))
    }
  })
  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = { content, votes: 0 }
    await createAnecdoteMutation.mutateAsync(newAnecdote)
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
