const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
//no middleware
const mongoose = require('mongoose')

const URIa = config.MONGODB_URI
console.log("connecting to ", URIa)
mongoose.set('strictQuery', false)


mongoose.connect(URIa).then(()=>{
console.log("Connected to MongoDB")})
.catch((error)=>{
    console.log("error connection to MongoDB", error.message)
})


app.use(cors())
app.use(express.json())
app.use('/api/blogs',blogRouter)


module.exports = app



