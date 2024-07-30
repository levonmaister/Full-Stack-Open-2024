interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase{
  description: string
}
interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}


type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;





interface ContentArray {
  courses: Array<CoursePart>;
}




const Part = ({course}: {course: CoursePart}): JSX.Element => {
    switch(course.kind){
      case 'basic': return(<div>
          <h4>{course.name} {course.exerciseCount}</h4>
          <p>{course.description}</p>
        </div>)
      case 'group': return(
      <div>
      <h4>{course.name} {course.exerciseCount}</h4>
      <p>project exercsies: {course.groupProjectCount}</p>
      </div>
      );
      case 'background': return(
        <div>
        <h4>{course.name} {course.exerciseCount}</h4>
        <p>{course.description}</p>
        <p>{course.backgroundMaterial}</p>
      </div>);
      default: return(<p>SOMETHING BROKE</p>)
    };

}

const Header = ({coursename}: {coursename: string}): JSX.Element => {
  return( <p>
    {coursename}
</p>
  )
}
const Content = (props: ContentArray): JSX.Element => {
  return( <div>
{props.courses.map(course => <Part course={course}/>)}
</div>
  )
}

const Total =  ({total}: {total: number}): JSX.Element => {
  return( <p>
  Number of exercises: {total}
</p>
  )
}


const App = () => {





  const courseName = "Half Stack application development";

 
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <h1>{courseName}</h1>
      <Header coursename={courseName} />
      <Content courses = {courseParts} />
      <Total total = {totalExercises} />
 
    </div>
  );
};

export default App;