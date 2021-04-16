import { useContext } from "react";
import { CartContext } from "../../Contexts/cartContext";

import { Button } from "react-bootstrap";

import Delete from "../../Assets/Images/delete.png";

const CartOrder = ({ cart }) => {
  const [state, dispatch] = useContext(CartContext);

  const { id, image, title, price, qty } = cart;

  const addMenuToCart = () => {
    dispatch({
      type: "ADD_CART",
      payload: cart,
    });
  };

  const removeMenuFromCart = () => {
    dispatch({
      type: "REMOVE_CART",
      payload: cart,
    });
  };

  const deleteCart = () => {
    dispatch({
      type: "DELETE_CART",
      payload: cart,
    });
  };

  return (
    <>
      <div className="container-order">
        {console.log(cart.qty)}
        <div className="d-flex justify-content-between content-wrapper">
          <div className="">
            <img alt={image} src={image} className="cart-img" />
          </div>

          <div className="d-flex justify-content-between flex-column col-md-10 mr-4 content">
            <div className="d-flex">
              <div className="mt-2">{title}</div>
              <div className="ml-auto mt-2 text-red">
                Rp {price.toLocaleString()}
              </div>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <button
                  className="d-flex btn btn-counter btn-plus-minus"
                  onClick={() => removeMenuFromCart()}
                >
                  -
                </button>
                <div className="d-flex btn btn-counter btn-counter-color">
                  {cart.qty}
                </div>
                <button
                  className="d-flex btn btn-counter btn-plus-minus"
                  onClick={() => addMenuToCart()}
                >
                  +
                </button>
              </div>
              <div className="ml-auto">
                <Button variant="transparant" className="btn">
                  <img
                    src={Delete}
                    alt={Delete}
                    className="btn-delete"
                    onClick={() => deleteCart()}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default CartOrder;
