import { useState } from 'react';
import Wallet from '../../../assets/images/e-account-wallet.svg';
import CLICK from '../../../assets/images/click.svg';
import PAYME from '../../../assets/images/payme.svg';
import { useGetUserBalance } from '../../../hooks/useGetUser';
function E_Account() {
  const [activeSection, setActiveSection] = useState('payment');
  const { userBalance } = useGetUserBalance();

  return (
    <div className='e-account'>
      <h3>Э-Хисоб</h3>
      <div className='e-account-content'>
        <div className='e-account-left'>
          <span>Баланс</span>
          <h4>{userBalance?.balance || 0.00} сўм</h4>
        </div>
        <img src={Wallet} alt='' />
      </div>

      {activeSection === 'payment' ? (
        <div className='e-account-payment'>
          <div className='e-account-payment-content' onClick={() => setActiveSection('other')}>
            <img src={PAYME} alt='' />
          </div>
          <div className='e-account-payment-content' onClick={() => setActiveSection('other')}>
            <img src={CLICK} alt='' />
          </div>
        </div>
      ) : (
        <div className='e-account-other'>
          <h4>Сумма</h4>
          <input
            type='number'
            placeholder='Сумма'
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
              }
            }}
            onWheel={(e) => {
              (e.currentTarget as HTMLInputElement).blur();
            }}
          />
          <div className='buttons'>
            <button onClick={() => setActiveSection('payment')} className='btn2'>
              Ортга
            </button>
            <button className='btn'>Тулдириш</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default E_Account;
