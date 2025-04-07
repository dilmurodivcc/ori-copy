import { useState } from 'react';
import activeStar from '../../assets/icons/a-star.svg';
import disableStar from '../../assets/icons/d-star.svg';

interface StarRatingProps {
  totalStars?: number;
  initialRating?: number;
  onChange?: (rating: number) => void;
  className?: string;
}

const StarRatingInput: React.FC<StarRatingProps> = ({ 
  totalStars = 5, 
  initialRating = 0, 
  onChange, 
  className = '' 
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (newRating: number) => {
    setRating(newRating);
    if (onChange) onChange(newRating);
  };

  return (
    <div className={`star-rating-input ${className}`}>
      {[...Array(totalStars)].map((_, i) => (
        <img 
          key={i} 
          style={{ height: '18px', width: 'auto', objectFit: 'cover', cursor: 'pointer' }} 
          src={i < rating ? activeStar : disableStar} 
          alt='' 
          className='star-icon' 
          onClick={() => handleRating(i + 1)} 
        />
      ))}
    </div>
  );
};

export default StarRatingInput;
