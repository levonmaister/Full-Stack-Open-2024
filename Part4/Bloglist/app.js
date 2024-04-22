const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
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

app.use(middleware.tokenExtractor)

app.use('/api/blogs',middleware.userExtractor,  blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)


module.exports = app



