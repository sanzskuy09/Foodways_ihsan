import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { API, setAuthToken } from "../../Config/api";

import { UserContext } from "../../Contexts/userContext";

import FullProfile from "./../../Assets/Images/full-profile.png";
import HistoryTransaction from "../../Component/Profile/HistoryTransaction";

const UserProfile = () => {
  const [state] = useContext(UserContext);
  const { id, fullName, email, phone, image, role } = state.user;

  const { data: transactionData, refecth } = useQuery(
    "historyCache",
    async () => {
      const response = await API.get(
        role === "partner" ? "/transactions" : "/my-transactions"
      );
      return response.data.data.transactions;
    }
  );

  console.log(transactionData);

  return (
    <div>
      <div className="profile-container">
        <div className="profile">
          <h3 className="title-profile">My Profile</h3>
          <div className="profile-wrapper">
            <div className="left">
              <div className="img-wrapper">
                <img src={FullProfile} />
              </div>
              <Link to="/edit-user">
                <button>Edit Profile</button>
              </Link>
            </div>
            <div className="right">
              <div className="bio">
                <b>Full Name</b>
                <p>{fullName}</p>
              </div>
              <div className="bio">
                <b>Email</b>
                <p>{email}</p>
              </div>
              <div className="bio">
                <b>Phone</b>
                <p>{phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <h3 className="title-history">
            History {role === "partner" ? "Transactions" : "Orders"}
          </h3>
          {transactionData?.map((history) => (
            <HistoryTransaction history={history} key={history.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
