export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id?: string;
  customer: { _ref: string };
  items: OrderItem[];
  totalAmount: number;
  status: "Pending" | "Shipped" | "Delivered";
}
