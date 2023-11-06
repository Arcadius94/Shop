import { Slider } from "../../components/Slider/Slider";
import style from "./Home.module.scss";
import { Card } from "../../components/Card/Card";
import { useProductsContext } from "../../context/ProductsProvider";

interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  promotion?: boolean;
  discount?: number;
}

export const Home = () => {
  const { discounted } = useProductsContext();
  return (
    <>
      <Slider />
      <h1 className={style.best}>Best price:</h1>
      <div className={style.container}>
        {discounted!.map((item: ProductType) => {
          return <Card product={item} key={item.id + item.category} />;
        })}
      </div>
    </>
  );
};
