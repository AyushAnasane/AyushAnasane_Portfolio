"use client";

import { useEffect } from "react";

export default function Activity() {
  useEffect(() => {
    const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function buildWeeks(dateCountMap) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const start = new Date(today);
      start.setDate(start.getDate() - 370);
      start.setDate(start.getDate() - start.getDay());

      const weeks = [];
      let cur = new Date(start);
      while (cur <= today) {
        const week = [];
        for (let d = 0; d < 7; d++) {
          const key = cur.toISOString().slice(0, 10);
          const inRange = cur <= today;
          week.push({ date: new Date(cur), key, count: inRange ? dateCountMap[key] || 0 : null });
          cur.setDate(cur.getDate() + 1);
        }
        weeks.push(week);
      }
      return weeks;
    }

    function levelFor(count, max) {
      if (!count || count <= 0) return 0;
      if (max <= 0) return 1;
      const r = count / max;
      if (r > 0.75) return 4;
      if (r > 0.5) return 3;
      if (r > 0.25) return 2;
      return 1;
    }

    function renderHeatmap(gridEl, monthsEl, totalEl, dateCountMap) {
      const weeks = buildWeeks(dateCountMap);
      const allCounts = Object.values(dateCountMap);
      const max = allCounts.length ? Math.max(...allCounts) : 0;
      const total = allCounts.reduce((a, b) => a + b, 0);
      totalEl.textContent = `${total.toLocaleString()} contributions in the last year`;

      gridEl.innerHTML = "";
      gridEl.style.gridTemplateColumns = `repeat(${weeks.length},11px)`;

      weeks.forEach((week) => {
        week.forEach((day) => {
          const cell = document.createElement("div");
          if (day.count === null) {
            cell.style.visibility = "hidden";
          } else {
            cell.className = "hm-cell";
            cell.dataset.l = levelFor(day.count, max);
            cell.title = `${day.key}: ${day.count}`;
          }
          gridEl.appendChild(cell);
        });
      });

      monthsEl.innerHTML = "";
      monthsEl.style.minWidth = `${weeks.length * 14}px`;
      let lastMonth = -1;
      weeks.forEach((week, i) => {
        const m = week[0].date.getMonth();
        if (m !== lastMonth) {
          lastMonth = m;
          const label = document.createElement("span");
          label.style.left = `${i * 14}px`;
          label.textContent = MONTH_NAMES[m];
          monthsEl.appendChild(label);
        }
      });
    }

    function mockActivity(seed) {
      const map = {};
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      for (let i = 0; i < 371; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const r = Math.abs(Math.sin(seed + i * 12.9898) * 43758.5453) % 1;
        map[key] = r > 0.55 ? Math.floor(r * 10) : 0;
      }
      return map;
    }

    let cancelled = false;

    async function loadGithub() {
      const gridEl = document.getElementById("ghHeatmap");
      const monthsEl = document.getElementById("ghMonths");
      const totalEl = document.getElementById("ghTotal");
      if (!gridEl || !monthsEl || !totalEl) return;

      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/AyushAnasane?y=last");
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        const map = {};
        data.contributions.forEach((d) => { map[d.date] = d.count; });
        if (!cancelled) renderHeatmap(gridEl, monthsEl, totalEl, map);
      } catch {
        if (!cancelled) renderHeatmap(gridEl, monthsEl, totalEl, mockActivity(1));
      }
    }

    loadGithub();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="activity" id="activity">
      <div className="section-bar"><span className="section-bar-num">06</span><span className="section-bar-title">Activity</span></div>
      <div className="activity-grid-wrap">
        <div className="activity-block">
          <div className="activity-head"><span className="activity-label">GITHUB</span><span className="activity-total" id="ghTotal">loading…</span></div>
          <div className="heatmap-scroll"><div className="heatmap-months" id="ghMonths"></div><div className="heatmap" id="ghHeatmap"></div></div>
        </div>
      </div>
      <div className="heatmap-legend">
        <span>Less</span>
        <span className="hm-swatch" data-l="0"></span>
        <span className="hm-swatch" data-l="1"></span>
        <span className="hm-swatch" data-l="2"></span>
        <span className="hm-swatch" data-l="3"></span>
        <span className="hm-swatch" data-l="4"></span>
        <span>More</span>
      </div>
    </section>
  );
}
