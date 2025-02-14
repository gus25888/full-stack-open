import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

import { useNotificationDispatch, useNotificationTypes } from './contexts/notificationContext'

const App = () => {
  const USER_LOGIN = 'blogListUser'

  /* ********* Refs   ********* */

  const blogFormRef = useRef()
  /* ********* States ********* */

  const [blogs, setBlogs] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  /* *********  Effects  ********* */

  useEffect(() => {
    blogService.getAll().then((blogsObtained) => setBlogs(blogsObtained))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(USER_LOGIN)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  /* ********* Functions ********* */

  const notificationDispatch = useNotificationDispatch()
  const notificationTypes = useNotificationTypes()
  const showMessage = (message, type) => {
    notificationDispatch({
      type,
      notificationText: message,
    })
    setTimeout(() => notificationDispatch({ type: notificationTypes.HIDDEN }), 2000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(USER_LOGIN, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showMessage('wrong username or password', notificationTypes.ERROR)
      console.error(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(USER_LOGIN)
    setUser(null)
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blogCreated = await blogService.create(newBlog)
      // Updates the userId obtained with the session data saved.
      blogCreated.user = { ...user }
      setBlogs(blogs.concat(blogCreated))
      showMessage(
        `blog "${blogCreated.title}" by ${blogCreated.author} added`,
        notificationTypes.SUCCESS
      )
    } catch (exception) {
      const errorMessage = exception.response?.data.error
      showMessage(`${errorMessage || 'server error'}`, notificationTypes.ERROR)
      console.error(exception)
    }
  }

  const updateBlog = async (id, blog) => {
    try {
      const blogUpdated = await blogService.update(id, blog)

      const { id: blogId } = blogUpdated

      setBlogs(blogs.filter((blog) => blog.id !== blogId).concat(blogUpdated))
      showMessage(
        `like to blog "${blogUpdated.title}" registered`,
        notificationTypes.SUCCESS
      )
    } catch (exception) {
      const errorMessage = exception.response?.data.error
      showMessage(`${errorMessage || 'server error'}`, notificationTypes.ERROR)
      console.error(exception)
    }
  }

  const deleteBlog = async (id, blog) => {
    try {
      await blogService.deleteRegister(id, blog)

      setBlogs(blogs.filter((blog) => blog.id !== id))
      showMessage('blog deleted', notificationTypes.SUCCESS)
    } catch (exception) {
      const errorMessage = exception.response?.data.error
      showMessage(`${errorMessage || 'server error'}`, notificationTypes.ERROR)
      console.error(exception)
    }
  }
  /* ********* Final Display ********* */
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        {LoginForm({
          username,
          password,
          handleLogin,
          setUsername,
          setPassword,
        })}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h3>Add new Blog</h3>
      <Toggable buttonLabel={'Create New Blog'} ref={blogFormRef}>
        <BlogForm addBlog={createBlog} />
      </Toggable>
      <h3>Blogs added</h3>
      {
        /* blogs are sorted in descending order */
        blogs
          ? blogs
            .sort((a, b) =>
              a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0
            )
            .map((blog) => (
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
              />
            ))
          : null
      }
    </div>
  )
}

export default App
