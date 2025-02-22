import { Link } from 'react-router-dom'

const Menu = ({ user, exit }) => (
  <div style={{ backgroundColor: 'lightgray' }}>
    <Link style={{ padding: 5 }} to='/'>Blogs</Link>
    <Link style={{ padding: 5 }} to='/users'>Users</Link>
    <p style={{ padding: 5, display: 'inline' }}>
      {user.name} logged in <button onClick={exit}>logout</button>
    </p>
  </div >
)

export default Menu