import  {createContext, useReducer} from 'react'

const notificationReducer = (state, action) => {
    switch(action.type){
        case 'CREATE': 
            return 'You created: '+ action.payload
        case 'VOTE':
           return 'You voted for: ' + action.payload
        case 'ERROR':
            return action.payload
        default: 
            return 0
            
    }
}


const notificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notiDispatch] = useReducer(notificationReducer,0)

    return(
        <notificationContext.Provider value = {[notification, notiDispatch]}>
            {props.children}
        </notificationContext.Provider>
    )
}


export default notificationContext