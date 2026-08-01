
//connected


// import { useEffect, useRef } from "react";

// interface ParticleOrbProps {
//   size?: number;
//   numPoints?: number;
//   color?: string;
//   speed?: number;
//   /** Max distance (in normalized sphere units) to draw a connecting line */
//   linkDistance?: number;
// }

// /**
//  * Sphere of dots where nearby points get connected with faint lines,
//  * giving a "network / constellation" look instead of plain dots.
//  */
// export default function ParticleOrb({
//   size = 380,
//   numPoints = 220, // keep lower than dot-only version — O(n^2) link check
//   color = "143, 125, 232",
//   speed = 0.004,
//   linkDistance = 0.4,
// }: ParticleOrbProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const dpr = window.devicePixelRatio || 1;
//     canvas.width = size * dpr;
//     canvas.height = size * dpr;
//     ctx.scale(dpr, dpr);

//     const radius = size * 0.38;
//     const center = size / 2;

//     const points: { x: number; y: number; z: number }[] = [];
//     const goldenAngle = Math.PI * (3 - Math.sqrt(5));
//     for (let i = 0; i < numPoints; i++) {
//       const t = i / Math.max(numPoints - 1, 1);
//       const yPos = 1 - t * 2;
//       const ringRadius = Math.sqrt(Math.max(1 - yPos * yPos, 0));
//       const theta = goldenAngle * i;
//       points.push({
//         x: Math.cos(theta) * ringRadius,
//         y: yPos,
//         z: Math.sin(theta) * ringRadius,
//       });
//     }

//     let angle = 0;
//     let rafId: number;

//     function render() {
//       if (!ctx) return;
//       ctx.clearRect(0, 0, size, size);
//       angle += speed;

//       const cosA = Math.cos(angle);
//       const sinA = Math.sin(angle);

//       const rotated = points
//         .map((p) => ({
//           x: p.x * cosA - p.z * sinA,
//           y: p.y,
//           z: p.x * sinA + p.z * cosA,
//         }))
//         .sort((a, b) => a.z - b.z);

//       // Draw links first (so dots render on top)
//       for (let i = 0; i < rotated.length; i++) {
//         for (let j = i + 1; j < rotated.length; j++) {
//           const a = rotated[i];
//           const b = rotated[j];
//           const dx = a.x - b.x;
//           const dy = a.y - b.y;
//           const dz = a.z - b.z;
//           const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
//           if (dist < linkDistance) {
//             const depthFactor = ((a.z + b.z) / 2 + 1) / 2;
//             const perspA = 1.6 / (1.6 + a.z);
//             const perspB = 1.6 / (1.6 + b.z);
//             ctx.beginPath();
//             ctx.moveTo(center + a.x * radius * perspA, center + a.y * radius * perspA);
//             ctx.lineTo(center + b.x * radius * perspB, center + b.y * radius * perspB);
//             ctx.strokeStyle = `rgba(${color}, ${0.08 + depthFactor * 0.15})`;
//             ctx.lineWidth = 0.6;
//             ctx.stroke();
//           }
//         }
//       }

//       // Draw dots
//       for (const p of rotated) {
//         const perspective = 1.6 / (1.6 + p.z);
//         const screenX = center + p.x * radius * perspective;
//         const screenY = center + p.y * radius * perspective;
//         const depthFactor = (p.z + 1) / 2;
//         const dotSize = 0.8 + depthFactor * 1.8;
//         const opacity = 0.3 + depthFactor * 0.7;

//         ctx.beginPath();
//         ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(${color}, ${opacity})`;
//         ctx.fill();
//       }

//       rafId = requestAnimationFrame(render);
//     }

//     render();
//     return () => cancelAnimationFrame(rafId);
//   }, [size, numPoints, color, speed, linkDistance]);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ width: size, height: size, display: "block" }}
//       aria-hidden="true"
//     />
//   );
// }













//simple dots



// import { useEffect, useRef } from "react";

// interface ParticleOrbProps {
//   /** Canvas size in pixels (width and height, it's always square) */
//   size?: number;
//   /** How many dots make up the sphere surface */
//   numPoints?: number;
//   /** Dot color as an "R, G, B" string (no rgb() wrapper) */
//   color?: string;
//   /** Rotation speed in radians per frame */
//   speed?: number;
// }

