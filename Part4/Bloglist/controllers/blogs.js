const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// ...


blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
 // console.log("GET ", blog)
  if(blog){response.status(200).json(blog)} 
  else{response.status(404).end()} 
  })
  
  blogRouter.post('/', async (request, response) => {
    
    const body = request.body
  //  console.log("RECEIVED: ", request.body)


//Authentication
    const user = request.user

    console.log("USER: ", user._id, " created new blog")

// Create new blog according to model
    const blog = new Blog({
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    
// Save it to the database
    const blogpost = await blog.save()
    user.blogs = user.blogs.concat(blogpost._id)
    await user.save()

   // console.log("POST ", request.body)
    
  

    if(blogpost){
     // console.log("Backend response 201 läpi")
      response.status(201).json(blogpost)}
    else{
   //   console.log("Backend reponse 404")
      response.status(404).end()}
  })


  blogRouter.delete('/:id', async (request, response) => {

    const user = request.user

  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString()=== user.id)
{

  const deletion = await Blog.findByIdAndDelete(request.params.id)
 // console.log("DELETE ", deletion)
 response.status(204).end()

}
 else{response.status(401).json({error: 'unauthorized, blog does not belong to user'})}

   
  })


  blogRouter.put('/:id', async (request, response) => {

    const body = request.body

    console.log("body of request " , body)

    const blog1 = {
      title: body.title,
      author: body.author,
      url: body.url,
      id: body.id,
      likes: body.likes
    }

    const Updator = await Blog.findByIdAndUpdate(request.params.id,blog1,{new: true})
    response.status(201).json(Updator)


  })

  module.exports = blogRouter