import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

 async function remove (id) {
        console.log("remove function called with id " + id)
        await axios.delete(`${baseUrl}/${id}`).then(res => {
          console.log(res.data)
        
        })
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  remove: remove
}