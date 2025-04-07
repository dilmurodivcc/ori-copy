import React from 'react';

interface Book {
  id: number;
  title: string;
  category: string;
  rating: number;
  image: string;
}

interface CardProps {
  book: Book;
}

const Card: React.FC<CardProps> = ({ book }) => {
  return (
    <div className="book-card">
      <div className="book-image">
        <img src={book.image} alt={book.title} />
      </div>
      <h3>{book.title}</h3>
      <div className="book-info">
        <span className="category">{book.category}</span>
        <div className="rating">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1L10.163 5.279L15 6.017L11.5 9.389L12.326 14L8 11.838L3.674 14L4.5 9.389L1 6.017L5.837 5.279L8 1Z" fill="#FFB800" />
          </svg>
          <span>{book.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default Card; 