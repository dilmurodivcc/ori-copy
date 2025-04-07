import { NavLink, useNavigate } from 'react-router-dom';
import { FaTag, FaWallet, FaBook, FaBookmark, FaCog, FaMoon, FaSignOutAlt } from 'react-icons/fa';
import { useState } from 'react';
import LogoutModal from '../../../components/Modal/LogoutModal';
import '../../../components/Modal/LogoutModal.scss';

function Sitebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <div className='sidebar'>
        <NavLink to='/profile' end className='sidebar-link'>
          <FaTag className='icon' />
          <span>Обуна бўлиш</span>
        </NavLink>
        <NavLink to='e-account' className='sidebar-link'>
          <FaWallet className='icon' />
          <span>Э-Хисоб</span>
        </NavLink>
        <NavLink to='my-books' className='sidebar-link'>
          <FaBook className='icon' />
          <span>Китобларим</span>
        </NavLink>
        <NavLink to='saved' className='sidebar-link'>
          <FaBookmark className='icon' />
          <span>Сақлангандар</span>
        </NavLink>
        <NavLink to='settings' className='sidebar-link'>
          <FaCog className='icon' />
          <span>Созламалар</span>
        </NavLink>
        <button className='sidebar-link' onClick={() => setIsLogoutModalOpen(true)}>
          <FaSignOutAlt className='icon' />
          <span>Чиқиш</span>
        </button>

        <label className={`sidebar-theme ${isDarkMode ? 'dark-mode' : 'light-mode'}`} htmlFor='darkModeToggle'>
          <FaMoon className='icon' />
          <span>{isDarkMode ? 'Кундузги режим' : 'Тунги режим'}</span>
          <div className='toggle-switch'>
            <input id='darkModeToggle' type='checkbox' checked={isDarkMode} onChange={toggleTheme} />
            <span className='slider'></span>
          </div>
        </label>
      </div>

      <LogoutModal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} />
    </>
  );
}

export default Sitebar;
