import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getDotes, createDote, updatedDote } from './requests'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import {useContext} from 'react'
import notificationContext from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const [notification, notiDispatch] = useContext(notificationContext)
 

  const votingMutation = useMutation({
    mutationFn: updatedDote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      console.log(error)}
  })
  

  const handleVote = (anecdote) => {

   console.log('voting for: ', anecdote)

  anecdote.votes += 1
  notiDispatch({type: 'VOTE', payload: anecdote.content})
  votingMutation.mutate(anecdote)
  }

  
  


  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getDotes,
    retry: false
  })

if(result.isLoading){
  console.log('IS LOADING' , result)
  return(<div>
    <p>Is Loading</p>
  </div>)
}



if (result.error) {
  return <span>anecdote service not available due to problems in server</span>
}

  const anecdotes = result.data
  
  
console.log('RESULT VARIABLE: ', result.data)

  


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
