"use client";

import { useEffect, useRef, useState } from "react";

const getTransform = (direction, distance, visible) => {
  if (visible || direction === "none") return "translate(0, 0)";
  switch (direction) {
    case "up":
      return `translateY(${distance}px)`;
    case "down":
      return `translateY(-${distance}px)`;
    case "left":
      return `translateX(${distance}px)`;
    case "right":
      return `translateX(-${distance}px)`;
    default:
      return "translate(0, 0)";
  }
};

const AnimatedCard = ({
  children,
  delay = 0,
  duration = 500,
  direction = "up",
  distance = 12,
  className,
  once = true,
  triggerOnView = false,
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!triggerOnView) {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setVisible(true), delay);
          if (once) observer.disconnect();
          return () => clearTimeout(t);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, once, triggerOnView]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(direction, distance, visible),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
