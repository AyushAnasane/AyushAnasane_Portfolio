"use client";

export default function Loader() {
  return (
    <>
      <div className="loader" id="loader">
        <div className="loader-inner">
          <div className="loader-mono">
            <span>A</span>
            <span>Y</span>
            <span>U</span>
            <span>S</span>
            <span>H</span>
          </div>
          <div className="loader-status" id="loaderStatus">LOADING_00</div>
          <div className="loader-bar-track">
            <div className="loader-bar-fill" id="loaderFill"></div>
          </div>
          <div className="loader-meta-row">
            <span className="loader-status">INIT_PORTFOLIO.EXE</span>
            <span className="loader-pct" id="loaderPct">00%</span>
          </div>
        </div>
      </div>
      <div id="loader-panels">
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
        <div className="panel"></div>
      </div>
    </>
  );
}
