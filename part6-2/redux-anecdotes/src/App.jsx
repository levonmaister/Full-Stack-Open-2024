import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addVote, createDote, initializeDotes} from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import doteService from './services/anecdote'
import { setDotes } from './reducers/anecdoteReducer'


const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeDotes)
  }, [])



  return (
    <div>
      <Notification />
    <Filter />
    <AnecdoteList />
     <AnecdoteForm />
    </div>
  )
}

export default App