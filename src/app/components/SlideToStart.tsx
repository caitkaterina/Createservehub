import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";

export function SlideToStart({ onStart }: { onStart: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const thumbSize = 58;
  const maxDrag = containerWidth - thumbSize - 8;

  const handleDragEnd = () => {
    if (x.get() > maxDrag * 0.8) {
      x.set(maxDrag);
      setIsUnlocked(true);
      setTimeout(() => {
        onStart();
        setTimeout(() => {
          x.set(0);
          setIsUnlocked(false);
        }, 1000);
      }, 300);
    } else {
      x.set(0);
    }
  };

  const textOpacity = useTransform(x, [0, maxDrag * 0.45], [1, 0]);

  return (
    /* ── Outer glass track ── */
    <div
      ref={containerRef}
      className="relative flex items-center h-[74px] rounded-full p-[7px] overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 60%, rgba(180,200,255,0.08) 100%)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.22)",
        boxShadow:
          "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.30), inset 0 -1px 0 rgba(0,0,0,0.18)",
      }}
    >
      {/* Top-edge specular highlight */}
      <div
        className="absolute inset-x-8 top-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)",
        }}
      />

      {/* Animated sheen sweep across the track */}
      <motion.div
        animate={{ x: ["-220%", "420%"] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          repeatDelay: 2.5,
          ease: "easeInOut",
        }}
        className="absolute top-0 bottom-0 w-1/3 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.13), transparent)",
          transform: "skewX(-15deg)",
        }}
      />

      {/* "Start Experience" label */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span
          className="font-medium text-[17px] tracking-tight"
          style={{
            color: "rgba(255,255,255,0.88)",
            textShadow: "0 1px 8px rgba(0,0,0,0.45)",
          }}
        >
          Start Experience
        </span>
      </motion.div>

      {/* ── Draggable reflective glass thumb ── */}
      <motion.div
        drag={isUnlocked ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag > 0 ? maxDrag : 0 }}
        dragElastic={0.04}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        animate={{ x: isUnlocked ? maxDrag : undefined }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shrink-0 rounded-full overflow-hidden"
        style={{ x, width: thumbSize, height: thumbSize }}
      >
        {/* Base glass layer */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(150deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.60) 40%, rgba(200,215,245,0.80) 100%)",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.28), 0 1px 3px rgba(0,0,0,0.15), inset 0 1.5px 0 rgba(255,255,255,1), inset 0 -2px 6px rgba(150,170,220,0.18)",
          }}
        />

        {/* Upper specular dome (the "glass lens" look) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: "3px 5px auto 5px",
            height: "46%",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.0) 100%)",
            borderRadius: "50% 50% 60% 60%",
          }}
        />

        {/* Bottom subtle reflection */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: 4,
            left: 8,
            right: 8,
            height: "20%",
            background:
              "linear-gradient(to top, rgba(255,255,255,0.45), transparent)",
            borderRadius: "50%",
          }}
        />

        {/* Shimmer sweep on thumb */}
        <motion.div
          animate={{ x: ["-120%", "220%"] }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            repeatDelay: 3.5,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.65), transparent)",
            transform: "skewX(-18deg)",
          }}
        />

        {/* Arrow icon */}
        <ChevronRight
          className="relative z-10"
          style={{
            width: 22,
            height: 22,
            color: "rgba(50,60,100,0.75)",
            filter: "drop-shadow(0 1px 1px rgba(255,255,255,0.9))",
          }}
        />
      </motion.div>
    </div>
  );
}
