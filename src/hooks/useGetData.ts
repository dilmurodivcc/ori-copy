import { useQuery } from '@tanstack/react-query';
import API from '../API';

export const useGetBooks = () => {
  const fetchBooks = async () => {
    const response = await API.get('/book/');
    return response.data;
  };
  const {
    data: books,
    isLoading: isBooksLoading,
    error: booksError,
  } = useQuery({
    queryKey: ['books'],
    queryFn: () => fetchBooks(),
  });
  return { books, isBooksLoading, booksError };
};

export const useGetAudioBooks = () => {
  const fetchAudioBooks = async () => {
    const response = await API.get('/book/?type=audio');
    return response.data;
  };

  const {
    data: audioBooks,
    isLoading: isAudioBooksLoading,
    error: audioBooksError,
  } = useQuery({
    queryKey: ['audioBooks'],
    queryFn: () => fetchAudioBooks(),
  });

  return { audioBooks, isAudioBooksLoading, audioBooksError };
};

export const useGetBookCategories = () => {
  const fetchBookCategories = async () => {
    const response = await API.get('/book/categories/');
    return response.data;
  };

  const {
    data: bookCategories,
    isLoading: isBookCategoriesLoading,
    error: bookCategoriesError,
  } = useQuery({
    queryKey: ['bookCategories'],
    queryFn: () => fetchBookCategories(),
  });

  return { bookCategories, isBookCategoriesLoading, bookCategoriesError };
};


export const useGetCategories = () => {
  const fetchBookCategories = async () => {
    const response = await API.get('/book/categories/');
    return response.data;
  };

  const {
    data: bookCategories,
    isLoading: isBookCategoriesLoading,
    error: bookCategoriesError,
  } = useQuery({
    queryKey: ['bookCategories'],
    queryFn: fetchBookCategories,
  });

  return { bookCategories, isBookCategoriesLoading, bookCategoriesError };
};
