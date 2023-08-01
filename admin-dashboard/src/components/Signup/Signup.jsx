import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpCredentials } from '../../reducers/authReducer';


function Signup() {
  // Defining useState hook for signup credentials:
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)

  const userSignUp = (e) => {
    e.preventDefault();

    console.log("signup form submitted")

    const user = {
      firstName, 
      lastName,
      email,
      password
    }

    dispatch(signUpCredentials(user))
  }
  
  // while authenticating:
  if(auth.authenicating)
  {
    return <p>Loading...</p>
  }

  // now if sign up process remains succesfull navigate to Home page:
  if(auth.authenticate)
  {
    setTimeout(() => {
      navigate('/')
    }, 2000);
  }


  return (
    <div className="mt-2" style={{paddingTop: '65px'}}>
     {auth.authenticate && <p style={{alignItems: 'center'}}>{auth.message}</p>}
      <form className="container col-md-4 my-5" onSubmit={userSignUp}>
        <div className="mb-3">
          <div className="row mb-3">
              <div className="col-md-6">
                <label for="exampleInputPassword1" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label for="exampleInputPassword1" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
          </div>
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
