import { useLayoutEffect, useState } from "react";

export function useDropdownPosition(
  triggerRef: React.RefObject<HTMLElement | null>,
  open: boolean,
  anchor: 'tl' | 'tr' | 'bl' | 'br' = 'tl',
) {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    switch (anchor) {
      case 'tl':
        setStyle({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          zIndex: 1000,
        });
        break;
      case 'tr':
        setStyle({
          top: rect.top + window.scrollY,
          right: rect.right - window.scrollX,
          zIndex: 1000,
        });
        break;
      case 'bl':
        setStyle({
          bottom: window.innerHeight - rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          zIndex: 1000,
        });
        break;
      case 'br':
        setStyle({
          bottom: window.innerHeight - rect.bottom + window.scrollY,
          right: window.innerWidth - rect.right + window.scrollX,
          zIndex: 1000,
        });
        break;
    }
  }, [open, triggerRef]);

  return style;
}
