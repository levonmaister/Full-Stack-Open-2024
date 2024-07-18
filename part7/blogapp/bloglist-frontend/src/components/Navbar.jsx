import React from 'react'
import { Link } from 'react-router-dom'
import './shit.css'

const Navbar = ({ user, handleLogout }) => {
  const padding = { padding: 5 }

  return (
    <div className="navbar">
      <Link className="nav-link" to="/">home</Link>
      <Link className="nav-link" to="/users">users</Link>
      <div className="logout-section">
        <p style={{ display: 'inline' }}>
          {user.name} logged in
          <button type="button" onClick={handleLogout} className="logout-button">
            logout
          </button>
        </p>
      </div>
    </div>
  )
}

export default Navbar;
