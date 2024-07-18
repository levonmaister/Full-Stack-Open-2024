import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable2 from './components/Togglable2'
import Users from './components/Users'
import Navbar from './components/Navbar'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import userService from './services/users'
import User from './components/User'
const ErrorNotification = ({ message }) => {


  if (message === '') {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errormessage, setErrorMessage] = useState('')
  const [blognumber, setBlogNumber] = useState('')
  const [likes, setLikes] = useState(0)
  const [users, setUsers] = useState([])




const addBlog = async (blogObject) => {




   const blogPost = await blogService.postBlog(
    blogObject.title, blogObject.author, blogObject.url, token
  )

  
  setBlogNumber(blognumber+1)
 

}

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })


      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      console.log('The user we got returned: ', user)
      setUser(user)
      setUsername('')
      setPassword('')
      setToken(user.token)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('LOGOUT CALLED')
    try{
      setUser(null)
      setToken(null)
      window.localStorage.removeItem('loggedBlogappUser')
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <ErrorNotification message={errormessage}/>
      <form onSubmit={handleLogin} data-testid='loginform'>
        <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            data-testid='username'
          />
        </div>
        <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            data-testid='password'
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )









  useEffect(() => {
    const fetchData = async () => {
      if (user && token) {
        try {
          console.log('Fetching blogs')


          const blogs = await blogService.getAll(token)
          
          console.log('Setting blogs')


          setBlogs(blogs)
          setBlogNumber(blogs.length)

          if(blogs){
            blogs.sort((a, b) => b.likes - a.likes)
          }

        } catch (error) {
          console.error('Error fetching blogs:', error)
        }
      }
    }

    const fetchUsers = async () => {
      const users = await userService.getAll();
      setUsers(users);
    }

    fetchData()
    fetchUsers()
  }, [user, token, blognumber,likes])

  const padding = {
    padding: 5
  }

  console.log('rendering login/render')

const homePage = () => {
  console.log('HOMEP PAGE CALLED')
  return(
    <div>
      <BlogForm token={token} createBlog={addBlog}/>

<div>
  <h2>blogs</h2>
  

  {blogs.map(blog =>
    <p key={blog.id} className="blogstyle"> <Link style={padding} to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
  )}

</div>

    </div>
  )
}

  if(user===null){return loginForm()}
  else{return (
    
    <div>

<Navbar handleLogout={handleLogout} user={user}/>
    <h2>Blogs</h2>

    
    
    <Routes>
    
        <Route path="/users" element={<Users user={user} users={users} handleLogout={handleLogout}/>} />
        <Route path="/" element={homePage()}/>
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/blogs/:id" element={<Blog  blogs={blogs} token={token} blognumber={blognumber} setBlogNumber={setBlogNumber} user={user}/>} />
    </Routes>

     

    </div>

  )}

}

export default App