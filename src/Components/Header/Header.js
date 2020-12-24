import React from "react";
import "./Header.css";

import SearchIcon from "@material-ui/icons/Search";
import LocalMallSharpIcon from "@material-ui/icons/LocalMallSharp";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebase";

function Header() {
  const [{ bag, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/" className="a">
        <h1 className="header__logo">ozone</h1>
      </Link>
      <div className="header__search">
        <input
          placeholder="Search here!"
          className="header__searchInput"
          type="text"
        />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"} className="a">
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">
              Hello {!user ? "Shoper" : user?.email}!
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "SignIn"}
            </span>
          </div>
        </Link>

        <Link to="/orders" className="a">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Monthly</span>
          <span className="header__optionLineTwo">Deals</span>
        </div>

        <Link to="/checkout" className="a">
          <div className="header__optionBasket">
            <LocalMallSharpIcon />
            <span className="header__optionLineTwo header__basketCount">
              {bag?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
