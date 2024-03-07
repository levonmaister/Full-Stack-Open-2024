import { useState } from 'react'






const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [anecdote, setAnecdotes] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0,0])


const anecdoteselector = () =>{
  let randomnumber = Math.floor(Math.random()*7) 
  setAnecdotes(randomnumber)
//  console.log("anecdote nr ", randomnumber)
}

const increment = () => {
//  console.log("increment called " , points[anecdote])
  const copy = [...points]
  copy[anecdote]+=1
setPoints(copy)
}

const sendlocation = () =>{
  var comparison = 0
  var location = 0
  for(var x=0; x<7;x++){
    if(comparison<points[x]){
      comparison = points[x]
      location = x
    }
  }
  return(location)
}

  console.log(points)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[anecdote]}</div>
      <div>has {points[anecdote]} votes </div>
      <button onClick={anecdoteselector}>next anecdote</button>
      <button onClick={increment}>vote</button>
      <h1>Amecdote with most votes</h1>
      <div>{anecdotes[sendlocation()]}</div>
      <div>has {points[sendlocation()]} votes </div>
    </div>
  )
}

export default App