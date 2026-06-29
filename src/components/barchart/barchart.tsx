import { useEffect, useRef } from "react";

interface BarChartProps extends React.ComponentProps<'canvas'> {
  data: number[];
  index: number;
  color?: string;
  className?: string;
}

export default function BarChart({ data, index, color, className, ...props }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => draw(), [data, color, index]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get actual CSS size from Tailwind/layout
    const rect = canvas.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    // Match internal resolution to displayed size
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Reset transform before scaling
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const maxValue = Math.max(...data);
    const barWidth = width / data.length;

    data.forEach((value, idx) => {
      const barHeight = (value / maxValue) * height;

      // Avoid fractional pixels
      const x = Math.round(idx * barWidth);
      const y = Math.round(height - barHeight);
      const w = Math.ceil(barWidth);
      const h = Math.round(barHeight);

      ctx.fillStyle = color || "black";
      ctx.globalAlpha = idx <= index ? 1.0 : 0.25
      ctx.fillRect(x, y, w, h);
    });
  };

  return (
    <canvas
      className={"w-full h-full " + className}
      ref={canvasRef}
      { ...props }
    />
  );
}