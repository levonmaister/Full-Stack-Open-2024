const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError, isUnionType } = require('graphql')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


const Author = require('./models/authorSchema')
const Book = require('./models/bookSchema')
const User = require('./models/userSchema')

require('dotenv').config()
const jwt = require('jsonwebtoken')


const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



const typeDefs = `

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Author {
    name: String
    bookCount: Int
    born: Int
}

type Book {
    title: String
    published: Int
    author: Author!
    genres: [String]
}

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author]
    allGenres: [String]
    allFavoriteBooks: [Book]
    me: User
  }

    type Mutation {
        addBook(
          title: String!
          published: Int!
          author: String!
          genres: [String!]!
        ): Book!
    
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author


        createUser(
          username: String!
          favoriteGenre: String!
        ): User

        login(
          username: String!
          password: String!
        ): Token

      }

  
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => { 

    

    let BooklistRequest = await Book.find({}).populate('author',{name: 1})
    

    if(args.author && args.genre){
        
        let Booklist = BooklistRequest.filter(book => book.author.name == args.author)

        let Booklist2 = BooklistRequest.filter(book => book.genres.includes(args.genre))

       return Booklist.filter(authorbooks => Booklist2.includes(authorbooks))
    }
    else if(args.author){

      return BooklistRequest.filter(book => book.author.name == args.author)
       
    }
    else if(args.genre){
       return BooklistRequest.filter(book => book.genres.includes(args.genre))
     
    }

    return await Book.find({}).populate('author')},
    
    allAuthors: async (root, args)=> {
      return  await Author.find({})
    },

    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async (root, args) => {

      let BooklistRequest = await Book.find({}).populate('author',{name: 1})
      const genreslist = []
      BooklistRequest.map(book => {
        if(book.genres.length > 1){
          book.genres.map(genre => {if(!genreslist.includes(genre)){genreslist.push(genre)}})
        }
        else{
          if(!genreslist.includes(book.genres[0])){ genreslist.push(book.genres[0])}}
  
      })
      genreslist.push('all')
      return genreslist

    },
    allFavoriteBooks: async(root, args,context) =>{

        const User = context.currentUser
        const favoriteGenre = User.favoriteGenre
        let BooklistRequest = await Book.find({}).populate('author',{name: 1})
        return BooklistRequest.filter(book => book.genres.includes(favoriteGenre))
    }
  
  
  },


  Mutation: {
    addBook: async (root, args,context) => {
      if(context.currentUser){
    console.log('ADDING BOOK')

 
    const books = await Book.find({})
    const authors = await Author.find({})
    let author
   
     if (books.find(p => p.title === args.title)) {
      console.log('throwing error')
        throw new GraphQLError('Name must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title
          }
        })
      } 
      console.log('NEW BOOK: ', args.author)

      let authornamelist = authors.map(author => author.name)
     let authorId 
      if(!authornamelist.includes(args.author)){
        console.log('NEW AUTHOR', args.author, 'in the madafakibng hosue')
        const authorobj = {name: args.author, born: null, bookCount: 1}
        console.log('ADDING AUTHOR: ', authorobj)
         const myauthor = new Author(authorobj)
         author = myauthor
        console.log('SAVING: ', myauthor)
        try{
        await  myauthor.save()
        authorId = myauthor._id
       }
       
       catch(error){
        throw new GraphQLError('Saving new author failed!', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error
          }
        })
       }

    }
    else{ 
      console.log('Author already exist')
      author = authors.filter(author => author.name==args.author)
      author = author[0]
      authorId = author._id
      console.log(author)
      author.bookCount += 1
      try{
        await author.save()
      }
      catch(error){throw new GraphQLError('Updating bookcount failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args,
          error
        }
      })}
      //Bookcount +=1 put request needed
    }
  
      
      const book = new Book({ ...args, author: authorId })
  
      console.log('ADDING BOOK', book)

    try{ await book.save()}
    catch(error){
      throw new GraphQLError('SAVING BOOK FAILED', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.name,
          error
        }
      })}
     

      return book
    }
    else {
      throw new GraphQLError('User not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
        }
      })
    }

    },





    editAuthor: async (root, args, context) => {


if(context.currentUser){
        const authors = await Author.find({})

        let authornamelist = authors.map(a=> a.name)

        if(!authornamelist.includes(args.name)){return null}
 
      const author = await Author.findOne({name: args.name})

      console.log('FOUND OUR AUTHOR: ', author)
      author.born = args.setBornTo
      try{author.save()}
      catch(error){throw new GraphQLError('Editing author failed', {
        extensions: {
          code: 'BAD_USER_INPUT',
          invalidArgs: args.setBornTo,
          error
        }
      })}
      return author
    }
    else {
      throw new GraphQLError('User not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
        }
      })
    }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
        
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },

}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})


startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
     
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})