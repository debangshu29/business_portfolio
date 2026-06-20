export default function About() {
  return (
    <section id="about" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="about-grid">
          <div className="about-photo-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80" 
              alt="Debangshu Ghosh working on design and code in a moody studio" 
              className="about-photo"
              loading="lazy"
            />
          </div>
          
          <div className="about-text">
            <span className="section-tag">About Me</span>
            <blockquote className="about-quote">
              "Design is the silence between notes. Every element must earn its place."
            </blockquote>
            <p>
              I build custom, simple, and quietly powerful websites for independent makers and creators. Relying solely on social media means you are missing out on customers searching on Google. When your Instagram link-in-bio points to a premium website, you immediately stand out, build trust, and automate bookings.
            </p>
            <p>
              I design custom-tailored, affordable, and mobile-friendly websites that handle the busywork for you, allowing you to focus on what you make best.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
