import { useQueryClient } from '@tanstack/react-query'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

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
            <List sx={{ width: '50%', maxWidth: '60%' }}>
              {
                blogsToShow.map((blog) => (
                  <ListItem key={blog.id} sx={{ bgcolor: "lightgoldenrodyellow", borderRadius: 2, border: "1px solid khaki", margin: 1, padding: 1 }}>{blog.title}</ListItem>
                ))
              }
            </List>
          </>
        ) : (
          <h4>no added blogs</h4>
        )}
      </div>
    </div>
  )
}

export default User
