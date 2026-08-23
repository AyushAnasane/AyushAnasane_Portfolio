export default function Work() {
  const projects = [
    {
      number: "01",
      name: "FINLUCID",
      description:
        "A portfolio and expense tracker for Indian retail traders, with P&L tracking, options positions, and expenses across multiple broker accounts.",
      tags: ["DJANGO", "FINTECH", "WEB_APP"],
      url: "https://github.com/AyushAnasane/FinLucid"
    },
    {
      number: "02",
      name: "SCHEDULR",
      description:
        "Schedulr is a web-based scheduling extension which scans the inbox designed to help users manage tasks, deadlines, and events efficiently, strictly for college emails.",
      tags: ["WEB_EXTENSION", "API", "GOOGLE SERVICES"],
      url: "https://github.com/AyushAnasane/ProjeKt"
    },
    {
      number: "03",
      name: "PROSTOCK",
      description:
        "A desktop CRM and inventory management system built for a small team, covering billing, stock management, and customer records with an offline-first approach.",
      tags: ["DESKTOP", "SAAS", "CRM"],
      url: "https://github.com/cosKord/ProStock-CRM"
    }
  ];

  return (
    <section className="work" id="work">
      <div className="section-bar">
        <span className="section-bar-num">03</span>
        <span className="section-bar-title">Selected Work</span>
      </div>

      {projects.map((project) => (
        <a
          key={project.number}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="proj"
        >
          <div className="proj-idx-col">
            <span className="proj-idx-num">{project.number}</span>
          </div>

          <div className="proj-content">
            <h3 className="proj-name">{project.name}</h3>
            <p className="proj-desc">{project.description}</p>
          </div>

          <div className="proj-side">
            <div className="proj-tag">
              {project.tags.map((tag) => (
                <div key={tag}>{tag}</div>
              ))}
            </div>

            <span className="proj-arr">↗</span>
          </div>
        </a>
      ))}
    </section>
  );
}