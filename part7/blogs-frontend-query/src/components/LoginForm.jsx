import { useContext, useState } from 'react'
import { login } from '../reducers/loginReducer'
import LoginContext from '../contexts/LoginContext'

// const LoginForm = ({  handleLogin, }) => {
const LoginForm = ({ userDispatch }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      login(userDispatch, username, password)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // showMessage('wrong username or password', notificationTypes.ERROR)
      console.error(exception)
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          value={username}
          name="username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
