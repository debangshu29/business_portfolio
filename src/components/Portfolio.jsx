import { ArrowUpRight } from 'lucide-react';

export default function Portfolio({ onSelectDemo }) {
  const projects = [
    {
      key: 'bakery',
      title: "Hearth & Harvest",
      category: "Artisan Bakery",
      year: "2026",
      desc: "A premium, light-themed bakery website built with quiet design restraint. Features an interactive cake builder quote calculator, zip code delivery checker, and product-occasion routing.",
      features: [
        "Interactive Custom Cake Builder",
        "ZIP Code Delivery Checker",
        "Occasion-based Product Filters"
      ],
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&auto=format&fit=crop&q=80"
    },
    {
      key: 'foodtruck',
      title: "Sage & Salt Kitchen",
      category: "5-Star Mobile Dining",
      year: "2026",
      desc: "An Food Truck website. Features an interactive weekly route billboard, an HTML menu with pre-order cart drawer, and event catering forms.",
      features: [
        "Interactive Route Billboard",
        "HTML Menu with Pre-Order Cart",
        "Catering Booking System"
      ],
      image: "https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=800&auto=format&fit=crop&q=80"
    },
    {
      key: 'photography',
      title: "Luna & Co Photography",
      category: "Wedding Photographer",
      year: "2026",
      desc: "A luxurious, minimal portfolio with an interactive masonry gallery, transparent packaging details, and an instant booking integration.",
      features: [
        "Tab-Filtered Masonry & Lightbox",
        "Interactive Daylight Calculator",
        "Password-Protected Client Vault"
      ],
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80"
    },
    {
      key: 'makeup',
      title: "Glam by Priya",
      category: "Bridal Makeup Artist",
      year: "2026",
      desc: "A high-end editorial website featuring a service rate card, an availability calendar, and an interactive before/after makeup slider.",
      features: [
        "Before/After Touch Slider",
        "Two-Axis Inclusivity Filters",
        "Professional Kit Reveal Showcase"
      ],
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80"
    },
    {
      key: 'tattoo',
      title: "Ink & Soul Studio",
      category: "Tattoo Art Gallery",
      year: "2026",
      desc: "A dark-themed custom studio site with a bookable flash artwork catalog, tattoo aftercare FAQ, and custom design request forms.",
      features: [
        "Interactive Flash Booking Engine",
        "Healed Work Masonry Gallery",
        "Deposit & FAQ Protocols"
      ],
      image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&auto=format&fit=crop&q=80"
    },
    {
      key: 'cleaning',
      title: "Spotless & Co.",
      category: "House Cleaning Service",
      year: "2026",
      desc: "A premium, light-themed cleaning service website — pristine, warm, and effortlessly calm. Features a 3-step instant quote calculator, zip code coverage checker, booking form, FAQ accordion, and team showcase.",
      features: [
        "3-Step Instant Quote Calculator",
        "ZIP Code Coverage Checker",
        "Full Booking Form with Honeypot"
      ],
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section id="portfolio" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Selected Projects</span>
          <h2 className="section-title">Case studies in business utility</h2>
          <p className="section-subtitle">
            Explore live, interactive websites designed to replace manual Instagram DMs with automated scheduling, ordering, and inquiries.
          </p>
        </div>

        <div className="portfolio-grid">
          {projects.map((proj, idx) => (
            <div 
              key={proj.key} 
              className="portfolio-item animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Left Column: Image wrapper */}
              <div 
                className="portfolio-thumbnail-wrapper"
                onClick={() => onSelectDemo(proj.key)}
                style={{ cursor: 'pointer' }}
              >
                <img src={proj.image} alt={proj.title} className="portfolio-thumbnail" />
                <div className="portfolio-thumbnail-overlay">
                  <div className="portfolio-overlay-text">Launch Live Site</div>
                </div>
              </div>

              {/* Right Column: Project details */}
              <div>
                <div className="portfolio-meta">
                  <span>{proj.category}</span>
                  <span>{proj.year}</span>
                </div>
                <h3 className="portfolio-title">{proj.title}</h3>
                <p className="portfolio-desc">{proj.desc}</p>
                
                <ul className="portfolio-features">
                  {proj.features.map((feat, fIdx) => (
                    <li key={fIdx}>{feat}</li>
                  ))}
                </ul>

                <button 
                  onClick={() => onSelectDemo(proj.key)}
                  className="hero-cta" 
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Explore Website
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
