export default function Experience() {
  const items = [
    ['2026', 'Finlucid', 'Solo-built and deployed a fintech portfolio tracker on Vercel with a Neon Postgres backend.', 'DJANGO · POSTGRES'],
    ['2026', 'ProStock CRM', 'Designed a combined inventory and CRM system for a small retail team.', 'DJANGO'],
    ['2026', 'Learning Dashboard', 'Built a full-stack Next.js dashboard with Supabase auth, RLS policies, and edge middleware.', 'NEXT.JS · SUPABASE']
  ];

  return (
    <section className="exp" id="experience">
      <div className="section-bar"><span className="section-bar-num">05</span><span className="section-bar-title">Experience</span></div>
      {items.map(([year, role, desc, tag]) => <div className="exp-row" key={role}><div className="exp-cell"><span className="exp-year">{year}</span></div><div className="exp-cell"><span className="exp-role">{role}</span></div><div className="exp-cell"><span className="exp-desc">{desc}</span></div><div className="exp-cell"><span className="exp-tag">{tag}</span></div></div>)}
    </section>
  );
}
