import personService from '../services/personer'

const PersonForm = ({newNumber,setNewNumber,newName,setNewName,setPersons,persons,newId,setNewId,setMessage,setErrorMessage}) => {

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
      
      
    
      if(personlist.includes(newName)){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new`)){
            const searchperson = persons.find(person => person.name === newName)
            const PersonObject = {
                name: searchperson.name,
                number: newNumber,
                id: searchperson.id
            }
            personService.update(searchperson.id,PersonObject).then(returnedperson=>
            {
console.log("updated " , returnedperson)
const updatedPersons = persons.map(person => {
    if (person.name === searchperson.name) {
      return returnedperson; // Replace the matching person with the new person
    }
    else{return person}
  })

console.log("updated array: " , updatedPersons)
setPersons(updatedPersons)
setNewName('')
setNewNumber('')

            }).catch(error => {
                setErrorMessage(
                  `Information of  '${newName}' was already removed from server`
                )
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
              })
        }}


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
          setMessage("Added " + returnedperson.name)
          setTimeout(() => {
            setMessage('')
          }, 5000)
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

  export default PersonForm