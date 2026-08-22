export default function Process() {
  const items = [
    ['01 — SCOPE', 'Define the real problem', 'Before writing code, I map out the data model and the actual workflow — most bugs later trace back to a rushed schema.'],
    ['02 — BUILD', 'Ship in thin, working slices', 'I build one full path end to end — model, view, template — before broadening. It keeps every commit demoable.'],
    ['03 — HARDEN', 'Fix production, not just localhost', 'Env config, database compatibility, deploy settings — the unglamorous parts get equal attention before launch.']
  ];

  return (
    <section className="process" id="process">
      <div className="section-bar"><span className="section-bar-num">04</span><span className="section-bar-title">How I Work</span></div>
      <div className="process-grid">
        {items.map(([num, title, desc]) => <div className="process-cell" key={num}><p className="process-num">{num}</p><h4 className="process-title">{title}</h4><p className="process-desc">{desc}</p></div>)}
      </div>
    </section>
  );
}
