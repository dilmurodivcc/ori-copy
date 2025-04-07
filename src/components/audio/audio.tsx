import { useState, useRef, useEffect } from 'react';
import '../../scss/components/audio-components.scss';
import useAudioPlayer from '../../hooks/useAudioPlayer';

function Audio_component() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showSpeedDropdown, setShowSpeedDropdown] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(() => {
    // Get saved playback speed from localStorage or default to 1
    const savedSpeed = localStorage.getItem('audioPlaybackSpeed');
    return savedSpeed ? parseFloat(savedSpeed) : 1;
  });
  const { isVisible, hidePlayer } = useAudioPlayer();

  // Mock data - replace with real data later
  const audioData = {
    title: 'Jinlar Bazmi',
    coverImage: './book-cover.png',
    audioUrl: 'https://example.com/audio.mp3', // Replace with actual audio URL
  };

  useEffect(() => {
    if (audioRef.current) {
      // Set initial playback speed from localStorage
      audioRef.current.playbackRate = playbackSpeed;
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });

      const updateProgress = () => {
        if (audioRef.current) {
          const currentTime = audioRef.current.currentTime;
          const duration = audioRef.current.duration;
          setCurrentTime(currentTime);

          // Update progress bar color during playback
          const progressBar = document.querySelector('.progress-bar') as HTMLInputElement;
          if (progressBar) {
            const progress = (currentTime / duration) * 100;
            progressBar.style.background = `linear-gradient(to right, #FF3131 ${progress}%, #E5E5E5 ${progress}%)`;
          }
        }
      };

      audioRef.current.addEventListener('timeupdate', updateProgress);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', updateProgress);
          audioRef.current.removeEventListener('loadedmetadata', () => {});
        }
      };
    }
  }, [playbackSpeed]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleNext = () => {
    // Implement next track logic
    console.log('Next track');
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);

      // Update progress bar color when seeking
      const progress = (time / duration) * 100;
      e.target.style.background = `linear-gradient(to right, #FF3131 ${progress}%, #E5E5E5 ${progress}%)`;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const speedOptions = [
    { label: '0.5x', value: 0.5 },
    { label: 'Normal', value: 1 },
    { label: '1.5x', value: 1.5 },
    { label: '2x', value: 2 },
  ];

  const handleSpeedChange = (speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      // Save to localStorage
      localStorage.setItem('audioPlaybackSpeed', speed.toString());
      setShowSpeedDropdown(false);
    }
  };

  // Update display style based on isVisible
  const audioComponentStyle = {
    display: isVisible ? 'flex' : 'none',
  };

  return (
    <div className='audio-component' style={audioComponentStyle}>
      <audio ref={audioRef} src='./test-audio.mp3' />

      <div className='main-row'>
        <div className='audio-info'>
          <img src='./books-audio.png' alt={audioData.title} className='cover-image' />
          <span className='title'>{audioData.title}</span>
        </div>

        <div className='control-buttons'>
          <button onClick={handlePrevious} className='control-btn'>
            <svg width='18' height='12' viewBox='0 0 18 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M18 12L9.5 6L18 0V12ZM9 12L0.5 6L9 0V12Z' fill='#FF3131' />
            </svg>
          </button>
          <button onClick={skipBackward} className='control-btn'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6 4H8V6.55709C9.19001 5.622 10.6906 5.0643 12.3214 5.0643C16.1874 5.0643 19.3214 8.19831 19.3214 12.0643C19.3214 15.9303 16.1874 19.0643 12.3214 19.0643C10.171 19.0643 8.24696 18.0946 6.96289 16.5685L8.58221 15.3837C9.49811 16.4147 10.8339 17.0643 12.3214 17.0643C15.0829 17.0643 17.3214 14.8257 17.3214 12.0643C17.3214 9.30288 15.0829 7.0643 12.3214 7.0643C11.2346 7.0643 10.2288 7.41107 9.4085 8L12 8V10H6V4Z'
                fill='#FF3131'
              />
            </svg>
          </button>

          <button onClick={togglePlay} className='play-btn'>
            {isPlaying ? (
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M8 5V19M16 5V19'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ) : (
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                <path
                  d='M5 4.99999L19 12L5 19V4.99999Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </button>

          <button onClick={skipForward} className='control-btn'>
            <svg width='14' height='16' viewBox='0 0 14 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M14.0011 0H12.0011V2.55709C10.8111 1.622 9.31053 1.0643 7.67969 1.0643C3.81369 1.0643 0.679688 4.19831 0.679688 8.0643C0.679688 11.9303 3.81369 15.0643 7.67969 15.0643C9.83018 15.0643 11.7542 14.0946 13.0382 12.5685L11.4189 11.3837C10.503 12.4147 9.16721 13.0643 7.67969 13.0643C4.91826 13.0643 2.67969 10.8257 2.67969 8.0643C2.67969 5.30288 4.91826 3.0643 7.67969 3.0643C8.76653 3.0643 9.77238 3.41107 10.5926 4L8.00113 4V6H14.0011V0Z'
                fill='#FF3131'
              />
            </svg>
          </button>

          <button onClick={handleNext} className='control-btn'>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M13 18V6L21.5 12L13 18ZM4 18V6L12.5 12L4 18Z' fill='#FF3131' />
            </svg>
          </button>
        </div>

        <div className="header-right-controls">
          <button className='playlist-btn' onClick={() => setShowSpeedDropdown(!showSpeedDropdown)}>
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6.66667 4.16667H17.5V5.83333H6.66667V4.16667ZM2.5 3.75H5V6.25H2.5V3.75ZM2.5 8.75H5V11.25H2.5V8.75ZM2.5 13.75H5V16.25H2.5V13.75ZM6.66667 9.16667H17.5V10.8333H6.66667V9.16667ZM6.66667 14.1667H17.5V15.8333H6.66667V14.1667Z'
                fill='#FF3131'
              />
            </svg>
            <div className={`speed-dropdown ${showSpeedDropdown ? 'show' : ''}`}>
              {speedOptions.map((option) => (
                <div
                  key={option.value}
                  className={`speed-option ${playbackSpeed === option.value ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeedChange(option.value);
                  }}
                >
                  {option.label}
                  {playbackSpeed === option.value && (
                    <svg className='check-icon' width='16' height='16' viewBox='0 0 16 16'>
                      <path fill='currentColor' d='M6.5 12.5l-4-4 1.5-1.5L6.5 9.5 12 4l1.5 1.5z' />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </button>
          
          <button className='close-btn' onClick={hidePlayer}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8334 5.34175L14.6584 4.16675L10.0001 8.82508L5.34175 4.16675L4.16675 5.34175L8.82508 10.0001L4.16675 14.6584L5.34175 15.8334L10.0001 11.1751L14.6584 15.8334L15.8334 14.6584L11.1751 10.0001L15.8334 5.34175Z" fill="#FF3131"/>
            </svg>
          </button>
        </div>
      </div>
      <div className='audio-controls'>
        <div className='progress-container'>
          <span className='time'>{formatTime(currentTime)}</span>
          <input
            type='range'
            min='0'
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className='progress-bar'
          />
          <span className='time'>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

export default Audio_component;