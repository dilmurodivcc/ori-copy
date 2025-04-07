import { Category } from '.';

export interface BookDetails {
  kitobNomi: string;
  title: string;
  muallif: string;
  authorName: string;
  isbn: string;
  til: string;
  sahifalar: string;
  chopEtilganSana: string;
  nashriyot: string;
  year: string;
  category: string;
  rukn: string[];
  description: string;
  reviewCount: number;
  rating: number;
}

export interface BookPrices {
  physical: string;
  audio: string;
  online: string;
}

export interface RatingDistribution {
  stars: number;
  percentage: number;
}

export interface RatingStats {
  total: number;
  distribution: RatingDistribution[];
}

export interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  comment: string;
  isVerified: boolean;
}

export interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  image: string;
  rating: number;
  comment_count: number;
  categories: Category[];
  isbn: string;
  language: string;
  pages: number;
  published_date: string;
  paper: {
    price: number;
  };
  online: {
    price: number;
  };
  audio: {
    price: number;
  };
  views: number;
}

export interface BookResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Toc {
  id: string;
  label: string;
  href: string;
  subitems?: Toc[];
}

export interface Page {
  id: string;
  content: string;
}

export interface BookStyle {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  theme: string;
}

export interface BookFontFamily {
  name: string;
  value: string;
}
