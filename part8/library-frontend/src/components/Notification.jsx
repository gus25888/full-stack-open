const Notification = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ backgroundColor: 'lightsalmon', color: 'red' }}>
      {errorMessage}
    </div>
  )
}

export default Notification