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

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out"
      });

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out"
      });
    };

    const handleEnter = () => {
      gsap.to(cursor, {
        width: 54,
        height: 54,
        duration: 0.25,
        ease: "power2.out"
      });

      gsap.to(dot, {
        scale: 0.55,
        duration: 0.25,
        ease: "power2.out"
      });
    };

    const handleLeave = () => {
      gsap.to(cursor, {
        width: 34,
        height: 34,
        duration: 0.25,
        ease: "power2.out"
      });

      gsap.to(dot, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const interactiveElements = document.querySelectorAll(
      "a, button, .proj, .resume-btn"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
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