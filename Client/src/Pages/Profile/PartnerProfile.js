import { Link } from "react-router-dom";

import FullProfile from "./../../Assets/Images/full-profile-partner.png";
import Logo from "./../../Assets/Images/logo.svg";

const PartnerProfile = () => {
  return (
    <div className="">
      <div className="profile-container">
        <div className="profile">
          <h3 className="title-profile">Profile Partner</h3>
          <div className="profile-wrapper">
            <div className="left">
              <div className="img-wrapper">
                <img src={FullProfile} alt="" />
              </div>
              <Link to="/edit-partner">
                <button>Edit Profile</button>
              </Link>
            </div>
            <div className="right">
              <div className="bio">
                <b>Name Partner</b>
                <p>Geprek Bensu</p>
              </div>
              <div className="bio">
                <b>Email</b>
                <p>bensu@email.com</p>
              </div>
              <div className="bio">
                <b>Phone</b>
                <p>083896833122</p>
              </div>
            </div>
          </div>
        </div>
        <div className="history">
          <h3 className="title-profile">History Order</h3>
          <div className="list-history">
            <div className="wrapper-history">
              <div className="left">
                <p className="title">Andi</p>
                <p className="date">
                  <b>Saturday</b>, 12 March 2021
                </p>
                <p className="total">
                  <b>Total</b> : Rp 45.000
                </p>
              </div>
              <div className="right d-flex flex-lg-column">
                <div className="logo">
                  <img src={Logo} alt="" />
                </div>
                <div className="status mt-4">
                  <p>Finished</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
