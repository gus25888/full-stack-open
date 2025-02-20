import { createContext, useContext, useReducer } from 'react'

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

// export const useLoginValue = () => {
//   const valAndFn = useContext(LoginContext)
//   return valAndFn[0]
// }

// export const useLoginDispatch = () => {
//   const valAndFn = useContext(LoginContext)
//   return valAndFn[1]
// }

export default LoginContext