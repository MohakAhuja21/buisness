import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/logo white.png";
// firebase items
import { auth, db } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

function Navbar() {
  // showing user info.
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");

    // checking if user is logged or not
    useEffect(() => {
      auth.onAuthStateChanged((userLogged) => {
        if (userLogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userLogged.uid)
            );
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggedUser = GetCurrentUser();

  // logout functionality
  const navigate = useNavigate();
  // if user logout then redirect to login page.
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  // mobile navbar
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="website logo" />
      </Link>
      {/* if user is not logged in */}
        {!loggedUser && 
        <nav className={`header__nav ${isOpen && "open"}`}>
      {/* adding mobile navbar functionality to header nav */}
          <div className="header__option">
            <Link to="/signup" style={{textDecoration:"none"}}>
            <span className="header__optionLineOne">
              Create an account
            </span>
            <br></br>
            <span className="header__optionLineTwo">
              Register
            </span>
            </Link>
          </div>
          <div className="header__option">
            <Link to="/login" style={{textDecoration:"none"}}>
            <span className="header__optionLineOne">
              Existing user
            </span>
            <br></br>
            <span className="header__optionLineTwo">
              Login
            </span>
            </Link>
          </div>
        <Link to="/cart" style={{textDecoration:"none"}}>
        <div className="header__option">
          <span className="header__optionLineOne">returns &</span>
          <span className="header__optionLineTwo">Order</span>
        </div>
        </Link>
        <div className="header__optionBasket">
        <span className="header__optionLineTwo header__basketCount">0</span>
        </div>
      </nav>
      }
      {/* if user is logged in */}
        {loggedUser && 
        <nav className={`header__nav ${isOpen && "open"}`}>
          <div className="header__option" style={{cursor:"none"}}>
            <span className="header__optionLineOne">
              Hello,
            </span>
            <span className="header__optionLineTwo">
              {loggedUser? loggedUser[0].username: ""}
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </span>
          </div>
        <Link to="/cart" style={{textDecoration:"none"}}>
        <div className="header__option">
          <span className="header__optionLineOne">returns &</span>
          <span className="header__optionLineTwo">Order</span>
        </div>
        </Link>
        <div className="header__optionBasket">
           {/* if user is logged in. Then show the no. of items which are there in cart. */}
        <span className="header__optionLineTwo header__basketCount">{loggedUser[0].cart}</span>
        </div>
      </nav>
      }

      {/* // mobile navbar */}
      <div
        className={`nav-toggle ${isOpen && "open"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="bar"></div>
      </div>

      <Link to="/checkout" style={{ textDecoration: "none" }}>
        <div className="header__optionBasketMobile">
          {/* changing basket count from 0 to this code. */}
          {/* ? here is know as optional chaining */}
          <span className="header__optionLineTwo header__basketCount">
            {/* {basket?.length} */}
          </span>
        </div>
      </Link>
      
    </div>
  );
}

export default Navbar;
