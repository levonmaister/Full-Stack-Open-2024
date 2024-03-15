


const ShowNumbersF = ({newFilter,persons,setRemove}) => {



    const ShowNumbers = () => {
      console.log("Show Numbers Called")
     let namelist = []  
      if (newFilter == ''){
        console.log("No filter applied")
        namelist = persons.map(person => 
          <li key={person.id}> {person.name + " " + person.number} <button type="submit" onClick={()=>setRemove(person.id)}>delete</button> </li>)
          }
      else{
        persons.forEach((person)=>
        {
          if(person.name.toLowerCase().includes(newFilter.toLowerCase())){
            console.log(person.name , " includes the letters " , newFilter)
            namelist.push(
              <li key={person.id}> {person.name + " " + person.number} <button type="submit" onClick={()=>setRemove(person.id)}>delete</button> </li>
            )
    
          }
        })
    
      }
      console.log("returning namelist ", namelist)
      return(namelist)
    }
  
  
    return(<div>{ShowNumbers()}</div>)
  }

  export default ShowNumbersF