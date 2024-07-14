import {createSlice} from '@reduxjs/toolkit'
import doteService from '../services/anecdote'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

appendDote(state, action) {
  state.push(action.payload)
}
,
setDotes(state, action) {
  return action.payload
},
changeDote(state,action){

    const id = action.payload.id
    // INSERT IT INTO THE STATE 
    const newState =  state.map(anecdote =>
      anecdote.id !== id ? anecdote : action.payload 
    )
    newState.sort((a,b) => b.votes - a.votes)
    state = newState
   // state.sort((a, b) => b.votes - a.votes)
    return state
}

  }
})

export const initializeDotes = () => {
  return async dispatch => {
    const dotes = await doteService.getAll()
    dispatch(setDotes(dotes))
  }
}

export const createDote = content => {
  return async dispatch => {
    const newDote = await doteService.createNew(content)
    dispatch(appendDote(newDote))
  }
}

export const addVote = (id) => {

 return async dispatch => {
    const doteToChange = await doteService.getDote(id)
    const changedDote = await doteService.changeVote(id, doteToChange)
    dispatch(changeDote(changedDote))
 }
  
}

export const { getDote, changeDote, setDotes , appendDote} = anecdoteSlice.actions
export default anecdoteSlice.reducer