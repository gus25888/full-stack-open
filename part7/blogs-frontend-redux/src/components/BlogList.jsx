import { useSelector } from 'react-redux'

import Blog from './Blog'

/* blogs are sorted in descending order */
const BlogList = () => {
  const blogItems = useSelector(({ blog }) => blog)

  if (blogItems.length === 0) {
    return null
  }

  const blogsToOrder = [...blogItems]

  return blogsToOrder
    .sort((a, b) => a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0)
    .map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
      />
    ))

}

export default BlogList