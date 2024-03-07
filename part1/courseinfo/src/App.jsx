

const Header = (props) =>{
  return(<h1>{props.course}</h1>)

}

const Part = (props) => {
return(
<p>{props.part} {props.exercises}</p>
)
}


const Content = (props) => {

  
  console.log(props.list)
return(
  <div>
  <Part exercises={props.list[0].exercises} part={props.list[0].name}/>
  <Part exercises={props.list[1].exercises} part={props.list[1].name}/>
  <Part exercises={props.list[2].exercises} part={props.list[2].name}/>
  </div>
)

}


const Total = (props) => {

return (
<p>
  Number of exercises {props.list[0].exercises + props.list[1].exercises + props.list[2].exercises}
</p>

)

}

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  
  return (
    <div>
        <Header course= {course.name} />
        <Content list = {course.parts}/>
        <Total list = {course.parts}/>
    </div>
  )
}

export default App
