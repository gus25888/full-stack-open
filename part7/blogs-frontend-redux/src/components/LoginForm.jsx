import { useDispatch, useSelector } from 'react-redux'
import { setUsername, setPassword, login } from '../reducers/loginReducer'
import { Button, Form, InputText, Label } from '../styles'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useSelector(({ login }) => login.username)
  const password = useSelector(({ login }) => login.password)

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    dispatch(setUsername(''))
    dispatch(setPassword(''))
  }

  return (<div>
    <h2>Log in to application</h2>
    <Form onSubmit={handleLogin}>
      <div>
        <Label htmlFor="username">username</Label>
        <InputText
          type="text"
          value={username}
          name="username"
          id="username"
          onChange={({ target }) => dispatch(setUsername(target.value))}
        />
      </div>
      <div>
        <Label htmlFor="password">password</Label>
        <InputText
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={({ target }) => dispatch(setPassword(target.value))}
        />
      </div>
      <Button type="submit">Login</Button>
    </Form>
  </div>)
}

export default LoginForm