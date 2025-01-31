import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {
        anecdotes.map(anecdote =>
          <li key={anecdote.id} >
            <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        )
      }
    </ul>
  </div>
)

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      votes: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }))
}
export default AnecdoteList