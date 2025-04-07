export interface BookResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

export interface Book {
  id: number;
  name: string;
  categories: Category[];
  image: string;
  author: string;
  publisher: string;
  published_year: string;
  rating: number;
  comment_count: number;
  description: string;
  formats: string[];
  isbn: string;
  language: string;
  pages: number;
  paper: {
    price: number;
    sale_price: number;
    sale_percent: number;
  } | null;
  online: {
    price: number;
    sale_price: number;
    sale_percent: number;
  } | null;
  audio: {
    price: number;
    sale_price: number;
    sale_percent: number;
  } | null;
  views: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}
