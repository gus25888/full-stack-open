import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { CreateButton, Form, InputText, Label } from '../styles'
import { addComment } from '../reducers/blogReducer'

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
    <Form onSubmit={onSubmit}>
      <div>
        <Label htmlFor="content">content:</Label>
        <InputText
          type="text"
          value={content}
          name="content"
          id="content"
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <CreateButton type="submit">Add Comment</CreateButton>
    </Form>
  )
}

export default CommentsForm
