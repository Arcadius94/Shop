import { Slider } from "../../components/Slider/Slider";
import style from "./Home.module.scss";
import { Card } from "../../components/Card/Card";
import { useProductsContext } from "../../context/ProductsProvider";
import { ProductType } from "../../context/ProductsProviderTypes";

export const Home = () => {
  const { discountedProducts } = useProductsContext();
  return (
    <>
      <Slider />
      <h1 className={style.best}>Best price:</h1>
      <div className={style.container}>
        {discountedProducts?.length !== 0 ? (
          discountedProducts!.map((item: ProductType) => {
            return <Card product={item} key={item.id + item.category} />;
          })
        ) : (
          <h1>Always best price</h1>
        )}
      </div>
    </>
  );
};
