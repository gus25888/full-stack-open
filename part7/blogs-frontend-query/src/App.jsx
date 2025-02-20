import { useState, useEffect, useRef, useContext } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'

import { useNotificationDispatch, useNotificationTypes } from './contexts/NotificationContext'
import LoginContext from './contexts/LoginContext'
import { setUserSession, logout } from './reducers/loginReducer'

const App = () => {
  const [user, userDispatch] = useContext(LoginContext)

  /* ********* Refs   ********* */

  const blogFormRef = useRef()

  /* *********  Effects  ********* */

  useEffect(() => {
    setUserSession(userDispatch)
  }, [])

  /* ******** queryClient ******** */

  const queryClient = useQueryClient()

  /* ******** Mutations ******** */

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blogCreated) => {
      blogFormRef.current.toggleVisibility()
      const blogs = queryClient.getQueryData(['blogs'])
      const userId = blogCreated.user
      blogCreated.user = { username: user.username, name: user.name, id: userId }
      queryClient.setQueryData(['blogs'], blogs.concat(blogCreated))
      showMessage(
        `blog "${blogCreated.title}" by ${blogCreated.author} added`,
        notificationTypes.SUCCESS
      )
    },
    onError: (error) => {
      const errorMessage = error.message
      showMessage(`${errorMessage || 'server error'}`, notificationTypes.ERROR)
      console.error(error)
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (modifiedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id === modifiedBlog.id ? modifiedBlog : blog))
    },
    onError: (error) => {
      const errorMessage = error.message
      showMessage(`${errorMessage || 'server error'}`, notificationTypes.ERROR)
      console.error(error)
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteRegister,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (error) => {
      const errorMessage = error.message
      showMessage(`${errorMessage || 'server error'}`, notificationTypes.ERROR)
      console.error(error)
    }
  })


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

  const handleLogout = () => {
    logout(userDispatch)
  }

  const createBlog = async (newBlog) => {
    createBlogMutation.mutate(newBlog)
  }

  const updateBlog = async (blog) => {
    updateBlogMutation.mutate(blog)
  }

  const deleteBlog = async (id) => {
    deleteBlogMutation.mutate(id)
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  /* ********* Final Display ********* */
  if (Object.keys(user).length === 0) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm userDispatch={userDispatch} />
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
