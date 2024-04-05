const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        console.log("GET ", blogs.body)
        response.json(blogs)
      })
  })
  
  blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        console.log("POST ", request.body)
        response.status(201).json(result)
      })
  })



  module.exports = blogRouter