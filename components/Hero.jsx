export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-main">
        <div className="hero-left">
          <p className="hero-index">— INDEX 001</p>

          <h1 className="hero-h1">
            AYUSH ANASANE
          </h1>

          <p className="hero-desc">
           IT student and developer building practical software. Interested in fintech,
           data, and turning ideas into products people can actually use.
          </p>
        </div>

        <div className="hero-right">
          <div className="hero-right-top">
            <div className="hero-intro-wrap">
              <span className="hero-intro-label">
                A LITTLE ABOUT ME / 001
              </span>

              <h2 className="hero-intro">
                I BUILD THINGS,
                <br />
                BREAK THINGS,
                <br />
                FIX THEM,
                <br />
                AND PRETEND
                <br />
                THAT WAS THE PLAN.
              </h2>
            </div>
          </div>

          <div className="hero-right-bot">
            <div className="meta-row">
              <span className="meta-label">LOCATION</span>
              <span className="meta-val">MUMBAI, IN</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">STATUS</span>
              <span className="meta-val">AVAILABLE</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">FOCUS</span>
              <span className="meta-val">FINTECH · DATA SCIENCE</span>
            </div>

            <div className="meta-row">
              <span className="meta-label">YEAR</span>
              <span className="meta-val">2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-strip">
        <div className="hero-strip-cell">
          <span className="hero-strip-label">CURRENTLY</span>
          <span className="hero-strip-value">B.TECH · IT</span>
        </div>

        <div className="hero-strip-cell">
          <span className="hero-strip-label">BUILDING</span>
          <span className="hero-strip-value">FINTECH · DATA SCIENCE</span>
        </div>

        <div className="hero-strip-cell">
          <span className="hero-strip-label">FOCUS</span>
          <span className="hero-strip-value">PRODUCT · ENGINEERING</span>
        </div>
      </div>
    </section>
  );
}