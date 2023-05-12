import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'

const Main = () => {
  const [auth,setAuth] = useAuth()
  const navigate = useNavigate()
  const logout = () => {
    setAuth({
      user: null,
      newToken: "",
      refreshToken: "",
    })
    localStorage.removeItem('auth')
    navigate('/')
  }
  const loggedIn = auth?.user !== null && auth?.newToken !== null && auth.refreshToken !== null

  const isLoggedIn = () => {
    if(loggedIn){
      navigate('/ad/create')
    } else{
      navigate('/')
    }
  }
  return (
    <nav className="nav d-flex justify-content-between lead">
      {!loggedIn &&
      <>
         <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </>
      }

       <a className="nav-link" aria-current="page" onClick={isLoggedIn}>
          Post Ad
        </a>

{loggedIn && 
    <div className="dropdown">
      <li>
        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
          {loggedIn && auth?.user?.username}
        </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={logout} className="nav-link">Logout</NavLink>
                </li>
            </ul>
         
        
      </li>
    </div>
  }
  </nav>
  )
}

export default Main
