import { useState } from 'react';
import './App.css';
import AvatarSelector from './components/AvatarSelector';

export default function App() {
  const [avatarIndex, setAvatarIndex] = useState(0);

  return (
    <>
      <AvatarSelector index={avatarIndex} onAvatarChange={setAvatarIndex} />
    </>
  );
}