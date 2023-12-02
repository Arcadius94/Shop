import { createContext, useState, useContext, ReactNode } from "react";
import data from "../data/data.json";
import { ProductType, ProductsContextType } from "./ProductsProviderTypes";
import { addPromoTag, addDiscount } from "../tools/promo&discountFcn";

const initState: ProductType[] = data;

const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [productsArray, setProducts] = useState(initState);

  addPromoTag(productsArray, [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13]);

  for (let i = 11; i <= 16; i++) {
    addDiscount({ products: productsArray, ProductId: i, discountValue: 200 });
  }

  const promotedProducts = productsArray.filter((product) => {
    return product.promotion === true;
  });

  const discountedProducts = productsArray.filter((product) => {
    return product.discount;
  });

  let maxProductPrice = productsArray![0].price + 1;

  for (const product of productsArray!) {
    if (product.price > maxProductPrice) {
      maxProductPrice = product.price + 1;
    }
  }

  const getProductsCategories = (products: ProductType[]) => {
    const productsCategories: string[] = [];

    products.forEach((item) => {
      if (productsCategories.indexOf(item.category) === -1) {
        productsCategories.push(item.category);
      }
    });
    return productsCategories;
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

export const useProductsContext = (id?: string | undefined) => {
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
