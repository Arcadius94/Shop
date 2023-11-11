import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
} from "react";
import {
  CartItemType,
  CartStateType,
  REDUCER_ACTION_TYPE,
  CartContextType,
  ReducerAction,
} from "./CartProviderTypes";

const CartContext = createContext<CartContextType | null>(null);

// localStorage.clear();
const saved = localStorage.getItem("products");
let initial: CartStateType = JSON.parse(saved!);
if (initial === null) {
  initial = { cart: [] };
}
const initState: CartStateType = initial;

const CartReducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("action.payload missing in reducer ADD action");
      }

      const alreadyExistingProductIndex = state.cart!.findIndex(
        (product) => product.id === action.payload!.id
      );

      if (alreadyExistingProductIndex !== -1) {
        const updatedProducts = structuredClone(state.cart);
        updatedProducts![alreadyExistingProductIndex].qty += action.payload.qty;
        return { ...state, cart: updatedProducts };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    }

    case REDUCER_ACTION_TYPE.REMOVE:
      if (!action.payload) {
        throw new Error("action.payload missing in reducer REMOVE action");
      }
      const filteredCart = state.cart.filter(
        (product) => product.id !== action.payload
      );
      return { ...state, cart: filteredCart };

    case REDUCER_ACTION_TYPE.DECREMENT: {
      if (!action.payload) {
        throw new Error("action.payload missing in reducer DECREMENT action");
      }
      const lessProductsArr = state.cart.map((product) => {
        if (product.id === action.payload) {
          const newQuantity = product.qty - 1;

          return { ...product, qty: newQuantity };
        }
        return product;
      });
      const withouQty0Arr = lessProductsArr.filter(
        (product) => product.qty > 0
      );
      return { ...state, cart: withouQty0Arr };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.payload missing in reducer QUANTITY action");
      }

      const { id, qty } = action.payload;
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.id === id
      );

      if (!itemExists) {
        throw new Error("Item must exist in order to update quantity");
      }

      const updatedItem: CartItemType = { ...itemExists, qty };
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.id !== id
      );

      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      throw new Error("No case error");
  }
};

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartState, dispatchCart] = useReducer(CartReducer, initState);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(cartState));
  }, [cartState]);

  const totalItems = cartState.cart.reduce((previousValue, cartItem) => {
    return previousValue + cartItem.qty;
  }, 0);

  const totalPrice = cartState.cart.reduce((previousValue, cartItem) => {
    return (
      previousValue +
      cartItem.qty * (cartItem.discount ? cartItem.discount : cartItem.price)
    );
  }, 0);

  return (
    <CartContext.Provider
      value={{ cartState, dispatchCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error(
      "Context is wrong. UseCartContext must be used in CartContextProvider"
    );
  return context;
};
