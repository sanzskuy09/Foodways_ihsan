import { useContext } from "react";
import { useParams } from "react-router-dom";

import { Container, Row } from "react-bootstrap";

import { useMutation, useQuery } from "react-query";
import { API, setAuthToken } from "./../Config/api";

import { CartContext } from "../Contexts/cartContext";

import CardProductDetail from "../Component/DetailPage/CardProductDetail";

const DetailPage = () => {
  const params = useParams();
  const { id } = params;

  const [state, dispatch] = useContext(CartContext);

  const url = `/products/${id}`;

  const { data: productData, isLoading } = useQuery(
    "productCache",
    async () => {
      const response = await API.get(url);
      return response;
    }
  );
  // const checkName = productData?.data?.data?.products[0]?.user.id == id;
  const name = productData?.data?.data?.products[0]?.user?.fullName;

  const addMenuToCart = (product) => {
    dispatch({
      type: "ADD_CART",
      payload: product,
    });
    dispatch({
      type: "RESTAURANT_NAME",
      payload: name,
    });
  };

  return (
    <>
      <div
        style={{ marginLeft: "190px", marginRight: "190px", marginTop: "60px" }}
      >
        <Container
          style={{ marginTop: "73px" }}
          className="d-flex flex-column align-items-sm-start"
        >
          {productData?.data?.data?.products?.length > 0 ? (
            <>
              <h2
                style={{
                  fontSize: "36px",
                  marginBottom: "25px",
                  fontFamily: "serif",
                  fontWeight: "800",
                }}
              >
                {name}, Menu
              </h2>

              <Row className="d-flex">
                {productData?.data?.data?.products?.map((product) => (
                  <CardProductDetail
                    product={product}
                    key={product.id}
                    addMenuToCart={addMenuToCart}
                  />
                ))}
              </Row>
            </>
          ) : (
            <h4 style={{ marginTop: "200px" }}>Maaf Menu Tidak Tersedia</h4>
          )}
        </Container>
      </div>
      {/* <pre>{JSON.stringify(state.carts, 2, null)}</pre> */}
    </>
  );
};

export default DetailPage;
