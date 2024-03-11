import { useState, useEffect} from 'react'
import axios from 'axios'

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
    setPersons(persons.concat(PersonObject))
    setNewName('')
    setNewNumber('')
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


const ShowNumbersF = ({newFilter,persons}) => {

  const ShowNumbers = () => {
    console.log("Show Numbers Called")
   let namelist = []
    if (newFilter == ''){
      console.log("No filter applied")
      namelist = persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)
        }
    else{
      persons.forEach((person)=>
      {
        if(person.name.toLowerCase().includes(newFilter.toLowerCase())){
          console.log(person.name , " includes the letters " , newFilter)
          namelist.push(<p key={person.id}>{person.name} {person.number}</p>)
  
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
  const [newId, setNewId] = useState(4)
  const [dataretrieved, setDataRetrieved] = useState(false)


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        console.log(response.data)
        setDataRetrieved(true)
      })
  }, [])





 if(dataretrieved){
  console.log("dataretrieved = true")
  return (
    <div>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>


      <h2>Phonebook</h2>

      <PersonForm setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} setPersons={setPersons} persons={persons} setNewId={setNewId} newId={newId}/>

      <h2>Numbers</h2>

      <ShowNumbersF persons={persons} newFilter={newFilter} />
      


    </div>
    )
  }
}

export default App