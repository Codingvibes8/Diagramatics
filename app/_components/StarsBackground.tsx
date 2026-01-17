"use client";

import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
}

const StarsBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`, // 1px to 3px
      duration: `${Math.random() * 10 + 15}s`, // 15s to 25s
      delay: `-${Math.random() * 20}s`, // Negative delay to start mid-animation
    }));
    setStars(newStars);
  }, []);

  if (stars.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-floating-star top-0"
          style={{
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;
