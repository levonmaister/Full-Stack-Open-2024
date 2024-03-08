import { useState } from 'react'




const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

const addPerson = (event) => {

  event.preventDefault()
  const personlist = persons.map(person => person.name)
  if(personlist.includes(newName)){alert(`${newName} is already added to phonebook`)}
  else{
  const PersonObject = { 
    name: newName
  }
  setPersons(persons.concat(PersonObject))
  setNewName('')
}
}


const ShowNumbers = () => {
  const namelist = persons.map(person => <p>{person.name}</p>)
  return(namelist)
}

  console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input   
          value={newName}
          onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit" onClick={(addPerson)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{ShowNumbers()}</div>


    </div>
  )
}

export default App