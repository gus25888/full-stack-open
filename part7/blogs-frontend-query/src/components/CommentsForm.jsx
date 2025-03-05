import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AddCommentIcon from '@mui/icons-material/AddComment'

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
        <TextField
          type="text"
          value={content}
          name="content"
          id="content"
          label="content"
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <Button type="submit" color="success" variant="contained" endIcon={<AddCommentIcon />}>Create</Button>
    </form>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
}

export default CommentForm
