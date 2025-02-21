import { useState } from 'react'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const Blog = ({ blogId }) => {
  const dispatch = useDispatch()
  const user = useSelector(({ login }) => login.user)

  const updateLikes = (blog) => {
    const { id, title, author, url, user } = blog
    const blogToUpdate = { title, author, url, user: user.id, likes: blog.likes + 1, }
    dispatch(updateBlog(id, blogToUpdate))
  }

  const removeBlog = (blog) => {
    if (confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }
  const blogItems = useSelector(({ blog }) => blog)
  const blog = blogItems.find(blogItem => blogItem.id === blogId)

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <div className="blogTitle">
        <h3>{`"${blog.title}" by ${blog.author}`}</h3>
      </div>
      <div className="blogDetails">
        <a href={blog.url}>{blog.url}</a>
        <span className="likes">{`${blog.likes} likes`} </span>{' '}
        <button onClick={() => updateLikes(blog)}>like</button>
        <span className="user">{`added by ${blog.user.name || 'Unassigned user'}`}</span>
        {
          blog.user.username === user.username
            ? (<button onClick={() => removeBlog(blog)}>remove</button>)
            : null
        }
      </div>
    </div>
  )
}

export default Blog
