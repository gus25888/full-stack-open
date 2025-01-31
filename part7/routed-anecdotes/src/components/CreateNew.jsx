import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useField } from '../hooks'

const CreateNew = ({ addNew, returnUrl }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('url')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate(returnUrl)
  }

  const handleReset = (e) => {
    e.preventDefault()

    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
  returnUrl: PropTypes.string.isRequired,
}
export default CreateNew