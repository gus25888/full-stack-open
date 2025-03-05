import { useQueryClient } from '@tanstack/react-query'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Users = () => {
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])

  if (!users) {
    return null
  }

  return (
    <div>
      <h3>Users</h3>
      <TableContainer >
        <Table sx={{ maxWidth: '50%' }}>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align='center' sx={{ fontWeight: 'bold' }}>Blogs Added</TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell align='center'>
                  <a href={`/users/${user.id}`}>{user.name}</a>
                </TableCell>
                <TableCell align='center'>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table >
      </TableContainer >
    </div>
  )
}

export default Users
