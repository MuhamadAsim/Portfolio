"use client";

import { useEffect, useMemo, useState, memo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

function ParticleNetworkBackground() {
  const [ready, setReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // only loads what we actually use
    })
      .then(() => setReady(true))
      .catch((err) => {
        // Previously this failure was swallowed silently — if the engine
        // package versions are still mismatched, THIS is what tells you.
        console.error("tsParticles failed to initialize:", err);
        setInitError(String(err));
      });
  }, []);

  if (initError) {
    // Visible in dev so it's obvious the background isn't just "invisible" —
    // remove this block once you've confirmed particles work.
    console.warn(
      "ParticleNetworkBackground: engine did not initialize, background will not render."
    );
  }

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: {
          value: 260,
          density: { enable: true },
        },
        color: { value: "#a855f7" }, // purple-500
        links: {
          enable: true,
          color: "#a855f7",
          distance: 150,
          opacity: 0.35,
          width: 1.6,
        },
        move: {
          enable: true,
          speed: 1.5,
          random: true,
          straight: false,
          outModes: { default: "bounce" },
        },
        size: { value: { min: 1, max: 2.5 } },
        opacity: { value: 0.4 },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          // Disabled — this was the actual cause of the "background restarts"
          // bug. With this enabled, ANY layout resize event (even a subtle
          // one caused by an unrelated hover state change elsewhere on the
          // page) makes tsParticles regenerate every particle's position
          // from scratch, which looks like the whole animation resetting.
          // The canvas itself still auto-resizes fine on real window
          // resizes without this — this setting only controlled whether
          // particle POSITIONS get regenerated on resize, which we don't
          // want triggered by unrelated UI state changes.
          resize: { enable: false },
        },
        modes: {
          repulse: {
            distance: 100,
            // duration: how long the push lingers after the cursor leaves —
            // dropped from 1 -> 0.2 so it snaps back almost immediately
            // instead of drifting back slowly.
            duration: 0.2,
            // speed: how fast particles move away when the cursor arrives —
            // bumped from 0.5 -> 1.5 so the reaction itself is instant
            // rather than a slow drift outward.
            speed: 1.5,
            // factor: kept at 30 (not raised) — this is what keeps the
            // PUSH gentle even though it's now instant. If you want it to
            // also feel stronger, raise this toward 60-80.
            factor: 30,
            // Removed easing (was "ease-out-quad"). No easing curve = a
            // direct, immediate response instead of a gradual ease.
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      className="absolute inset-0 -z-10"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      options={options}
    />
  );
}

export default memo(ParticleNetworkBackground);