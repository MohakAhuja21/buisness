import "./SignUp.css";
import logo from "../images/logo white.png";
import React, {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// importing firebase items
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";

// LocalStorage code is copied from https://blog.logrocket.com/using-localstorage-react-hooks/

function SignUp() {
  // const [username, setUserName] = useState("");
  const [username, setUserName] = useState(()=>{
    const saved = localStorage.getItem("username");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
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
  // const [address, setAddress] = useState("");
  const [address, setAddress] = useState(()=>{
    const saved = localStorage.getItem("address");
  const initialValue = JSON.parse(saved);
  return initialValue || "";
  });
  // const [phonenumber, setPhoneNumber] = useState("");
  const [phonenumber, setPhoneNumber] = useState(()=>{
    const saved = localStorage.getItem("phonenumber");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // localStorage
  useEffect(() => {
    localStorage.setItem("email", JSON.stringify(email));
  }, [email]);
  useEffect(() => {
    localStorage.setItem("password", JSON.stringify(password));
  }, [password]);
  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);
  useEffect(() => {
    localStorage.setItem("phonenumber", JSON.stringify(phonenumber));
  }, [phonenumber]);
  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(username));
  }, [username]);


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
            // setPassword("");
            // setEmail("");
            setAddress("");
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
    <div>
      {/* header > navbar */}
      <div className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="website logo" />
        </Link>
      </div>
      <div className="signup">
        <div className="signup__container">
          <form className="signup__form" onSubmit={handleSubmit}>
            <h1>Sign up</h1>
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
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="First and Last name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Contact Number"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button className="signup__button" type="submit">
              Create your account
            </button>
            <div>
              <span>Already have an account ?</span>
              <Link to="/login">
                <button className="signup__registerButton">Login</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
