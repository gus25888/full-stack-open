import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { CreateButton, Form, InputText, Label } from '../styles'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ user, blogFormRef }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    dispatch(createBlog(newBlog, user, blogFormRef))
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <Form onSubmit={onSubmit}>
      <div>
        <Label htmlFor="title">title:</Label>
        <InputText
          type="text"
          value={title}
          name="title"
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <Label htmlFor="author">author:</Label>
        <InputText
          type="text"
          value={author}
          name="author"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <Label htmlFor="url">url:</Label>
        <InputText
          type="url"
          value={url}
          name="url"
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <CreateButton type="submit">Create</CreateButton>
    </Form>
  )
}

export default BlogForm
