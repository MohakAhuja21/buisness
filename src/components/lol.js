{!loggedUser && (
    <nav>
      <Link to="/">
        <button className="navbar__option">home</button>
      </Link>
      <Link to="/signup">
        <button className="navbar__option">register</button>
      </Link>
      <Link to="/login">
        <button className="navbar__option">login</button>
      </Link>
      <div className="navbar__optionBasket">
        <span className="navbar__basketCount">0</span>
      </div>
      <Link to="/profile">
{/* user logo icon */}
      </Link>
    </nav>
  )}
  {/* if user is logged in */}
  {loggedUser && (
    <nav>
      <Link to="/">
        <button>home</button>
      </Link>
      <div className="cart-btn">
        {/* cart logo here */}
        <span>{loggedUser[0].cart}</span>
        {/* if user is logged in. Then show the no. of items which are there in cart. */}
      </div>
      <Link to="/profile">{/* user logo icon */}</Link>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  )}