import "./Cart.scss";
import { useState, ChangeEvent, FormEvent } from "react";

import { useCartContext } from "../../context/CartProvider";

interface CartItemType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  promotion?: boolean;
  discount?: number;
  qty: number;
}

interface CartContext {
  cartState: CartStateType;
  dispatchCart: React.Dispatch<ReducerAction>;
  totalItems: number;
  totalPrice: number;
}

const REDUCER_ACTION_TYPE: {
  ADD: "ADD";
  DECREMENT: "DECREMENT";
  REMOVE: "REMOVE";
  QUANTITY: "QUANTITY";
  SUBMIT: "SUBMIT";
} = {
  ADD: "ADD",
  DECREMENT: "DECREMENT",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerAction =
  | { type: typeof REDUCER_ACTION_TYPE.ADD; payload: CartItemType }
  | { type: typeof REDUCER_ACTION_TYPE.REMOVE; payload: number }
  | { type: typeof REDUCER_ACTION_TYPE.DECREMENT; payload: number }
  | { type: typeof REDUCER_ACTION_TYPE.QUANTITY; payload: CartItemType }
  | { type: typeof REDUCER_ACTION_TYPE.SUBMIT };

interface CartStateType {
  cart: CartItemType[];
}

export const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promovalue, setPromoValue] = useState(1);
  const [order, setOrder] = useState(false);
  const { cartState, dispatchCart, totalPrice }: CartContext = useCartContext();

  const checkPromoCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (promoCode === "50") {
      setPromoValue(0.5);
    }
  };

  const onChangeQty = (
    e: ChangeEvent<HTMLInputElement>,
    item: CartItemType
  ) => {
    dispatchCart({
      type: "QUANTITY",
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
      {cartState.cart.map((item: CartItemType) => (
        <div className="item" key={item.id}>
          <img src={item.image} alt="" />
          <div className="details">
            <h1>{item.title}</h1>
            <p>{item.description?.substring(0, 100)}...</p>
            <div className="price">
              {item.qty} x ${item.discount ? item.discount : item.price}
              <div className="promo">{item.discount && item.price + "$"}</div>
              <button
                className="setPrice"
                onClick={() =>
                  dispatchCart({ type: "DECREMENT", payload: item.id })
                }
              >
                -
              </button>
              <input
                className="setPrice"
                type="number"
                value={item.qty}
                onChange={(e) => onChangeQty(e, item)}
              />
              <button
                className="setPrice"
                onClick={() =>
                  dispatchCart({
                    type: "ADD",
                    payload: { ...item, qty: 1 },
                  })
                }
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => dispatchCart({ type: "REMOVE", payload: item.id })}
          >
            Delete
          </button>
        </div>
      ))}
      <div className="total">
        <form onSubmit={checkPromoCode}>
          <label>
            Promo or Gift Code:{" "}
            <input
              type="text"
              placeholder="exaple: 50"
              onChange={(e) => {
                setPromoCode(e.target.value);
              }}
            />
          </label>
          <input type="submit" value="Apply" />
        </form>
        <span>SUBTOTAL</span>
        <span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(totalPrice * promovalue)}
        </span>
      </div>
      <button
        onClick={() => {
          setOrder(true);
        }}
      >
        {order ? "THANK YOU" : "PROCEED TO CHECKOUT"}
      </button>
      <span className="reset" onClick={() => dispatchCart({ type: "SUBMIT" })}>
        Reset Cart
      </span>
    </div>
  );
};
