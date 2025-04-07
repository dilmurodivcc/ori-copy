import { useGetSavedBooks, useDeleteSavedBook } from '../../../hooks/useGetUser';
import SimilarBookCard from '../../../components/books/SimilarBookCard';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface SavedBook {
  id: number;
  book_id: number;
  name: string;
  image: string;
  categories: Category[];
  rating: number;
  comment_count: number;
}

const Saved = () => {
  const { saved_Books, isSavedBooksLoading } = useGetSavedBooks();
  const { deleteSavedBook, isDeleting } = useDeleteSavedBook();

  const handleDelete = (id: number) => {
    deleteSavedBook(id);
  };

  if (isSavedBooksLoading) {
    return <div>Юкланиб борапти...</div>;
  }

  if (!saved_Books?.length) {
    return (
      <div className='saved'>
        <h2>Сақланган китоблар</h2>
        <p>Сақланган китоблар йўқ</p>
      </div>
    );
  }

  return (
    <div className='saved'>
      <h2>Сақланган китоблар</h2>
      <div className='saved-grid'>
        {saved_Books.map((book: SavedBook) => (
          <SimilarBookCard
            key={book.id}
            id={book.book_id}
            title={book.name}
            image={book.image}
            category={book.categories[0]?.name || ''}
            rating={book.rating}
            reviews={book.comment_count}
            onDelete={handleDelete}
            showDelete={true}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
};

export default Saved;
