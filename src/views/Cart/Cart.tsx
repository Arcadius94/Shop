import style from "./Cart.module.scss";
import { useState, ChangeEvent, FormEvent } from "react";
import { REDUCER_ACTION_TYPE } from "../../context/CartProviderTypes";
import { useCartContext } from "../../context/CartProvider";
import { CartItemType, CartContextType } from "../../context/CartProviderTypes";

export const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promovalue, setPromoValue] = useState(1);
  const [order, setOrder] = useState(false);
  const { cartState, dispatchCart, totalPrice }: CartContextType =
    useCartContext();

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
      type: REDUCER_ACTION_TYPE.QUANTITY,
      payload: { ...item, qty: Number(e.target.value) },
    });
  };

  return (
    <div className={style.cart}>
      <h1 className={style.h1}>Products in your cart</h1>
      {cartState.cart.map((item: CartItemType) => (
        <div className={style.item} key={item.id}>
          <img src={item.image} alt="" />

          <div className={style.details}>
            <h1 className={style.h1}>{item.title}</h1>

            <p>{item.description?.substring(0, 100)}...</p>

            <div className={style.price}>
              {item.qty} x ${item.discount ? item.discount : item.price}
              <div className={style.promo}>
                {item.discount && item.price + "$"}
              </div>
              <button
                className={style.setQty}
                onClick={() =>
                  dispatchCart({
                    type: REDUCER_ACTION_TYPE.DECREMENT,
                    payload: item.id,
                  })
                }
              >
                -
              </button>
              <input
                className={style.setQty}
                type="number"
                value={item.qty}
                onChange={(e) => onChangeQty(e, item)}
              />
              <button
                className={style.setQty}
                onClick={() =>
                  dispatchCart({
                    type: REDUCER_ACTION_TYPE.ADD,
                    payload: { ...item, qty: 1 },
                  })
                }
              >
                +
              </button>
              <button
                className={style.remove}
                onClick={() =>
                  dispatchCart({
                    type: REDUCER_ACTION_TYPE.REMOVE,
                    payload: item.id,
                  })
                }
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className={style.total}>
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
        className={style.button}
        onClick={() => {
          setOrder(true);
        }}
      >
        {order ? "THANK YOU" : "PROCEED TO CHECKOUT"}
      </button>
      <span
        className={style.reset}
        onClick={() => dispatchCart({ type: REDUCER_ACTION_TYPE.SUBMIT })}
      >
        Reset Cart
      </span>
    </div>
  );
};
