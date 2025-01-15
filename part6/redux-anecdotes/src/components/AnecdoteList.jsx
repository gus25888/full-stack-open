import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotesToRender = useSelector(({ anecdotes, filter }) => {
    const anecdotesToFilter = [...anecdotes]
    return (filter)
      ? anecdotesToFilter.filter(anecdote => anecdote.content.includes(filter))
      : anecdotesToFilter
  })
  const dispatch = useDispatch()

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
              <button onClick={() => dispatch(voteAnecdote(anecdote))}>vote</button>
            </div>
          </div>
        )
      : null
  )
}

export default AnecdoteList