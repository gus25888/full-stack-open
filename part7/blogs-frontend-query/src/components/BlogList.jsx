import Toggable from "./Toggable"
import BlogForm from "./BlogForm"

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
              <div className="blog" key={blog.id}>
                <a href={`blogs/${blog.id}`}>{blog.title}</a>
              </div>
            ))
          : null
      }
    </div>
  )
}

export default BlogList
