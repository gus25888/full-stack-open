import { useSelector } from 'react-redux'

const UserList = () => {
  // const blogs = useSelector(({ blog }) => blog)

  // const blogsPerUser = []

  // blogs.forEach((blog) => {
  //   const userId = blog.user.id
  //   const name = blog.user.name

  //   const index = blogsPerUser.findIndex((blog) => blog.userId === userId)

  //   if (index === -1) {
  //     blogsPerUser.push({
  //       blogs: 1,
  //       name,
  //       userId,
  //     })
  //   } else {
  //     blogsPerUser[index].blogs++
  //   }
  // })
  const users = useSelector(({ users }) => users)

  if (!users) {
    return null
  }

  return (
    <>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>User</th><th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user) => (
              <tr key={user.id}>
                <td><a href={`/users/${user.id}`}>{user.name}</a></td>
                <td>{user.blogs.length}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )

}

export default UserList