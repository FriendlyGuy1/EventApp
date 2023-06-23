import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faHeart,
  faSignInAlt,
  faUserPlus,
  faCalendarPlus,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className={`navbar-container ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`menu-line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`menu-line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`menu-line ${isMenuOpen ? "open" : ""}`}></div>
        </div>
        <ul className={`menu ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className="homeIcon">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
          {user ? (
            <>
              {user.role === "admin" && (
                <li>
                  <Link to="/admin">
                    <FontAwesomeIcon icon={faCog} />
                    Admin Panel
                  </Link>
                </li>
              )}
              <li>
                <Link to="/post">
                  <FontAwesomeIcon icon={faCalendarPlus} />
                  Create Event
                </Link>
              </li>
              <li>
                <Link to="/favorite-events">
                  <FontAwesomeIcon icon={faHeart} />
                  Favorite Events
                </Link>
              </li>
              <li>
                <Link to="/" onClick={onLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <div className="nav-link-container">
                  <Link to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} />
                    Login
                  </Link>
                  <Link to="/register">
                    <FontAwesomeIcon icon={faUserPlus} />
                    Register
                  </Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;