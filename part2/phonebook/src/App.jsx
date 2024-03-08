import { useState } from 'react'


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
          namelist.push(<p>{person.name} {person.number}</p>)
  
        }
      })
  
    }
    console.log("returning namelist ", namelist)
    return(namelist)
  }


  return(<div>{ShowNumbers()}</div>)
}


const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newId, setNewId] = useState(4)









 
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

export default App