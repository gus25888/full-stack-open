import { useState } from 'react'
import PropTypes from 'prop-types'

const CommentForm = ({ blogId, addComment }) => {
  const [content, setContent] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    const newComment = { content, blogId }
    addComment(newComment)
    setContent('')
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="content">content:</label>
        <input
          type="text"
          value={content}
          name="content"
          id="content"
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
}

export default CommentForm
