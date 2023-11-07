import style from "./ProductList.module.scss";
import { Card } from "../Card/Card";
import { useProductsContext } from "../../context/ProductsProvider";
import { ProductType } from "../../context/ProductsProviderTypes";

export const ProductList = ({
  maxPrice,
  sort,
  subCats,
}: {
  maxPrice: number;
  sort: "asc" | "desc" | "";
  subCats: string[];
}) => {
  const { products } = useProductsContext();

  let filtredProducts: ProductType[] = products!;

  function filterProductsBySelectedCategories(
    products: ProductType[],
    selectedCategories: string[]
  ): ProductType[] {
    return products.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }

  function filterProductsByPriceRange(
    products: ProductType[],
    minPrice: number,
    maxPrice: number
  ): ProductType[] {
    return products.filter(
      (product) =>
        product.price >= minPrice &&
        (product.discount ? product.discount : product.price) <= maxPrice
    );
  }

  function sortProductsByPriceAscending(
    products: ProductType[]
  ): ProductType[] {
    return products
      .slice()
      .sort(
        (a, b) =>
          (a.discount ? a.discount : a.price) -
          (b.discount ? b.discount : b.price)
      );
  }

  function sortProductsByPriceDescending(
    products: ProductType[]
  ): ProductType[] {
    return products
      .slice()
      .sort(
        (a, b) =>
          (b.discount ? b.discount : b.price) -
          (a.discount ? a.discount : a.price)
      );
  }
  filtredProducts = filterProductsByPriceRange(filtredProducts, 0, maxPrice);

  if (sort === "desc") {
    filtredProducts = sortProductsByPriceDescending(filtredProducts);
  }
  if (sort === "asc") {
    filtredProducts = sortProductsByPriceAscending(filtredProducts);
  }
  if (subCats.length !== 0) {
    filtredProducts = filterProductsBySelectedCategories(
      filtredProducts,
      subCats
    );
  }

  return (
    <div className={style.list}>
      {filtredProducts?.map((item) => (
        <Card product={item} key={item.category + item.id} />
      ))}
    </div>
  );
};
