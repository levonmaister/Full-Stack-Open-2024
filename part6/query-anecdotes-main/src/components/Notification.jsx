
import {useContext} from 'react'
import notificationContext from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [notification, notiDispatch] = useContext(notificationContext)
  const noti = notification


  setTimeout(() => {
    notiDispatch({type: 0,payload: 'nothing'})
  }, 5000)

  if (noti==0) return null

  return (
    <div style={style}>
      {noti}
    </div>
  )
}

export default Notification
