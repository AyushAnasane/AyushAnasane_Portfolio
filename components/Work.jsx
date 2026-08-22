export default function Work() {
  const projects = [
    ['01', 'FINLUCID', 'Portfolio and expense tracker built for Indian retail traders. Clean dashboard for P&L, options positions, and expense tracking across multiple broker accounts.', ['DJANGO', 'FINTECH', 'WEB_APP']],
    ['02', 'PROSTOCK', 'Subscription SaaS CRM and inventory desktop app for a 6-person team. Handles billing, stock management, and customer records. Offline-first architecture.', ['DESKTOP', 'SAAS', 'CRM']],
    ['03', 'PORTFOLIO SHEET', 'Google Sheets portfolio tracker with live GOOGLEFINANCE pricing and an Apps Script layer that logs daily snapshots automatically — a lightweight companion to Finlucid.', ['APPS_SCRIPT', 'SHEETS', 'AUTOMATION']]
  ];

  return (
    <section className="work" id="work">
      <div className="section-bar"><span className="section-bar-num">03</span><span className="section-bar-title">Selected Work</span></div>
      {projects.map(([idx, name, desc, tags]) => (
        <div className="proj" key={idx}>
          <div className="proj-idx-col"><span className="proj-idx-num">{idx}</span></div>
          <div className="proj-content"><h3 className="proj-name">{name}</h3><p className="proj-desc">{desc}</p></div>
          <div className="proj-side"><span className="proj-tag">{tags.map((tag) => <span key={tag}>{tag}<br /></span>)}</span><span className="proj-arr">→</span></div>
        </div>
      ))}
    </section>
  );
}
