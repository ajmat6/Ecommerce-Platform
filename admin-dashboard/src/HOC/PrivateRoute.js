import React from 'react'
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../components/Home/Home'

function PrivateRoute (props) {
    let navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if(!token)
      {
        // return <Routes>
        //     <Route {...props}/>
        // </Routes>
        navigate('/signin')
      }
    }, [])
    
//     return (
//         <Routes>
//             <Route {...rest} component={ (props) => {
//                 const token = window.localStorage.getItem('token');
//                 if(token)
//                 {
//                     return <Component {...props} />
//                 }

//                 else
//                 {
//                     return navigate('/signin')
//                 }
                
//             }}/>
//         </Routes>
//   ) 

    return <Routes> <Route {...props}/> </Routes>
}

export default PrivateRoute
