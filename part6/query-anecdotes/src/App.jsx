import { useContext } from 'react'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './services/anecdotes'
import AnecdoteContext from './AnecdoteContext'

const App = () => {
  const queryClient = useQueryClient()
  const [, dispatch] = useContext(AnecdoteContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdoteModified) => {
      const anecdotesList = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],
        anecdotesList.map((anecdote) => (anecdote.id === anecdoteModified.id) ? anecdoteModified : anecdote)
      )
      dispatch({ payload: `anecdote "${anecdoteModified.content}" voted`, type: 'show' })
      setTimeout(() => { dispatch({ type: 'hide' }) }, 5000)
    }
  })
  const handleVote = async (anecdote) => {
    const anecdoteToUpdate = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    updateAnecdoteMutation.mutate(anecdoteToUpdate)
  }


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }


  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
