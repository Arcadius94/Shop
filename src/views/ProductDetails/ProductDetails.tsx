import { useParams } from "react-router-dom";
import { useProductsContext } from "../../context/ProductsProvider";
import { useState } from "react";
import style from "./ProductDetails.module.scss";
import { useCartContext } from "../../context/CartProvider";
import { ProductType } from "../../context/ProductsProviderTypes";
import { Link } from "react-router-dom";

export const ProductDetails = () => {
  const { productId } = useParams();
  const { product }: { product: ProductType | undefined } =
    useProductsContext(productId);
  const [quantity, setQuantity] = useState(1);
  const [addToCartFlag, setAddToCartFlag] = useState(false);
  const { dispatchCart } = useCartContext();

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className={style.product}>
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
              className={style.add}
            >
              ADD MORE
            </button>
            <Link to={`/cart`}>
              <button className={style.add}>Go to cart</button>
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
            className={style.add}
          >
            ADD TO CART
          </button>
        )}
        {/* <button
          className={style.add}
          onClick={() => {
            dispatchCart({
              type: REDUCER_ACTION_TYPE.ADD,
              payload: { qty: quantity, ...product },
            });
          }}
        >
          ADD TO CART
        </button> */}
      </div>
    </div>
  );
};
