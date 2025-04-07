import { useState, useEffect } from 'react';
import { FaUser, FaTrash, FaEye } from 'react-icons/fa';
import { useChangeUser, useGetUser } from '../../../hooks/useGetUser';

const ProfileSettings = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const { changeUser, isUpdating } = useChangeUser();
  const { user } = useGetUser();

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.first_name || '');
      setImage(user.image || null);
    }
  }, [user]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    changeUser({
      first_name: name,
      image: image,
    });
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setImage(null);
  };

  const handlePreviewImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowPreview(true);
  };

  return (
    <div className='upload-wrapper'>
      <div className='top-content'>
        <h2>Созламалар</h2>
      </div>
      <div className='avatar-settings'>
        <div className='uploaders'>
          <div className='image-containerr'>
            <div className='upload-container'>
              {image ? (
                <div className='image-container'>
                  <img src={image} alt='Profil rasmi' className='profile-img' />
                  <div className='image-actions'>
                    <FaEye className='icon' onClick={handlePreviewImage} />
                    <FaTrash className='icon' onClick={handleRemoveImage} />
                  </div>
                </div>
              ) : (
                <label htmlFor='upload' className='upload-placeholder'>
                  <div className='circle'>
                    <FaUser size={80} />
                  </div>
                </label>
              )}
            </div>
            <p
              className='upload-text'
              onClick={image ? handleRemoveImage : () => document.getElementById('upload')?.click()}
            >
              {image ? 'Суратни ўчириш' : 'Сурат юклаш'}
            </p>
          </div>
          <input id='upload' type='file' accept='image/*' onChange={handleImageUpload} style={{ display: 'none' }} />
        </div>

        <div className='profile-name'>
          <label htmlFor='user-name'>Исмингиз</label>
          <input
            id='user-name'
            placeholder='Исмингиз'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value.trimStart())}
          />
        </div>
        <div className='save-btn'>
          <button disabled={!name.trim() || isUpdating} onClick={handleSave}>
            {isUpdating ? 'Сақланиб борапти...' : 'Сақлаш'}
          </button>
        </div>
      </div>

      {showPreview && (
        <div className='image-preview-overlay' onClick={() => setShowPreview(false)}>
          <img src={image || ''} alt='Katta rasm' className='image-preview' />
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
