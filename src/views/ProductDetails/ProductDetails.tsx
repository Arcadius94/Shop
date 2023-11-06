import { useParams } from "react-router-dom";
import { useProductsContext } from "../../context/ProductsProvider";
import { useState } from "react";
import style from "./ProductDetails.module.scss";
import { useCartContext } from "../../context/CartProvider";

export const ProductDetails = () => {
  const { productId } = useParams();
  const { product } = useProductsContext(productId);
  const [quantity, setQuantity] = useState(1);
  const { dispatchCart } = useCartContext();

  if (!product) {
    return <div>Produkt nie został znaleziony.</div>;
  }

  return (
    <div className={style.product}>
      <>
        <div className={style.left}>
          <div className={style.img}>
            <img src={product.image} alt={product.title} />
          </div>
        </div>
        <div className={style.right}>
          <h1>{product.title}</h1>
          {product.discount ? (
            <div>
              <span className={style.crossPrice}>${product.price}</span>
              <span className={style.price}>${product.discount}</span>
            </div>
          ) : (
            <span className={style.price}>${product.price}</span>
          )}

          <p className={style.paragraph}>{product.description}</p>
          <div className={style.quantity}>
            <button
              className={style.button}
              onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
            >
              -
            </button>
            {quantity}
            <button
              className={style.button}
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button
            className={style.add}
            onClick={() => {
              dispatchCart({
                type: "ADD",
                payload: { qty: quantity, ...product },
              });
            }}
          >
            ADD TO CART
          </button>
        </div>
      </>
    </div>
  );
};
