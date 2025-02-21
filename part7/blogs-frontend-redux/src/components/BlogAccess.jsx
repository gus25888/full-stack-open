
const BlogAccess = ({ blog }) => {
  return (
    <div className="blogAccess">
      <a href={`blogs/${blog.id}`}>{`"${blog.title}" by ${blog.author} - ${blog.likes} likes`}</a>
    </div>
  )
}

export default BlogAccess