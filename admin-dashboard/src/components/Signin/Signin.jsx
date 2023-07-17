import React from "react";
import { authAction } from "../../reducers/authReducer";
import { useSelector } from "react-redux"; // importing useSelector to get hold of states in store
import { useDispatch } from "react-redux"; // to dispatch an action


function Signin() {
  const credentials = useSelector((state) => state.auth.name)
  const dispatch = useDispatch(); // to use useDispatch storing it in a variable

  // function to pass credentials to the authAction action on the submit of the form:
  const userLogin = (e) => {
    e.preventDefault();
    console.log("Form submitted")

    const user = {
      email: "ajmat@gmail.com",
      password: "Ak579123"
    }

    dispatch(authAction(user)) // Diapatching action using useDispatch and passing credentials of user as arguments
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
