import CommentsForm from "./CommentsForm"

const Comments = ({ blog, addComment }) => {
  const comments = blog.comments
  return (
    <div>
      <h4>Comments</h4>
      <CommentsForm blogId={blog.id} addComment={addComment} />
      {
        comments
          ? <ul>
            {
              comments.map((comment) => (<li key={comment.id}>{comment.content}</li>))
            }
          </ul>
          : <span>no comments added</span>
      }
    </div>
  )
}

export default Comments
