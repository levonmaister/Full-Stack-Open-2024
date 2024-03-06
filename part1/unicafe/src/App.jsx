import { useState } from 'react'



const Button = ({onSmash, text}) =>(
<button onClick={onSmash}>{text}</button>


)

const Statistics = ({list}) => {

if(list.clickobj>0){return(<div>
  <StatisticLine text={"good"} value={list.goodobj}/>
  <StatisticLine text={"neutral"} value={list.neutralobj}/>
  <StatisticLine text={"bad"} value={list.badobj}/>
  <StatisticLine text={"all"} value={list.allobj}/>
  <StatisticLine text={"average"} value={(list.goodobj-list.badobj)/list.allobj}/>
  <StatisticLine text={"positive"} value={(list.goodobj/list.allobj)*100 + " %"}/>
</div>)}
else{
  return(<div>No feedback given</div>)
}

}

const StatisticLine = ({text, value}) => (
  <table>
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  </table>
)


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [NumberofClicks, setClicks] = useState(0)
  const all = good+bad+ neutral


  const information = {
    goodobj: good
    ,neutralobj: neutral
    ,badobj: bad
    ,clickobj: NumberofClicks
    ,allobj: all
  }

  const increasecount = (variable, setfunction) => {
    setClicks(NumberofClicks+1)
    setfunction(variable+1)
  }

  return (
    <div>
      <h1>Return feedback</h1>
      <Button onSmash={() => increasecount(good,setGood)} text={"good"}/>
      <Button onSmash={() => increasecount(neutral,setNeutral)} text={"neutral"}/>
      <Button onSmash={() => increasecount(bad,setBad)} text={"bad"}/>
      <h1>Statistics</h1>
      <Statistics list={information}/>
    </div>
  )
}

export default App