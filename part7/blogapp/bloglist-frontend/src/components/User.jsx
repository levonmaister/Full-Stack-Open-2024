import userService from '../services/users'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

const User = (props) => {

    const id = useParams().id
    const user = props.users.find(n => n.id === id)
    const blogs = user.blogs

    return(<div>
        <h1>
            User
        </h1>

        <h2>Added blogs:</h2>

        {blogs.map(blog=><li key={blog.id}>{blog.title}</li>)}

    </div>)
}

export default User
