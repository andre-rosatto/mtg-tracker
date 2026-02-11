import { useState } from 'react';
import './App.css';
import AvatarSelector from './components/AvatarSelector';
import TimedButton from './components/TimedButton';
import { RemovePlayerIcon } from './components/Icons';

export default function App() {
  const [avatarIndex, setAvatarIndex] = useState(0);

  return (
    <>
      <AvatarSelector index={avatarIndex} onAvatarChange={setAvatarIndex} />
      <TimedButton
        className='rounded-sm bg-black text-white w-16 h-10'
        onComplete={() => console.log('Action Confirmed!')}
      >
        <RemovePlayerIcon />
      </TimedButton>
    </>
  );
}