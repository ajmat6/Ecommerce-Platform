import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home(props) {
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token)
    {
      navigate('/signin')
    }
  }, [])
  
  return (
    <div>
      {/* Jumbtron in Bootstrap 5 */}
      <div className="jumbotron container text-center" style={{margin: '5rem', background: 'white'}}>
          <h1 className="display-4">Welcome to Admins Dashboard</h1>
          <p>Hello my name is ajmat kathat and my name is arya collge of engineering and IT and I am currently in second year of engineering in infromation technology branch</p>
        </div>
    </div>
  )
}

export default Home
