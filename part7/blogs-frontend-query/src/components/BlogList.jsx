import Toggable from "./Toggable"
import BlogForm from "./BlogForm"
import Box from '@mui/material/Box';

const BlogList = ({ blogs, blogFormRef, createBlog }) => {
  return (
    <div>
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
              <Box key={blog.id} sx={{ borderRadius: 2, border: '3px solid burlywood', padding: 2, margin: 1, width: '80%', fontSize: '1.5em', background: 'beige' }}>
                <a href={`blogs/${blog.id}`}>{blog.title}</a>
              </Box>
            ))
          : null
      }
    </div>
  )
}

export default BlogList
