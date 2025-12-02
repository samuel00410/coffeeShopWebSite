// 單一商品的型別
export interface Product {
  id: string;
  title: string;
  category: string;
  content: string;
  description: string;
  imageUrl: string;
  imagesUrl: string[];
  is_enabled: number;
  origin_price: number;
  price: number;
  unit: string;
  num: number;
}

// 商品表單(modal)的型別
export interface ProductForm {
  title: string;
  category: string;
  unit: string;
  origin_price: number;
  price: number;
  description: string;
  content: string;
  is_enabled: number;
  imageUrl: string;
}

// 分頁資訊的型別
export interface Tpagination {
  total_pages: number;
  current_page: number;
  has_pre: boolean;
  has_next: boolean;
  category: string | null;
}

// API 回應的型別
export interface ProductsResponse {
  success: boolean;
  products: Product[];
  pagination: Tpagination;
  messages: string[];
}
