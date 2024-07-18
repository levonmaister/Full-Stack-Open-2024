import { useState, useRef,forwardRef, useImperativeHandle } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Notification = ({ message }) => {


  if (message == '') {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}




const BlogForm = (props) => {

  //   const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])
  const [message, setNotification] = useState('')


  const blogFormRef = useRef()

  const handleCreation = async (event) => {

    event.preventDefault()

   

    props.createBlog({
      title: title,
      author: author,
      url: url,
      token: props.token
    })

    blogFormRef.current.toggleVisibility()


   /* const blogPost = await blogService.postBlog(
      title, author, url, props.token
    ) */



    //console.log('The blogpost we got returned: ', blogPost)
    const notificationmessage = 'a new blog ' + title + ' by ' + author + ' added'

    setAuthor('')
    setTitle('')
    setUrl('')
    setNotification(notificationmessage)
    setTimeout(() => {
      setNotification(null)
    }, 5000)



  }




  return(


    <div>
      <Notification message={message}/>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <form onSubmit={handleCreation} data-testid='blogform'>
          <div>
        Title
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
              placeholder='write title here'
              data-testid='title'
            />
          </div>
          <div>
        Author
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder='write author here'
              data-testid='author'
            />
          </div>
          <div>
        Url
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              placeholder='write url here'
              data-testid='url'
            />
          </div>

          <button type="submit" id='createbutton'>create</button>

        </form>
      </Togglable>
    </div>




  )
}

export default BlogForm