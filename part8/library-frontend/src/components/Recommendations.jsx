import { gql, useQuery } from '@apollo/client'
import GenreButtons from './GenreButtons'
import {useState} from 'react'


const FAVORITE_GENRE_BOOKS = gql`
query{
    allFavoriteBooks {
      title
      published
      author{
        name
      }
    }
  }
`





const Recommendations = (props) => {

    const books = []
    let result

    if (!props.show) {
        return null
      }





// GET BOOKS OF THAT GENRE
   result = useQuery(FAVORITE_GENRE_BOOKS, {
    pollInterval: 2000
  })  



if(result.loading){
    return <div>loading</div>
}

  


  
console.log(result.data)

result.data.allFavoriteBooks.map(bookObj => books.push(bookObj))
  

 



  return (
    <div>
      <h2>FAVORITE BOOKS</h2>

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


    </div>
  )
  
}

export default Recommendations