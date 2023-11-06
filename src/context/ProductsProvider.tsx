import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import data from "../data/data.json";

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

const initState: ProductType[] = data;

interface ProductsContext {
  products: ProductType[] | null;
  promoted: ProductType[] | null;
  discounted: ProductType[] | null;
}

const ProductsContext = createContext<ProductsContext | null>(null);

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

  const addPromoTag = (ids: number[]) => {
    products.map((product: ProductType) => {
      if (ids.includes(product.id)) {
        product.promotion = true;
      }
    });
  };

  const promoted = products.filter((product) => {
    return product.promotion === true;
  });
  // console.log(products);

  const addDiscount = (id: number, discount: number) => {
    products.map((product: ProductType) => {
      if (product.id === id) {
        product.discount = discount;
      }
    });
  };
  addPromoTag([1, 2, 3, 4]);
  addDiscount(1, 100);
  addDiscount(2, 100);
  addDiscount(3, 100);
  addDiscount(4, 100);

  const discounted = products.filter((product) => {
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
    <ProductsContext.Provider value={{ products, promoted, discounted }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = (ids?: string | undefined) => {
  const context = useContext(ProductsContext);
  if (!context)
    throw new Error(
      "Context is wrong. UseProductsContext must be used in ProductsContextProvider"
    );
  const product: ProductType | undefined = context.products!.find(
    (element) => element.id === +ids!
  );
  return { product, ...context };
};
