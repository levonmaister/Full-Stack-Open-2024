import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'






const Returncountries = ({CountriesDisplayed, CountryDisplayed}) => {

    
    const ReturnCountry = () => {
        console.log("Returning a country")
        return(<div></div>)
    }

    const ReturnCountries = () => {
        console.log("Returning countries")
        let id = -1

        return (<div>
            <ul>
                {CountriesDisplayed.map(country=> {
                    id+=1
                return(<li key={id}>{country}</li>)})}
            </ul>
        </div>)
    }

    console.log("Returning")
    console.log(CountriesDisplayed)

    if(CountriesDisplayed!='' && CountriesDisplayed.length<11) {return(ReturnCountries())} // If we have a list with under 11 but it is not empty
    else if(CountriesDisplayed.length>10){return(<div><p>Too many matches, specify another filter</p></div>)}
    else if(CountryDisplayed!=''){return(ReturnCountry())}
    else{return(<div></div>)}

}

const Search = ({countrylist, setSearch, search, SetCountriesDisplayed, SetCountryDisplayed}) => {
    
    const setCountryObject = ({filterlist}) => {

        console.log("setting Country Obj")

    countryService.getCountry(filterlist[0]).then(country => {

    
        console.log(country.capital)
        
        console.log(country.area)
        
        console.log(country.languages)
        
        console.log(country.flags.png)

        const CountryObj = {
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            languages: country.languages,
            flagUrl: country.flags.png
        }
        console.log(CountryObj)
        return CountryObj

    })


    }
    
    
    const setList = () => {

        let filterlist = []

        countrylist.forEach((country)=>{
            if(country.toLowerCase().includes(search.toLowerCase())){
                filterlist.push(country) 
            }
        }) 

        console.log("filtered list: ")
        console.log(filterlist)

        if(filterlist.length==1){
            console.log("Only 1 country ")
            SetCountryDisplayed(setCountryObject(filterlist={filterlist}))
            SetCountriesDisplayed('')
        }
        else if(filterlist.length==0){
            console.log("Filterlist == 0")
            SetCountryDisplayed('')
            SetCountriesDisplayed('')
        }
        else{
        console.log("We found countries")
        SetCountriesDisplayed(filterlist.map(country=>country))
        SetCountryDisplayed('')
        }
        
     
        

        

    }

    const handleSearchChange = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
        setList()
    }


    return(
<div>

<form>
{"find countries"}
<input value={search} onChange={handleSearchChange}/>
</form>


</div>


    )
}



function App() {
  
const [search, setSearch] = useState('')
const [countrylist, setCountrylist] = useState([])
const [CountriesDisplayed, SetCountriesDisplayed] = useState([])
const [CountryDisplayed, SetCountryDisplayed] = useState('')





useEffect(()=>{
    console.log("effect")
    countryService.getCountries().then(countries => {
    console.log("promise fulfilled")
    const list = countries.map(country => country.name.common)
    setCountrylist(list)
})}, [])




return(
<div>

<Search countrylist = {countrylist} search={search} setSearch={setSearch}  SetCountriesDisplayed={SetCountriesDisplayed} SetCountryDisplayed={SetCountryDisplayed}/>

<Returncountries CountriesDisplayed={CountriesDisplayed} CountryDisplayed = {CountryDisplayed}/>

</div>


)


}

export default App
