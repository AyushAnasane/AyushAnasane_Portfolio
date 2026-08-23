export default function About() {
  return (
    <section className="about" id="about">
      <div className="section-bar"><span className="section-bar-num">02</span><span className="section-bar-title">About</span></div>
      <div className="about-grid">
        <div className="about-side"></div>
        <div className="about-stats">
          <div className="stat-row"><span className="stat-num">02+</span><span className="stat-label">YEARS WRITING PRODUCTION CODE</span></div>
          <div className="stat-row"><span className="stat-num">04</span><span className="stat-label">PROJECTS SHIPPED OR IN PROGRESS</span></div>
          <div className="stat-row"><span className="stat-num">01</span><span className="stat-label">PERSON TEAMS I'VE SHIPPED SOLO</span></div>
        </div>
        <div className="about-copy">
          <p>I'm an IT student and developer based in Mumbai, balancing college with building things beyond the classroom. I enjoy turning ideas into working products, from backend systems and databases to interfaces people actually use.</p>
          <p>Most of my work sits at the intersection of software and finance, from portfolio trackers and expense dashboards to small real-world tools. Alongside college, I learn by experimenting, building, and figuring things out along the way.</p>
        </div>
        
      </div>
    </section>
  );
}
