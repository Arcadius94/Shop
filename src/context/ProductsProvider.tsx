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
  const [products, setProducts] = useState(initState);

  // useEffect(() => {
  //   async function getData(): Promise<ProductType[]> {
  //     const data = await fetch("https://fakestoreapi.com/products/")
  //       .then((res) => res.json())
  //       .catch((err) => {
  //         if (err instanceof Error) console.log(err.message);
  //       });
  //     return data;
  //   }
  //   getData().then((products) => setProducts(products));
  // }, []);

  addPromoTag(products, [1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13]);
  addDiscount({ products: products, id: 11, discount: 100 });
  addDiscount({ products: products, id: 12, discount: 100 });
  addDiscount({ products: products, id: 13, discount: 100 });
  addDiscount({ products: products, id: 14, discount: 100 });
  addDiscount({ products: products, id: 15, discount: 100 });

  const promotedProducts = products.filter((product) => {
    return product.promotion === true;
  });

  const discountedProducts = products.filter((product) => {
    return product.discount;
  });

  // products.sort(a,b ) z contextu
  let maxProductPrice = products![0].price + 1;

  for (const product of products!) {
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
  const productsCategories = getProductsCategories(products!);

  // do kontekstu, categories w memo i maxPrice w memo

  return (
    <ProductsContext.Provider
      value={{
        products,
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