// /**
//  * Renders a rotating sphere made of individual dots (not a filled ball).
//  * Points are distributed evenly across the sphere surface using the
//  * Fibonacci sphere algorithm, then rotated around the Y-axis every frame
//  * and projected to 2D with a simple perspective divide so dots further
//  * from the viewer appear smaller/dimmer, giving real depth.
//  */
// export default function ParticleOrb({
//   size = 380,
//   numPoints = 480,
//   color = "143, 125, 232", // light purple, matches site's --primary hue lifted in lightness
//   speed = 0.004,
// }: ParticleOrbProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     // Render at device pixel ratio for crisp dots on retina screens
//     const dpr = window.devicePixelRatio || 1;
//     canvas.width = size * dpr;
//     canvas.height = size * dpr;
//     ctx.scale(dpr, dpr);

//     const radius = size * 0.38;
//     const center = size / 2;

//     // --- Generate evenly-spaced points on a unit sphere ---
//     const points: { x: number; y: number; z: number }[] = [];
//     const goldenAngle = Math.PI * (3 - Math.sqrt(5));
//     for (let i = 0; i < numPoints; i++) {
//       const t = i / Math.max(numPoints - 1, 1);
//       const yPos = 1 - t * 2; // top (1) to bottom (-1)
//       const ringRadius = Math.sqrt(Math.max(1 - yPos * yPos, 0));
//       const theta = goldenAngle * i;
//       points.push({
//         x: Math.cos(theta) * ringRadius,
//         y: yPos,
//         z: Math.sin(theta) * ringRadius,
//       });
//     }

//     let angle = 0;
//     let rafId: number;

//     function render() {
//       if (!ctx) return;
//       ctx.clearRect(0, 0, size, size);
//       angle += speed;

//       const cosA = Math.cos(angle);
//       const sinA = Math.sin(angle);

//       // Rotate each point around the Y-axis, then sort back-to-front
//       // (painter's algorithm) so nearer dots draw on top of farther ones.
//       const rotated = points
//         .map((p) => ({
//           x: p.x * cosA - p.z * sinA,
//           y: p.y,
//           z: p.x * sinA + p.z * cosA,
//         }))
//         .sort((a, b) => a.z - b.z);

//       for (const p of rotated) {
//         const perspective = 1.6 / (1.6 + p.z);
//         const screenX = center + p.x * radius * perspective;
//         const screenY = center + p.y * radius * perspective;

//         // depthFactor: 0 = far side of sphere, 1 = near side
//         const depthFactor = (p.z + 1) / 2;
//         const dotSize = 0.8 + depthFactor * 1.8;
//         const opacity = 0.2 + depthFactor * 0.7;

//         ctx.beginPath();
//         ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(${color}, ${opacity})`;
//         ctx.fill();
//       }

//       rafId = requestAnimationFrame(render);
//     }

//     render();

//     return () => cancelAnimationFrame(rafId);
//   }, [size, numPoints, color, speed]);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ width: size, height: size, display: "block" }}
//       aria-hidden="true"
//     />
//   );
// }







//breatighing orb
// import { useEffect, useRef } from "react";

// interface ParticleOrbProps {
//   size?: number;
//   numPoints?: number;
//   color?: string;
//   speed?: number;
//   /** How fast the breathing/pulse cycle runs */
//   pulseSpeed?: number;
// }

// /**
//  * Same Fibonacci-sphere dots, but tumbles on X and Y simultaneously
//  * (not just Y), and scales in/out like it's breathing.
//  */
// export default function ParticleOrb({
//   size = 380,
//   numPoints = 480,
//   color = "143, 125, 232",
//   speed = 0.003,
//   pulseSpeed = 0.02,
// }: ParticleOrbProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const dpr = window.devicePixelRatio || 1;
//     canvas.width = size * dpr;
//     canvas.height = size * dpr;
//     ctx.scale(dpr, dpr);

//     const baseRadius = size * 0.38;
//     const center = size / 2;

//     const points: { x: number; y: number; z: number }[] = [];
//     const goldenAngle = Math.PI * (3 - Math.sqrt(5));
//     for (let i = 0; i < numPoints; i++) {
//       const t = i / Math.max(numPoints - 1, 1);
//       const yPos = 1 - t * 2;
//       const ringRadius = Math.sqrt(Math.max(1 - yPos * yPos, 0));
//       const theta = goldenAngle * i;
//       points.push({
//         x: Math.cos(theta) * ringRadius,
//         y: yPos,
//         z: Math.sin(theta) * ringRadius,
//       });
//     }

//     let angleY = 0;
//     let angleX = 0;
//     let pulseT = 0;
//     let rafId: number;

