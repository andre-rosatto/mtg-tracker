import PlayerSlot from './components/PlayerSlot';
import type { Player } from './types/types';
import Toolbar from './components/Toolbar';
import { avatars } from './components/AvatarSelector/avatars';
import { useLocalStorage } from './hooks/useLocalStorage';

function getRandomColor(): string {
  const r = Math.floor(Math.random() * 120);
  const g = Math.floor(Math.random() * 120);
  const b = Math.floor(Math.random() * 120);
  return (
    '#' +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
  );
};

export default function App() {
  const [players, setPlayers] = useLocalStorage<Player[]>('mtg-tracker-players', [
    {
      id: Date.now(),
      name: 'Player 1',
      avatar: Math.floor(Math.random() * avatars.length),
      color: getRandomColor(),
      life: 20,
      markers: [],
    },
    {
      id: Date.now() + 1,
      name: 'Player 2',
      avatar: Math.floor(Math.random() * avatars.length),
      color: getRandomColor(),
      life: 20,
      markers: [],
    },
  ]);

  const handlePlayerChange = (updatedPlayer: Player) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => player.id === updatedPlayer.id ? updatedPlayer : player)
    );
  }

  const handlePlayerDelete = (playerId: number) => {
    if (players.length <= 2) return;
    setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== playerId));
  }

  const handleGameRestart = () => {
    setPlayers(prevPlayers => prevPlayers.map(player => ({
      ...player,
      life: 20,
      markers: [],
    })));
  }

  return (
    <div className='bg-black max-h-screen h-screen min-h-screen flex flex-col text-white'>
      <div className='overflow-auto flex-1'>
        {players.map(player => (
          <PlayerSlot key={player.id} player={player} onPlayerChange={handlePlayerChange} onPlayerDelete={handlePlayerDelete} />
        ))}
      </div>
      <Toolbar
        onAddPlayer={() => {
          setPlayers([...players, {
            id: Date.now(),
            name: `Player ${players.length + 1}`,
            avatar: Math.floor(Math.random() * avatars.length),
            color: getRandomColor(),
            life: 20,
            markers: [],
          }]);
        }}
        onRestart={handleGameRestart}
      />
    </div>
  );
}