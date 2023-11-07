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

  addPromoTag(products, [1, 2, 3, 4]);
  addDiscount(products, 1, 100);
  addDiscount(products, 2, 100);
  addDiscount(products, 3, 100);
  addDiscount(products, 4, 100);

  const promotedProducts = products.filter((product) => {
    return product.promotion === true;
  });

  const discountedProducts = products.filter((product) => {
    return product.discount;
  });

  // const [shouldUpdateLS, setshouldUpdateLS] = useState(false);

  // if (shouldUpdateLS) {
  //   localStorage.setItem("calendarData", JSON.stringify(birthdays));
  // }
  // //useEffect

  // // localStorage.clear();
  // useEffect(() => {
  //   const localStorageData = localStorage.getItem("calendarData");
  //   if (localStorageData) {
  //     setBirthdays(JSON.parse(localStorageData));
  //   }
  // }, []);

  // // useEffect(() => {
  // //   window.addEventListener('updateLs', (birthdays => lsupdate))
  // // }, [])

  return (
    <ProductsContext.Provider
      value={{ products, promotedProducts, discountedProducts }}
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
