import PropTypes from "prop-types"

const AnecdoteDetails = ({ anecdote }) => {
  return (
    <div style={{ padding: 5, marginBottom: 10 }}>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

AnecdoteDetails.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  })
}

export default AnecdoteDetails