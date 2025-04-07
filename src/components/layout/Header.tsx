import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import useAuthStore from '../../store/authStore';
import logo from '../../assets/icons/fullLogo.svg';
import uz from '../../assets/icons/uzFlag.svg';
import menuIcon from '../../assets/icons/menuHeader.svg';
import search from '../../assets/icons/search.svg';
import arrow from '../../assets/icons/arrowDown.svg';
import useModalStore from '../../store/modalStore';
import avatar from '../../assets/icons/profilePicture.svg';
import { useGetUser } from '../../hooks/useGetUser';
import { useGetSavedBooks } from '../../hooks/useGetUser';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'uz', label: 'Ўз', flag: uz },
  { code: 'ru', label: 'Рус', flag: uz },
  { code: 'en', label: 'Eng', flag: uz },
];

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const { toggleModal } = useModalStore();
  const [selectedLang, setSelectedLang] = useState<Language>(languages[0]);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { user } = useGetUser();
  const { saved_Books } = useGetSavedBooks();

  useEffect(() => {
    checkAuth();

    // Load language from localStorage if available
    const storedLang = localStorage.getItem('selectedLang');
    const currentLang = storedLang ? languages.find((lang) => lang.code === storedLang) : languages[0];

    if (currentLang) {
      setSelectedLang(currentLang);
      i18n.changeLanguage(currentLang.code);
    }
  }, [checkAuth, i18n.language]);

  const handleLanguageSelect = async (value: string) => {
    const lang = languages.find((l) => l.code === value);
    if (lang) {
      setSelectedLang(lang);
      await i18n.changeLanguage(lang.code);

      // Save the selected language in localStorage
      localStorage.setItem('selectedLang', lang.code);
    }
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      toggleModal();
    }
  };

  return (
    <header className='header'>
      <div className='header-top'>
        <div className='container flex justify-between items-center'>
          {/* Logo */}
          <Link to='/'>
            <img src={logo} alt='logo' />
          </Link>

          {/* Search */}
          <div className='search-container'>
            <button className='type-select'>
              <img src={menuIcon} alt='menu' />
              <span>Рукнлар </span>
              <img className='arrow-down' src={arrow} alt='arrow' />
            </button>
            <div className='search-box'>
              <input type='text' placeholder='Қидириш' />
              <button>
                <img src={search} alt='search' />
              </button>
            </div>
          </div>

          {/* Language Select */}
          <div className='buttons-container'>
            <Select
              value={selectedLang.code}
              onChange={handleLanguageSelect}
              options={languages.map((lang) => ({
                value: lang.code,
                label: (
                  <div className='language-option'>
                    <img src={lang.flag} alt={lang.label} />
                    <span>{lang.label}</span>
                  </div>
                ),
              }))}
              className='language-select'
              popupClassName='language-dropdown'
            />

            {/* Auth buttons */}
            {isAuthenticated ? (
              <>
                <button className='card-button' onClick={() => navigate('/profile/saved')}>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M17 20C17.551 20 18 20.448 18 21C18 21.552 17.551 22 17 22C16.448 22 16 21.552 16 21C16 20.448 16.448 20 17 20ZM11 20C11.551 20 12 20.448 12 21C12 21.552 11.551 22 11 22C10.448 22 10 21.552 10 21C10 20.448 10.448 20 11 20ZM21.889 5.458L17.894 13.447C17.725 13.786 17.378 14 17 14H9C8.447 14 8 14.448 8 15C8 15.552 8.447 16 9 16H19C19.551 16 20 16.448 20 17C20 17.552 19.551 18 19 18C19 18 12.413 18 9 18C7.343 18 6 16.657 6 15C6 13.793 6.71201 12.753 7.73901 12.277L5.25601 4H3C2.448 4 2 3.552 2 3C2 2.448 2.448 2 3 2H6C6.441 2 6.83 2.29 6.957 2.713L7.34403 4H20.988C21.067 3.999 21.147 4.007 21.225 4.026L21.233 4.028C21.326 4.05 21.413 4.085 21.494 4.131C21.644 4.216 21.765 4.335 21.85 4.474C21.936 4.613 21.989 4.774 21.998 4.947C22.003 5.039 21.995 5.133 21.974 5.226L21.972 5.234C21.953 5.313 21.925 5.388 21.889 5.458ZM19.382 6H7.944L9.74402 12H16.382L19.382 6Z'
                      fill='#11142D'
                    />
                  </svg>
                  {saved_Books && saved_Books.length > 0 && <span className='badge'>{saved_Books.length}</span>}
                </button>
                <button className='profile-button' onClick={handleAuthClick}>
                  <img
                    style={{ borderRadius: '12px', width: '43px', height: '44px', objectFit: 'cover' }}
                    src={user ? user.image : avatar}
                    alt=''
                  />
                </button>
              </>
            ) : (
              <button className='auth-button' onClick={handleAuthClick}>
                <img src={user} alt='' />
                Кириш
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='header-bottom'>
        <div className='container'>
          {isHomePage ? (
            <nav className='navigation-links'>
              <Link to='/category?type=Аудиокитоб' className='nav-link'>
                Аудио китоблар
              </Link>
              <Link to='/category?type=Электрон+китоб' className='nav-link'>
                Электрон китоблар
              </Link>
              <Link to='/category?type=Босма+китоб' className='nav-link'>
                Босма китоблар
              </Link>
              <Link to='/' className='nav-link'>
                Контакт
              </Link>
              <Link to='/' className='nav-link'>
                Биз хақимизда
              </Link>
            </nav>
          ) : (
            <div className='breadcrumb'>
              <div className='breadcrumb-item'>
                <button className='active' onClick={() => navigate('/')}>
                  Бош сахифа /
                </button>{' '}
                <span style={{ cursor: 'pointer' }}>
                  {location.pathname === '/profile' ||
                  location.pathname === '/profile/saved' ||
                  location.pathname === '/profile/settings' ||
                  location.pathname === '/profile/e-account' ||
                  location.pathname === '/profile/my-books'
                    ? 'Профиль'
                    : 'Китоблар'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
