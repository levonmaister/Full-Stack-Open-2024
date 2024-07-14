import { useSelector, useDispatch} from 'react-redux'
import { notificationSetter } from '../reducers/notificationReducer'


const Notification = () => {

  const notification = useSelector(state => state.notification.message)

  const notificationtime = useSelector(state => state.notification.time)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }



  setTimeout(() => {
    dispatch(notificationSetter('',0))
  }, notificationtime)

  

if(notification==null){
  return null
}

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification