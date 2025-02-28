import CommentsForm from './CommentsForm'

const Comments = ({ blog }) => {
  const comments = blog.comments
  return (
    <div>
      <h4>comments</h4>
      <CommentsForm blog={blog} />

      {
        comments.length === 0
          ? <span>no comments added</span>
          : <ul>{comments.map((comment) => (<li key={comment.id}>{comment.content}</li>))}</ul>
      }

    </div>
  )
}

export default Comments