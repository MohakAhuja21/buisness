import "./Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import firebase items
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();


  const handleLogin=(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      setSuccessMsg("Logged in successfully.Redirecting to Homepage")
      setPassword('')
setEmail('')
setErrorMsg('')
setTimeout(() => {
  setSuccessMsg('');
  navigate('/home');
}, 4000);
    })
    .catch((error) => {
      const errorCode=error.code;
      // these error.message code from firebase can be changed in future. Because of this code can also break !!
      if (error.message == "Firebase:error(auth/invalid-email).") {
        setErrorMsg("please fill all required details");
      }
      if (error.message == "Firebase:error(auth/invalid-password).") {
        setErrorMsg("Wrong password");
      }
      if (error.message == "Firebase:error(auth/user-not-found).") {
        setErrorMsg("user not found");
      }
    });
  }





  return (
    <div className="login">
      {/* <Navbar /> */}
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        ></img>
      </Link>
      <div className="login__container">
        <form className="login__form">
          <h1>Login</h1>
          {/* showing success and error messages */}
          {successMsg && (
            <>
              <div className="success__msg">{successMsg}</div>
            </>
          )}
          {errorMsg && (
            <>
              <div className="error__msg">{errorMsg}</div>
            </>
          )}
          <label>email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <label>password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login__button" onClick={handleLogin}>
            Login
          </button>
          <div>
            <span>Don't have an account ?</span>
            <Link to="/signup">
              <button className="login__registerButton">Create your account</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
