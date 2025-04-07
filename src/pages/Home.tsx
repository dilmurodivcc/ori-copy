import React from 'react';
import Slider from 'react-slick';
import Card from '../components/ui/Card';
import { useTranslation } from 'react-i18next';

import ReadingGirl from '../assets/images/reading-girl.svg';
import Hearticon from '../assets/images/heart-btn-icon.svg';
import WaveBg from '../assets/images/waveElement.svg';
import Energy from '../assets/icons/energy-icon.svg';
import Thumb from '../assets/icons/thumb.svg';
import Safety from '../assets/icons/safety-icon.svg';
import Favorite from '../assets/icons/favorite-icon.svg';
import NextIcon from '../assets/icons/next-icon.svg';

import { useGetAudioBooks, useGetBooks, useGetCategories } from '../hooks/useGetData';
import { Book, Category } from '../types';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useModalStore from '../store/modalStore';

const features = [
  {
    title: 'Тезкор етказиш',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    icon: Energy,
  },
  {
    title: 'Тўлов химояси',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    icon: Safety,
  },
  {
    title: 'Юқори сифат',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    icon: Thumb,
  },
  {
    title: 'Энг сара китоблар',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    icon: Favorite,
  },
];

interface HomeProps {
  categories: Category[];
}

const Home: React.FC<HomeProps> = ({ categories }) => {
  const { t, i18n } = useTranslation();
  const sliderRef = React.useRef<Slider>(null);
  const newBooksSliderRef = React.useRef<Slider>(null);
  const audioBooksSliderRef = React.useRef<Slider>(null);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [activeAudioSlide, setActiveAudioSlide] = React.useState(0);
  const smallCarouselRef = React.useRef<Slider>(null);
  const navigate = useNavigate();
  const { books } = useGetBooks();
  const { toggleModal } = useModalStore();
  const { audioBooks } = useGetAudioBooks();
  const { isAuthenticated } = useAuthStore();
  const { bookCategories, isBookCategoriesLoading } = useGetCategories();

  // Update the API call to use current language
  const currentLang = i18n.language.startsWith('uz') ? 'uz' : i18n.language === 'ru' ? 'ru' : 'en';

  if (isBookCategoriesLoading) {
    return <div className='small-carusel-container'>Loading</div>;
  }

  const totalPages = books?.results ? Math.ceil(books.results.length / 5) : 0;
  const totalAudioPages = audioBooks?.results ? Math.ceil(audioBooks.results.length / 5) : 0;

  const handleNewBooksPrevClick = () => {
    if (newBooksSliderRef.current && activeSlide > 0) {
      newBooksSliderRef.current.slickPrev();
    }
  };

  const handleNewBooksNextClick = () => {
    if (newBooksSliderRef.current && activeSlide < totalPages - 1) {
      newBooksSliderRef.current.slickNext();
    }
  };

  const handleAudioBooksPrevClick = () => {
    if (audioBooksSliderRef.current && activeAudioSlide > 0) {
      audioBooksSliderRef.current.slickPrev();
    }
  };

  const handleAudioBooksNextClick = () => {
    if (audioBooksSliderRef.current && activeAudioSlide < totalAudioPages - 1) {
      audioBooksSliderRef.current.slickNext();
    }
  };

  const handleSmallCarouselPrevClick = () => {
    if (smallCarouselRef.current) {
      smallCarouselRef.current.slickPrev();
    }
  };

  const handleSmallCarouselNextClick = () => {
    if (smallCarouselRef.current) {
      smallCarouselRef.current.slickNext();
    }
  };

  const newBooksSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: false,
    arrows: false,
    beforeChange: (_: number, next: number) => {
      const newIndex = Math.floor(next / 5);
      if (newIndex >= 0 && newIndex < totalPages) {
        setActiveSlide(newIndex);
      }
    },
    afterChange: (current: number) => {
      const newIndex = Math.floor(current / 5);
      if (newIndex >= 0 && newIndex < totalPages) {
        setActiveSlide(newIndex);
      }
    },
  };
  const audioBooksSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    arrows: false,
    beforeChange: (_: number, next: number) => {
      const newIndex = Math.floor(next / 5);
      if (newIndex >= 0 && newIndex < totalAudioPages) {
        setActiveAudioSlide(newIndex);
      }
    },
    afterChange: (current: number) => {
      const newIndex = Math.floor(current / 5);
      if (newIndex >= 0 && newIndex < totalAudioPages) {
        setActiveAudioSlide(newIndex);
      }
    },
  };

  const smallCarouselSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    arrows: false,
    beforeChange: (_: number, next: number) => {
      console.log(next);
    },
  };

  const genreSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    arrows: false,
    beforeChange: (_: number, next: number) => setActiveSlide(Math.floor(next / 5)),
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handleCategoryClick = (category: Category) => {
    // ... existing code ...
  };

  return (
    <div className='home-container'>
      <div className='reading-girl-container container'>
        <div className='reading-girl-box container'>
          <div className='reading-girl-content'>
            <h1>Кўп ўқилаётганлар</h1>
            <img className='reading-girl-img' src={ReadingGirl} alt='Reading Girl' />
            <div className='small-carusel-container'>
              <div className='section-header'>
                <h1>{t('categories')}</h1>
              </div>
              <div className='carousel-wrapper'>
                <button className='page-nav prev' onClick={handleSmallCarouselPrevClick}>
                  <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <circle cx='16' cy='16' r='16' fill='#FF3131' />
                    <path
                      d='M19 22L12 16L19 10'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <button className='page-nav next' onClick={handleSmallCarouselNextClick}>
                  <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <circle cx='16' cy='16' r='16' fill='#FF3131' />
                    <path
                      d='M13 10L20 16L13 22'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <div className='small-carusel-container'>
                  <Slider ref={smallCarouselRef} {...smallCarouselSettings} className='carousel small-carousel'>
                    {!isBookCategoriesLoading &&
                      bookCategories?.results.map((category) => (
                        <div key={category.id} className='book-card'>
                          <div className='book-image'>
                            <img src={category.image} alt={category.name} />
                          </div>
                          <h3>{category[`name_${currentLang}`] || category.name}</h3>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='reading-girl-right'>
          <img src={WaveBg} alt='' className='wave-bg' />
          <h1>Китоб ўқишни ёқтирасизми?</h1>
          <p>Унда пулингизни тежаш учун ўзингиз йоқтирган рукнга обуна бўлинг</p>
          <button
            onClick={() => {
              if (isAuthenticated) {
                navigate('/profile');
              } else {
                toggleModal();
              }
            }}
          >
            <img src={Hearticon} alt='' /> Обуна бўлиш
          </button>
        </div>
      </div>

      <div className='feature-container container'>
        {features.map((feature, index) => (
          <div className='feature-card' key={index}>
            <div className='icon'>
              <img src={feature.icon} alt='' />
            </div>
            <div className='text'>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Карусель жанров */}
      <div className='genres-container container'>
        <div className='section-header'>
          <h1>{t('categories')}</h1>
        </div>
        <div className='carousel-wrapper'>
          <button className='nav-button next-button' onClick={handleNextClick}>
            <img src={NextIcon} alt='' />
          </button>
          <Slider ref={sliderRef} {...genreSettings}>
            {!isBookCategoriesLoading &&
              bookCategories?.results.map((category) => (
                <div key={category.id} className='genre-card'>
                  <img src={category.image} alt={category[`name_${currentLang}`] || category.name} />
                  <p>{category[`name_${currentLang}`] || category.name}</p>
                </div>
              ))}
          </Slider>
        </div>
      </div>

      <div className='new-books-container container'>
        <div className='section-header'>
          <h1>Янги қўшилганлар</h1>
          <div className='pagination-controls'>
            <button
              className={`page-nav prev ${activeSlide === 0 ? 'disabled' : ''}`}
              onClick={handleNewBooksPrevClick}
              disabled={activeSlide === 0}
              aria-label='Previous slide'
            >
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M15 19L8 12L15 5'
                  stroke='var(--primary)'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <div className='pagination-dots'>
              {[...Array(totalPages)].map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === activeSlide ? 'active' : ''}`}
                  onClick={() => {
                    if (newBooksSliderRef.current) {
                      newBooksSliderRef.current.slickGoTo(index * 5);
                    }
                  }}
                  role='button'
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeSlide ? 'true' : 'false'}
                ></span>
              ))}
            </div>
            <button
              className={`page-nav next ${activeSlide >= totalPages - 1 ? 'disabled' : ''}`}
              onClick={handleNewBooksNextClick}
              disabled={activeSlide >= totalPages - 1}
              aria-label='Next slide'
            >
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9 5L16 12L9 19'
                  stroke='var(--primary)'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
        <div className='carousel-wrapper'>
          <Slider ref={newBooksSliderRef} {...newBooksSettings}>
            {books?.results.map((book: Book) => <Card key={book.id} book={book} showActions={true} viewMode='grid' />)}
          </Slider>
        </div>
      </div>

      <div className='audio-books-container container'>
        <div className='section-header'>
          <h1>Аудио китоблар</h1>
          <div className='pagination-controls'>
            <button
              className={`page-nav prev ${activeAudioSlide === 0 ? 'disabled' : ''}`}
              onClick={handleAudioBooksPrevClick}
              disabled={activeAudioSlide === 0}
            >
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M15 19L8 12L15 5'
                  stroke='var(--primary)'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <div className='pagination-dots'>
              {[...Array(totalAudioPages)].map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === activeAudioSlide ? 'active' : ''}`}
                  onClick={() => {
                    if (audioBooksSliderRef.current) {
                      audioBooksSliderRef.current.slickGoTo(index * 5);
                    }
                  }}
                ></span>
              ))}
            </div>
            <button
              className={`page-nav next ${activeAudioSlide === totalAudioPages - 1 ? 'disabled' : ''}`}
              onClick={handleAudioBooksNextClick}
              disabled={activeAudioSlide === totalAudioPages - 1}
            >
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M9 5L16 12L9 19'
                  stroke='var(--primary)'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
        <div className='carousel-wrapper'>
          <Slider ref={audioBooksSliderRef} {...audioBooksSettings}>
            {audioBooks?.results.map((book: Book) => (
              <Card key={book.id} book={book} showActions={true} isAudio={true} viewMode='grid' />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Home;
