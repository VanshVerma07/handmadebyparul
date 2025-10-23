
export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  currency: string;
  images: string[];
  description: string;
  shortDescription: string;
  category: string;
  tags: string[];
  stock: number;
  sku: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  materials: string[];
  rating: number;
  creationTime: string;
}

export interface CartItem extends Product {
  quantity: number;
}
