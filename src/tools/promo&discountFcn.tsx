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
  ProductId,
  discountValue,
}: {
  products: ProductType[];
  ProductId: number;
  discountValue: number;
}) => {
  return products.map((product: ProductType) => {
    if (product.id === ProductId) {
      return (product.discount = discountValue);
    }
  });
};
