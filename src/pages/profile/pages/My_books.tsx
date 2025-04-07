import { useState, ReactNode } from 'react';
import Card from '../../../components/ui/Card';
import { useGetBooks } from '../../../hooks/useGetData';
import { Book } from '../../../types';
function MyBooks() {
  const [activeTab, setActiveTab] = useState<string>('Аудио китоб');
  const { books } = useGetBooks();

  const viewMode = 'list';

 
  const content: Record<string, ReactNode> = {
    'Аудио китоб': (
      <div className={`my-books-list ${viewMode}`}>
        {books?.results.length > 0 ? (
          books?.results.map((book: Book) => <Card key={book.id} book={book} showActions={true} viewMode={viewMode} />)
        ) : (
          <div className='my-books-list-no-card'>
            <p>Ҳозирча аудио китоблар йўқ. Янги аудио китоб қўшинг!</p>
          </div>
        )}
      </div>
    ),
    'Электрон китоб': (
      <div className={`my-books-list ${viewMode}`}>
        {books?.results.length === 0 ? (
          books?.results.map((book: Book) => <Card key={book.id} book={book} showActions={true} viewMode={viewMode} />)
        ) : (
          <div className='my-books-list-no-card'>
            <p>Ҳозирча электрон китоблар мавжуд эмас. Янги китоб юклаб олинг!</p>
          </div>
        )}
      </div>
    ),
    'Босма китоб': (
      <div className={`my-books-list ${viewMode}`}>
        {books?.results.length > 0 ? (
          books?.results.map((book: Book) => <Card key={book.id} book={book} showActions={true} viewMode={viewMode} />)
        ) : (
          <div className='my-books-list-no-card'>
            <p>Ҳозирча босма китоблар мавжуд эмас. Янги китоб юклаб олинг!</p>
          </div>
        )}
      </div>
    ),
  };

  return (
    <div className='my-books'>
      <div className='my-books-header'>
        <h2>Китобларим</h2>
        <div className='my-books-header-link'>
          {['Аудио китоб', 'Электрон китоб', 'Босма китоб'].map((tab) => (
            <h3
              key={tab}
              className={activeTab === tab ? 'my-book-link active' : 'my-book-link'}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </h3>
          ))}
        </div>
      </div>
      <div className='my-books-content'>{content[activeTab]}</div>
    </div>
  );
}

export default MyBooks;
