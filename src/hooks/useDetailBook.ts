import { useState, useEffect } from 'react';
import API from '../API';

export interface Category {
  id: number;
  name: string;
  image: string;
}

interface BookPrice {
  price: number;
  sale_price: number;
  sale_percent: number;
}

interface Book {
  id: number;
  name: string;
  categories: Category[];
  image: string;
  author: string;
  publisher: string | null;
  published_year: string;
  rating: number;
  comment_count: number;
  published_date: string;
  isbn: string | null;
  language: string;
  pages: number | null;
  description: string | null;
  paper: BookPrice | null;
  online: BookPrice | null;
  audio: BookPrice | null;
  views: number;
}

export const useGetDetailBook = (id?: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) {
        setError('Book ID is required');
        setIsLoading(false);
        return;
      }

      try {
        const response = await API.get(`/book/${id}/`);
        setBook(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch book details');
        console.error('Error fetching book:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return { book, isLoading, error };
};
