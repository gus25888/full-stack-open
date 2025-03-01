import { Link } from 'react-router-dom'
import { useContext } from 'react'

import LoginContext from '../contexts/LoginContext'
import { logout } from '../reducers/loginReducer'


const Menu = () => {
  const [user, userDispatch] = useContext(LoginContext)

  const handleLogout = () => {
    logout(userDispatch)
  }

  return (
    <div>
      <Link style={{ padding: 5 }} to="/">
        blogs
      </Link>
      <Link style={{ padding: 5 }} to="/users">
        users
      </Link>
      <p style={{ padding: 5, display: 'inline' }}>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}

export default Menu
