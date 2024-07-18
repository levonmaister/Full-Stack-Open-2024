import React, { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {

  const [country, setCountry] = useState(null)
  const [countrytracker, setCountryTracker] = useState(null)
 

  if(name!='' && countrytracker!=name){
    console.log('SETTING COUNTRY TO: ', name)
    setCountryTracker(name)
  }
  

  useEffect( ()=>{
    async function fetchData() {
      try{
      const MyCountryFetch = await countryService.getCountry(name)
      return MyCountryFetch
    }
    catch(error){
      return 'not found...'
    }
    }



    if(countrytracker){

      console.log('FETCHING THE DATA')
      fetchData().then(myCountry=>{
        console.log(myCountry)
        if(myCountry=='not found...'){
          setCountry('not found...')
          console.log(country)
        }
        else{
          setCountry(myCountry)
        }
      })
    }


  },[countrytracker])
  
return {
  country
}
}

const Country = ({ country }) => {

  console.log('INSIDE COUNTRY COMPONENT: ', country)

  if (!country) {
    return null
  }

  if (country=='not found...') {
    return (
      <div>
        not found...
      </div>
    )
  }

console.log('MADE IT TO THE RETURN BRACKET')
console.log(country.data.name)

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')

  const countryhook = useCountry(name)
  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }


 


  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={countryhook.country} />
    </div>
  )
}

export default App