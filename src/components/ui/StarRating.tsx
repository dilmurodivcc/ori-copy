import activeStar from '../../assets/icons/a-star.svg';
import disableStar from '../../assets/icons/d-star.svg';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  showNumber?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5, showNumber = true, className = '' }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < totalStars; i++) {
      stars.push(<img key={i} style={{ height: '18px', width: 'auto', objectFit: 'cover' }} src={i < rating ? activeStar : disableStar} alt='' className='star-icon' />);
    }
    return stars;
  };

  return (
    <div className={`star-rating ${className}`} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
      {renderStars()}
      {showNumber && <span className='rating-number'>{rating}.0</span>}
    </div>
  );
};

export default StarRating;