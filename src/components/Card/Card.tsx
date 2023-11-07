import { useCartContext } from "../../context/CartProvider";
import style from "./Card.module.scss";
import { Link } from "react-router-dom";
import { ProductType } from "../../context/ProductsProviderTypes";
import { useState } from "react";

export const Card = ({ product }: { product: ProductType }) => {
  const { dispatchCart } = useCartContext();
  const [addToCartFlag, setAddToCartFlag] = useState(false);
  return (
    <div className={style.link}>
      <div className={style.card}>
        <Link className={style.link} to={`/product/${product.id}`}>
          <div className={style.image}>
            <img
              src={product.image}
              alt={product.title}
              className={style.mainImg}
            />
          </div>
          <h2 className={style.h2}>{product.title}</h2>
        </Link>
        <div className={style.prices}>
          {addToCartFlag ? (
            <>
              <button
                style={{ backgroundColor: "lightgreen" }}
                onClick={() => {
                  dispatchCart({
                    type: "ADD",
                    payload: { qty: 1, ...product },
                  });
                }}
                className={style.addToCart}
              >
                Add more
              </button>
              <Link to={`/cart`}>
                <button className={style.addToCart}>Go to cart</button>
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                setAddToCartFlag(true);
                dispatchCart({
                  type: "ADD",
                  payload: { qty: 1, ...product },
                });
              }}
              className={style.addToCart}
            >
              Add to cart
            </button>
          )}

          {product.discount ? (
            <div className={style.prices}>
              <h3 className={style.discount}>${product.price}</h3>
              <h3 className={style.price}>${product.discount}</h3>
            </div>
          ) : (
            <h3 className={style.price}>${product.price}</h3>
          )}
        </div>
      </div>
    </div>
  );
};
