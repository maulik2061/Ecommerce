const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART_VALUE":
      let { id, color, amount, product } = action.payload;
      let updatedCartData = state.cart.find((item) => item.id === id + color);
      if (updatedCartData) {
        let data = state.cart.map((item) => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount;
            if (newAmount >= item.max) {
              newAmount = item.max;
            }
            return {
              ...item,
              amount: newAmount,
            };
          } else {
            return item;
          }
        });
        return {
          ...state,
          cart: data,
        };
      } else {
        let cartInfo = {
          id: id + color,
          name: product.name,
          image: product.image[0].url,
          color,
          price: product.price,
          amount,
          max: product.stock,
        };
        return {
          ...state,
          cart: [...state.cart, cartInfo],
        };
      }
    case "SET_INCREMENT":
      debugger;
      let incValue = state.cart.map((item) => {
        if (item.id === action.payload) {
          let myIncValue = item.amount + 1;
          if (myIncValue >= item.max) {
            myIncValue = item.max;
          }
          return {
            ...item,
            amount: myIncValue,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        cart: incValue,
      };
    case "SET_DECREMENT":
      let decValue = state.cart.map((item) => {
        if (item.id === action.payload) {
          let myDec = item.amount - 1;
          if (myDec <= 1) {
            myDec = 1;
          }
          return {
            ...item,
            amount: myDec,
          };
        } else {
          return item;
        }
      });
      return {
        ...state,
        cart: decValue,
      };
    case "REMOVE_CART":
      let updateCart = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cart: updateCart,
      };
    case "CLAER_CART_DATA":
      return {
        ...state,
        cart: [],
      };
    case "CART_TOTAL_VALUE":
      let cartTotal = state.cart.reduce((accum, item) => {
        return accum + item.amount;
      }, 0);
      return {
        ...state,
        totalCart: cartTotal,
      };
    case "TOTAL_AMOUNT":
      let totalAmount = state.cart.reduce((accum, item) => {
        let itemPrice = item.price * item.amount;
        return accum + itemPrice;
      }, 0);
      return {
        ...state,
        totalPrice: totalAmount,
      };

    default:
      return state;
  }
};

export default cartReducer;
