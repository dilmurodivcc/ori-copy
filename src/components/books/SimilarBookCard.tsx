import { Link } from 'react-router-dom';
import star from '../../assets/icons/a-star.svg';

interface SimilarBookCardProps {
  id: number;
  title: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  onDelete?: (id: number) => void;
  showDelete?: boolean;
  isDeleting?: boolean;
}

const SimilarBookCard: React.FC<SimilarBookCardProps> = ({
  id,
  title,
  image,
  category,
  rating,
  reviews,
  onDelete,
  showDelete = false,
  isDeleting = false,
}) => {
  return (
    <Link to={`/detail/${id}`}>
      <div className='similar-book-card'>
        <div className='book-image'>
          <img src={image} alt={title} />
        </div>
        <div className='book-info'>
          <div className='book-info-content'>
            <h4>{title}</h4>
            <span className='category'>{category}</span>
            <div className='rating-reviews'>
              <img src={star} alt='' />
              <span className='rating-number'>{rating}</span>
              <span className='reviews-count'>{reviews} фикрлар</span>
            </div>
            {showDelete && onDelete && (
              <button onClick={() => onDelete(id)} disabled={isDeleting} style={{  color: '#ff3131', border: 'none',cursor: 'pointer',marginTop: '10px' }} className='delete-btn'>
                {isDeleting ? 'Ўчирилмокда...' : 'Ўчириш'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SimilarBookCard;
