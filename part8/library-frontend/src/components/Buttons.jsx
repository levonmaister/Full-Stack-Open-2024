import {useState} from 'react'
import {useApolloClient, useMutation} from '@apollo/client'

const Buttons = ({setPage,setToken, setLoggedIn, loggedIn}) => {

    const client = useApolloClient()
    
    
    const  logout = () => {
        setToken(null)
        setLoggedIn(false)
        localStorage.clear()
        client.resetStore()
      }

if(loggedIn){
    return(
        <div>
        <button onClick={logout}>logout</button>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={()=> setPage("recommendations")}>recommendations</button>
</div> 
    )
}
else{
    return(
        <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage('login')}>login</button>
</div>
    )
}
 


}


export default Buttons