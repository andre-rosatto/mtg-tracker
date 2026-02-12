import type { Player } from "../../types/types";
import AvatarSelector from "../AvatarSelector";
import ColorPicker from "../ColorPicker";
import { RemovePlayerIcon } from "../Icons";
import MarkerSlot from "../MarkerSlot";
import TimedButton from "../TimedButton";

interface PlayerSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  player: Player;
  onPlayerChange?: (updatedPlayer: Player) => void;
  onPlayerDelete?: (playerId: number) => void;
}

export default function PlayerSlot({ player, onPlayerChange, onPlayerDelete }: PlayerSlotProps) {
  return (
    <div
      className='relative flex-1 gap-2 w-full min-h-48 p-2 flex flex-col items-start overflow-hidden'
      style={{
        backgroundColor: player.color,
      }}
    >
      {/* top bar */}
      <div className='flex justify-between w-full'>
        {/* header */}
        <div className='flex items-center gap-1'>
          <AvatarSelector
            index={player.avatar} onAvatarChange={newIndex => {onPlayerChange && onPlayerChange({...player, avatar: newIndex})}}
            className='w-10 min-w-10'
          />
          <input
            type="text"
            name="player-name"
            autoComplete="on"
            value={player.name}
            className='text-2xl bg-transparent outline-none overflow-hidden w-36'
            onChange={e => onPlayerChange && onPlayerChange({...player, name: e.target.value})}
          ></input>
        </div>

        {/* utilities */}
        <div className='flex gap-1'>
          <TimedButton
            className='rounded-sm bg-black text-white w-16 h-10'
            onComplete={() => onPlayerDelete && onPlayerDelete(player.id)}
          >
            <RemovePlayerIcon />
          </TimedButton>
          <ColorPicker color={player.color} onColorChange={newColor => {onPlayerChange && onPlayerChange({...player, color: newColor})}} />
        </div>
      </div>

      {/* data */}
      <div className='grid grid-cols-2 w-full h-full gap-2 overflow-hidden'>

        {/* markers */}
        <ul className='flex flex-col gap-1 basis-1/2 overflow-auto'>
          {player.markers.map(marker => (
            <MarkerSlot
              key={marker.id}
              marker={marker}
              onMarkerChange={updatedMarker => {
                if (onPlayerChange) {
                  const updatedMarkers = player.markers.map(m => m.id === updatedMarker.id ? updatedMarker : m);
                  onPlayerChange({ ...player, markers: updatedMarkers });
                }
              }}
              onMarkerDelete={markerId => {
                if (onPlayerChange) {
                  const updatedMarkers = player.markers.filter(m => m.id !== markerId);
                  onPlayerChange({ ...player, markers: updatedMarkers });
                }
              }}
            />
          ))}
          {/* new marker button */}
          <li className='flex justify-center'>
            <button
              className='flex justify-center items-center bg-white rounded-sm w-24 h-5 text-black'
              onClick={() => {
                if (onPlayerChange) {
                  const updatedMarkers = [...player.markers, { id: Date.now(), text: "new marker", amount: 1 }];
                  onPlayerChange({ ...player, markers: updatedMarkers });
                }
              }}
            >+</button>
          </li>
        </ul>

        {/* life tracker */}
        <div className='flex w-full min-w-0 items-center gap-4 basis-1/2'>
          <input
            type="tel"
            name="life"
            className='flex-1 min-w-0 text-8xl text-right outline-none bg-transparent h-fit'
            value={player.life}
            onChange={e => onPlayerChange && onPlayerChange({...player, life: parseInt(e.target.value) || 0})}
          ></input>
          <div className='flex flex-col'>
            <button
              className='text-5xl w-10 h-10'
              onClick={() => onPlayerChange && onPlayerChange({...player, life: player.life + 1})}
            >+</button>
            <button
              className='text-5xl w-10 h-10'
              onClick={() => onPlayerChange && onPlayerChange({...player, life: Math.max(0, player.life - 1)})}
            >-</button>
          </div>
        </div>

      </div>
    </div>
  );
}