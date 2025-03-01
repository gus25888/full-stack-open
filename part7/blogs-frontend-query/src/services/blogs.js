import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const addComment = async (newComment) => {
  const { blogId, content } = newComment
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl + '/' + blogId + '/' + 'comments', { content }, config)

  return response.data
}

const update = async (blog) => {
  const blogId = blog.id
  const response = await axios.put(baseUrl + '/' + blogId, blog)

  return response.data
}

const deleteRegister = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl + '/' + blogId, config)

  return response.data
}

export default { addComment, create, getAll, setToken, update, deleteRegister }
