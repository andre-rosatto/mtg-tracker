import clsx from "clsx";
import { createPortal } from "react-dom";
import { useDropdownPosition } from "../../hooks/useDropdownPosition";
import { CloseIcon } from "../Icons";

interface PopupMenuProps extends React.ComponentProps<'div'> {
  triggerRef: React.RefObject<HTMLElement | null>;
  visible: boolean;
  anchor: 'tl' | 'tr' | 'bl' | 'br';
  className?: string;
}

export default function PopupMenu({ triggerRef, visible, anchor, className, children, ...props }: PopupMenuProps) {
  const style = useDropdownPosition(triggerRef, visible, anchor);
  
  const getAnchorClasses = (anchor: PopupMenuProps['anchor']) => {
    switch (anchor) {
      case 'tl':
        return 'origin-top-left';
      case 'tr':
        return 'origin-top-right';
      case 'bl':
        return 'origin-bottom-left';
      case 'br':
        return 'origin-bottom-right';
    }
  }

  return createPortal(
    <div className={clsx(
        'absolute w-fit transition-all transform-gpu flex flex-col',
        getAnchorClasses(anchor),
        visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        className
      )} style={style} {...props}>
        <div
          className='absolute font-extrabold aspect-square text-center mb-1 self-end select-none cursor-pointer w-4 h-4 -right-6'
        >
          <CloseIcon className='w-full h-full' />
        </div>
      {children}
    </div>,
    document.body
  );
}