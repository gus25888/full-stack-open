import { useSelector } from 'react-redux'

const Notification = () => {
  const content = useSelector(({ notification }) => notification.content)
  const type = useSelector(({ notification }) => notification.type)

  if (!content || !type) {
    return null
  }

  return (
    <div className={`notification ${type}`}>{content}</div>
  )
}

export default Notification
