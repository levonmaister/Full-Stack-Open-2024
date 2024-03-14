import { useState, useEffect} from 'react'
import axios from 'axios'
import personService from './services/personer'

const Filter = ({newFilter, setNewFilter}) => {
  
  const handleFilterChange = (event) => {
    console.log(event.target.Value)
    setNewFilter(event.target.value)
  
  }
  return(
  <div>Filter shown with <input 
  value = {newFilter}
  onChange={handleFilterChange}
/></div>
  )
}
const PersonForm = ({newNumber,setNewNumber,newName,setNewName,setPersons,persons,newId,setNewId}) => {

  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => {

    event.preventDefault()
  
    const personlist = persons.map(person => person.name)
    
    
  
    if(personlist.includes(newName)){alert(`${newName} is already added to phonebook`)}
    else{
      setNewId(newId + 1)
    const PersonObject = { 
      name: newName,
      number: newNumber,
      id: newId + 1
    }

    personService.create(PersonObject).then(
      returnedperson=> {
        console.log("Added a person" + returnedperson)
        setPersons(persons.concat(returnedperson))
        setNewName('')
        setNewNumber('')
      }
    )
    

  }
  }
  

  return(
  <form>
    <div>
      name: <input   
      value={newName}
      onChange={handlePersonChange} />
    </div>
    <div>number:
       <input 
       value = {newNumber}
       onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit" onClick={(addPerson)}>add</button>
    </div>
  </form>)
}



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


const App = () => {


  const [persons, setPersons] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newId, setNewId] = useState(0)
  const [dataretrieved, setDataRetrieved] = useState(false)
  const [remove,setRemove] = useState(-1)

  const removeperson = () =>{
   
    if(remove!==-1){
      if(window.confirm("Do you really want to remove this person")){
    console.log("removing " + remove)
    personService.remove(remove).then(res=>{
      personService.getAll().then(persons => {
        console.log("getting new person list after removal " + persons.data)
        setPersons(persons)
      })
    })
    console.log("remove function gone through")
    setRemove(-1)
  }
    
  

  }
    else{
    console.log("nothing to remove")
    }}

  const basicrender = () => {
    console.log('effect')
    personService.getAll().then(persons => {
      console.log("promise fulfilled")
      setPersons(persons)
      setDataRetrieved(true)
    })
  }

  useEffect(basicrender,[])
    

  removeperson()



 if(dataretrieved){
  console.log("rendering")
  return (
    <div>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>


      <h2>Phonebook</h2>

      <PersonForm setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} setPersons={setPersons} persons={persons} setNewId={setNewId} newId={newId}/>

      <h2>Numbers</h2>

      <ShowNumbersF persons={persons} newFilter={newFilter} setRemove={setRemove} />
      


    </div>
    )
  }
  else{
    personService.getAll().then(persons =>{
      console.log("new id set")
      setNewId(persons[persons.length-1].id)
    })

  }

  

}

export default App