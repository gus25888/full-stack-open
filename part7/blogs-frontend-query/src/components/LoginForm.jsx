import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SendIcon from '@mui/icons-material/Send'

import { login } from '../reducers/loginReducer'

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
      alert('wrong username or password')
      console.error(exception)
    }
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            type="text"
            value={username}
            name="username"
            id="username"
            label="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            type="password"
            value={password}
            name="password"
            id="password"
            label="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>Login</Button>
      </form>
    </div>
  )
}

export default LoginForm
