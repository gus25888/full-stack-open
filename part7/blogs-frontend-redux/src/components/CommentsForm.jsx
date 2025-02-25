import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { createBlog, addComment } from '../reducers/blogReducer'

const CommentsForm = ({ blog }) => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    const newComment = { content }
    dispatch(addComment(blog, newComment))
    setContent('')
  }
  return (
    <form className="CommentsForm" onSubmit={onSubmit}>
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
      <button type="submit">Add Comment</button>
    </form>
  )
}

export default CommentsForm
