import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'

import Comments from './Comments'

const Blog = ({ user, blog, updateBlog, deleteBlog, addComment }) => {
  const navigate = useNavigate()
  const updateLikes = (blog) => {
    const { user, likes } = blog
    const blogToUpdate = {
      ...blog,
      user: user.id,
      likes: likes + 1,
    }
    updateBlog(blogToUpdate)
  }

  const removeBlog = (blog) => {
    if (confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog(blog.id)
      navigate('/')
    }
  }

  return (
    <div>
      <h2>{`"${blog.title}" by ${blog.author}`}</h2>
      <div className="blogDetails">
        <a href={blog.url}>{blog.url}</a>
        <Chip sx={{ margin: 2, marginLeft: 0, padding: 1 }} variant="outlined" label={`${blog.likes} likes`} color="inherit" />
        <Button size="small" variant="contained" color="primary" endIcon={<ThumbUpIcon />} onClick={() => updateLikes(blog)}>like</Button>
        <span className="user">{`added by ${blog.user.name || 'Unassigned user'}`}</span>
        {
          blog.user.username === user.username
            ? (
              <Button size="small" variant="contained" color="error" endIcon={<DeleteIcon />} onClick={() => removeBlog(blog)}>remove</Button>
            )
            : null
        }
      </div>
      <Comments blog={blog} addComment={addComment} />
    </div>
  )
}

export default Blog
