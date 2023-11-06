import "./ProductList.scss";
import { Card } from "../Card/Card";
import { useProductsContext } from "../../context/ProductsProvider";

export const ProductList = ({ maxPrice, sort, subCats }: any) => {
  const { products } = useProductsContext();

  interface Product {
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

  let filtredProducts: Product[] = products!;

  function filterProductsBySelectedCategories(
    products: Product[],
    selectedCategories: string[]
  ): Product[] {
    return products.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }

  function filterProductsByPriceRange(
    products: Product[],
    minPrice: number,
    maxPrice: number
  ): Product[] {
    return products.filter(
      (product) =>
        product.price >= minPrice &&
        (product.discount ? product.discount : product.price) <= maxPrice
    );
  }

  function sortProductsByPriceAscending(products: Product[]): Product[] {
    return products
      .slice()
      .sort(
        (a, b) =>
          (a.discount ? a.discount : a.price) -
          (b.discount ? b.discount : b.price)
      );
  }

  function sortProductsByPriceDescending(products: Product[]): Product[] {
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
    <div className="list">
      {filtredProducts?.map((item) => (
        <Card product={item} key={item.category + item.id} />
      ))}
    </div>
  );
};
