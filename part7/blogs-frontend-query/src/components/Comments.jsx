import CommentsForm from "./CommentsForm"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

const Comments = ({ blog, addComment }) => {
  const comments = blog.comments
  return (
    <div>
      <h4>Comments</h4>
      <CommentsForm blogId={blog.id} addComment={addComment} />
      {
        comments
          ? <List sx={{ width: '50%', maxWidth: '60%' }}>
            {
              comments.map((comment) => (<ListItem key={comment.id} sx={{ bgcolor: "lightgoldenrodyellow", borderRadius: 2, border: "1px solid khaki", margin: 1, padding: 1 }}>{comment.content}</ListItem>))
            }
          </List>
          : <span>no comments added</span>
      }
    </div>
  )
}

export default Comments
