import { useState, useEffect} from 'react'
import axios from 'axios'
import personService from './services/personer'
import Filter from './components/Filter'
import ShowNumbersF from './components/ShowNumbersF'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'



const App = () => {


  const [persons, setPersons] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newId, setNewId] = useState(0)
  const [dataretrieved, setDataRetrieved] = useState(false)
  const [remove,setRemove] = useState(-1)
  const [addmessage, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
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

      <Notification message={addmessage}/>

      <ErrorNotification message={errorMessage}/>

      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>


      <h2>Phonebook</h2>

      <PersonForm setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} setPersons={setPersons} persons={persons} setNewId={setNewId} newId={newId} setMessage={setMessage} setErrorMessage={setErrorMessage}/>

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