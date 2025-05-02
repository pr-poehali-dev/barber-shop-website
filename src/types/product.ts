
export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
  gallery?: string[];
  inStock: boolean;
  popularity: number;
  attributes?: {
    [key: string]: string;
  };
  relatedProducts?: number[];
}
