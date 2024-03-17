import axios from 'axios'

const baseUrlCountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const baseUrlCountry = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getCountries = () => {
  const request = axios.get(baseUrlCountries)
  return request.then(response => {
    return response.data
  })
}


const getCountry = (countryname) => {
    console.log("inside get country function making request" , {countryname})
    const request = axios.get(`${baseUrlCountry}/${countryname}`)
    return request.then(response => {
      console.log("request made and returning")
      return response.data
    })
  }

export default { 
  getCountries: getCountries,
  getCountry: getCountry
}