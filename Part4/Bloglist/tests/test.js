const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const { application } = require('express')
const api = supertest(app)




describe("database tests with 2 blogs ", () => {

  let token
  let userId

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})


    // CREATE USER CHAD AND LOGIN
  const ChadUser = {
    "name": "Chad",
    "username": "chad123",
    "password": "chad123"
  }

  const ChadLoginDetails = {
    "username": "chad123",
    "password": "chad123"
  }

    const ChadCreation = await api.post("/api/users")
    .send(ChadUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const ChadLogin = await api.post("/api/login")
    .send(ChadLoginDetails)
    .expect(200)
    .expect('Content-Type', /application\/json/)


    token = ChadLogin.body.token
    userId = ChadLogin.body.id

    console.log("USEDID: ", userId)

    const blog1 = {
        "title": "Mumindalens kustkompani",
        "author": "Kaptenlöjtnant Berner",
        "likes": 300,
        "url": "1KJK.com",
        "user": userId
    }

    const blog2 = {
      "title": "Torsten med Borsten",
      "author": "Kaptenlöjtnant Torstensson",
      "likes": 302,
      "url": "1KJK.com",
      "user": userId
  }

// CREATE BLOG POSTS
  await api.post("/api/blogs")
  .send(blog1)
  .set('Authorization', `Bearer ${token}`)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  await api.post("/api/blogs")
  .send(blog2)
  .set('Authorization', `Bearer ${token}`)
  .expect(201)
  .expect('Content-Type', /application\/json/)
  
  
  })
  // TEST1
  test('Blogs are returned as json', async() => {
    
    await api
      .get("/api/blogs")
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  //TEST2
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(response.body.length, 2)
  })
  
  //TEST3
  test('Id property is named id', async () => {

    const response = await api.get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
   
  
      let hasId = false
      for (const obj of response.body) {
        if (obj.hasOwnProperty('id')) {
            hasId = true
        }
        else{
          hasId = false
          break}
    }
  
  
      assert.strictEqual(hasId,true)
  }) 
  
  //TEST4
  test('favorite blog', async()=> {
    const response = await api.get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  

    const favorite = listHelper.favoriteBlog(response.body)
   
    assert.deepStrictEqual(favorite, response.body[1])
  })
  
  // TEST5
 test('post request succesful', async()=>{


  const response1 = await api.get('/api/blogs')
  .set('Authorization', `Bearer ${token}`)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const initiallength = response1.body.length

  // New blog
  const newBlog = {
      "title": "Information Networks",
      "author": "Leonardo di Caprio",
      "url": "www.fullstack.com",
      "likes": 11,
      "user": userId
  }

  // Make post
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    // Check if response.body.length == +1
    const response2 = await api.get('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response2.body.length, initiallength+1)

})

//TEST6
test("likes missing is it 0?", async()=>{


  const newBlog2 = {
    "title": "0 likes",
    "author": "Levon Lopez Eknosyan",
    "url": "www.dickhead.com"
}

const post = await api
  .post('/api/blogs')
  .send(newBlog2)
  .set('Authorization', `Bearer ${token}`)
  .expect(201)
  .expect('Content-Type', /application\/json/)


  assert.strictEqual(post.body.likes,0)

})

//TEST7
test("validation errors", async()=>{

  const newBlog2 = {
    "title": "0 likes",
    "author": "Levon Lopez Eknosyan",
}

const post = await api
  .post('/api/blogs')
  .send(newBlog2)
  .set('Authorization', `Bearer ${token}`)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  
  assert.strictEqual(post.status, 400)


})


// TEST8 
test("deleting first element", async()=>{

  const blogAtStart = await api.get('/api/blogs')
  .set('Authorization', `Bearer ${token}`)
  .expect(200)
  .expect('Content-Type', /application\/json/)



  // Deletion process
  const deletionId = blogAtStart.body[0].id
  const deletion = await api.delete(`/api/blogs/${deletionId}`)
  .set('Authorization', `Bearer ${token}`)
  .expect(204)


  const blogAtEnd = await api
  .get("/api/blogs")
  .set('Authorization', `Bearer ${token}`)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  assert.strictEqual(blogAtStart.body.length, blogAtEnd.body.length+1)

})

// TEST 9
test("change the likes of second", async() =>{

const blogs = await api
.get("/api/blogs")
.set('Authorization', `Bearer ${token}`)
.expect(200)
.expect('Content-Type', /application\/json/)

let newBlog = blogs.body[0]
const firstlikes = newBlog.likes
newBlog.likes = firstlikes + 1

const putblog = await api.put(`/api/blogs/${newBlog.id}`)
.send(newBlog)
.set('Authorization', `Bearer ${token}`)
.expect(201)
.expect('Content-Type', /application\/json/)

assert.strictEqual(301,  putblog.body.likes)



})

//TEST 10
test("test fails when unauthorized", async() => {

  const newBlog = {
    "title": 'Testblog',
    "author": 'Testauthor',
    "url": 'dumb.com',
    "likes": 10,
    "user": userId
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/);

})


  after(async()=>{
    await mongoose.connection.close()
  })

})




describe('total likes', () => {
    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(blogs)
      assert.strictEqual(result, 36)
    })
  })





