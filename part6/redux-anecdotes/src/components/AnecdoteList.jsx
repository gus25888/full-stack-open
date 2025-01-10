import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotesToRender = useSelector(({ anecdotes, filter }) => {
    return (filter)
      ? anecdotes.filter(anecdote => anecdote.content.includes(filter))
      : anecdotes
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    (anecdotesToRender) ?
      anecdotesToRender
        .sort((a, b) => (a.votes > b.votes) ? -1 : (a.votes < b.votes) ? 1 : 0)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      : null
  )
}

export default AnecdoteList