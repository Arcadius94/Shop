import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  useEffect,
  ChangeEvent,
} from "react";
import {
  CartItemType,
  CartStateType,
  REDUCER_ACTION_TYPE,
  CartContextType,
  ReducerAction,
} from "./CartProviderTypes";
import { ProductType } from "./ProductsProviderTypes";

const CartContext = createContext<CartContextType | null>(null);

// localStorage.clear();
const getInitial = () => {
  const saved = localStorage.getItem("products");
  let initial: CartStateType = JSON.parse(saved!);
  if (initial === null) {
    initial = { cart: [] };
  }
  return initial;
};
const initState: CartStateType = getInitial();

const cartReducer = (
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
      }
      return { ...state, cart: [...state.cart, action.payload] };
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
      const removedNullProducts = lessProductsArr.filter(
        (product) => product.qty > 0
      );
      return { ...state, cart: removedNullProducts };
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
  const [cartState, dispatchCart] = useReducer(cartReducer, initState);

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

  const onChangeQty = (quantity: number, item: ProductType) => {
    dispatchCart({
      type: REDUCER_ACTION_TYPE.QUANTITY,
      payload: { ...item, qty: quantity },
    });
  };
  const addToCart = (quantity: number, item: ProductType) => {
    dispatchCart({
      type: REDUCER_ACTION_TYPE.ADD,
      payload: { ...item, qty: quantity },
    });
  };
  const decrement = (id: number) => {
    dispatchCart({
      type: REDUCER_ACTION_TYPE.DECREMENT,
      payload: id,
    });
  };
  const submit = () => {
    dispatchCart({
      type: REDUCER_ACTION_TYPE.SUBMIT,
    });
  };
  const remove = (id: number) => {
    dispatchCart({
      type: REDUCER_ACTION_TYPE.REMOVE,
      payload: id,
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        totalItems,
        totalPrice,
        onChangeQty,
        addToCart,
        decrement,
        remove,
        submit,
      }}
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
