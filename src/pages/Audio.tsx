import Audio_component from '../components/audio/audio';
import Header from '../components/layout/Header';
import useAudioPlayer from '../hooks/useAudioPlayer';
import { useEffect } from 'react';

const Audio = () => {
  const { showPlayer } = useAudioPlayer();

  useEffect(() => {
    showPlayer();
  }, [showPlayer]);

  return (
    <>
      <Header />
     
      <Audio_component />
    </>
  );
};

export default Audio;
