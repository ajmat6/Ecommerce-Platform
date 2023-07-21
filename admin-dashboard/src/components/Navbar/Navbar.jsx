import React from 'react'
import {Link} from 'react-router-dom'
import {Nav, NavDropdown, Container } from 'react-bootstrap'
import {useNavigate}  from 'react-router-dom'

function Navbar() {

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-default">
        {/* <Container> */}
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Admin - Dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <Link className={`nav-link ${location.pathname === "/"? "active" : ""}`} aria-current="page" to="/"> */}
                {/* <Link className='nav-link active' aria-current="page" to="/">
                  Home
                </Link> */}
              </li>
              <li className="nav-item">
                {/* <Link className={`nav-link ${location.pathname === "/about"? "active" : ""}`} to="/about">
                // <Link className='nav-link active' to="/about">
                  About
                </Link> */}
              </li>
            </ul>

            {/* When auth token is present in the localStorage then don't show login and signup, show logout */}
            {!localStorage.getItem('token')? <form className="d-flex" role="search">
              <Link className="btn btn-secondary mx-1" to="/signin" role="button">Login</Link>
              <Link className="btn btn-secondary mx-1" to="/signup" role="button">Sign Up</Link>
            </form> : <button className="btn btn-secondary mx-1" onClick={logout}>Logout</button>} 
          </div>
        </div>
        {/* </Container> */}
      </nav>
    </div>
  )
}

export default Navbar;
