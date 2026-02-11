import { useState } from 'react';
import PlayerSlot from './components/PlayerSlot';
import type { Player } from './types/types';

export default function App() {
  const [players, setPlayers] = useState<Player[]>([
  {
    id: 0,
    name: 'Alice',
    avatar: 0,
    color: '#aaaaaa',
    life: 20,
    damage: 0,
    markers: [{ id: 0, text: '+1/+1', amount: 1 }],
  },
  {
    id: 1,
    name: 'John',
    avatar: 1,
    color: '#666666',
    life: 20,
    damage: 0,
    markers: [],
  },
]);

  const handlePlayerChange = (updatedPlayer: Player) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => player.id === updatedPlayer.id ? updatedPlayer : player)
    );
  }

  const handlePlayerDelete = (playerId: number) => {
    setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== playerId));
  }

  return (
    <div className='bg-black max-h-dvh h-dvh min-h-screen flex flex-col text-white'>
      {players.map(player => (
        <PlayerSlot key={player.id} player={player} onPlayerChange={handlePlayerChange} onPlayerDelete={handlePlayerDelete} />
      ))}
    </div>
  );
}