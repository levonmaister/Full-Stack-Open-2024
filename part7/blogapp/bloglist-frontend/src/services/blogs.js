import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async (token) => {
  console.log('This is my token: ', token)

  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const postBlog = async (title, author, url, token) => {

  console.log('POSTBLOG TOKEN:', token)

  const blogData = {
    title: title,
    author: author,
    url: url,
  }

  const response = await axios.post(baseUrl, blogData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  console.log('Response: ', response.data)
  return response.data

}



const putBlog = async (id, newBlog, token) => {

  newBlog.likes += 1

  const response = await axios.put(`${baseUrl}/${id}`,newBlog,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })


  console.log('Response: ', response.data)
  return response.data

}


const deleteBlog = async(id,token) => {
  console.log('Deleting ', id)


  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  return response.data

}

export default { getAll, postBlog, putBlog,deleteBlog }