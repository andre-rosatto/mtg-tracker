import { useRef, useState } from 'react';
import { avatars } from './avatars';
import PopupMenu from '../PopupMenu';
import clsx from 'clsx';

interface AvatarSelectorProps extends React.ComponentProps<'div'> {
  index: number;
  className?: string;
  onAvatarChange?: (newIndex: number) => void;
}

export default function AvatarSelector({ index, className, onAvatarChange, ...props }: AvatarSelectorProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleAvatarClick = (newIndex: number) => () => {
    if (newIndex !== index) {
      onAvatarChange?.(newIndex);
    }
  };

  return (
    <div
      className={clsx('relative w-fit overflow-visible', className)} {...props}
      onClick={() => setPopupOpen(!popupOpen)}
      ref={ref}
    >
      <img src={avatars[index]} alt='Avatar' className='cursor-pointer' draggable={false} />
      <PopupMenu
        triggerRef={ref}
        visible={popupOpen}
        anchor='tl'
        className='bg-black border border-amber-600 p-1 rounded-md text-white'
      >
        <ul className='grid grid-cols-8 gap-1'>
          {avatars.map((avatar, i) => (
            <li
              key={i}
              className={clsx(
                'cursor-pointer rounded-full border-2',
                i === index ? 'border-amber-500' : 'border-transparent'
              )}
              onClick={handleAvatarClick(i)}
            >
              <img src={avatar} alt={`Avatar ${i}`} className='w-8 h-8 rounded-full' />
            </li>
          ))}
        </ul>
      </PopupMenu>
    </div>
  );
}