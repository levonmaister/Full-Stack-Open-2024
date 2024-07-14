import axios from 'axios'


const baseUrl = 'http://localhost:3001/anecdotes'

export const getDotes = () => 
  axios.get('http://localhost:3001/anecdotes').then(res => res.data)

export const createDote = newDote =>
  axios.post(baseUrl, newDote).then(res => res.data)

export const updatedDote = updatedDote =>
  axios.put(`${baseUrl}/${updatedDote.id}`, updatedDote).then(res => res.data)