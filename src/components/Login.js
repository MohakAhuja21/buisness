import "./Login.css";
import logo from "../images/logo white.png";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import firebase items
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function Login() {
  const [password, setPassword] = useState(()=>{
    const saved = localStorage.getItem("password");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [email, setEmail] = useState(()=>{
    const saved = localStorage.getItem("email");
  const initialValue = JSON.parse(saved);
  return initialValue || "";
  });
  // const [email, setEmail] = useLocalStorage("email",email);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();  

 // localStorage
 useEffect(() => {
  localStorage.setItem("email", JSON.stringify(email));
}, [email]);
useEffect(() => {
  localStorage.setItem("password", JSON.stringify(password));
}, [password]);


  const handleLogin = (e) => {
    // localStorage
    // localStorage.setItem('email',email);
    // localStorage.setItem('password',password);

    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccessMsg("Logged in successfully. Redirecting to Homepage");
        // setPassword("");
        // setEmail("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/home");
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
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
  };

  return (
    <div>
      {/* header > navbar */}
      <div className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="website logo" />
        </Link>
      </div>
      <div className="login">
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
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login__button" onClick={handleLogin}>
              Login
            </button>

            {/* localStorage */}
            {/* <div>
              <div>{localStorage.getItem("email")}</div>
              <div>{localStorage.getItem("password")}</div>
            </div> */}

            <div>
              <span>Don't have an account ?</span>
              <Link to="/signup">
                <button className="login__registerButton">
                  Create your account
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
  
export default Login;
