"use client";

export default function Navbar() {
  return (
    <nav id="nav">
      <div className="nav-cell">
        <a href="#" className="nav-logo">AYUSH.DEV</a>
      </div>
      <div className="nav-cell">
        <div className="nav-center">
          <a href="#about">ABOUT</a>
          <a href="#work">WORK</a>
          <a href="#process">PROCESS</a>
          <a href="#activity">ACTIVITY</a>
          <a href="#skills">STACK</a>
          <a href="#contact">CONTACT</a>
        </div>
      </div>
      <div className="nav-cell nav-right">
        <a href="/MyResume.pdf" target="_blank" rel="noopener" className="resume-btn">
          RESUME <span>↗</span>
        </a>
        <span className="nav-time" id="navTime"></span>
      </div>
    </nav>
  );
}
