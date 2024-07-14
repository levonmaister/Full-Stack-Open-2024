import { useSelector, useDispatch } from 'react-redux'
import {addVote, createDote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
      console.log(state.anecdotes)
      if(state.filter === 'ALL'){return state.anecdotes}
      else{return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))}
    })



  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  const notificationHandler = (anecdote) => {
    const message = 'You voted ' + anecdote.content
    dispatch(setNotification(message,5))
  }

const voteHandler = (anecdote) => {
  vote(anecdote.id)
  notificationHandler(anecdote)
}

return(
    <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => voteHandler(anecdote)}>vote</button>
        </div>
      </div>
      
    )}
    </div>
)

}


export default AnecdoteList