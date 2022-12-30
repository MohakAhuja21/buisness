import './SignUp.css'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// importing firebase items
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // prevents page from re-freshing
    e.preventDefault();
    // while authenticating only two things are needed. email and password. Auth here is used here for collecting other things that goes in our database(firestore).
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const initialCartValue = 0;
        console.log(user);
        // users name folder will be created and it will store users record as below
        addDoc(collection(db, "users"), {
          // key:value pair.
          username: username,
          email: email,
          password: password,
          phonenumber: phonenumber,
          cart: initialCartValue,
          address: address,
          // unique id same in authentication and firestore.
          uid: user.uid,
        })
          .then(() => {
            setSuccessMsg(
              "Account created successfully. Redirecting to Login page"
            );
            // after login it's value will get to null.
            setUserName("");
            setPassword("");
            setEmail("");
            setPhoneNumber("");
            setErrorMsg("");

            setTimeout(() => {
              setSuccessMsg("");
              navigate("/login");
            }, 4000);
          })
          // whatever the error will be displayed over here.!
          .catch((error) => {
            setErrorMsg(error.message);
          });
      })
      .catch((error) => {
        // these error.message code from firebase can be changed in future. Because of this code can also break! 
        if (error.message == "Firebase:error(auth/invalid-email).") {
          setErrorMsg("please fill all required details");
        }
        if (error.message == "Firebase:error(auth/email-already-exists).") {
          setErrorMsg("user already exists");
        }
      });
  };

  return (
    <div className="signup">
      {/* <Navbar /> */}
      <Link to="/">
        <img className="signup__logo" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"></img>
        </Link>
      <div className="signup__container">
        <form className="signup__form" onSubmit={handleSubmit}>
          <h1>sign up</h1>
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
          <label>name</label>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="First and Last name"
          />
          <label>email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <label>password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>mobile number</label>
          <input type="tel" onChange={(e) => setPhoneNumber(e.target.value)} />
          <label>address</label>
          <input type="tel" onChange={(e) => setAddress(e.target.value)} />

          <button className="signup__button" type="submit">Create your account</button>
          <div>
            <span>
              Already have an account ?
            </span>
            <Link to="/login">
            <button className='signup__registerButton'>
            Login
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
