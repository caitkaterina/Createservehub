import React from "react";
import { motion } from "motion/react";

interface BentoRowProps {
  images: string[];
  direction: "left" | "right";
  speed?: number;
}

export function BentoRow({ images, direction, speed = 25 }: BentoRowProps) {
  const content = (
    <div className="flex shrink-0">
      {images.map((img, i) => (
        <div
          key={i}
          className="shrink-0 overflow-hidden"
          style={{
            width: "clamp(180px, 28vw, 280px)",
            height: "clamp(150px, 22vw, 230px)",
            maskImage:
              "linear-gradient(to right, rgba(0,0,0,0.3) 0%, black 12%, black 88%, rgba(0,0,0,0.3) 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0,0,0,0.3) 0%, black 12%, black 88%, rgba(0,0,0,0.3) 100%)",
          }}
        >
          <img
            src={img}
            alt={`service-${i}`}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex overflow-hidden w-full">
      <motion.div
        className="flex shrink-0 will-change-transform"
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {content}
        {content}
      </motion.div>
    </div>
  );
}