//     function render() {
//       if (!ctx) return;
//       ctx.clearRect(0, 0, size, size);
//       angleY += speed;
//       angleX += speed * 0.4; // slower secondary axis so it doesn't look chaotic
//       pulseT += pulseSpeed;

//       // Pulse radius between 92% and 108% of base, smooth sine
//       const radius = baseRadius * (1 + Math.sin(pulseT) * 0.08);

//       const cosY = Math.cos(angleY);
//       const sinY = Math.sin(angleY);
//       const cosX = Math.cos(angleX);
//       const sinX = Math.sin(angleX);

//       const rotated = points
//         .map((p) => {
//           // Rotate around Y first
//           const x1 = p.x * cosY - p.z * sinY;
//           const z1 = p.x * sinY + p.z * cosY;
//           // Then rotate around X
//           const y2 = p.y * cosX - z1 * sinX;
//           const z2 = p.y * sinX + z1 * cosX;
//           return { x: x1, y: y2, z: z2 };
//         })
//         .sort((a, b) => a.z - b.z);

//       for (const p of rotated) {
//         const perspective = 1.6 / (1.6 + p.z);
//         const screenX = center + p.x * radius * perspective;
//         const screenY = center + p.y * radius * perspective;
//         const depthFactor = (p.z + 1) / 2;
//         const dotSize = 0.8 + depthFactor * 1.8;
//         const opacity = 0.2 + depthFactor * 0.7;

//         ctx.beginPath();
//         ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(${color}, ${opacity})`;
//         ctx.fill();
//       }

//       rafId = requestAnimationFrame(render);
//     }

//     render();
//     return () => cancelAnimationFrame(rafId);
//   }, [size, numPoints, color, speed, pulseSpeed]);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ width: size, height: size, display: "block" }}
//       aria-hidden="true"
//     />
//   );
// }










//plamsa wave

// import { useEffect, useRef } from "react";

// interface ParticleOrbProps {
//   size?: number;
//   numPoints?: number;
//   /** Base hue (0-360) — this variant shifts hue instead of using a fixed RGB string */
//   baseHue?: number;
//   speed?: number;
//   /** Wave ripple intensity across the sphere surface */
//   waveAmplitude?: number;
// }

// /**
//  * Points ripple outward/inward per-point based on a traveling sine wave
//  * across the sphere, plus a slow hue shift — gives a "plasma / energy ball" feel.
//  */
// export default function ParticleOrb({
//   size = 380,
//   numPoints = 480,
//   baseHue = 262, // purple, matches original color's hue
//   speed = 0.004,
//   waveAmplitude = 0.15,
// }: ParticleOrbProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const dpr = window.devicePixelRatio || 1;
//     canvas.width = size * dpr;
//     canvas.height = size * dpr;
//     ctx.scale(dpr, dpr);

//     const radius = size * 0.36;
//     const center = size / 2;

//     const points: { x: number; y: number; z: number; phase: number }[] = [];
//     const goldenAngle = Math.PI * (3 - Math.sqrt(5));
//     for (let i = 0; i < numPoints; i++) {
//       const t = i / Math.max(numPoints - 1, 1);
//       const yPos = 1 - t * 2;
//       const ringRadius = Math.sqrt(Math.max(1 - yPos * yPos, 0));
//       const theta = goldenAngle * i;
//       points.push({
//         x: Math.cos(theta) * ringRadius,
//         y: yPos,
//         z: Math.sin(theta) * ringRadius,
//         phase: theta + yPos * 3, // gives each point a unique wave offset
//       });
//     }

//     let angle = 0;
//     let waveT = 0;
//     let rafId: number;

//     function render() {
//       if (!ctx) return;
//       ctx.clearRect(0, 0, size, size);
//       angle += speed;
//       waveT += 0.03;

//       const cosA = Math.cos(angle);
//       const sinA = Math.sin(angle);
//       const hue = (baseHue + Math.sin(waveT * 0.2) * 20) % 360;

//       const rotated = points
//         .map((p) => {
//           // Per-point radial ripple: pushes each dot slightly in/out of the
//           // sphere surface based on a traveling sine wave keyed to its phase
//           const ripple = 1 + Math.sin(waveT + p.phase) * waveAmplitude;
//           return {
//             x: (p.x * cosA - p.z * sinA) * ripple,
//             y: p.y * ripple,
//             z: (p.x * sinA + p.z * cosA) * ripple,
//           };
//         })
//         .sort((a, b) => a.z - b.z);

