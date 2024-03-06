import { useState } from 'react'



const Button = ({onSmash, text}) =>(
<button onClick={onSmash}>{text}</button>


)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const badfunction = () => {
    console.log("function was called")
  }

  const increasecount = (variable, setfunction) => {
    console.log("adding +1" )
    setfunction(variable+1)
  }

  return (
    <div>
      <h1>Return feedback</h1>
      <Button onSmash={() => increasecount(good,setGood)} text={"good"}/>
      <Button onSmash={() => increasecount(neutral,setNeutral)} text={"neutral"}/>
      <Button onSmash={() => increasecount(bad,setBad)} text={"bad"}/>
      <h1>Statistics</h1>
          <div>good {good}</div>
          <div>neutral {neutral}</div>
          <div>bad {bad}</div>
    </div>
  )
}

export default App