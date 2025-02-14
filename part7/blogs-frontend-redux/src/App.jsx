import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

import { getInitialBlogs } from './reducers/blogReducer'
import { logout, setUserSession } from './reducers/loginReducer'


const App = () => {
  const dispatch = useDispatch()

  /* ********* Refs ********* */
  const blogFormRef = useRef()

  /* *********  Effects  ********* */
  useEffect(() => { dispatch(setUserSession()) }, [dispatch])
  useEffect(() => { dispatch(getInitialBlogs()) }, [dispatch])

  /* ********* Final Display ********* */
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
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={() => { dispatch(logout()) }}>logout</button>
      </p>
      <h3>Add new Blog</h3>
      <Toggable buttonLabel={'Create New Blog'} ref={blogFormRef}>
        <BlogForm user={user} blogFormRef={blogFormRef} />
      </Toggable>
      <h3>Blogs added</h3>
      <BlogList />
    </div>
  )
}

export default App
