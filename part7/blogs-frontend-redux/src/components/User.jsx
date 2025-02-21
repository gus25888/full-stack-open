import { useSelector } from 'react-redux'

const User = ({ userId }) => {
  const blogItems = useSelector(({ blog }) => blog)

  const blogsToOrder = blogItems.filter(blog => blog.user.id === userId)

  if (blogsToOrder.length === 0) {
    return null
  }

  const userName = blogsToOrder[0].user.name

  return (
    <div>
      <h2>{userName}</h2>
      <h3>added blogs</h3>
      <ul>
        {
          blogsToOrder
            .sort((a, b) => a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0)
            .map((blog) => (
              <li key={blog.id} > {blog.title}</li>
            ))
        }
      </ul>
    </div >
  )
}

export default User