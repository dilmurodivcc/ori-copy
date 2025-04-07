import { Drawer } from 'antd';
import { Book, Toc } from '../../types/book';

interface TocDrawerProps {
  toc: Toc[];
  onClose: () => void;
  isOpen: boolean;
  book: Book;
}

const TocDrawer: React.FC<TocDrawerProps> = ({ toc, onClose, isOpen, book }) => {
  const onClickItem = (href: string) => {
    // Handle navigation to the selected chapter
  };

  return (
    <Drawer className='toc-drawer' onClose={onClose} open={isOpen}>
      <div className='toc-header'>
        <img width={120} src={book.image} alt={book.name} />
        <div className='toc-header-info'>
          <b>{book.name}</b>
          <p>{book.author}</p>
          <p>{book.publisher}</p>
          <p>{book.published_date}</p>
        </div>
      </div>
      <ul className='toc-list'>
        {toc.map((item) => (
          <li onClick={() => onClickItem(item.href)} className='toc-item' key={item.href}>
            {item.label}
          </li>
        ))}
      </ul>
    </Drawer>
  );
};

export default TocDrawer;
