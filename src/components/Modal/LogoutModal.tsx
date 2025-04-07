
interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlayy' onClick={onClose}>
      <div className='modal-contentt' onClick={(e) => e.stopPropagation()}>
        <div className='modal-bodyy'>
          <p>Сиз ростан хам чиқмокчимисиз?</p>
        </div>
        <div className='modal-footerr'>
          <button className='cancel-buttonn' onClick={onClose}>
            Ёқ
          </button>
          <button className='confirm-buttonn' onClick={onConfirm}>
            Ҳа
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
