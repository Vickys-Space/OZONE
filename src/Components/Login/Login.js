import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    // firebase login
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  // Email ID : 
  // vignesh@gmail.com

  // password : 
  // Vicky@OZONE

  const register = (e) => {
    e.preventDefault();
    //  firebase register
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login__window">
      <div className="login">
        <Link className="a" to="/">
          <h1 className="logo">ozone</h1>
        </Link>
        <div className="login__container">
          <h1>SignIn</h1>
          <form>
            <h5 className="input_style">E-Mail</h5>
            <input
              type="text"
              placeholder="Enter Your E-Mail ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h5 className="input_style">Password</h5>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={signIn}
              type="submit"
              className="login__signInButton"
            >
              Sign In
            </button>
          </form>
          <p>
            By signing-in you agree to the{" "}
            <span className="login__span">ozone</span>'s terms and Conditions of
            Use & Sale. Please see our Privacy Notice, our Cookies Notice and
            our Interest-Based Ads Notice.
          </p>
        </div>
        <div className="login__createAccount">
          <p>
            New to{" "}
            <span span className="login__span">
              ozone
            </span>
            ?
          </p>
          <button onClick={register} className="login__registerButton">
            Create your <span className="login__span">ozone</span> Account
          </button>
        </div>
        {/* <div className="end"/> */}
      </div>
    </div>
  );
}

export default Login;
