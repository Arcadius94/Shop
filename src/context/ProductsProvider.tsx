import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { ProductType, ProductsContextType } from "./ProductsProviderTypes";
import { addPromoTag, addDiscount } from "../tools/promo&discountFcn";

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [productsArray, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/`);
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  const promotedProducts = addPromoTag(
    productsArray,
    [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13]
  ); //useMemo

  // const discountedProductsIds [1,2,3,4,5,6]
  // discountedProducts.map(productId)

  for (let i = 11; i <= 13; i++) {
    addDiscount({ products: productsArray, ProductId: i, discountValue: 200 });
  }

  // const promotedProducts = productsArray.filter((product) => {
  //   return product.promotion === true;
  // });

  const discountedProducts = productsArray.filter((product) => {
    return product.discount;
  });

  const maxProductPrice =
    productsArray.reduce((maxPrice: number, product: ProductType) => {
      return product.price > maxPrice ? product.price : maxPrice;
    }, 0) + 0.01;

  const getProductsCategories = (products: ProductType[]) => {
    const productsCategories: string[] = [];

    products.forEach((item) => {
      if (productsCategories.indexOf(item.category) === -1) {
        productsCategories.push(item.category);
      }
    });
    return productsCategories;

    // () => {}, [] reduce
  };
  const productsCategories = getProductsCategories(productsArray!);

  return (
    <ProductsContext.Provider
      value={{
        products: productsArray,
        promotedProducts,
        discountedProducts,
        maxProductPrice,
        productsCategories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = (id?: string) => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error(
      "Context is wrong. UseProductsContext must be used in ProductsContextProvider"
    );
  const product: ProductType | undefined = context.products!.find(
    (element) => element.id === +id!
  );
  return { product, ...context };
};
