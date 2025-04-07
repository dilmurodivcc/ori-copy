import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book, Page, Toc } from '../types/book';

const initialBook: Book = {
  coverURL: '',
  title: '',
  description: '',
  published_date: '',
  modified_date: '',
  author: '',
  publisher: '',
  language: '',
};
const initialCurrentLocation: Page = {
  chapterName: '-',
  currentPage: 0,
  totalPage: 0,
  startCfi: '',
  endCfi: '',
  base: '',
};

interface BookState {
  book: Book;
  currentLocation: Page;
  toc: Toc[];
  updateBook: (book: Book) => void;
  clearBook: () => void;
  updateCurrentPage: (page: Page) => void;
  updateToc: (toc: Toc[]) => void;
  clearToc: () => void;
}

export const useBookStore = create<BookState>()(
  persist(
    (set) => ({
      book: initialBook,
      currentLocation: initialCurrentLocation,
      toc: [],
      updateBook: (book) => set({ book }),
      clearBook: () => set({ book: initialBook }),
      updateCurrentPage: (page) => set({ currentLocation: page }),
      updateToc: (toc: Toc[]) => set({ toc }),
      clearToc: () => set({ toc: [] }),
    }),
    {
      name: 'book-storage',
    },
  ),
);
