import axios from 'axios'
const baseUrl = '/api/users'


const getAll = async () => {
    console.log('Getting all users')
  
    const response = await axios.get(baseUrl)
    return response.data
  }

export default {getAll}