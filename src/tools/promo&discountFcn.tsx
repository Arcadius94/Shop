import { ProductType } from "../context/ProductsProviderTypes";

export const addPromoTag = (products: ProductType[], ids: number[]) => {
  return products.map((product: ProductType) => {
    if (ids.includes(product.id)) {
      product.promotion = true;
      return;
    }
  });
};
export const addDiscount = ({
  products,
  id,
  discount,
}: {
  products: ProductType[];
  id: number;
  discount: number;
}) => {
  return products.map((product: ProductType) => {
    if (product.id === id) {
      return (product.discount = discount);
    }
  });
};
