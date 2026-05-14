import { useState } from "react";
import type { Player } from "../../types/types";
import AvatarSelector from "../AvatarSelector";
import { avatars } from "../AvatarSelector/avatars";
import { RemovePlayerIcon } from "../Icons";
import TimedButton from "../TimedButton";
import { MinusIcon, PlusIcon } from "../Icons/Icons";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

interface PlayerSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  player: Player;
  onPlayerChange?: (updatedPlayer: Player) => void;
  onPlayerDelete?: (playerId: number) => void;
}

export default function PlayerSlot({ player, onPlayerChange, onPlayerDelete }: PlayerSlotProps) {
  const [lifeChange, setLifeChange] = useState<number>(0);

  const data = player.history?.map((value, index) => ({ name: index.toString(), value }));

  const handleLifeChange = (isPositive: boolean) => {
    if (isPositive) {
      onPlayerChange && onPlayerChange({...player, life: player.life + lifeChange, history: [...player.history, player.life + lifeChange]});
    } else {
      onPlayerChange && onPlayerChange({...player, life: Math.max(0, player.life - lifeChange), history: [...player.history, Math.max(0, player.life - lifeChange)]});
    }
    setLifeChange(0);
  };

  return (
    <div
      className='relative flex-1 px-2 py-1 flex flex-col items-start overflow-hidden'
    >
      <div
        className='absolute inset-0 bg-cover bg-center blur-2xl'
        style={{
          background: `url('${avatars[player.avatar]}') no-repeat center/cover`
        }}
      ></div>
      {/* top bar */}
      <div className='flex justify-between w-full z-10'>
        {/* header */}
        <div className='flex items-center gap-1'>
          <AvatarSelector
            index={player.avatar}
            className='w-7'
            onAvatarChange={newIndex => {onPlayerChange && onPlayerChange({...player, avatar: newIndex})}}
          />
          <input
            type="text"
            name="player-name"
            autoComplete="on"
            value={player.name}
            className='text-2xl bg-transparent outline-none overflow-hidden flex-1 w-24'
            onChange={e => onPlayerChange && onPlayerChange({...player, name: e.target.value})}
            onFocus={e => e.target.select()}
          ></input>
        </div>

        {/* utilities */}
        <div className='flex gap-1'>
          <TimedButton
            className='rounded-sm text-white w-6 mr-1'
            onComplete={() => onPlayerDelete && onPlayerDelete(player.id)}
          >
            <RemovePlayerIcon />
          </TimedButton>
        </div>
      </div>

      {/* data */}
      <div className='flex w-full h-full gap-2 overflow-hidden z-10'>

        {/* life tracker */}
        <div className='flex flex-col flex-1 w-full min-w-0 basis-1/2'>
          <input
            type="tel"
            name="life"
            className='max-w-30 h-14 text-6xl text-center outline-none bg-transparent'
            value={player.life}
            onChange={e => onPlayerChange && onPlayerChange({
              ...player,
              life: parseInt(e.target.value) || 0,
              history: player.history.slice(0, -1).concat(parseInt(e.target.value) || 0)}
            )}
            onFocus={e => e.target.select()}
          ></input>

          <div className="w-full h-6 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
                }}
                barCategoryGap={0}
                barGap={0}
              >
                <Bar dataKey="value" fill="white" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <div className='flex flex-col items-center'>
            <button
              className='text-3xl w-4'
              onClick={() => handleLifeChange(true)}
            >
              <PlusIcon className="w-full" />
            </button>
            <input
              type="tel"
              name="change-life"
              className='flex-1 min-w-0 h-20 text-2xl w-10 text-center outline-none bg-transparent'
              value={lifeChange}
              onChange={e => setLifeChange(parseInt(e.target.value) || 0)}
              onFocus={e => e.target.select()}
            ></input>
            <button
              className='text-3xl w-4'
              onClick={() => handleLifeChange(false)}
            >
              <MinusIcon className="w-full" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}