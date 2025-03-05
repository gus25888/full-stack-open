import { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form className="blogForm" onSubmit={onSubmit}>
      <div>
        <TextField
          type="text"
          value={title}
          name="title"
          id="title"
          label="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <TextField
          type="text"
          value={author}
          name="author"
          id="author"
          label="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <TextField
          type="url"
          value={url}
          name="url"
          id="url"
          label="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button type="submit" variant="contained" color="success" endIcon={<AddIcon />}>Create</Button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}
export default BlogForm
