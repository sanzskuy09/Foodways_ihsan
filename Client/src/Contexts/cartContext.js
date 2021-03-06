import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  isLogin: false,
  carts: [],
  name: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "RESTAURANT_NAME":
      return {
        ...state,
        name: payload,
      };
    case "ADD_CART":
      const findMenuToAdd = state.carts.find((cart) => cart.id === payload.id);

      if (findMenuToAdd) {
        const updatedCarts = state.carts.map((cart) =>
          cart.id === payload.id
            ? {
                ...cart,
                qty: cart.qty + 1,
              }
            : cart
        );

        return {
          ...state,
          carts: updatedCarts,
        };
      }

      return {
        ...state,
        carts: [
          ...state.carts,
          {
            ...payload,
            qty: 1,
          },
        ],
      };
    case "REMOVE_CART":
      const findMenuToRemove = state.carts.find(
        (cart) => cart.id === payload.id
      );

      if (findMenuToRemove) {
        const updatedCarts = state.carts.map((cart) =>
          cart.id === payload.id
            ? {
                ...cart,
                qty: cart.qty > 1 ? cart.qty - 1 : cart.qty,
              }
            : cart
        );

        return {
          ...state,
          carts: updatedCarts,
        };
      }

      return {
        ...state,
        carts: [
          ...state.carts,
          {
            ...payload,
            qty: 1,
          },
        ],
      };

    case "DELETE_CART":
      const deleteCart = state.carts.filter((cart) => cart.id !== payload.id);

      return { ...state, carts: deleteCart };

    default:
      throw new Error();
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};