//       for (const p of rotated) {
//         const perspective = 1.6 / (1.6 + p.z);
//         const screenX = center + p.x * radius * perspective;
//         const screenY = center + p.y * radius * perspective;
//         const depthFactor = (p.z + 1) / 2;
//         const dotSize = 0.8 + depthFactor * 1.8;
//         const lightness = 55 + depthFactor * 25;

//         ctx.beginPath();
//         ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);
//         ctx.fillStyle = `hsla(${hue}, 70%, ${lightness}%, ${0.25 + depthFactor * 0.65})`;
//         ctx.fill();
//       }

//       rafId = requestAnimationFrame(render);
//     }

//     render();
//     return () => cancelAnimationFrame(rafId);
//   }, [size, numPoints, baseHue, speed, waveAmplitude]);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ width: size, height: size, display: "block" }}
//       aria-hidden="true"
//     />
//   );
// }













//connected and breathing

import { useEffect, useRef } from "react";

interface ParticleOrbProps {
  size?: number;
  numPoints?: number;
  color?: string;
  speed?: number;
  /** Max distance (in normalized sphere units) to draw a connecting line */
  linkDistance?: number;
  /** How fast the breathing/pulse cycle runs */
  pulseSpeed?: number;
  /** How much the sphere grows/shrinks (0.08 = ±8% of base radius) */
  pulseAmount?: number;
}

/**
 * Sphere of dots connected by faint lines when close together (constellation
 * look), rotating around Y, with an added "breathing" pulse — the whole
 * sphere smoothly grows and shrinks via a sine wave on the radius.
 */
export default function ParticleOrb({
  size = 380,
  numPoints = 220, // keep lower than dot-only version — O(n^2) link check
  color = "143, 125, 232",
  speed = 0.004,
  linkDistance = 0.4,
  pulseSpeed = 0.02,
  pulseAmount = 0.08,
}: ParticleOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const baseRadius = size * 0.38;
    const center = size / 2;

    const points: { x: number; y: number; z: number }[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const t = i / Math.max(numPoints - 1, 1);
      const yPos = 1 - t * 2;
      const ringRadius = Math.sqrt(Math.max(1 - yPos * yPos, 0));
      const theta = goldenAngle * i;
      points.push({
        x: Math.cos(theta) * ringRadius,
        y: yPos,
        z: Math.sin(theta) * ringRadius,
      });
    }

    // NOTE: linkDistance is checked in normalized (pre-radius) sphere space,
    // so the pulse (which scales the projected radius, not point coords)
    // does NOT affect which pairs link — connections stay stable as it breathes.
    let angle = 0;
    let pulseT = 0;
    let rafId: number;

    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      angle += speed;
      pulseT += pulseSpeed;

      // Smooth sine pulse: oscillates radius between (1 - pulseAmount) and (1 + pulseAmount)
      const radius = baseRadius * (1 + Math.sin(pulseT) * pulseAmount);

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const rotated = points
        .map((p) => ({
          x: p.x * cosA - p.z * sinA,
          y: p.y,
          z: p.x * sinA + p.z * cosA,
        }))
        .sort((a, b) => a.z - b.z);

      // Draw links first (so dots render on top)
      for (let i = 0; i < rotated.length; i++) {
        for (let j = i + 1; j < rotated.length; j++) {
          const a = rotated[i];
          const b = rotated[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dz = a.z - b.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < linkDistance) {
            const depthFactor = ((a.z + b.z) / 2 + 1) / 2;
            const perspA = 1.6 / (1.6 + a.z);
            const perspB = 1.6 / (1.6 + b.z);
            ctx.beginPath();
            ctx.moveTo(center + a.x * radius * perspA, center + a.y * radius * perspA);
            ctx.lineTo(center + b.x * radius * perspB, center + b.y * radius * perspB);
            ctx.strokeStyle = `rgba(${color}, ${0.08 + depthFactor * 0.15})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of rotated) {
        const perspective = 1.6 / (1.6 + p.z);
        const screenX = center + p.x * radius * perspective;
        const screenY = center + p.y * radius * perspective;
        const depthFactor = (p.z + 1) / 2;
        const dotSize = 0.8 + depthFactor * 1.8;
        const opacity = 0.3 + depthFactor * 0.7;

        ctx.beginPath();
        ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    }

    render();
    return () => cancelAnimationFrame(rafId);
  }, [size, numPoints, color, speed, linkDistance, pulseSpeed, pulseAmount]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, display: "block" }}
      aria-hidden="true"
    />
  );
}