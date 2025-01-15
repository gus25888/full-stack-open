import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'black',
    borderColor: 'black',
    backgroundColor: 'lightgray',
    marginBottom: 10,
    marginTop: 10,
    display: (notification) ? 'block' : 'none'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification