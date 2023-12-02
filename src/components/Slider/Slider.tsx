import { useState } from "react";
import style from "./Slider.module.scss";
import { useProductsContext } from "../../context/ProductsProvider";
import { useNavigate } from "react-router-dom";

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { promotedProducts } = useProductsContext();

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
  };
  const navigate = useNavigate();

  if (promotedProducts!.length === 0) {
    return <h1>Hello</h1>;
  }
  return (
    <div className={style.slider}>
      <div
        className={style.container}
        style={{ transform: `translateX(-${currentSlide * 50}vw)` }}
      >
        {promotedProducts!.map((product) => {
          return (
            <img
              onClick={() => navigate(`/product/${product.id}`)}
              className={style.img}
              key={product.id}
              src={product.image}
              alt={product.title}
            />
          );
        })}
      </div>
      <div className={style.icons}>
        <div className={style.iconLeft} onClick={prevSlide}>
          <p>{"<"}</p>
        </div>
        <div className={style.iconRight} onClick={nextSlide}>
          <p>{">"}</p>
        </div>
      </div>
    </div>
  );
};
