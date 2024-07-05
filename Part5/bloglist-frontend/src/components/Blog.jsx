import Togglable2 from './Togglable2'
import blogService from '../services/blogs'
import AddByUser from './AddByUser'
//import { test } from 'vitest'


const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const Blog = ({ blog,token,likes, setLikes,blognumber,setBlogNumber,user,LikesHandler=async (event)=>{
  event.preventDefault()

  const blogPost = await blogService.putBlog(blog.id,blog,token)


  setLikes(likes+1)
}}) => {


  const removeHandler = async(event) => {

    event.preventDefault()

    if(window.confirm('Do you really want to delete this post?')){
      const blogDelete = await blogService.deleteBlog(blog.id,token)

      setBlogNumber(blognumber-1)
    }

  }

 





  return(
    <div style={blogStyle} className='blog' data-testid='blog'>

      <div id='title'>
      {blog.title}
      </div>
      <div id='author'>
      {blog.author}
      </div>
      <Togglable2>
       

        <div id='url'>
          {blog.url}
        </div>

        <div id='likes' data-testid='likes'>
        <span id='likes-count' data-testid='likes-count'>{blog.likes}</span>
          <button onClick={LikesHandler}>Like</button>
        </div>


      </Togglable2>

      <AddByUser blog={blog} user={user}>
        <button onClick={removeHandler}>remove</button>
      </AddByUser>
    </div>

  )}

export default Blog