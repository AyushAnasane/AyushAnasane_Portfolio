"use client";

import { useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";

export default function ContourBackground() {
  const canvasRef = useRef(null);

  const stateRef = useRef({
    width: 0,
    height: 0,
    dpr: 1,
    cols: 0,
    rows: 0,
    values: null,
    cellSize: 24
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cellSize = 24;

      const cols = Math.ceil(width / cellSize) + 2;
      const rows = Math.ceil(height / cellSize) + 2;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stateRef.current = {
        width,
        height,
        dpr,
        cols,
        rows,
        cellSize,
        values: new Float32Array(cols * rows)
      };
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useAnimationFrame((time) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const {
      width,
      height,
      cols,
      rows,
      values,
      cellSize
    } = stateRef.current;

    if (!values || !width || !height) return;

    const t = time * 0.00042;

    const field = (x, y) => {
      const nx = x / width;
      const ny = y / height;

      const wave1 =
        Math.sin(nx * 4.8 + t * 0.85 + 1.2);

      const wave2 =
        Math.sin(ny * 4.1 - t * 0.58 + 2.7);

      const wave3 =
        Math.sin(
          (nx + ny) * 5.4 +
            t * 0.47 +
            0.8
        );

      const wave4 =
        Math.cos(
          (nx - ny) * 4.7 -
            t * 0.72 +
            3.4
        );

      const wave5 =
        Math.sin(
          nx * 7.2 +
            Math.sin(
              ny * 2.6 +
                t * 0.34
            ) +
            1.8
        );

      const wave6 =
        Math.cos(
          ny * 6.8 +
            Math.sin(
              nx * 2.2 -
                t * 0.41
            ) +
            4.2
        );

      return (
        wave1 * 0.26 +
        wave2 * 0.22 +
        wave3 * 0.19 +
        wave4 * 0.16 +
        wave5 * 0.10 +
        wave6 * 0.07
      );
    };

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        values[y * cols + x] = field(
          x * cellSize,
          y * cellSize
        );
      }
    }

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(90, 90, 90, 0.14)";
    ctx.lineWidth = 1.55;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const thresholds = [
      -0.42,
      -0.25,
      -0.08,
      0.09,
      0.26,
      0.43,
      0.60
    ];

    const interpolate = (a, b, threshold) => {
      const difference = b - a;

      if (Math.abs(difference) < 0.00001) {
        return 0.5;
      }

      return Math.max(
        0,
        Math.min(
          1,
          (threshold - a) / difference
        )
      );
    };

    const point = (
      x1,
      y1,
      x2,
      y2,
      v1,
      v2,
      threshold
    ) => {
      const ratio = interpolate(
        v1,
        v2,
        threshold
      );

      return {
        x: x1 + (x2 - x1) * ratio,
        y: y1 + (y2 - y1) * ratio
      };
    };

    const drawCell = (
      x,
      y,
      cell,
      threshold
    ) => {
      const tl = cell[0];
      const tr = cell[1];
      const br = cell[2];
      const bl = cell[3];

      const state =
        (tl > threshold ? 8 : 0) |
        (tr > threshold ? 4 : 0) |
        (br > threshold ? 2 : 0) |
        (bl > threshold ? 1 : 0);

      if (state === 0 || state === 15) {
        return;
      }

      const top = point(
        x,
        y,
        x + cellSize,
        y,
        tl,
        tr,
        threshold
      );

      const right = point(
        x + cellSize,
        y,
        x + cellSize,
        y + cellSize,
        tr,
        br,
        threshold
      );

      const bottom = point(
        x + cellSize,
        y + cellSize,
        x,
        y + cellSize,
        br,
        bl,
        threshold
      );

      const left = point(
        x,
        y + cellSize,
        x,
        y,
        bl,
        tl,
        threshold
      );

      const line = (a, b) => {
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      };

      switch (state) {
        case 1:
        case 14:
          line(left, bottom);
          break;

        case 2:
        case 13:
          line(bottom, right);
          break;

        case 3:
        case 12:
          line(left, right);
          break;

        case 4:
        case 11:
          line(top, right);
          break;

        case 5:
          line(top, left);
          line(bottom, right);
          break;

        case 6:
        case 9:
          line(top, bottom);
          break;

        case 7:
        case 8:
          line(top, left);
          break;

        case 10:
          line(top, right);
          line(left, bottom);
          break;
      }
    };

    thresholds.forEach((threshold) => {
      ctx.beginPath();

      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const index = y * cols + x;

          drawCell(
            x * cellSize,
            y * cellSize,
            [
              values[index],
              values[index + 1],
              values[index + cols + 1],
              values[index + cols]
            ],
            threshold
          );
        }
      }

      ctx.stroke();
    });
  });

  return (
    <canvas
      ref={canvasRef}
      className="contour-background"
      aria-hidden="true"
    />
  );
}