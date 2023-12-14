import style from "./Cart.module.scss";
import { useState, FormEvent } from "react";
import { useCartContext } from "../../context/CartProvider";
import { CartItemType, CartContextType } from "../../context/CartProviderTypes";
import { Link } from "react-router-dom";

export const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoValue, setPromoValue] = useState(1);
  const [isOrder, setIsOrder] = useState(false);
  const {
    cartState,
    addToCart,
    onChangeQty,
    totalPrice,
    decrement,
    remove,
    submit,
  }: CartContextType = useCartContext();

  const checkPromoCode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (promoCode === "50") {
      setPromoValue(0.5);
    }
  };

  return (
    <div className={style.cart}>
      <h1 className={style.h1}>Products in your cart</h1>
      {cartState.cart.length === 0 && (
        <h2>
          Your cart is empty. Check our <Link to={`/products`}>Products</Link>
        </h2>
      )}
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
                onClick={() => decrement(item.id)}
              >
                -
              </button>
              <input
                className={style.setQty}
                type="number"
                value={item.qty}
                onChange={(e) => onChangeQty(Number(e.target.value), item)}
              />
              <button
                className={style.setQty}
                onClick={() => addToCart(1, item)}
              >
                +
              </button>
              <button className={style.remove} onClick={() => remove(item.id)}>
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
              placeholder="example: 50"
              onChange={(e) => {
                setPromoCode(e.target.value);
              }}
            />
          </label>
          <input className={style.apply} type="submit" value="Apply" />
        </form>
        <span>SUBTOTAL</span>
        <span>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(totalPrice * promoValue)}
        </span>
      </div>
      <button
        className={style.button}
        onClick={() => {
          setIsOrder(true);
        }}
      >
        {isOrder ? "THANK YOU" : "PROCEED TO CHECKOUT"}
      </button>
      <span className={style.reset} onClick={() => submit()}>
        Reset Cart
      </span>
    </div>
  );
};
