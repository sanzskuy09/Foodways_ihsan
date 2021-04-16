import Logo from "./../../Assets/Images/logo.svg";

import { useState, useEffect, useContext } from "react";

import { UserContext } from "../../Contexts/userContext";

const HistoryTransaction = ({ history }) => {
  const { orders, createdAt } = history;

  const [state] = useContext(UserContext);
  const { id, fullName, email, phone, image, role } = state.user;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date(createdAt);
  const day = `${dayNames[d.getDay()]}, `;

  const time = `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()} 
  ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

  const [price, setPrice] = useState(0);

  const countPrice = () => {
    let tmpPrice = 0;
    let ongkir = 10000;
    orders.map((menu) => {
      tmpPrice += menu?.product?.price * menu.qty;
    });
    setPrice(tmpPrice + ongkir);
  };

  useEffect(() => {
    countPrice();
  }, [history]);

  return (
    <div className="history">
      <div className="list-history">
        <div className="wrapper-history">
          <div className="left">
            <p className="title">
              {role === "partner"
                ? history?.userOrder?.fullName
                : orders[0]?.product?.user?.fullName}
            </p>
            <p className="date">
              <strong>{day}</strong> {time}
            </p>
            <p className="total">
              <b>Total</b> : Rp {price.toLocaleString()}
            </p>
          </div>
          <div className="right d-flex flex-lg-column">
            <div className="logo">
              <img src={Logo} alt="" />
            </div>
            {history.status === "Success" && (
              <div className="status status-success mt-4">
                <p>{history.status}</p>
              </div>
            )}
            {history.status === "Cancel" && (
              <div className="status status-cancel mt-4">
                <p>{history.status}</p>
              </div>
            )}
            {history.status === "Waiting Approve" && (
              <div className="status status-waiting mt-4">
                <p>{history.status}</p>
              </div>
            )}
            {history.status === "On the Way" && (
              <div className="status mt-4">
                <p>{history.status}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTransaction;
