import { useState, useEffect } from "react";

type ClickEffectProps = {};

type Effect = {
  x: number;
  y: number;
  id: number;
};

export default function ClickEffect({}: ClickEffectProps) {
  const [effects, setEffects] = useState<Effect[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newEffect: Effect = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };
      setEffects((prev) => [...prev, newEffect]);
      // Remove after animation (e.g., 600ms)
      setTimeout(() => {
        setEffects((prev) => prev.filter((eff) => eff.id !== newEffect.id));
      }, 600);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {effects.map((effect) => (
        <span
          key={effect.id}
          style={{
            left: effect.x,
            top: effect.y,
          }}
          className="pointer-events-none fixed w-4 h-4 bg-white rounded-full animate-clickEffect z-50"
        ></span>
      ))}
    </>
  );
}
