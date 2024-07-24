import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'


const ALL_GENRES = gql`
query {
  allGenres
}
`

const GenreButtons = ({setGenreFilter}) => {

    const genreslist = useQuery(ALL_GENRES, {
        pollInterval: 2000
      })

      if(genreslist.loading){
        return(<div>Loading</div>)
      }

console.log(genreslist.data.allGenres)

    return(
        <div>
        {genreslist.data.allGenres.map(genre=><button key={genre} onClick={()=>setGenreFilter(genre)}>{genre}</button>)}
        </div>
        
    )
}


export default GenreButtons