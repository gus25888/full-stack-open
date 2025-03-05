import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

import { getInitialBlogs } from './reducers/blogReducer'
import { getInitialUsers } from './reducers/usersReducer'
import { logout, setUserSession } from './reducers/loginReducer'


const App = () => {
  const dispatch = useDispatch()

  /* *********  Effects  ********* */
  useEffect(() => { dispatch(setUserSession()) }, [dispatch])
  useEffect(() => { dispatch(getInitialBlogs()) }, [dispatch])
  useEffect(() => { dispatch(getInitialUsers()) }, [dispatch])

  /* ********* Final Display ********* */

  const matchUser = useMatch('/users/:userId')
  const userId = matchUser ? matchUser.params.userId : null

  const matchBlog = useMatch('/blogs/:blogId')
  const blogId = matchBlog ? matchBlog.params.blogId : null

  const user = useSelector(({ login }) => login.user)

  if (Object.keys(user).length === 0) {
    return (<LoginForm />)
  }

  return (
    <>
      <Menu user={user} exit={() => { dispatch(logout()) }} />
      <div>
        <h2>Blog App</h2>
        <Notification />
      </div>
      <Routes>
        <Route path={'/'} element={<BlogList />}></Route>
        <Route path={'/users'} element={<UserList />}></Route>
        <Route path={'/users/:userId'} element={<User userId={userId} />}></Route>
        <Route path={'/blogs/:blogId'} element={<Blog blogId={blogId} />}></Route>
      </Routes>
    </>
  )
}

export default App
