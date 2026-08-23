"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    if (!cursor || !dot) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    gsap.set(cursor, {
      x: centerX,
      y: centerY
    });

    gsap.set(dot, {
      x: centerX,
      y: centerY
    });

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power3.out"
      });

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.06,
        ease: "power2.out"
      });
    };

    const handleEnter = () => {
      gsap.to(cursor, {
        width: 42,
        height: 42,
        duration: 0.22,
        ease: "power2.out"
      });

      gsap.to(dot, {
        scale: 0.7,
        duration: 0.22,
        ease: "power2.out"
      });
    };

    const handleLeave = () => {
      gsap.to(cursor, {
        width: 28,
        height: 28,
        duration: 0.22,
        ease: "power2.out"
      });

      gsap.to(dot, {
        scale: 1,
        duration: 0.22,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "a, button, .proj, .resume-btn"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleEnter);
      element.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleEnter);
        element.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
}