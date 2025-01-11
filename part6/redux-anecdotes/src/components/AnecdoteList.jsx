import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotesToRender = useSelector(({ anecdotes, filter }) => {
    const anecdotesToFilter = [...anecdotes]
    return (filter)
      ? anecdotesToFilter.filter(anecdote => anecdote.content.includes(filter))
      : anecdotesToFilter
  })
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(showNotification(`you voted "${content}"`))
    setTimeout(() => { dispatch(hideNotification()) }, 5000)
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
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )
      : null
  )
}

export default AnecdoteList