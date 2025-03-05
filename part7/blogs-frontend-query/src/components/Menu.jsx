import { Link } from 'react-router-dom'
import { useContext } from 'react'

import LoginContext from '../contexts/LoginContext'
import { logout } from '../reducers/loginReducer'
import { AppBar, Toolbar, Button } from '@mui/material'


const Menu = () => {
  const [user, userDispatch] = useContext(LoginContext)

  const handleLogout = () => {
    logout(userDispatch)
  }

  return (
    <AppBar position='static' sx={{ bgcolor: "burlywood" }}>
      <Toolbar>
        <h2>blog app</h2>
        <Button variant="contained" color="primary" component={Link} sx={{ padding: 1, margin: 1 }} to="/">
          blogs
        </Button>
        <Button variant="contained" color="primary" component={Link} sx={{ padding: 1, margin: 1 }} to="/users">
          users
        </Button>
        <p style={{ padding: 5, display: 'inline' }}>
          {user.name} logged in <Button color="warning" variant="contained" onClick={handleLogout}>logout</Button>
        </p>
      </Toolbar>
    </AppBar>
  )
}

export default Menu
