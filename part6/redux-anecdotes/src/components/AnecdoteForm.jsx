import { useSelector, useDispatch } from 'react-redux'
import {addVote, createDote} from '../reducers/anecdoteReducer'
import { notificationSetter, setNotification } from '../reducers/notificationReducer'
import doteService from '../services/anecdote'


const AnecdoteForm = () => {
    
    //const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()


    

    const CreationHandler = async (event) => {
      event.preventDefault()
        const content = event.target.anecdote.value
        dispatch(createDote(content))
        event.target.anecdote.value = ''
        const message = 'You created ' + content
     
        dispatch(setNotification(message,5))
    }

    return (
        <div>
        <h2>create new</h2>
        <form onSubmit={CreationHandler}>
          <div><input name='anecdote'/></div>
          <button type='submit'>create</button>
        </form>
        </div>
    )
            

    
}


export default AnecdoteForm