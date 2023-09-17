import React, { useEffect, useState } from "react";
import "./navbar.css";
import flipkartLogo from "../../images/logo.png";
import goldenStar from "../../images/goldenstar.png";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUi/MaterialUi";
import { useDispatch, useSelector } from "react-redux";
import { authCredentials, logout, signoutAction } from "../../reducers/userAuthReducer";
import { resetCart } from "../../reducers/cartReducer";
import { Link } from "react-router-dom";

const Header = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function to dipatch signin action:
  const userLogin = () => {
    dispatch(authCredentials({ email, password }));
  }

  // function to dispatch logout action:
  const userLogOut = () => {
    dispatch(signoutAction());
    dispatch(resetCart());
  }

  useEffect(() => {
    if(auth.authenticate)
    {
      setLoginModal(false)
    }
  }, [auth.authenticate])

  const capitalize = (fullname) => {
    const fullNameArray = fullname.split(" ");
    const capitalizedName = fullNameArray.map((name, index) => 
       name[0].toUpperCase + name.slice(1)
    )

    return capitalizedName;
  }

  // when user is logged in, show this drop down menu:
  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a className="fullName">
            {/* {capitalize(auth.userInfo.fullname)} */}
            {auth.userInfo.fullname}
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          { label: "SuperCoin Zone", href: "", icon: null },
          {
            label: "Orders",
            href: "/account/orders",
            icon: null
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "My Charts", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Log Out", href: "", icon: null, onClick: userLogOut },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                // setSignup(true);
              }}
              style={{ color: "#2874f0", cursor: 'pointer' }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    )
  }

  // when user is not logged in, show this drop down menu:
  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              // setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        menus={[
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                // setSignup(true);
              }}
              style={{ color: "#2874f0", cursor: 'pointer' }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    )
  }

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                <MaterialInput
                  type="text"
                  label="Email/Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={<a href="" style={{ cursor: 'pointer', textDecoration: 'none' }}>Forgot Password?</a>}
                />
                <MaterialButton
                  title="Login"
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                  }}
                  onClick={userLogin}
                />

                <p style={{ textAlign: "center" }}>OR</p>
                
                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="#2874f0"
                  style={{
                    margin: "20px 0",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        {/* Logo  */}
        <div className="logo">
          <a href="">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: '-10px', marginRight: "15px" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        {/* logo ends here */}

        {/* search component */}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"Search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        {/* search component ends here */}

        {/* right side menu */}
        <div className="rightMenu">
          {/* Menu to be shown based on wheather user is logged in or not */}
          {
            auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()
          }

          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              { label: "Sell on flipkart", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <Link className="cart" to={'/cart'}>
              <span style={{ fontSize: '23px', marginBottom: '4px', marginRight: '-6px' }}><IoIosCart /></span>
              <span style={{ margin: "0 10px" }}>Cart</span>
            </Link>
          </div>
        </div>
        {/* right side menu ends here */}
      </div>
    </div>
  );
};

export default Header;