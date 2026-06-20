import { useEffect, useRef } from 'react';

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.services-item');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('fade-up-visible');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const packagesList = [
    {
      id: "starter",
      name: "STARTER",
      price: "$350",
      frequency: "/ project",
      popular: false,
      features: [
        { text: "Single-page website (5 sections)", included: true },
        { text: "Mobile-friendly design", included: true },
        { text: "Basic contact form", included: true },
        { text: "Social media links", included: true },
        { text: "Google Maps embed", included: true },
        { text: "1 round of revisions", included: true },
        { text: "Multi-page structure", included: false },
        { text: "Booking integration", included: false },
        { text: "Basic SEO setup", included: false },
        { text: "Post-launch support", included: false },
      ],
      cta: "Get Started"
    },
    {
      id: "growth",
      name: "GROWTH",
      price: "$600",
      frequency: "/ project",
      popular: true,
      badgeText: "Most Popular",
      features: [
        { text: "Single-page website (5 sections)", included: true },
        { text: "Mobile-friendly design", included: true },
        { text: "Basic contact form", included: true },
        { text: "Social media links", included: true },
        { text: "Google Maps embed", included: true },
        { text: "1 round of revisions", included: true },
        { text: "Multi-page structure (3–5 pages)", included: true },
        { text: "Booking integration (Calendly/TidyCal)", included: true },
        { text: "Basic SEO setup", included: true },
        { text: "Post-launch support (30 days)", included: true },
        { text: "Custom payments (Stripe)", included: false },
        { text: "Automated emails", included: false },
        { text: "Client account area", included: false },
        { text: "Extended support (60 days)", included: false },
      ],
      cta: "Let's Talk"
    },
    {
      id: "complete",
      name: "COMPLETE",
      price: "$1,000",
      frequency: "/ project",
      popular: false,
      features: [
        { text: "Single-page website (5 sections)", included: true },
        { text: "Mobile-friendly design", included: true },
        { text: "Basic contact form", included: true },
        { text: "Social media links", included: true },
        { text: "Google Maps embed", included: true },
        { text: "1 round of revisions", included: true },
        { text: "Multi-page structure (3–5 pages)", included: true },
        { text: "Booking integration (Calendly/TidyCal)", included: true },
        { text: "Basic SEO setup", included: true },
        { text: "Post-launch support (30 days)", included: true },
        { text: "Custom payments (Stripe integration)", included: true },
        { text: "Automated confirmation emails", included: true },
        { text: "Client account area", included: true },
        { text: "Extended support (60 days)", included: true },
      ],
      cta: "Get Started"
    }
  ];

  return (
    <section id="services" ref={sectionRef} style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="section-header">
          <span className="section-tag">Investment</span>
          <h2 className="section-title">How We Can Work Together</h2>
          <p className="section-subtitle">
            Most designers charge recurring fees. With me, you pay once and own your website fully. Choose a plan that fits your business scale.
          </p>
        </div>

        <div className="services-list">
          {packagesList.map((pkg, idx) => (
            <div key={idx} className={`services-item ${pkg.popular ? 'popular' : ''}`}>
              {pkg.popular && (
                <div className="services-popular-badge">
                  {pkg.badgeText}
                </div>
              )}
              
              <div className="services-card-top">
                <div className="services-badge">{pkg.name}</div>
                <div className="services-price-wrap">
                  <span className="services-amount">{pkg.price}</span>
                  <span className="services-type">{pkg.frequency}</span>
                </div>
              </div>

              <div className="services-divider" />
              
              <ul className="services-features">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className={feature.included ? 'included' : 'excluded'}>
                    <span className="feature-marker">
                      {feature.included ? "✓" : "—"}
                    </span>
                    <span className="feature-text">{feature.text}</span>
                  </li>
                ))}
              </ul>
              
              <a href="#contact" className={`services-cta ${pkg.popular ? 'cta-filled' : 'cta-outlined'}`}>
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="services-addons-text">
          Need something specific? Add-ons: extra page ($80), custom booking upgrade ($150), simple store ($250).
        </div>
      </div>
    </section>
  );
}
