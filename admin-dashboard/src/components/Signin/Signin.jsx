import React, { useState, useEffect } from "react";
import { authCredentials } from "../../reducers/authReducer";
import { useSelector } from "react-redux"; // importing useSelector to get hold of states in store
import { useDispatch } from "react-redux"; // to dispatch an action

function Signin() {
  // Defining useState hook for email and password:
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Errors, setErrors] = useState('');
  
  const credentials = useSelector((state) => state.auth) // here auth is one of the reducer in redux store
  const dispatch = useDispatch(); // to use useDispatch storing it in a variable
  
  // Dispatching authCredentials action using useEffect hook:
  
  // function to pass credentials to the authAction action on the submit of the form:
  const userLogin = (e) => {
    e.preventDefault();
    console.log("Form submitted")
    
    const user = {
      email: Email,     // sending entered email and password to the authAction
      password: Password
    }
    
    dispatch(authCredentials(user));
    // credentials.email = Email // Diapatching action using useDispatch and passing credentials of user as arguments
    // credentials.password = Password
  }

  useEffect(() => {
  }, [])

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
            value={Email} // assigning value using useState hook
            onChange={(e) => setEmail(e.target.value)} // on change of input field setting email as target value (entered value)
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
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
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
