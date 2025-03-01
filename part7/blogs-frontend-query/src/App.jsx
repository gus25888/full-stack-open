import { useState, useEffect, useRef, useContext } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { Routes, Route, useMatch } from 'react-router-dom'

import blogService from './services/blogs'
import userService from './services/users'

import {
  useNotificationDispatch,
  useNotificationTypes,
} from './contexts/NotificationContext'
import LoginContext from './contexts/LoginContext'
import { setUserSession } from './reducers/loginReducer'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'

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
      blogCreated.user = {
        username: user.username,
        name: user.name,
        id: userId,
      }
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
    },
  })

  const createCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (commentCreated) => {
      queryClient.invalidateQueries('blogs')
      showMessage(
        `comment added`,
        notificationTypes.SUCCESS
      )
    },
    onError: (error) => {
      const errorMessage = error.message
      showMessage(`${errorMessage || 'server error'}`, notificationTypes.ERROR)
      console.error(error)
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (modifiedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === modifiedBlog.id ? modifiedBlog : blog))
      )
    },
    onError: (error) => {
      const errorMessage = error.message
      showMessage(`${errorMessage || 'server error'}`, notificationTypes.ERROR)
      console.error(error)
    },
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
    },
  })

  /* ********* Functions ********* */
  const matchUser = useMatch('/users/:userId')
  const userId = matchUser ? matchUser.params.userId : null

  const matchBlog = useMatch('/blogs/:blogId')
  const blogId = matchBlog ? matchBlog.params.blogId : null

  const notificationDispatch = useNotificationDispatch()
  const notificationTypes = useNotificationTypes()

  const showMessage = (message, type) => {
    notificationDispatch({
      type,
      notificationText: message,
    })
    setTimeout(
      () => notificationDispatch({ type: notificationTypes.HIDDEN }),
      2000
    )
  }

  const createBlog = async (newBlog) => {
    createBlogMutation.mutate(newBlog)
  }

  const createComment = async (newComment) => {
    createCommentMutation.mutate(newComment)
  }

  const updateBlog = async (blog) => {
    updateBlogMutation.mutate(blog)
  }

  const deleteBlog = async (id) => {
    deleteBlogMutation.mutate(id)
  }

  /* ********* Initial Data Load ********* */
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  const resultUsers = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading || resultUsers.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data
  const blog = blogs.find(blog => blog.id === blogId)

  /* ********* Final Display ********* */
  if (Object.keys(user).length === 0) {
    return <LoginForm userDispatch={userDispatch} />
  }

  return (
    <div>
      <Menu />
      <h2>blog app</h2>
      <Notification />
      {
        <Routes>
          <Route
            path={'/'}
            element={<BlogList blogs={blogs} blogFormRef={blogFormRef} createBlog={createBlog} />}>
          </Route>
          <Route
            path={'/users'}
            element={<Users />}>
          </Route>
          <Route
            path={'/users/:userId'}
            element={<User userId={userId} />}>
          </Route>
          <Route
            path={'/blogs/:blogId'}
            element={<Blog user={user} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} addComment={createComment} />}>
          </Route>
        </Routes>
      }
    </div>
  )
}

export default App
