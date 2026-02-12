import clsx from "clsx";

interface ColorPickerProps extends React.HTMLAttributes<HTMLInputElement> {
  color?: string;
  className?: string;
  onColorChange?: (color: string) => void;
}

export default function ColorPicker({color='#000000', className, onColorChange, ...props}: ColorPickerProps) {
  return (
    <input
        type='color'
        value={color}
        onChange={e => onColorChange && onColorChange(e.target.value)}
        className={clsx('w-8 h-8 p-0 border border-amber-500 rounded-sm bg-transparent cursor-pointer appearance-none [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-none', className)}
        {...props}
      />
  );
}