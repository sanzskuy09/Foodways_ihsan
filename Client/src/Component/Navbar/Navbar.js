import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";

import { UserContext } from "../../Contexts/userContext";

import ICProfile from "../../Assets/Images/user.svg";
import ICAddProduct from "../../Assets/Images/add-product.svg";
import ICLogout from "../../Assets/Images/logout.svg";
import Profil from "../../Assets/Images/profil-user.png";
import ProfilPartner from "../../Assets/Images/profil-partner.png";

import Sign from "./Sign";
import Register from "./Register";

const Navbar = () => {
  const [state, dispatch] = useContext(UserContext);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const history = useHistory();

  const openModalRegister = () => {
    setShowRegister((prev) => !prev);
  };

  const openModalLogin = () => {
    setShowLogin((prev) => !prev);
  };

  const changeModal = () => {
    setShowRegister((prev) => !prev);
    setShowLogin((prev) => !prev);
  };

  const Logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <nav className="navbar navbar-color">
      <div className="container-fluid">
        <div className="navbar-brand">
          <Link
            to={state.isPartner ? "/dashboard" : "/"}
            className="brand-title"
          >
            FoodWays
            <img src="./images/brand-img.svg" alt="" className="ml-2" />
          </Link>
        </div>
        <div className="navbar-brand d-flex align-items-center">
          {!state.isLogin ? (
            <>
              <Button
                variant="transparent"
                className="sign-btn text-form"
                onClick={openModalRegister}
              >
                Register
              </Button>
              <Button
                variant="transparent"
                className="sign-btn text-form ml-3"
                onClick={openModalLogin}
              >
                Login
              </Button>
              {/* modal */}
              <Register
                showRegister={showRegister}
                setShowRegister={setShowRegister}
                changeModal={changeModal}
              />
              <Sign
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                changeModal={changeModal}
              />
            </>
          ) : (
            <>
              {/* {state.isPartner && history.push("/dashboard")} */}
              {!state.isPartner && (
                <Link to="/cart">
                  <img
                    src="./images/cart-bag.png"
                    alt=""
                    className="img-cart"
                  />
                </Link>
              )}
              <Dropdown className="ml-3">
                <Dropdown.Toggle
                  variant="transparen"
                  className="dropdown-after-login"
                >
                  <img
                    src={state.isPartner ? ProfilPartner : Profil}
                    alt={state.isPartner ? ProfilPartner : Profil}
                    className="img-user"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-container">
                  <Link
                    to={"/profile-user"}
                    style={{ textDecoration: "none", color: "#000000" }}
                  >
                    <div className="menu-dropdown d-flex ">
                      <img src={ICProfile} alt="{ICProfile}" />
                      <p>Profile</p>
                    </div>
                  </Link>

                  {state.isPartner && (
                    <Link
                      to="/addproduct"
                      style={{ textDecoration: "none", color: "#000000" }}
                    >
                      <div className="menu-dropdown d-flex ">
                        <img src={ICAddProduct} alt="{ICAddProduct}" />
                        <p>Add Product</p>
                      </div>
                    </Link>
                  )}

                  <Dropdown.Divider style={{ backgroundColor: "black" }} />
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "#000000" }}
                  >
                    <div className="menu-dropdown d-flex" onClick={Logout}>
                      <img src={ICLogout} alt="{ICLogout}" />
                      <p>Logout</p>
                    </div>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>{" "}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
