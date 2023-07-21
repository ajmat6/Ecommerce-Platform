import React, { useState } from "react";
import { authCredentials } from "../../reducers/authReducer";
import { useSelector } from "react-redux"; // importing useSelector to get hold of states in store
import { useDispatch } from "react-redux"; // to dispatch an action
import { useNavigate } from "react-router-dom";

function Signin() {
  // Defining useState hook for email and password:
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  // const [errors, seterrors] = useState('');
  
  const auth = useSelector((state) => state.auth) // here auth is one of the reducer in redux store
  const dispatch = useDispatch(); // to use useDispatch storing it in a variable
  const navigate = useNavigate();
    
  // function to pass credentials to the authAction action on the submit of the form:
  const userLogin = async (e) => {
    e.preventDefault();
    console.log("Form submitted")
    
    const user = {
      email, password     // sending entered email and password to the authAction
    }
    
    dispatch(authCredentials(user));
  }
  
  // now if sign in process remains succesfull navigate to Home page:
  if(localStorage.getItem('token'))
  {
    return navigate('/');
  }

  return (
    <div className="mt-2">
      <form className="container col-md-3 my-5" onSubmit={userLogin}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email} // assigning value using useState hook
            onChange={(e) => setemail(e.target.value)} // on change of input field setting email as target value (entered value)
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
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
  );
}

export default Signin;
