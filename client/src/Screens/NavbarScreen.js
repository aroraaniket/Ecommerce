import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userAction";
//import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OnClickScreen from "./OnClickScreen";

const NavbarScreen = (props) => {
  const userData = useSelector((state) => state.userData);
  const { user } = userData;
  const [Input, setInput] = useState("");
  const [Toggle, setToggle] = useState(false);

  /*const openMenu = () => {
    document.querySelector('.sidebar').classNameList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classNameList.remove('open');
  };*/
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const Logout = () => {
    dispatch(logout());
    props.history.push("signin");
  };
  console.log(props);

  const handleSubmit = (e) => {
    //e.preventDefault();
    //  alert("you have searched for - " + Input);
    props.history.push("/search/" + Input);
    setInput("");
    // or you can send data to backend
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    // console.log(e.keyCode);
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const clickHandler = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className="navbar-div">
      <div className="grd Header-container">
        <div className="logo-div">
          <Link to="/">
            <img
              src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
              alt="logo"
            />
          </Link>
        </div>

        <div className="nav-div">
          <div className="header-ul">
            <Link className="hovereffect" to="/shop/men">
              men
            </Link>
          </div>

          <div className="header-ul">
            <Link className="hovereffect" to="/shop/women">
              Women
            </Link>
          </div>

          <div className="header-ul">
            <Link className="hovereffect" to="/shop/kids">
              kids
            </Link>
          </div>
        </div>
        <div className="desktop-query">
          <input
            placeholder="Search for products, brands and more"
            className="desktop-searchBar"
            value={Input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeypress}
            onKeyUp={handleKeypress}
          />

          <FontAwesomeIcon
            className="fa fa-search desktop-submit"
            icon="search"
            viewBox="0 0 820 820"
          />
        </div>
        <div id="header-menu-icon">
          <div
            onClick={(e) => clickHandler(e.target.value)}
            className="header-icon menu-icon"
          >
            <svg viewBox="0 0 20 20">
              <path
                d="M3.444 5.422a.733.733 0 110-1.466h17.047a.733.733 0 110 1.466H3.444zm0 7.111a.733.733 0 110-1.466h17.047a.733.733 0 110 1.466H3.444zm0 7.111a.733.733 0 110-1.466h17.047a.733.733 0 110 1.466H3.444z"
                fill="#3E4152"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>

          <div className="mob-logo-name">
            <Link to="/">
              <p>Shoopers</p>
            </Link>
          </div>
        </div>

        <div className="mobile-div">
          <div className="mobile-div-link">
            <Link to="/search">
              <FontAwesomeIcon
                className="fa fa-search "
                icon="search"
                viewBox="0 0 820 820"
              />
            </Link>
          </div>

          <div className="mobile-div-link">
            <Link to="/wishlist">
              <i className="fa fa-heart-o fa-9x " aria-hidden="true"></i>
            </Link>
          </div>

          <div className="mobile-div-link">
            <Link to="/cart">
              <FontAwesomeIcon icon="shopping-cart" viewBox="0 0 820 820" />
            </Link>
          </div>
        </div>

        <div className="nav-div-right">
          <div className="desktop-user">
            <a href="" className="header-li-right profile-hover">
              <div className=" fa-2x user-icon icon-profile">
                <FontAwesomeIcon icon="user" viewBox="0 0 300 300" />
              </div>
              <span className="profile-hover">profile</span>
            </a>
            <div className="desktop-userActions">
              <div className="desktop-userActionsContent">
                {user ? (
                  <Link
                    to="/profile"
                    className="desktop-getUserInLinks desktop-getInLinks"
                    style={{
                      color: " #282c3f",
                      textDecoration: "none",
                    }}
                  >
                    {" "}
                    Hello{" "}
                    <span style={{ fontWeight: "500" }}>
                      {" "}
                      {user.name}{" "}
                    </span>{" "}
                  </Link>
                ) : (
                  <div className="desktop-contentInfo">
                    <div className="desktop-infoTitle">Welcome</div>
                    <div className="desktop-infoEmail">
                      To access account and manage orders
                    </div>
                  </div>
                )}
                <div>
                  <div className="desktop-getUserInLinks desktop-getInLinks">
                    {!user && (
                      <Link className="desktop-linkButton" to="/signin">
                        login / Signup
                      </Link>
                    )}
                  </div>

                  <div className="desktop-getInLinks">
                    <a
                      href="/my/orders"
                      data-track="coupons"
                      className="desktop-info"
                    >
                      <div className="desktop-infoSection">Orders</div>
                    </a>
                    <a
                      href="/wishlist"
                      data-track="coupons"
                      className="desktop-info"
                    >
                      <div className="desktop-infoSection">Wishlist</div>
                    </a>

                    <a
                      href="/contactus"
                      data-track="coupons"
                      className="desktop-info"
                    >
                      <div className="desktop-infoSection">Contact Us</div>
                    </a>
                  </div>
                  <div className="desktop-getInLinks">
                    <a
                      href="/my/savedcards"
                      data-track="coupons"
                      className="desktop-info"
                    >
                      <div className="desktop-infoSection">Saved Cards</div>
                    </a>
                    <a
                      href="/my/address"
                      data-track="coupons"
                      className="desktop-info"
                    >
                      <div className="desktop-infoSection">Saved Addresses</div>
                    </a>
                  </div>
                  <div className="desktop-getInLinks">
                    {user && (
                      <a
                        className="desktop-info"
                        href="/"
                        onClick={() => Logout()}
                      >
                        <div className="desktop-infoSection">Logout</div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link to="/wishlist" className="header-li-right">
            <div className=" fa-2x user-icon icon-profile">
              {/*  <FontAwesomeIcon  icon='heart' viewBox="0 0 300 300"   style={{ textShadow: '0 1px 0 rgba(8, 8, 0, 0.1)' }} />
               */}
              <i className="fa fa-heart-o fa-9x " aria-hidden="true"></i>
            </div>
            <span>Wishlist</span>
          </Link>
          <Link to="/cart" className="header-li-right">
            <div
              style={{ left: "12px", bottom: "70px" }}
              className=" fa-2x user-icon icon-profile"
            >
              <FontAwesomeIcon icon="shopping-cart" viewBox="0 0 300 300" />
            </div>
            <span style={{ left: "10px" }}>CARt</span>
          </Link>
        </div>
      </div>
      <OnClickScreen toggle={Toggle} />
    </div>
  );
};

export default NavbarScreen;

{
  /*   <header classNameName='header'>
        <div classNameName='brand'>
          <button onClick={openMenu}>&#9776;</button>
          <Link to='/'>E-commerce</Link>
        </div>
        <div classNameName='header-links'>
          <Link to='/cart'>
            Cart<sup classNameName='cart-icon'> {cartItems.length}</sup>
          </Link>
          {user ? (
            <Link to='/profile'>{user.name}</Link>
          ) : (
            <Link to='/signin'>Sign In </Link>
          )}
          {user && (
            <a href='/' onClick={() => Logout()}>
              <i classNameName='fas fa-sign-out-alt'></i>{' '}
              <span classNameName='hide-sm'>Logout</span>
            </a>
          )}
        </div>
      </header>
      <aside classNameName='sidebar'>
        <h3>Shopping Categories</h3>
        <button classNameName='sidebar-close-button' onClick={closeMenu}>
          x
        </button>
        <ul>
          <li>
            <a href='index.html'>Pants</a>
          </li>
          <li>
            <a href='index.html'>Shirts</a>
          </li>
        </ul>
      </aside>


          */
}
