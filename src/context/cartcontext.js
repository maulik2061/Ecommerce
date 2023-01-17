import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const cartContext = createContext();

const getCartData = () => {
  let cartValue = localStorage.getItem("cartData");
  if (cartValue === []) {
    return [];
  } else {
    return JSON.parse(cartValue);
  }
};

const initialState = {
  cart: getCartData(),
  totalCart: "",
  totalPrice: "",
  shippingFee: 50000,
};

const CartContextProvider = ({ children }) => {
  const [state, disPatch] = useReducer(reducer, initialState);

  const addToCartValue = (id, color, amount, product) => {
    disPatch({
      type: "ADD_CART_VALUE",
      payload: { id, color, amount, product },
    });
  };

  const setDecrement = (id) => {
    disPatch({ type: "SET_DECREMENT", payload: id });
  };
  const setIncrement = (id) => {
    disPatch({ type: "SET_INCREMENT", payload: id });
  };
  const removeItem = (id) => {
    disPatch({ type: "REMOVE_CART", payload: id });
  };
  const clearCart = () => {
    disPatch({ type: "CLAER_CART_DATA" });
  };
  useEffect(() => {
    disPatch({ type: "CART_TOTAL_VALUE" });
    disPatch({ type: "TOTAL_AMOUNT" });
    localStorage.setItem("cartData", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <cartContext.Provider
      value={{
        ...state,
        addToCartValue,
        removeItem,
        clearCart,
        setIncrement,
        setDecrement,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
const useCartContext = () => {
  return useContext(cartContext);
};
export { CartContextProvider, useCartContext };
