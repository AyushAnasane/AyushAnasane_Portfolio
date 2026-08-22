export default function Skills() {
  const columns = [
    ["LANG", ["C", "C++", "JAVA", "Python", "JavaScript", "SQL"]],
    ["Libraries", ["Pandas", "Numpy", "Matplotlib", "Scikit-learn"]],
    ["TOOLS", ["PostgreSQL", "Git", "VS-Code", "Jupyter-Notebook"]],
    ["HOW I WORK", ["Problem Solving", "Quick Learner", "Team Collaboration", "Adaptability", "Attention to Detail", "Communication"]]
  ];

  return (
    <section className="skills" id="skills">
      <div className="skills-label-col"><span className="skills-label-text">07 — STACK</span></div>
      <div className="skills-grid">
        {columns.map(([name, items]) => <div className="skill-col" key={name}><p className="skill-col-name">{name}</p>{items.map((item) => <span className="skill-item" key={item}>{item}</span>)}</div>)}
      </div>
    </section>
  );
}
