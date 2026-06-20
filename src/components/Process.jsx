export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery & Structure",
      desc: "I analyze your business, outline key conversion pages, and design your reservation flow."
    },
    {
      num: "02",
      title: "Curation & Design",
      desc: "Crafting a premium visual system and typographic palette that aligns with your creative brand."
    },
    {
      num: "03",
      title: "Development & SEO",
      desc: "Coding a performance-first, mobile-responsive layout and configuring schema tags for Google search indexing."
    },
    {
      num: "04",
      title: "Launch & Handoff",
      desc: "Securing hosting, domain names, and delivering structured markdown guides for easy content updates."
    }
  ];

  return (
    <section id="process">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">How I Work</span>
          <h2 className="section-title">A disciplined approach to digital spaces</h2>
          <p className="section-subtitle">
            From first concept to deployment, my process is optimized for speed, precision, and business utility.
          </p>
        </div>

        <div className="process-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="process-step">
              <div className="process-number">
                {step.num}
              </div>
              <div className="process-line"></div>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
