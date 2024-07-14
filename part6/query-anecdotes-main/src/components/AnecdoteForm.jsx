import { useQuery, useQueryClient,useMutation } from '@tanstack/react-query'
import {createDote} from '../requests'
import notificationContext from '../NotificationContext'
import {useContext} from 'react'


const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const [notification, notiDispatch] = useContext(notificationContext)

  const newDoteMutation = useMutation({
    mutationFn: createDote,
    onSuccess: (newDote) => {
      console.log('SUCCESS MADAFAKA')
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      console.log(anecdotes)
      notiDispatch({type: 'CREATE',payload: newDote.content})
      queryClient.setQueryData( ['anecdotes'], anecdotes.concat(newDote))
    },
    onError: (error) => {notiDispatch({type: 'ERROR', payload: 'Too short anecdote, must have length 5 or more'})}
  })
  

  const onCreate = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    
    newDoteMutation.mutate({ content, votes: 0 })

   

    event.target.anecdote.value = ''
    console.log('new anecdote', content)
}





  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
