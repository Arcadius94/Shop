import style from "./ProductList.module.scss";
import { Card } from "../Card/Card";
import { useProductsContext } from "../../context/ProductsProvider";
import { ProductType } from "../../context/ProductsProviderTypes";
import { useMemo } from "react";

export const ProductList = ({
  minPrice,
  maxPrice,
  sort,
  subCats,
}: {
  minPrice: number;
  maxPrice: number;
  sort: "asc" | "desc" | "";
  subCats: string[];
}) => {
  const { products } = useProductsContext();

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
        (product.discount ? product.discount : product.price) >= minPrice &&
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

  const productsAfterFilter = useMemo(() => {
    let filteredProductsArr = filterProductsByPriceRange(
      products!,
      minPrice,
      maxPrice
    );

    if (sort === "desc") {
      filteredProductsArr = sortProductsByPriceDescending(filteredProductsArr);
    }
    if (sort === "asc") {
      filteredProductsArr = sortProductsByPriceAscending(filteredProductsArr);
    }
    if (subCats.length !== 0) {
      filteredProductsArr = filterProductsBySelectedCategories(
        filteredProductsArr,
        subCats
      );
    }
    return filteredProductsArr;
  }, [sort, minPrice, maxPrice, subCats]);
  return (
    <div className={style.list}>
      {productsAfterFilter.length === 0 && (
        <strong className={style.strong}>
          There's no products with that specification
        </strong>
      )}
      {productsAfterFilter.map((item: ProductType) => (
        <Card product={item} key={item.category + item.id} />
      ))}
    </div>
  );
};
