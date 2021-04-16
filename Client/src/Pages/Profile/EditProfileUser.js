import { useState, useEffect, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../../Config/api";

import { UserContext } from "../../Contexts/userContext";

import InputImage from "../../Assets/Images/input-img.png";
import Map from "../../Assets/Images/map.svg";

import swal from "sweetalert";

const EditProfileUser = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    image: null,
    location: "Depok",
  });
  const { id } = state.user;
  const { email, fullName, phone, image, location } = form;

  const loadUserData = async () => {
    const res = await API.get(`/user/${id}`);
    const user = res.data.data.users;
    setForm({
      ...form,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    });
  };

  const updateUser = useMutation(async () => {
    const body = new FormData();
    body.append("fullName", fullName);
    body.append("email", email);
    body.append("phone", phone);
    body.append("location", location);
    body.append("image", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await API.patch(`/user/${id}`, body, config);
    dispatch({
      type: "EDIT_SUCCESS",
      payload: {
        ...res.data.data.user,
        token: localStorage.token,
      },
    });

    setForm({
      fullName: "",
      email: "",
      phone: "",
      image: null,
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser.mutate();
    openSwal();
    !updateUser?.error && history.push("/profile-user");
  };

  const onChange = (e) => {
    const tempForm = { ...form };
    tempForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0]?.name : e.target.value;
    setForm(tempForm);
  };

  const openSwal = () => {
    swal({
      title: "Done!",
      text: "product successfully added",
      icon: "success",
      timer: 2000,
      button: false,
    });
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <div className="container">
      <div className="container-edit">
        <div className="profile">
          <h3 className="title-profile">Edit Profile</h3>

          {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}

          <form onSubmit={handleSubmit}>
            <div className="profile-wrapper">
              <div className="text-input">
                <input
                  type="text"
                  className=""
                  placeholder="Full Name"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => onChange(e)}
                />
                {/* <input
                  type="file"
                  id="file"
                  className="col-md-2"
                  name="image"
                  value={image}
                  onChange={(e) => onChange(e)}
                />
                <label htmlFor="file">
                  Attach Image
                  <img src={InputImage} alt="" />
                </label> */}
                <label for="myfile">Select a file:</label>
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  name="image"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="text-input">
                <input
                  type="text"
                  className="col-md-12"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                  disabled
                />
              </div>
              <div className="text-input">
                <input
                  type="text"
                  className="col-md-12"
                  placeholder="Phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="text-input">
                <input
                  type="text"
                  className=""
                  placeholder="Location"
                  name="location"
                  value={location}
                  disabled
                />
                <button className="btn input-map" type="button">
                  Selcet on Map
                  <img src={Map} alt={Map} className="img-map" />
                </button>
              </div>

              <div className="input-save">
                <button className="btn btn-save" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileUser;
