import { Link } from 'react-router-dom'
import { MenuDiv, Button } from '../styles'

const Menu = ({ user, exit }) => (
  <MenuDiv>
    <Link className='accessLink' to='/'>Blogs</Link>
    <Link className='accessLink' to='/users'>Users</Link>
    <p style={{ padding: 5, display: 'inline' }}>
      {user.name} logged in <Button onClick={exit}>logout</Button>
    </p>
  </MenuDiv>
)

export default Menu