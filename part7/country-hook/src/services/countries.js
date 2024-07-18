import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

 const getCountry = async (id) => {

    try{
    const response = await axios.get(`${baseUrl}/${id}`)
    console.log('we found a country' , response.data)
    return response
}
catch(error){
    console.log('error found')
    return 'not found...'
}
}


export default {
    getCountry
}