import { useQueryClient } from '@tanstack/react-query'

const Users = () => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])

  if (!users) {
    return null
  }

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Added</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <a href={`/users/${user.id}`}>{user.name}</a>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
