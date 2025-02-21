import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

import { getInitialBlogs } from './reducers/blogReducer'
import { logout, setUserSession } from './reducers/loginReducer'


const App = () => {
  const dispatch = useDispatch()

  /* *********  Effects  ********* */
  useEffect(() => { dispatch(setUserSession()) }, [dispatch])
  useEffect(() => { dispatch(getInitialBlogs()) }, [dispatch])

  /* ********* Final Display ********* */

  const matchUser = useMatch('/users/:userId')
  const userId = matchUser ? matchUser.params.userId : null

  const matchBlog = useMatch('/blogs/:blogId')
  const blogId = matchBlog ? matchBlog.params.blogId : null

  const user = useSelector(({ login }) => login.user)

  if (Object.keys(user).length === 0) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    )
  }

  return (
    <>
      <div>
        <Link style={{ paddingRight: 5 }} to='/'>Blogs</Link>
        <Link style={{ paddingRight: 5 }} to='/users'>Users</Link>
      </div >
      <div>
        <h2>Blog App</h2>
        <Notification />
        <p>
          {user.name} logged in <button onClick={() => { dispatch(logout()) }}>logout</button>
        </p>
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
