import { useContext } from "react"
import AnecdoteContext from "../AnecdoteContext"

const Notification = () => {
  const [notificationContent] = useContext(AnecdoteContext)

  const style = {
    border: 'black solid 1px',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!notificationContent)
    return null

  return (
    <div style={style}>
      {notificationContent}
    </div>
  )
}

export default Notification
