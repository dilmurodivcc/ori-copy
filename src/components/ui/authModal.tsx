import { Modal } from 'antd';
import useModalStore from '../../store/modalStore';
import { useEffect, useState, useRef } from 'react';
import PhoneInput from './PhoneInput';
import ModalImage from '../../assets/images/waveElement3.svg';
import useAuthStore from '../../store/authStore';
import API from '../../API';
import { useNavigate } from 'react-router-dom';

const AuthModal: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const { isModalOpen, toggleModal } = useModalStore();
  const [timer, setTimer] = useState(10);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const { checkAuth } = useAuthStore();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isModalOpen) {
      setOtp(['', '', '', '']);
      setPhone('');
      setIsVerified(false);
      setError('');
    }
  }, [isModalOpen]);

  const handleSendVerification = async () => {
    const numericPhone = phone.replace(/\D/g, '').replace(/^\+/, '');

    if (numericPhone.length === 12) {
      try {
        const response = await API.post('/user/send-verification-code/', {
          phone: numericPhone,
        });

        if (response.data.success) {
          setIsVerified(true);
          startTimer();
          setError('');
          setTimeout(() => {
            inputRefs.current[0]?.focus();
          }, 100);
        } else {
          setError(response.data.message || "Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
        console.error('Error sending verification code:', err);
      }
    } else {
      setError("Raqamni to'g'ri kiriting");
    }
  };

  const startTimer = () => {
    setTimer(10);
    setIsResendDisabled(true);
  };

  useEffect(() => {
    if (isResendDisabled && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleVerifyOtp = async () => {
    const numericPhone = phone.replace(/\D/g, '').replace(/^\+/, '');
    const otpCode = otp.join('');

    if (otpCode.length !== 4) {
      setError("Tasdiqlash kodini to'liq kiriting");
      return;
    }

    try {
      const response = await API.post('/user/verify-phone/', {
        phone: numericPhone,
        code: otpCode,
      });

      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        toggleModal();
        checkAuth();
        navigate('/profile');
      } else {
        setError("Tasdiqlash muvaffaqiyatsiz tugadi. Iltimos qayta urinib ko'ring.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Xato kod, qayta urinib ko'ring!");
      console.error('Error verifying code:', err);
    }
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Обработчик для формы
  const handleFormKeyPress = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!isVerified) {
        handleSendVerification();
      }
    }
  };

  // Обработчик для OTP инпутов
  const handleOtpKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && otp.every(digit => digit !== '')) {
      e.preventDefault();
      handleVerifyOtp();
    }
  };

  return (
    <Modal 
      width={742} 
      centered 
      open={isModalOpen} 
      onOk={toggleModal} 
      onCancel={toggleModal}
    >
      <div className="modal-content">
        {isVerified ? (
          <div className="verification-section">
            <h2 className="modal-title">Телефонингизга юборилган кодни киритинг</h2>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  className="otp-input-field"
                  style={{
                    width: "40px",
                    textAlign: "center",
                    userSelect: "none",
                    fontSize: "20px",
                  }}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onKeyPress={handleOtpKeyPress}
                />
              ))}
            </div>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            <p className='timer-text'>{timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : '00:00'}</p>
            <button
              className={`resend-btn ${isResendDisabled ? 'disabled-text' : 'active-text'}`}
              disabled={isResendDisabled}
              onClick={handleSendVerification}
            >
              Қайта юбориш
            </button>
            <button className='send-otp-btn' onClick={handleVerifyOtp}>
              Кириш
            </button>
            <button
              className='change-phone-btn'
              onClick={() => {
                setIsVerified(false);
                setOtp(['', '', '', '']);
                setIsResendDisabled(false);
                setError('');
              }}
            >
              Телефон рақамни ўзгартириш
            </button>
          </div>
        ) : (
          <form onKeyPress={handleFormKeyPress}>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
          <h2 className="modal-title">Ассалому алайкум Хуш келибсиз!</h2>
          </div>
           
            <div className="otp-input">
              <label className="modal-input-label" htmlFor="otp-input">
                Мобил рақам
              </label>
              <PhoneInput 
                value={phone} 
                onChange={setPhone}
              />
            </div>
            <button 
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSendVerification();
              }} 
              className="send-otp-btn"
            >
              Кириш
            </button>
          </form>
        )}
      </div>
      <img src={ModalImage} alt="" className="modal-image" />
    </Modal>
  );
};

export default AuthModal;
