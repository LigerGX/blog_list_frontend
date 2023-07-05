const Notification = ({ notification }) => {
  return (
    <div className={notification.error ? 'notification error' : 'notification'}>
      <p>{notification.message}</p>
    </div>
  )
}

export default Notification