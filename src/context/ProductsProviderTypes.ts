export interface ProductType {
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

export interface ProductsContextType {
  products: ProductType[] | null;
  promotedProducts: ProductType[] | null;
  discountedProducts: ProductType[] | null;
}
