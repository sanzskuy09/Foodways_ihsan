import { useState, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import { API, setAuthToken } from "../../Config/api";
import { UserContext } from "../../Contexts/userContext";

import { Modal } from "react-bootstrap";

const Register = ({ showRegister, setShowRegister, changeModal }) => {
  const history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    phone: "",
    role: "user",
  });
  const { email, password, fullName, gender, phone, role } = form;

  const { data: UserData, isLoading, isError, refetch } = useQuery(
    "userCache",
    async () => {
      const response = await API.get("/users");
      return response;
    }
  );

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitRegister = useMutation(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      password,
      fullName,
      gender,
      phone,
      role,
    });

    const response = await API.post("/register", body, config);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data.data.user,
    });
    setAuthToken(response.data.data.token);
    {
      response.data.data.user.role == "partner" && history.push("/dashboard");
    }
    refetch();
  });

  const onSubmit = (e) => {
    e.preventDefault();
    submitRegister.mutate();
  };

  return (
    <>
      <Modal
        show={showRegister}
        onHide={setShowRegister}
        centered
        className="modal-container"
      >
        <div class="modal-body modal-body-register">
          <form onSubmit={(e) => onSubmit(e)}>
            <h2 className="text-color">Register</h2>

            {submitRegister.error?.response?.data && (
              <div class="alert alert-danger" role="alert">
                {submitRegister.error?.response?.data?.message}
              </div>
            )}

            <div class="modal-form mb-3">
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                class="form-control"
                placeholder="Email"
                autoComplete="off"
              />
            </div>
            <div class="modal-form mb-3">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                class="form-control"
                placeholder="Password"
              />
            </div>
            <div class="modal-form mb-3">
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={(e) => onChange(e)}
                class="form-control"
                autoComplete="off"
                placeholder="Full Name"
              />
            </div>
            <div class="modal-form mb-3">
              <input
                type="text"
                name="gender"
                value={gender}
                onChange={(e) => onChange(e)}
                class="form-control"
                autoComplete="off"
                placeholder="Gender"
              />
            </div>
            <div class="modal-form mb-3">
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => onChange(e)}
                class="form-control"
                autoComplete="off"
                placeholder="Phone"
              />
            </div>
            <div class="modal-form mb-3">
              <select
                class="form-control custom-select"
                aria-label="Default select example"
                name="role"
                value={role}
                onChange={(e) => onChange(e)}
              >
                <option value="user" selected>
                  As User
                </option>
                <option value="partner">Partner</option>
              </select>
            </div>
            <div class="modal-form mb-3">
              <button
                type="submit"
                class="btn btn-submit btn-block"
                disabled={
                  !email || !password || !phone || !gender ? true : false
                }
              >
                Register
              </button>
            </div>
            <div className="d-flex justify-content-center sub-text">
              <p>
                Already have an account ? Click{" "}
                <span className="link" onClick={changeModal}>
                  <strong>Here</strong>
                </span>
              </p>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Register;
