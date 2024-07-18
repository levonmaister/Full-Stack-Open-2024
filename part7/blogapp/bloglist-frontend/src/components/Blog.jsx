import Togglable2 from './Togglable2'
import blogService from '../services/blogs'
import AddByUser from './AddByUser'
//import { test } from 'vitest'
import { Link, useParams } from 'react-router-dom';
import {useState} from 'react'
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blogs,token,blognumber,setBlogNumber,user}) => {


    const id = useParams().id
    const [likes, setLikes] = useState(0)

    console.log('inside blog id: ', id)
    console.log('searching amongst: ', blogs)
    const blog = blogs.find(n => n.id === id)
    console.log('you just opened blog', blog)


 const LikesHandler=async (event)=>{
    event.preventDefault()
  
    const blogPost = await blogService.putBlog(blog.id,blog,token)
  
  
    setLikes(likes+1)
  }




if(blog==null){return nulls}
  return(
    <div data-testid='blog'>

      <div id='title'>
      <h1>{blog.title}</h1>
      </div>


      <div id='url'>
          <a href={blog.url}>{blog.url}</a>
        </div>

        <div id='likes' data-testid='likes'>
        <span id='likes-count' data-testid='likes-count'>{blog.likes}</span>
          <button onClick={LikesHandler}>Like</button>
        </div>

      <div id='author'>
      added by {blog.author}
      </div>
       

       

      

    </div>

  )

}
  

export default Blog