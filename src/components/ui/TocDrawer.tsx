import { Drawer } from 'antd';
import { Toc } from '../../types/book';

interface TocDrawerProps {
  toc: Toc[];
  onClose: () => void;
  isOpen: boolean;
}

const TocDrawer: React.FC<TocDrawerProps> = ({ toc, onClose, isOpen }) => {
  const onClickItem = (loc: string) => {
    // ... existing code ...
  };

  return (
    <Drawer className='toc-drawer' onClose={onClose} open={isOpen}>
      <div className='toc-header'>
        <img width={120} src={book.coverURL} alt={book.title} />
        <div className='toc-header-info'>
          <b>{book.title}</b>
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
