import { createContext, useReducer } from 'react'

import loginReducer from '../reducers/loginReducer'

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
  const [user, userDispatch] = useReducer(loginReducer, {})

  return (
    <LoginContext.Provider value={[user, userDispatch]}>
      {props.children}
    </LoginContext.Provider>
  )
}

export default LoginContext