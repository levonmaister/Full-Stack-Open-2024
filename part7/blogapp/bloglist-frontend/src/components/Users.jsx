import userService from '../services/users'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import User from './User'



const  Users =  (props) => 
{


 

   




const getUsers = () => {
    console.log(props.users)
    console.log('LET THE RENDERING BEGIN')
   props.users.map(user=> console.log( user.id,user.name ,user.blogs.length))
    return(
        <div>  
           <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <tr key={user.id}>
                <td>
              <Link to={`/users/${user.id}`} >{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>


      
        </div>
    )
}



return(
    <div>
    

<h1>Users</h1>

{getUsers()}

    </div>
)

}

export default Users
