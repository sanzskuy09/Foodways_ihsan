import { Card, Col } from "react-bootstrap";

const CardPopular = ({ PopularRestaurant }) => {
  const { title, img } = PopularRestaurant;

  return (
    <Col className="mb-4">
      <Card
        style={{
          width: "250px",
          height: "95px",
          borderRadius: "5px",
          marginRight: "5px",
        }}
      >
        <Card.Body className="d-flex card-body">
          <div className="d-flex align-items-center">
            <div>
              <Card.Img src={img} className="card-popular-img" />
            </div>
            <div className="card-text text-nowrap">
              <h4>{title}</h4>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CardPopular;
