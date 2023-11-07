export interface CartItemType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  promotion?: boolean;
  discount?: number;
  qty: number;
}
export interface CartStateType {
  cart: CartItemType[];
}

export interface CartContextType {
  cartState: CartStateType;
  dispatchCart: React.Dispatch<ReducerAction>;
  totalItems: number;
  totalPrice: number;
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
