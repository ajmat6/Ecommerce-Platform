import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'
import { useSelector } from 'react-redux';

function Home(props) {
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    if(!auth.authenticate)
    {
      navigate('/signin')
    }
  }, [])
  

  if(!auth.authenticate)
  {
    navigate('/signin')
  }
  
  
  return (
    <div className='mx-3'>
      {/* Jumbtron in Bootstrap 5
      <div className="jumbotron container text-center" style={{margin: '5rem', background: 'white'}}>
          <h1 className="display-4">Welcome to Admins Dashboard</h1>
          <p>Hello my name is ajmat kathat and my name is arya collge of engineering and IT and I am currently in second year of engineering in infromation technology branch</p>
        </div> */}

        <div className='row'>
          <div className='col-md-2 sidebar'>
            SideBar
          </div>
          <div className="col-md-10" style={{marginLeft: 'auto'}}>
            Container
          </div>
        </div>
    </div>
  )
}

export default Home
