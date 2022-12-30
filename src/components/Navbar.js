import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'

function Navbar() {

// mobile navbar
const[isOpen,setIsOpen]=useState(false);

  return (
    <div className="header">
        <Link to ="/">
        <img
          className="header__logo"
          src="https://icones.pro/wp-content/uploads/2021/08/logo-amazon-orange.png "
          alt="website logo"
        />
        </Link>
      {/* adding mobile navbar functionality to header nav */}
      <div className={`header__nav ${isOpen && "open"}`}>
        {/* if there is no user, only then push to login page */}
        <Link to="/login"> 
          <div className="header__option">
            <span className="header__optionLineOne">Hello guest</span>
            <span className="header__optionLineTwo">Sign in</span>
          </div>
          </Link>
        <div className="header__option">
          <span className="header__optionLineOne">returns &</span>
          <span className="header__optionLineTwo">Order</span>
        </div>
        <Link to="/cart">
        <div className="header__optionBasket">
          <span className="header__optionLineTwo header__basketCount">0</span>
        </div>
        </Link>
      </div>

      {/* // mobile navbar */}
      <div className={`nav-toggle ${isOpen && "open"}`} onClick={()=>setIsOpen(!isOpen)}>
        <div className="bar"></div>
      </div>
</div>
  )
}

export default Navbar