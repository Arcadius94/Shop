import { ProductType } from "./ProductsProviderTypes";

export interface CartItemType extends ProductType {
  qty: number;
}

export interface CartStateType {
  cart: CartItemType[];
}

export interface CartContextType {
  cartState: CartStateType;
  totalItems: number;
  totalPrice: number;
  onChangeQty: (quantity: number, item: ProductType) => void;
  addToCart: (quantity: number, item: ProductType) => void;
  decrement: (id: number) => void;
  remove: (id: number) => void;
  submit: () => void;
}

export const REDUCER_ACTION_TYPE: {
  ADD: "ADD";
  DECREMENT: "DECREMENT";
  REMOVE: "REMOVE";
  QUANTITY: "QUANTITY";
  SUBMIT: "SUBMIT";
} = {
  ADD: "ADD",
  DECREMENT: "DECREMENT",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerAction =
  | { type: typeof REDUCER_ACTION_TYPE.ADD; payload: CartItemType }
  | { type: typeof REDUCER_ACTION_TYPE.REMOVE; payload: number }
  | { type: typeof REDUCER_ACTION_TYPE.DECREMENT; payload: number }
  | { type: typeof REDUCER_ACTION_TYPE.QUANTITY; payload: CartItemType }
  | { type: typeof REDUCER_ACTION_TYPE.SUBMIT };
