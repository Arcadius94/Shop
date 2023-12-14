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
  products: ProductType[] | [];
  promotedProducts: ProductType[] | [];
  discountedProducts: ProductType[] | [];
  maxProductPrice: number;
  productsCategories: string[];
}

//isPromotion
//discountValue - moze byc procent itp
