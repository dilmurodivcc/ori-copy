import Avatar from '../../../assets/images/avatar.svg';
import { useGetUser } from '../../../hooks/useGetUser';
import { formatPhoneNumber } from '../../../utils/formatPhone';

function Header() {
  const { user } = useGetUser();
  return (
    <div className='profile-header'>
      <img src={user?.image || Avatar} alt='' />
      <div className='profile-header-info'>
        <h3>{user?.first_name || 'Your Name'}</h3>
        <a href={`tel:${formatPhoneNumber(user?.phone || '998950832127')}`}>
          {formatPhoneNumber(user?.phone || '998950832127')}
        </a>
        <h5>
          ID: {user?.id || 'Your ID'} Баланс: {user?.balance} сўм
        </h5>
      </div>
    </div>
  );
}

export default Header;
