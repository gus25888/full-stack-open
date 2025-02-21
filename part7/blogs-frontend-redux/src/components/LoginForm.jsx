import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername, setPassword, login } from '../reducers/loginReducer'

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

  return <>
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          value={username}
          name="username"
          id="username"
          onChange={({ target }) => dispatch(setUsername(target.value))}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={({ target }) => dispatch(setPassword(target.value))}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </>
}

export default LoginForm