import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { printErrorMessage, printSuccessMessage } from './notificationReducer'

const blogReducer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    addBlog: (state, action) => {
      const blog = action.payload
      state.push(blog)
    },
    modifyBlog: (state, action) => {
      const blogModified = action.payload
      return state.map(blog => blog.id !== blogModified.id ? blog : blogModified)
    },
    removeBlog: (state, action) => {
      const blogRemovedId = action.payload
      return state.filter(blog => blog.id !== blogRemovedId)
    },
    setBlogs: (state, action) => {
      return action.payload
    },
  }
})

export const createBlog = (newBlog, user, blogFormRef) => {
  return async (dispatch) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blogCreated = await blogService.create(newBlog)
      // Updates the userId obtained with the session data saved.
      blogCreated.user = { ...user }
      dispatch(addBlog(blogCreated))
      dispatch(printSuccessMessage(`blog "${blogCreated.title}" by ${blogCreated.author} added`))
    } catch (exception) {
      const errorMessage = exception.response?.data.error
      dispatch(printErrorMessage(`${errorMessage || 'server error'}`))
      console.error(exception)
    }
  }
}

export const updateBlog = (id, blog) => {
  return async (dispatch) => {
    try {
      const blogUpdated = await blogService.update(id, blog)
      dispatch(modifyBlog(blogUpdated))
      dispatch(printSuccessMessage(`like for ${blogUpdated.title} registered`))
    } catch (exception) {
      const errorMessage = exception.response?.data.error
      dispatch(printErrorMessage(`${errorMessage || 'server error'}`))
      console.error(exception)
    }
  }
}

export const deleteBlog = (id, blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteRegister(id, blog)
      dispatch(removeBlog(id))
      dispatch(printSuccessMessage('blog deleted'))
    } catch (exception) {
      const errorMessage = exception.response?.data.error
      dispatch(printErrorMessage(`${errorMessage || 'server error'}`))
      console.error(exception)
    }
  }
}

export const getInitialBlogs = () => {
  return async (dispatch) => {
    const blogsObtained = await blogService.getAll()
    dispatch(setBlogs(blogsObtained))
  }
}
export const { setBlogs, addBlog, modifyBlog, removeBlog } = blogReducer.actions
export default blogReducer.reducer