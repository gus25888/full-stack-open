import { useRef } from 'react'
import { useSelector } from 'react-redux'

import Blog from './Blog'
import BlogForm from './BlogForm'
import Toggable from './Toggable'
import BlogAccess from './BlogAccess'

const BlogList = () => {
  const blogItems = useSelector(({ blog }) => blog)
  const user = useSelector(({ user }) => user)
  const blogFormRef = useRef()

  if (blogItems.length === 0) {
    return null
  }

  const blogsToOrder = [...blogItems]

  /* blogs are sorted in descending order */
  return (
    <div>
      <h3>Add new Blog</h3>
      <Toggable buttonLabel={'Create New Blog'} ref={blogFormRef}>
        <BlogForm user={user} blogFormRef={blogFormRef} />
      </Toggable>
      <h3>Blogs added</h3>
      {
        (blogsToOrder.length > 0)
          ? blogsToOrder
            .sort((a, b) => a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0)
            .map((blog) => (
              <BlogAccess
                key={blog.id}
                blog={blog}
              />
            ))
          : null
      }
    </div>
  )

}

export default BlogList