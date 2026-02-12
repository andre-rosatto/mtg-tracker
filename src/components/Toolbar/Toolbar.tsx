import { AddPlayerIcon, RestartIcon } from "../Icons";
import TimedButton from "../TimedButton";

interface ToolbarProps {
  onRestart?: () => void;
  onAddPlayer?: () => void;
}

export default function Toolbar({ onRestart, onAddPlayer }: ToolbarProps) {
  return (
    <div className='grid grid-cols-2 h-10 border-b border-neutral-600'>
      <TimedButton
        onComplete={ onRestart }
      >
        <RestartIcon />
      </TimedButton>
      <button
        className='flex items-center justify-center border-l border-neutral-600 active:bg-white/20'
        onClick={ onAddPlayer }
      >
        <AddPlayerIcon />
      </button>
    </div>
  );
}