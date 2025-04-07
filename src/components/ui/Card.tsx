import '../../scss/pages/Card.scss';
import RatingStar from '../../assets/icons/a-star.svg';
import HeadphoneIcon from '../../assets/icons/headphones-icon.svg';
import ReadingBook from '../../assets/icons/read-book-icon.svg';

import { Link } from 'react-router-dom';
import { Book } from '../../types';
import StarRating from './StarRating';
type CardProps = {
  book?: Book;
  showActions?: boolean;
  isAudio?: boolean;
  viewMode: 'grid' | 'list';
};

const Card: React.FC<CardProps> = ({ book, viewMode, showActions  }) => {
  if (!book) return null;

  return (
    <div className={`book-card ${viewMode}`}>
      {viewMode === 'grid' && (
        <Link to={`/detail/${book.id}`}>
          <div className='book-card__image'>
            {book.image && <img src={book.image} width={240} height={336} alt={book.name} />}
          </div>
          <div className='book-card__content'>
            <h3 className='book-card__title'>{book.name}</h3>
            <p className='book-card__category'>{book.categories?.map((category) => category.name).join(', ')}</p>
            <div className='book-card__footer'>
              <div className='book-card__rating'>
                <img src={RatingStar} alt='rating' className='rating' />
                <span>{book.rating || 0}</span>
              </div>

              {showActions && (
                <div className='book-card__actions'>
                  <div
                    style={{
                      opacity: book.formats.includes('audio') ? 1 : 0.3,
                      cursor: book.formats.includes('audio') ? 'pointer' : 'not-allowed',
                      filter: book.formats.includes('audio')
                        ? 'none'
                        : 'grayscale(100%) sepia(100%) hue-rotate(-50deg) saturate(500%) brightness(0.8)',
                    }}
                  >
                    <img src={HeadphoneIcon} alt='Listen' />
                  </div>
                  <div
                    style={{
                      opacity: book.formats.includes('online') ? 1 : 0.3,
                      cursor: book.formats.includes('online') ? 'pointer' : 'not-allowed',
                      filter: book.formats.includes('online')
                        ? 'none'
                        : 'grayscale(100%) sepia(100%) hue-rotate(-50deg) saturate(500%) brightness(0.8)',
                    }}
                  >
                    <img src={ReadingBook} alt='Read' />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Link>
      )}
      {viewMode === 'list' && (
        <div className='book-card__list'>
          <div className='list__image'>
            {book.image && <img src={book.image} width={240} height={336} alt={book.name} />}
          </div>
          <div className='list__content'>
            <div className='list__content-info'>
              <div className='list__content-name'>
                <Link to={`/detail/${book.id}`}>
                  <h3 className='list__content-name-title'>{book.name}</h3>
                </Link>
                <p className='list__content-name-category'>
                  {book.categories?.map((category) => category.name).join(', ')}
                </p>
              </div>
              <div className='list__content-rating'>
                <StarRating
                  rating={book?.rating}
                  showNumber={false}
                  totalStars={5}
                  className='list__content-rating-stars'
                />
                <div className='list__content-rating-info'>
                  <h5>{book.rating}</h5>
                  <span>{book.comment_count} comments</span>
                </div>
              </div>
            </div>
            <div className='list__content-description'>
              <h5>{book.description}</h5>
            </div>
            <div className='list__content-footer'>
              <div className='list__content-footer-info'>
                <div className='list__content-footer-info-card'>
                  <p>Муаллиф</p>
                  <h3>{book.author}</h3>
                </div>
                <div className='list__content-footer-info-card'>
                  <p>Нашриёт</p>
                  <h3>{book.publisher}</h3>
                </div>
                <div className='list__content-footer-info-card'>
                  <p>Йил</p>
                  <h3>{book.published_year}</h3>
                </div>
              </div>
              <div className='list__content-footer-actions'>
              {showActions && (
                <div className='book-card__actions'>
                  <div
                    style={{
                      opacity: book.formats.includes('audio') ? 1 : 0.3,
                      cursor: book.formats.includes('audio') ? 'pointer' : 'not-allowed',
                      filter: book.formats.includes('audio')
                        ? 'none'
                        : 'grayscale(100%) sepia(100%) hue-rotate(-50deg) saturate(500%) brightness(0.8)',
                    }}
                  >
                    <img src={HeadphoneIcon} alt='Listen' />
                  </div>
                  <div
                    style={{
                      opacity: book.formats.includes('online') ? 1 : 0.3,
                      cursor: book.formats.includes('online') ? 'pointer' : 'not-allowed',
                      filter: book.formats.includes('online')
                        ? 'none'
                        : 'grayscale(100%) sepia(100%) hue-rotate(-50deg) saturate(500%) brightness(0.8)',
                    }}
                  >
                    <img src={ReadingBook} alt='Read' />
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
