import {createSlice} from '@reduxjs/toolkit'


  const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationSetter(state, action){
            state = action.payload
            return state
        }
    }
  })

  export const setNotification = (message, time) => {
    return async dispatch => {
      const notificationobject = {
        message: message,
        time: time*1000
      }

      dispatch(notificationSetter(notificationobject))
    }
  }


export const { notificationSetter } = notificationSlice.actions
export default notificationSlice.reducer
