import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

import { UserContext } from "../../Contexts/userContext";

import Sign from "./../Navbar/Sign";
import Register from "./../Navbar/Register";

const CardRestaurant = ({ user }) => {
  const history = useHistory();

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [state, dispatch] = useContext(UserContext);

  const { id, fullName, image, location } = user;

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

  return (
    <Col className="mb-4">
      <Card
        style={{
          width: "250px",
          height: "220px",
          borderRadius: "5px",
          marginRight: "5px",
        }}
      >
        <Card.Body className="d-flex flex-column align-items-center card-restaurant-body ">
          {state.isLogin ? (
            <Card.Img
              src={image}
              alt={image}
              className="card-img"
              onClick={() => {
                history.push(`/detail/${id}`);
              }}
            />
          ) : (
            <>
              <Card.Img
                src={image}
                alt={image}
                className="card-img"
                onClick={openModalLogin}
              />
              {/* modal */}
              <Sign
                showLogin={showLogin}
                setShowLogin={setShowLogin}
                changeModal={changeModal}
              />
              <Register
                showRegister={showRegister}
                setShowRegister={setShowRegister}
                changeModal={changeModal}
              />
            </>
          )}

          <div className="d-flex flex-column align-self-start mt-2">
            <Card.Title className="card-title">{fullName}</Card.Title>
            <Card.Subtitle className="align-self-start card-subtitle">
              {location}1 KM
            </Card.Subtitle>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardRestaurant;
