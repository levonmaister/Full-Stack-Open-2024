import { gql, useQuery, useMutation } from '@apollo/client'
import {useState, useEffect} from 'react'


const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    bookCount
    born
  }
}
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`


const Authors = (props) => {
  


  if (!props.show) {
    return null
  }


  const [ changeAuthor ] = useMutation(EDIT_AUTHOR)

  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  useEffect(() => {
    if (result.data && result.data.allAuthors.length > 0) {
      setName(result.data.allAuthors[0].name)
    }
  }, [result.data])


 const updateAuthor = (event) => {

  event.preventDefault()

  console.log('UPDATING: ', name, setBornTo)
  changeAuthor({ variables: { name, setBornTo } })


  setName('')
  setBorn('')
 }




  if (result.loading) {
    return <div>loading...</div>
  }



  const authors = []

  
  result.data.allAuthors.map(authorObj => authors.push(authorObj))
  


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>


<h1>Set birthyear</h1>

<div>
  <form onSubmit={updateAuthor}>
    <div>

    name
  
    <select value = {name} onChange={e => setName(e.target.value)}>
      {authors.map(author => (<option key={author.name} value={author.name}>{author.name}</option>))}
    </select>

    </div>
    <div>
    born
    <input 
            value={setBornTo}
            onChange={({target}) => (setBorn(Number(target.value)))}/>
    </div>
    <button type='submit'>update author</button>
  </form>
</div>

    </div>
  )
}

export default Authors
