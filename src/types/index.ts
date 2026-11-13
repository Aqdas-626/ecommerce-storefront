export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingFormData {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface PaymentFormData {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingFormData;
  subtotal: number;
  shippingCost: number;
  total: number;
  date: string;
}
