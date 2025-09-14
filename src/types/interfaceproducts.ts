
export interface RootObject {
  results: number;
  metadata: Metadata;
  data: InterfaceProducts[];
}

export interface InterfaceProducts {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: unknown[];
  liek: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  date: string;
  createdAt: string;
}

export interface Brandint {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  image: string;
  error: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface HeartProps {
  liek: string;
}

export interface ICartProduct {
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    quantity: number;
    ratingsAverage: number;
    products: boolean;
  };
}

export interface ICart {
  _id: string;
  cartOwner: string;
  products: ICartProduct[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  status: string;
  data: InterfaceProducts;
}
export interface RegisterResponse {
  message: string;
  token?: string;
  user?: {
    name: string;
    email: string;
  };
}
