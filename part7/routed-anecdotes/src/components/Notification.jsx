import { useContext } from "react"
import AnecdoteContext from "../AnecdoteContext"

const Notification = () => {

  const [message] = useContext(AnecdoteContext)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'black',
    borderColor: 'black',
    backgroundColor: 'lightgray',
    marginBottom: 10,
    marginTop: 10,
  }

  if (message === '') {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification