import clsx from "clsx";
import { useRef, useState } from "react";

interface TimedButtonProps {
  duration?: number; // ms
  className?: string;
  children?: React.ReactNode;
  onComplete?: () => void;
}

export default function TimedButton({
  duration = 1500,
  className,
  children,
  onComplete,
}: TimedButtonProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const [progress, setProgress] = useState(0);

  const start = () => {
    startTimeRef.current = performance.now();

    timerRef.current = setTimeout(() => {
      onComplete?.();
      reset();
    }, duration);

    const animate = (time: number) => {
      const elapsed = time - startTimeRef.current;
      const percent = Math.min((elapsed / duration) * 100, 100);
      setProgress(percent);

      if (percent < 100) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  };

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    timerRef.current = null;
    frameRef.current = null;
    setProgress(0);
  };

  return (
    <button
      onPointerDown={start}
      onPointerUp={reset}
      onPointerLeave={reset}
      className={clsx('relative overflow-hidden select-none flex justify-center items-center', className)}
    >
      {children}
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-full bg-white opacity-25"
        style={{ width: `${progress}%` }}
      />
    </button>
  );
}
