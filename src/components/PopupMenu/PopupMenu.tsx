import clsx from "clsx";
import { createPortal } from "react-dom";
import { useDropdownPosition } from "../../hooks/useDropdownPosition";

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
        <div className='font-extrabold aspect-square text-center mb-1 self-end w-fit select-none cursor-pointer'>X</div>
      {children}
    </div>,
    document.body
  );
}