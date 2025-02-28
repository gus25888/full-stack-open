import { BlogAccessDiv } from '../styles'

const BlogAccess = ({ blog }) => {
  return (
    <BlogAccessDiv>
      <a href={`blogs/${blog.id}`}>{`"${blog.title}" by ${blog.author} - ${blog.likes} likes`}</a>
    </BlogAccessDiv>
  )
}

export default BlogAccess