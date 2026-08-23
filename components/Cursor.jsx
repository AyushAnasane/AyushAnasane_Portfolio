"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Cursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const ringX = useSpring(mouseX, {
    stiffness: 400,
    damping: 32,
    mass: 0.35
  });

  const ringY = useSpring(mouseY, {
    stiffness: 400,
    damping: 32,
    mass: 0.35
  });

  const dotX = useSpring(mouseX, {
    stiffness: 1200,
    damping: 45,
    mass: 0.15
  });

  const dotY = useSpring(mouseY, {
    stiffness: 1200,
    damping: 45,
    mass: 0.15
  });

  const ringSize = useMotionValue(28);

  const ringWidth = useSpring(ringSize, {
    stiffness: 500,
    damping: 32
  });

  const ringHeight = useTransform(ringWidth, (value) => value);

  useEffect(() => {
    const move = (event) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    const enter = () => {
      ringSize.set(42);
    };

    const leave = () => {
      ringSize.set(28);
    };

    window.addEventListener("mousemove", move);

    const elements = document.querySelectorAll(
      "a, button, .proj, .resume-btn"
    );

    elements.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);

      elements.forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, [mouseX, mouseY, ringSize]);

  return (
    <>
      <motion.div
        className="custom-cursor"
        style={{
          x: ringX,
          y: ringY,
          width: ringWidth,
          height: ringHeight
        }}
      />

      <motion.div
        className="custom-cursor-dot"
        style={{
          x: dotX,
          y: dotY
        }}
      />
    </>
  );
}