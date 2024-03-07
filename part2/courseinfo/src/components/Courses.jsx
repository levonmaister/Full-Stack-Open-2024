const Header = (props) =>{
    return(<h2>{props.course.name}</h2>)
  
  }
  
  const Part = (props) => {
    const returnstring = props.name + " " + props.exercises
  return(returnstring)
  }
  
  
  const Content = (props) => {
  
      console.log("Content called")
  
  return(
    <div>
        {props.list.map(part=>
          <p key={part.id}>
            <Part exercises={part.exercises} name={part.name}/>
          </p>)}
    </div>
  )
  
  }
  
  
  const Total = ({course}) => {
  
      const sum = course.parts.reduce((arr, exercise)=>{
          console.log(exercise.exercises)
          return(arr+=exercise.exercises)
      },0)
  
  return (
  <p>
   <b> Total of {sum} exercises</b>
  </p>
  
  )
  
  }
  
  const Courses = ({courses}) => {
    console.log("Course called")
    return (
    <div>
      {courses.map(scourse=>
        <div>
          <Header course={scourse}/>
          <Content list={scourse.parts}/>
          <Total course={scourse}/>
        </div>
        )}
    </div>
  )
  
  }
  
<<<<<<< HEAD

export default Courses
  
=======
export default Courses
>>>>>>> 74c59154830f354bd9f3f0684eeef604f94d3bec
