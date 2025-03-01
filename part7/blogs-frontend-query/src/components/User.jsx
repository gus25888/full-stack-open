import { useQueryClient } from '@tanstack/react-query'

const User = ({ userId }) => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])

  if (!users) {
    return null
  }

  const user = users.find((user) => user.id === userId)
  const blogsToShow = user.blogs

  return (
    <div>
      <h3>{user.name}</h3>
      <div>
        {blogsToShow.length ? (
          <>
            <h4>added blogs</h4>
            <ul>
              {blogsToShow.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
              ))}
            </ul>
          </>
        ) : (
          <h4>no added blogs</h4>
        )}
      </div>
    </div>
  )
}

export default User
