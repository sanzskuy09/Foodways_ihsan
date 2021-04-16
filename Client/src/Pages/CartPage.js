import { useContext, useState, useEffect } from "react";
import { CartContext } from "../Contexts/cartContext";
import { useMutation, useQuery } from "react-query";

import { API, setAuthToken } from "../Config/api";

import CardOrder from "../Component/CartPage/CartOrder";

import { Container, FormControl, Button, InputGroup } from "react-bootstrap";
import Logo from "../Assets/Images/map.svg";
import Mapbox from "../Component/CartPage/Mapbox";

const CartPage = () => {
  const [state, dispatch] = useContext(CartContext);

  console.log(state.carts);

  const [showMap, setShowMap] = useState(false);

  const openMap = () => {
    setShowMap((prev) => !prev);
  };

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [delivery, setDelivery] = useState(10000);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tmpQty = 0;
    let tmpPrice = 0;

    state.carts.map((cart) => {
      tmpQty = tmpQty + cart.qty;
      tmpPrice = tmpPrice + cart.price * cart.qty;
    });

    setQuantity(tmpQty);
    setPrice(tmpPrice);
    setTotal(tmpPrice + delivery);
  }, [state.carts]);

  const handleOrder = async () => {
    const products = {
      products: [
        ...state.carts.map((cart) => ({
          id: cart.id,
          qty: cart.qty,
        })),
      ],
    };
    setAuthToken(localStorage.token);
    await API.post("/transaction", products);
  };

  return (
    <div className="container-fluid container-cart">
      <Container style={{ marginTop: "73px" }} className="d-flex flex-column">
        <h2>{state.name}</h2>
        <h6>Delivery Location</h6>
        <InputGroup className="mb-3 input-group">
          <FormControl
            type="text"
            placeholder="Search"
            className=" mr-sm-2 input-map mb-2"
          />
          <Button variant="transparant" className="btn-map" onClick={openMap}>
            Select On Map
            <img alt={Logo} src={Logo} className="ml-2 align-top" />
          </Button>
          <Mapbox showMap={showMap} setShowMap={setShowMap} />
        </InputGroup>
        <h6 style={{ marginBottom: "0px" }}>Review Your Order</h6>
        <div className="d-flex flex-row justify-content-between content">
          <div className="col-sm-8 flex-column content-right">
            <hr />
            {/* Loop start */}
            {state.carts.map((cart) => (
              <CardOrder cart={cart} key={cart.id} />
            ))}
            {/* Loop end */}
          </div>
          <div className=" col-sm-4 flex-column content-left">
            <hr />
            <div className="d-flex mb-2">
              <div className="sub-text">Subtotal</div>
              <div className="ml-auto sub-text text-red">
                Rp {price.toLocaleString()}
              </div>
            </div>
            <div className=" d-flex mb-2">
              <div className="sub-text">Qty</div>
              <div className="ml-auto sub-text">{quantity}</div>
            </div>
            <div className=" d-flex mb-2">
              <div className="sub-text">Ongkir</div>
              <div className="ml-auto sub-text text-red">
                {delivery.toLocaleString()}
              </div>
            </div>
            <hr />
            <div className="d-flex">
              <div className="sub-text text-red text-bold">Total</div>
              <div className="ml-auto sub-text text-red text-bold">
                Rp {total.toLocaleString()}
              </div>
            </div>
            <div className=" d-flex order-btn justify-content-end align-items-start">
              <Button className="btn-order" onClick={handleOrder}>
                Order
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
