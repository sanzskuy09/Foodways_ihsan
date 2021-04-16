import InputImage from "../Assets/Images/input-img.png";

import { useState, useEffect, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../Config/api";

import { Container, Row } from "react-bootstrap";
import "../App.css";

import { UserContext } from "../Contexts/userContext";

import CardDetailPartner from "../Component/Profile/CardDetailPartner";

import swal from "sweetalert";

const AddProduct = () => {
  const [state] = useContext(UserContext);
  const { id } = state.user;

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: null,
  });
  const { title, price, image } = form;

  const onChange = (e) => {
    const tempForm = { ...form };
    tempForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;
    setForm(tempForm);
  };

  const { data: productData, refetch } = useQuery("productCache", async () => {
    const response = await API.get(`/products/${id}`);
    return response;
  });

  const addProduct = useMutation(async () => {
    const body = new FormData();

    body.append("title", title);
    body.append("price", price);
    body.append("imageFile", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await API.post("/product", body, config);
    console.log(response);
    refetch();

    setForm({
      title: "",
      price: "",
      image: null,
    });
  });

  const deleteProduct = useMutation(async (id) => {
    await API.delete(`/product/${id}`);
    refetch();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct.mutate();
    openSwal();
  };

  const handleDelete = (id) => {
    swal({
      text: "Are you sure to delete this product?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("product has been deleted!", {
          icon: "success",
          buttons: false,
        });
        deleteProduct.mutate(id);
      } else {
        swal({
          text: "Your Product is safe!",
          buttons: false,
        });
      }
    });
  };

  const openSwal = () => {
    swal({
      title: "Done!",
      text: "user successfully updated",
      icon: "success",
      timer: 2000,
      button: false,
    });
  };

  return (
    <>
      <div className="container">
        <div className="container-edit">
          <div className="profile">
            <h3 className="title-profile">Add Product</h3>
            <form onSubmit={handleSubmit}>
              <div className="profile-wrapper">
                <div className="text-input">
                  <input
                    type="text"
                    className=""
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={(e) => onChange(e)}
                  />
                  <input
                    type="file"
                    id="file"
                    className="col-md-2"
                    name="image"
                    onChange={(e) => onChange(e)}
                  />
                  <label for="file">
                    Attach Image
                    <img src={InputImage} alt="" />
                  </label>
                </div>
                <div className="text-input">
                  <input
                    type="text"
                    className="col-md-12"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div className="input-save save-product">
                  <button className="btn btn-save"> Save </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <hr style={{ border: "1px solid black", borderRadius: "5px" }} />
      </div>
      <div className="container">
        <h1 className="heading font-weight-semibold mb-5">Product List</h1>
      </div>

      <div className="container">
        <Row className="d-flex">
          {productData?.data?.data?.products?.map((product) => (
            <CardDetailPartner
              product={product}
              key={product.id}
              handleDelete={handleDelete}
            />
          ))}
        </Row>
      </div>
    </>
  );
};

export default AddProduct;
