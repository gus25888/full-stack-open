import { useNavigate } from 'react-router-dom'

import Comments from './Comments'

const Blog = ({ user, blog, updateBlog, deleteBlog, addComment }) => {
  const navigate = useNavigate()
  const updateLikes = (blog) => {
    const { id, title, author, url, user } = blog
    const blogToUpdate = {
      id,
      title,
      author,
      url,
      user: user.id,
      likes: blog.likes + 1,
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
        <span className="likes">{`likes: ${blog.likes}`} </span>{' '}
        <button onClick={() => updateLikes(blog)}>like</button>
        <span className="user">{`added by ${blog.user.name || 'Unassigned user'}`}</span>
        {blog.user.username === user.username ? (
          <button onClick={() => removeBlog(blog)}>remove</button>
        ) : null}
      </div>
      <Comments blog={blog} addComment={addComment} />
    </div>
  )
}

export default Blog
