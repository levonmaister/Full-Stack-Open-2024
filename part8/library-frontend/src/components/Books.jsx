import { gql, useQuery } from '@apollo/client'
import GenreButtons from './GenreButtons'
import {useState} from 'react'


const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    genres
    author{
      name
    }
  }
}
`
const FILTERED_BOOKS = gql`
query getFilteredBooks($genreFilter: String) {
  allBooks(genre: $genreFilter) {
    title
    author {
      name
    }
    published
    genres
  }
}`

const Books = (props) => {


const [genreFilter, setGenreFilter] = useState('all')

let result

if(genreFilter=='all'){
   result = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })
}
else{
   result = useQuery(FILTERED_BOOKS, {
    variables: {genreFilter},
    pollInterval: 2000
  })  
}

  if (!props.show) {
    return null
  }



  const books = []

 

 

  if (result.loading) {

    return <div>loading...</div>
  }

 

  result.data.allBooks.map(bookObj => books.push(bookObj))
  

 

console.log(genreFilter)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <GenreButtons setGenreFilter={setGenreFilter}/>
    </div>
  )
}

export default Books
