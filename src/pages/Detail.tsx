import { useEffect, useState } from 'react';
import hairphones from '../assets/icons/headphones-icon.svg';
import reading from '../assets/icons/read-book-icon.svg';
import StarRating from '../components/ui/StarRating';
import redMessage from '../assets/icons/rmsg.svg';
import { Link, useParams } from 'react-router-dom';
import star from '../assets/icons/a-star.svg';
import avatar from '../assets/images/avatar.png';
import useAudioPlayer from '../hooks/useAudioPlayer';
import Audio_component from '../components/audio/audio';
import SimilarBookCard from '../components/books/SimilarBookCard';
import StarRatingInput from '../components/ui/StarRatingInput';
import { useGetDetailBook, Category } from '../hooks/useDetailBook';
import { similarBooks, reviews, ratingStats } from '../data/detailData';

const Detail = () => {
  const { id } = useParams();
  const { book, isLoading, error } = useGetDetailBook(id);
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');
  const { showPlayer } = useAudioPlayer();

  const handleAudioClick = () => {
    showPlayer();
  };

  const handleRatingChange = (newRating: number) => {
    console.log('Selected rating:', newRating);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading book</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <>
      <div className='detail'>
        <div className='container'>
          <div className='detail__content'>
            <img src={book.image} alt={book.name} />
            <div className='detail__content_right'>
              <div className='detail__content_right_top'>
                <h2>{book.name}</h2>
                <div className='left-side'>
                  <img src={hairphones} alt='' />
                  <img src={reading} alt='' />
                  <StarRating rating={book.rating} className='star-rating' />
                  <div className='messeges'>
                    <img src={redMessage} alt='' />
                    <p>{book.comment_count} Фикрлар</p>
                  </div>
                </div>
              </div>
              <h5 className='orange-title'>{book.categories.map((category: Category) => category.name).join(', ')}</h5>
              <p className='description'>{book.description}</p>
              <div className='main-info'>
                <div className='column'>
                  <small>Муаллиф</small>
                  <b>{book.author}</b>
                </div>
                <div className='column'>
                  <small>Нашриёт</small>
                  <b>{book.publisher}</b>
                </div>
                <div className='column'>
                  <small>Йил</small>
                  <b>{book.published_year}</b>
                </div>
              </div>
              <span className='dashed-stick'></span>
              <div className='payment-buttons'>
                {book.paper && (
                  <button className='active'>
                    <svg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M19 4H16V0H2C0.9 0 0 0.9 0 2V13H2C2 14.66 3.34 16 5 16C6.66 16 8 14.66 8 13H14C14 14.66 15.34 16 17 16C18.66 16 20 14.66 20 13H22V8L19 4ZM18.5 5.5L20.46 8H16V5.5H18.5ZM5 14C4.45 14 4 13.55 4 13C4 12.45 4.45 12 5 12C5.55 12 6 12.45 6 13C6 13.55 5.55 14 5 14ZM7.22 11C6.67 10.39 5.89 10 5 10C4.11 10 3.33 10.39 2.78 11H2V2H14V11H7.22ZM17 14C16.45 14 16 13.55 16 13C16 12.45 16.45 12 17 12C17.55 12 18 12.45 18 13C18 13.55 17.55 14 17 14Z'
                        fill='white'
                      />
                    </svg>
                    Сотиб олиш - {book.paper.sale_price} сум
                  </button>
                )}
                {book.audio && (
                  <button onClick={handleAudioClick}>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12H7C7.53043 12 8.03914 12.2107 8.41421 12.5858C8.78929 12.9609 9 13.4696 9 14V19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H17C16.4696 21 15.9609 20.7893 15.5858 20.4142C15.2107 20.0391 15 19.5304 15 19V14C15 13.4696 15.2107 12.9609 15.5858 12.5858C15.9609 12.2107 16.4696 12 17 12H20C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM4 14V19H7V14H4ZM17 14V19H20V14H17Z'
                        fill='#242424'
                      />
                    </svg>
                    Аудио тинглаш - {book.audio.sale_price} сум
                  </button>
                )}
                {book.online && (
                  <Link to='/reading'>
                    <button>
                      <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M3 18.5V5C3 4.20435 3.31607 3.44129 3.87868 2.87868C4.44129 2.31607 5.20435 2 6 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H6.5C5.57174 22 4.6815 21.6313 4.02513 20.9749C3.36875 20.3185 3 19.4283 3 18.5ZM19 20V17H6.5C6.10218 17 5.72064 17.158 5.43934 17.4393C5.15804 17.7206 5 18.1022 5 18.5C5 18.8978 5.15804 19.2794 5.43934 19.5607C5.72064 19.842 6.10218 20 6.5 20H19ZM10 4H6C5.73478 4 5.48043 4.10536 5.29289 4.29289C5.10536 4.48043 5 4.73478 5 5V15.337C5.46869 15.1144 5.98115 14.9993 6.5 15H19V4H17V12L13.5 10L10 12V4Z'
                          fill='#242424'
                        />
                      </svg>
                      Онлайн укиш - {book.online.sale_price} сум
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className='content-bottom'>
            <div className='left-side'>
              <div className='detail-tabs'>
                <button
                  className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
                  onClick={() => setActiveTab('info')}
                >
                  Маълумотлар
                </button>
                <button
                  className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Фикрлар
                </button>
              </div>

              <div className='tab-content'>
                {activeTab === 'info' && (
                  <div className='info-content'>
                    <div className='info-row'>
                      <span className='label'>Китоб номи</span>
                      <span className='value'>{book.name}</span>
                    </div>
                    <div className='info-row'>
                      <span className='label'>Муаллиф</span>
                      <span className='value'>{book.author}</span>
                    </div>
                    <div className='info-row'>
                      <span className='label'>ISBN</span>
                      <span className='value'>{book.isbn}</span>
                    </div>
                    <div className='info-row'>
                      <span className='label'>Тил</span>
                      <span className='value'>{book.language}</span>
                    </div>
                    <div className='info-row'>
                      <span className='label'>Сахифалар</span>
                      <span className='value'>{book.pages}</span>
                    </div>
                    <div className='info-row'>
                      <span className='label'>Чоп этилган сана</span>
                      <span className='value'>{book.published_date}</span>
                    </div>
                    <div className='info-row'>
                      <span className='label'>Нашриёт</span>
                      <span className='value'>{book.publisher}</span>
                    </div>
                    <div className='info-row'>
                      <span className='label'>Рукн</span>
                      <span className='value'>
                        {book.categories.map((category: Category, index: number) => (
                          <span key={index} className='type'>
                            {category.name}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className='reviews-content'>
                    <div className='rating-stats'>
                      <div className='rating-summary'>
                        <h3>Рейтинг</h3>
                        <p className='rating-description'>{book.description}</p>
                      </div>
                      <div className='rating-bars'>
                        {ratingStats.distribution.map((item) => (
                          <div key={item.stars} className='bar-item'>
                            <img src={star} alt='' />
                            <span>{item.stars}</span>
                            <div className='bar-container'>
                              <div className='bar' style={{ width: `${item.percentage}%` }}></div>
                            </div>
                            <span>{item.percentage}%</span>
                          </div>
                        ))}
                      </div>
                      <div className='rating-stars'>
                        <div className='inside-div'>
                          <span className='rating-number'>{ratingStats.total}</span>
                          <StarRating rating={ratingStats.total} />
                        </div>
                      </div>
                    </div>
                    {localStorage.getItem('authToken') && (
                      <div className='review-input'>
                        <h3>Фикрингиз</h3>
                        <StarRatingInput totalStars={5} initialRating={3} onChange={handleRatingChange} />
                        <textarea name='' id='' placeholder='Фикр...'></textarea>
                        <button className='edit-button'>Юбориш</button>
                      </div>
                    )}
                    <div className='reviews-list'>
                      {reviews.map((review) => (
                        <div key={review.id} className='review-item'>
                          <div className='review-header'>
                            <div className='header-profile'>
                              <img src={avatar} alt='' />
                              <div className='profile-title'>
                                <h4>{review.author}</h4>
                                <h6>{review.date}</h6>
                              </div>
                            </div>
                            <div className='profile-rating'>
                              <StarRating rating={review.rating} />
                            </div>
                          </div>
                          <p className='review-text'>{review.comment}</p>
                          {review.isVerified && <button className='edit-button'>Ўзгартириш</button>}
                        </div>
                      ))}
                    </div>
                    <button className='view-more'>Кўпроқ</button>
                  </div>
                )}
              </div>
            </div>
            {/* Similar Books Section */}
            <div className='similar-books'>
              <h3>Ўхшаш китоблар</h3>
              <div className='similar-books-list'>
                {similarBooks.map((book) => (
                  <SimilarBookCard
                    key={book.id}
                    id={book.id}
                    title={book.name}
                    image={book.image}
                    category={book.categories.map((cat) => cat.name).join(', ')}
                    rating={book.rating}
                    reviews={book.comment_count}
                  />
                ))}
                <button className='view-all'>Кўпроқ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Audio_component />
    </>
  );
};

export default Detail;
