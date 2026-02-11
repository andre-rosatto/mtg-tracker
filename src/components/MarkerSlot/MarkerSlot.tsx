import type { Marker } from "../../types/types";
import { TrashIcon } from "../Icons";
import TimedButton from "../TimedButton";

interface MarkerSlotProps extends React.HTMLAttributes<HTMLLIElement> {
  marker: Marker;
  onMarkerChange?: (updatedMarker: Marker) => void;
  onMarkerDelete?: (markerId: number) => void;
}

export default function MarkerSlot({ marker, onMarkerChange, onMarkerDelete }: MarkerSlotProps) {
  return (
    <li className='flex gap-2 items-start h-fit'>
      <input
        name="marker text"
        type="text"
        value={marker.text}
        className='outline-none flex-1 min-w-3'
        onChange={e => onMarkerChange && onMarkerChange({ ...marker, text: e.target.value })}
      ></input>
      <div className='flex'>
        <span className='mr-1 ml-2'>{marker.amount}</span>
        <button
          className='w-4'
          onClick={() => onMarkerChange && onMarkerChange({ ...marker, amount: marker.amount + 1 })}
        >+</button>
        <button
          className='w-4'
          onClick={() => onMarkerChange && onMarkerChange({ ...marker, amount: Math.max(0, marker.amount - 1) })}
        >-</button>
        <TimedButton
          duration={500}
          className='rounded-sm w-8 p-1'
          onComplete={() => onMarkerDelete && onMarkerDelete(marker.id)}
        >
          <TrashIcon />
        </TimedButton>
      </div>
    </li>
  );
}