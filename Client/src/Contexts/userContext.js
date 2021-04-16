import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  isPartner: false,
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "EDIT_SUCCESS":
    case "AUTH_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);

      return {
        ...state,
        isLogin: true,
        user: {
          id: payload.id,
          email: payload.email,
          fullName: payload.fullName,
          image: payload.image,
          phone: payload.phone,
          role: payload.role,
        },
        isPartner: payload.role == "partner" ? true : false,
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");

      return {
        ...state,
        isPartner: false,
        isLogin: false,
        loading: false,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
