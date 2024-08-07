import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getDote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}


const changeVote = async(id, content) => {
 const changedAnecdote =  {
    ...content,
   votes: content.votes +1}

  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)

  return response.data
}

export default {
  getAll,
  createNew,
  changeVote,
  getDote,
}