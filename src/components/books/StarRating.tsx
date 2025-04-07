import React from 'react';
import star from '../../assets/icons/a-star.svg';
import starEmpty from '../../assets/icons/starEmpty.svg';

interface StarRatingProps {
  rating: number;
  onRatingClick?: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingClick }) => {
  return (
    <div className='star-rating'>
      {[1, 2, 3, 4, 5].map((starValue) => (
        <img
          key={starValue}
          src={starValue <= rating ? star : starEmpty}
          alt='star'
          onClick={() => onRatingClick?.(starValue)}
          style={{ cursor: onRatingClick ? 'pointer' : 'default' }}
        />
      ))}
    </div>
  );
};

export default StarRating; 