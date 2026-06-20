import { useState, useEffect } from 'react';
import { Sparkles, X, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import './makeup.css';

export default function GlamPriya() {
  const [activeCategory, setActiveCategory] = useState('bridal');
  const [activeTone, setActiveTone] = useState('all');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', date: '', location: '', headcount: '1', budget: 'signature', details: '', honeypot: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Consultation Calendar booking state
  const [consultDate, setConsultDate] = useState('');
  const [consultTime, setConsultTime] = useState('10:00');
  const [consultSuccess, setConsultSuccess] = useState(false);

  // Product Kit Reveal Filter State
  const [kitFilter, setKitFilter] = useState('all');

  // Rich Portfolio Dataset with Skin Tone and Products Used
  const portfolioData = [
    // Bridal
    { id: 1, category: 'bridal', tone: 'fair', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', desc: 'Dewy romantic bridal finish with soft pink tones', products: 'Giorgio Armani Luminous Silk, Charlotte Tilbury Pillow Talk Lipstick, Hourglass Ambient Lighting Powder', occasion: 'Spring Estate Wedding' },
    { id: 2, category: 'bridal', tone: 'medium', url: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800&auto=format&fit=crop&q=80', desc: 'Warm golden bridal glow with soft champagne details', products: 'Estée Lauder Double Wear, NARS Laguna Bronzer, Fenty Gloss Bomb', occasion: 'Vineyard Sunset Ceremony' },
    { id: 3, category: 'bridal', tone: 'deep', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80', desc: 'Rich espresso tones with soft metallic gold highlight', products: 'Pat McGrath Sublime Perfection, Danessa Myricks Colorfix, Lancôme Lash Idôle', occasion: 'Garden Conservatory Wedding' },

    // Editorial
    { id: 4, category: 'editorial', tone: 'fair', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80', desc: 'High-fashion editorial look featuring structural bold lips', products: 'Chanel Les Beiges, MAC Ruby Woo Lipstick, Shiseido Aura Dew', occasion: 'Vogue Autumn Editorial' },
    { id: 5, category: 'editorial', tone: 'medium', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop&q=80', desc: 'Glass-skin finish with graphic soft wing eyeliner', products: 'KVD Tattoo Liner, Dior Backstage Face & Body, Merit Flush Balm', occasion: 'Studio Fashion Editorial' },
    { id: 6, category: 'editorial', tone: 'deep', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80', desc: 'Monochromatic bronze sculpting with high gloss', products: 'Fenty Eaze Drop, Danessa Myricks Dewy Wet Balm, Anastasia Beverly Hills Brow Freeze', occasion: 'Modernist Editorial Campaign' },

    // Event
    { id: 7, category: 'event', tone: 'fair', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80', desc: 'Classic soft glam with defined lashes and nude lips', products: 'Charlotte Tilbury Airbrush Flawless, MAC Velvet Teddy, Tom Ford Quad', occasion: 'Metropolitan Gala Evening' },
    { id: 8, category: 'event', tone: 'medium', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&auto=format&fit=crop&q=80', desc: 'Sunkissed bronze look with definition', products: 'NARS Sheer Glow, Patrick Ta Major Sculpt, Rare Beauty Liquid Blush', occasion: 'Outdoor Cocktail Soiree' },
    { id: 9, category: 'event', tone: 'deep', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80', desc: 'Clean satin finish with smokey plum eyes', products: 'Lancôme Teint Idole, Huda Beauty Rose Quartz Palette, Fenty Cream Blush', occasion: 'Red Carpet Charity Gala' },

    // Special FX
    { id: 10, category: 'fx', tone: 'fair', url: 'https://images.unsplash.com/photo-1503104834685-7205e8607eb9?w=800&auto=format&fit=crop&q=80', desc: 'Creative botanical crystal embellishment look', products: 'Mehron Paradise AQ Paints, Swarovski Face Crystals, MAC Pigments', occasion: 'Avant-Garde Showcase' },
    { id: 11, category: 'fx', tone: 'medium', url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80', desc: 'High-contrast graphic color block face design', products: 'Kryolan Aquacolor, Danessa Myricks Colorfix Neon, Make Up For Ever Flash Palette', occasion: 'Theater Avant-Garde' },
    { id: 12, category: 'fx', tone: 'deep', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80', desc: 'Metallic gold foil skin painting', products: 'Mehron Metallic Powder, Danessa Myricks Colorfix Gold, MAC Studio Fix', occasion: 'Art & Body Exhibition' }
  ];

  // Filtering Logic: Category AND Skin Tone
  const filteredPortfolio = portfolioData.filter(look => {
    const categoryMatch = look.category === activeCategory;
    const toneMatch = activeTone === 'all' || look.tone === activeTone;
    return categoryMatch && toneMatch;
  });

  // Lightbox Handlers
  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxImage(filteredPortfolio[index]);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const newIdx = (lightboxIndex - 1 + filteredPortfolio.length) % filteredPortfolio.length;
    setLightboxIndex(newIdx);
    setLightboxImage(filteredPortfolio[newIdx]);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    const newIdx = (lightboxIndex + 1) % filteredPortfolio.length;
    setLightboxIndex(newIdx);
    setLightboxImage(filteredPortfolio[newIdx]);
  };

  // Preloading next 3 images for Core Web Vitals LCP optimization
  useEffect(() => {
    if (lightboxIndex !== -1 && filteredPortfolio.length > 0) {
      const next1 = filteredPortfolio[(lightboxIndex + 1) % filteredPortfolio.length].url;
      const next2 = filteredPortfolio[(lightboxIndex + 2) % filteredPortfolio.length].url;
      const next3 = filteredPortfolio[(lightboxIndex + 3) % filteredPortfolio.length].url;
      [next1, next2, next3].forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [lightboxIndex, filteredPortfolio]);

  // Form Submissions
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.honeypot) return; // silent block
    setContactSuccess(true);
  };

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setConsultSuccess(true);
  };

  // Kit Reveal Products list
  const kitItems = [
    { name: "Luminous Silk Foundation", brand: "Giorgio Armani", type: "face", link: "#", desc: "For that lit-from-within glow that translates beautifully under flash." },
    { name: "Pillow Talk Matte Revolution", brand: "Charlotte Tilbury", type: "lips", link: "#", desc: "The ultimate universal bridal nude pink lipstick." },
    { name: "Ambient Lighting Powder", brand: "Hourglass", type: "face", link: "#", desc: "Uses photoluminescent technology to filter out harsh flash lighting." },
    { name: "Pro Longwear Paint Pot", brand: "MAC Cosmetics", type: "eyes", link: "#", desc: "The gold standard eye primer that holds eyeshadow crease-free for 16 hours." },
    { name: "Colorfix Glaze", brand: "Danessa Myricks", type: "eyes", link: "#", desc: "High-shine waterproof glaze for editorial looks." },
    { name: "Major Headlines Blush", brand: "Patrick Ta", type: "face", link: "#", desc: "Cream and powder duo for depth and pigment longevity." }
  ];

  const filteredKit = kitFilter === 'all' ? kitItems : kitItems.filter(item => item.type === kitFilter);

  return (
    <div className="premium-makeup-body">
      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="premium-makeup-nav-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* LUXURY NAVBAR */}
      <nav className="premium-makeup-navbar">
        <div className="premium-makeup-logo">Priya</div>
        
        <ul className={`premium-makeup-nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#transformations" className="premium-makeup-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Transformations</a></li>
          <li><a href="#portfolio" className="premium-makeup-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Curated Work</a></li>
          <li><a href="#services" className="premium-makeup-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Collections</a></li>
          <li><a href="#story" className="premium-makeup-nav-link" onClick={() => setIsMobileMenuOpen(false)}>The Story</a></li>
          <li><a href="#experience" className="premium-makeup-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Expectations</a></li>
          <li><a href="#kit" className="premium-makeup-nav-link" onClick={() => setIsMobileMenuOpen(false)}>The Kit</a></li>
          <li><a href="#contact" className="premium-makeup-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Bookings</a></li>
        </ul>

        <button className="premium-makeup-mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle navigation menu">
          {isMobileMenuOpen ? <X size={20} /> : <Sparkles size={20} />}
        </button>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="premium-makeup-hero">
        <img 
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&auto=format&fit=crop&q=80" 
          alt="A bride looking at her reflection in a sunlit mirror, final makeup detail being completed" 
          className="premium-makeup-hero-img"
        />
        <div className="premium-makeup-hero-overlay animate-fade-in">
          <span className="premium-makeup-hero-subtitle">Priya Beauty Boutique</span>
          <h1 className="premium-makeup-hero-title">Beauty That Feels Like You</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#portfolio" className="premium-makeup-btn">See the Work</a>
            <a href="#contact" className="premium-makeup-btn premium-makeup-btn-outline">Book a Trial</a>
          </div>
        </div>
      </header>

      {/* 2. BEFORE/AFTER INTERACTIVE SLIDER */}
      <section className="premium-makeup-section" id="transformations">
        <span className="premium-makeup-sec-subtitle">Confidence Unveiled</span>
        <h2 className="premium-makeup-sec-title">The Transformations</h2>
        <p className="premium-makeup-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          Drag the slider to reveal the difference between clean natural skin and a custom-designed, long-lasting wedding day aesthetic.
        </p>

        <div className="premium-makeup-slider-container">
          {/* After image (Background) */}
          <img 
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80" 
            alt="Bride in full wedding day makeup look" 
            className="premium-makeup-slider-img"
          />
          <span className="premium-makeup-slider-label after-label">Wedding Day Finish</span>

          {/* Before image (Foreground, width dynamic) */}
          <div className="premium-makeup-slider-before" style={{ width: `${sliderPosition}%` }}>
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80" 
              alt="Clean natural face portrait" 
              className="premium-makeup-slider-img-before"
            />
            <span className="premium-makeup-slider-label before-label">Natural Skin</span>
          </div>

          {/* Handle */}
          <div className="premium-makeup-slider-handle" style={{ left: `${sliderPosition}%` }}>
            <div className="premium-makeup-slider-handle-btn">↔</div>
          </div>

          {/* Range Input Control */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={sliderPosition} 
            onChange={(e) => setSliderPosition(e.target.value)} 
            className="premium-makeup-slider-input" 
            aria-label="Before and after makeup comparison slider"
          />
        </div>
      </section>

      {/* 3. PORTFOLIO / GALLERY SECTION WITH DUAL FILTERING */}
      <section className="premium-makeup-section" id="portfolio" style={{ backgroundColor: 'var(--makeup-bg-card)', maxWidth: '100%', borderTop: '1px solid var(--makeup-border)', borderBottom: '1px solid var(--makeup-border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <span className="premium-makeup-sec-subtitle">Curated Gallery</span>
          <h2 className="premium-makeup-sec-title">Looks Catalog</h2>
          
          {/* Category Selector Tab Bar */}
          <div className="premium-makeup-gallery-tabs">
            {['bridal', 'editorial', 'event', 'fx'].map(cat => (
              <button 
                key={cat}
                className={`premium-makeup-gallery-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveTone('all');
                }}
              >
                {cat === 'fx' ? 'Special FX' : cat}
              </button>
            ))}
          </div>

          {/* Skin Tone Filter (Critical for trust & inclusivity) */}
          <div className="premium-makeup-tone-filters">
            <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--makeup-text-muted)' }}>
              Filter Skin Tone:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {['all', 'fair', 'medium', 'deep'].map(tone => (
                <button
                  key={tone}
                  className={`premium-makeup-tone-btn ${activeTone === tone ? 'active' : ''}`}
                  onClick={() => setActiveTone(tone)}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Portfolio Grid */}
          <div className="premium-makeup-gallery-grid">
            {filteredPortfolio.length === 0 ? (
              <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '60px 0', color: 'var(--makeup-text-muted)' }}>
                No looks found matching this criteria. Clear filters to view details.
              </div>
            ) : (
              filteredPortfolio.map((look, idx) => (
                <div 
                  key={look.id} 
                  className="premium-makeup-gallery-item"
                  onClick={() => handleOpenLightbox(idx)}
                >
                  <img src={look.url} alt={`${look.desc} - Skin tone: ${look.tone}`} loading="lazy" className="premium-makeup-gallery-img" />
                  <div className="premium-makeup-gallery-item-overlay">
                    <div style={{ width: '100%' }}>
                      <span className="premium-makeup-gallery-tag">{look.occasion}</span>
                      <p className="premium-makeup-gallery-desc">{look.desc}</p>
                      <small style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>Products: {look.products}</small>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div className="premium-makeup-lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <button className="premium-makeup-lightbox-close" onClick={() => setLightboxImage(null)}>
            <X size={24} />
          </button>
          
          <button className="premium-makeup-lightbox-nav prev" onClick={handlePrevImage}>
            <ChevronLeft size={30} />
          </button>
          
          <div className="premium-makeup-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImage.url} alt={lightboxImage.desc} className="premium-makeup-lightbox-img" />
            <div style={{ textAlign: 'left', width: '100%', maxWidth: '600px' }}>
              <span className="premium-makeup-gallery-tag" style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px' }}>
                {lightboxImage.occasion} ({lightboxImage.tone} skin tone)
              </span>
              <p className="premium-makeup-lightbox-caption">{lightboxImage.desc}</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '10px' }}>
                <strong style={{ fontSize: '12px', color: 'var(--makeup-accent)' }}>Products Used:</strong>
                <p style={{ fontSize: '12px', color: '#dcd7d0', lineHeight: 1.5, marginTop: '4px' }}>{lightboxImage.products}</p>
              </div>
            </div>
          </div>
          
          <button className="premium-makeup-lightbox-nav next" onClick={handleNextImage}>
            <ChevronRight size={30} />
          </button>
        </div>
      )}

      {/* 4. SERVICES & PRICING SECTION */}
      <section className="premium-makeup-section" id="services">
        <span className="premium-makeup-sec-subtitle">Service List & Collections</span>
        <h2 className="premium-makeup-sec-title">Transparent Investments</h2>
        <p className="premium-makeup-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          Confidence starts with transparency. Here are our baseline rates. Packages include custom lashes, consultation sheets, and high-end skin prep.
        </p>

        <div className="premium-makeup-pricing-grid">
          {/* Package 1 */}
          <div className="premium-makeup-price-card">
            <h3 className="premium-makeup-price-title">Bridal Essentials</h3>
            <div className="premium-makeup-price-rate">Starting at $350</div>
            <p className="premium-makeup-price-desc">Ideal for small elopements, court marriages, and micro-ceremonies.</p>
            
            <ul className="premium-makeup-price-features">
              <li>1.5 Hours Wedding Day Service</li>
              <li>Signature Airbrush or Dewy Skin Prep</li>
              <li>Premium Custom Faux Eyelashes Included</li>
              <li>Lip Touch-Up Kit for Reception</li>
              <li>Trial is NOT included (must book separately)</li>
            </ul>
            
            <a href="#contact" className="premium-makeup-btn premium-makeup-btn-outline" style={{ marginTop: '24px', width: '100%', textAlign: 'center' }}>Secure Essentials</a>
          </div>

          {/* Package 2 - Signature */}
          <div className="premium-makeup-price-card active">
            <span className="premium-makeup-price-badge">Signature Choice</span>
            <h3 className="premium-makeup-price-title">Bridal Signature</h3>
            <div className="premium-makeup-price-rate">Starting at $600</div>
            <p className="premium-makeup-price-desc">The complete bridal service from planning trials to day-of execution.</p>
            
            <ul className="premium-makeup-price-features">
              <li>Full 2-Hour Bridal Trial Session</li>
              <li>2 Hours Wedding Day Face Styling</li>
              <li>24-Hour Custom Lash Mapping & Application</li>
              <li>Veil placement & Hair coordination</li>
              <li>Luxury Touch-Up Box (translucent powder, lip kit, blotting sheets)</li>
            </ul>
            
            <a href="#contact" className="premium-makeup-btn" style={{ marginTop: '24px', width: '100%', textAlign: 'center' }}>Secure Signature</a>
          </div>

          {/* Package 3 */}
          <div className="premium-makeup-price-card">
            <h3 className="premium-makeup-price-title">Editorial / Event</h3>
            <div className="premium-makeup-price-rate">Starting at $180</div>
            <p className="premium-makeup-price-desc">For editorial campaigns, corporate galas, photoshoots, or events.</p>
            
            <ul className="premium-makeup-price-features">
              <li>1 Hour Custom Session in Studio</li>
              <li>High-Definition Makeup for Camera Flash</li>
              <li>Premium Faux Lash strip application</li>
              <li>Full-body skin shimmer & collarbone detail</li>
              <li>Half-day / Full-day on-set rates available</li>
            </ul>
            
            <a href="#contact" className="premium-makeup-btn premium-makeup-btn-outline" style={{ marginTop: '24px', width: '100%', textAlign: 'center' }}>Secure Event</a>
          </div>
        </div>

        {/* Add-ons list */}
        <div style={{ marginTop: '56px', borderTop: '1px dashed var(--makeup-border)', paddingTop: '40px' }}>
          <h4 className="premium-makeup-serif" style={{ fontSize: '20px', color: 'var(--makeup-dark-accent)', marginBottom: '24px', textAlign: 'center' }}>
            Creative Upgrades & Add-Ons
          </h4>
          <div className="premium-makeup-referrals-grid">
            <div className="premium-makeup-referral-item">
              <strong>Bridal Party member</strong> • $120 / person (Bridesmaids/Mothers)
            </div>
            <div className="premium-makeup-referral-item">
              <strong>On-Set Touch-up Service</strong> • $100 / hour (Stay through photos)
            </div>
            <div className="premium-makeup-referral-item">
              <strong>Destination Travel</strong> • Custom Quote (Flights + lodging coverage)
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT / STORY SECTION */}
      <section className="premium-makeup-section" id="story" style={{ backgroundColor: 'var(--makeup-bg-card)', maxWidth: '100%', borderTop: '1px solid var(--makeup-border)', borderBottom: '1px solid var(--makeup-border)' }}>
        <div className="premium-makeup-story-wrapper">
          <div className="premium-makeup-story-grid">
            <div className="premium-makeup-story-img-wrap">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" 
                alt="Priya blending colors on a premium beauty palette in her sunlit studio workspace" 
                className="premium-makeup-story-img"
              />
            </div>
            <div className="premium-makeup-story-content">
              <span className="premium-makeup-sec-subtitle" style={{ textAlign: 'left', display: 'block', marginBottom: '16px' }}>The Artist</span>
              <h2 className="premium-makeup-story-title">I Bring Out Your Light</h2>
              <p className="premium-makeup-story-text">
                Makeup isn't a mask to hide behind. It's a tool to sculpt your confidence. I spent the last eight years working with diverse skin tones, age brackets, and beauty aesthetics to learn how light captures natural skin.
              </p>
              <p className="premium-makeup-story-text">
                My signature style is dewy, fresh, and quietly luxurious. I don't transform you into someone else—I bring out the most radiant version of who you already are.
              </p>
              <a href="#contact" className="premium-makeup-btn premium-makeup-btn-dark" style={{ marginTop: '16px' }}>Discuss Your Look</a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS / EXPERIENCE SECTION */}
      <section className="premium-makeup-section" id="experience">
        <span className="premium-makeup-sec-subtitle">The Journey</span>
        <h2 className="premium-makeup-sec-title">What to Expect</h2>
        <p className="premium-makeup-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          "Your trial session is where we experiment. Your wedding day is where we execute." Here is how we build your custom look.
        </p>
        
        <div className="premium-makeup-process-grid">
          <div className="premium-makeup-process-card">
            <span className="premium-makeup-process-num">01</span>
            <h3 className="premium-makeup-process-title">Dialogue & Details</h3>
            <p className="premium-makeup-process-desc">We discuss your dress, venue lighting, typical makeup routines, and skin sensitivities.</p>
          </div>
          
          <div className="premium-makeup-process-card">
            <span className="premium-makeup-process-num">02</span>
            <h3 className="premium-makeup-process-title">The Trial Run</h3>
            <p className="premium-makeup-process-desc">A 2-hour private session where we try different options, test lashes, and photograph the look under flash.</p>
          </div>

          <div className="premium-makeup-process-card">
            <span className="premium-makeup-process-num">03</span>
            <h3 className="premium-makeup-process-title">Wedding Execution</h3>
            <p className="premium-makeup-process-desc">I arrive early with a clean kit, coordinated schedule, and quiet, calming energy to complete your application.</p>
          </div>

          <div className="premium-makeup-process-card">
            <span className="premium-makeup-process-num">04</span>
            <h3 className="premium-makeup-process-title">Reception Touch-up</h3>
            <p className="premium-makeup-process-desc">If booked, I refresh your lips and blot away shine before your grand entrance and portrait session.</p>
          </div>
        </div>
      </section>

      {/* 7. PORTFOLIO KIT REVEAL (PREMIUM ADD-ON) */}
      <section className="premium-makeup-section" id="kit" style={{ borderTop: '1px solid var(--makeup-border)', borderBottom: '1px solid var(--makeup-border)', backgroundColor: '#fffdfb', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <span className="premium-makeup-sec-subtitle">Secret Arsenal</span>
          <h2 className="premium-makeup-sec-title">Inside Priya's Kit</h2>
          <p className="premium-makeup-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
            We only use luxury, dermatologist-tested, and flash-photography approved products to guarantee a flawless, weightless finish.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {['all', 'face', 'eyes', 'lips'].map(cat => (
              <button 
                key={cat}
                className={`premium-makeup-tone-btn ${kitFilter === cat ? 'active' : ''}`}
                onClick={() => setKitFilter(cat)}
                style={{ textTransform: 'capitalize' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="premium-makeup-process-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {filteredKit.map((item, idx) => (
              <div key={idx} className="premium-makeup-process-card" style={{ padding: '24px', border: '1px solid var(--makeup-border)', backgroundColor: 'var(--makeup-bg)' }}>
                <span className="premium-makeup-process-num" style={{ fontSize: '20px', marginBottom: '8px' }}>✓</span>
                <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: '18px', fontWeight: 'bold', color: 'var(--makeup-dark-accent)', marginBottom: '4px' }}>
                  {item.name}
                </h4>
                <span style={{ fontSize: '11px', color: 'var(--makeup-accent)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                  {item.brand}
                </span>
                <p style={{ fontSize: '13px', color: 'var(--makeup-text-muted)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="premium-makeup-section" id="reviews" style={{ backgroundColor: 'var(--makeup-bg-card)', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <span className="premium-makeup-sec-subtitle">Testimonials</span>
          <h2 className="premium-makeup-sec-title">What They Feel</h2>
          
          <div className="premium-makeup-reviews-grid">
            <div className="premium-makeup-review-card">
              <p className="premium-makeup-review-text">
                "Priya listened. I don't wear much makeup day-to-day, and I was terrified of looking heavy or caked on my wedding day. She crafted a dewy, glowing finish that looked exactly like my skin, but radiant. My husband was speechless."
              </p>
              <div>
                <span className="premium-makeup-review-author">Sarah Jenkins</span>
                <span className="premium-makeup-review-context">• Signature Bride</span>
              </div>
            </div>

            <div className="premium-makeup-review-card">
              <p className="premium-makeup-review-text">
                "As someone with deep skin tone, finding an artist who understands undertones without making me look gray is difficult. Priya was absolute magic. The foundation match was flawless, and the look held up through six hours of summer heat."
              </p>
              <div>
                <span className="premium-makeup-review-author">Maya Cooper</span>
                <span className="premium-makeup-review-context">• Summer Conservatory Wedding</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOOKING / CONTACT */}
      <section className="premium-makeup-section" id="contact">
        <span className="premium-makeup-sec-subtitle">Booking Form</span>
        <h2 className="premium-makeup-sec-title">Let's Design Your Look</h2>
        <p className="premium-makeup-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          Trials are held at our Soho studio. Please complete the details below to check dates and verify custom rates.
        </p>

        <div className="premium-makeup-contact-wrapper">
          {!contactSuccess ? (
            <form onSubmit={handleContactSubmit} className="premium-makeup-form">
              <div className="premium-makeup-form-group">
                <label className="premium-makeup-label">Your Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Claire Jenkins" 
                  className="premium-makeup-input"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>

              <div className="premium-makeup-form-group">
                <label className="premium-makeup-label">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="claire@example.com" 
                  className="premium-makeup-input"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>

              <div className="premium-makeup-form-group">
                <label className="premium-makeup-label">Event Date</label>
                <input 
                  type="date" 
                  required
                  className="premium-makeup-input"
                  value={contactForm.date}
                  onChange={(e) => setContactForm({ ...contactForm, date: e.target.value })}
                />
              </div>

              <div className="premium-makeup-form-group">
                <label className="premium-makeup-label">Event Location / Venue</label>
                <input 
                  type="text" 
                  required
                  placeholder="Soho, NY" 
                  className="premium-makeup-input"
                  value={contactForm.location}
                  onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                />
              </div>

              <div className="premium-makeup-form-group">
                <label className="premium-makeup-label">Estimated Headcount</label>
                <select 
                  className="premium-makeup-input"
                  value={contactForm.headcount}
                  onChange={(e) => setContactForm({ ...contactForm, headcount: e.target.value })}
                >
                  <option value="1">Just the Bride (1 Person)</option>
                  <option value="3">Bride + 2 Attendants</option>
                  <option value="5">Bride + 4 Attendants</option>
                  <option value="6+">Large Wedding Party (6+ People)</option>
                </select>
              </div>

              <div className="premium-makeup-form-group">
                <label className="premium-makeup-label">Select Package Tier</label>
                <select 
                  className="premium-makeup-input"
                  value={contactForm.budget}
                  onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                >
                  <option value="essentials">Bridal Essentials (From $350)</option>
                  <option value="signature">Bridal Signature (From $600)</option>
                  <option value="editorial">Editorial / Event (From $180)</option>
                </select>
              </div>

              <div className="premium-makeup-form-group" style={{ gridColumn: 'span 2' }}>
                <label className="premium-makeup-label">Describe Your Dream Look / Skin Type</label>
                <textarea 
                  required
                  placeholder="Dry, oily, combination skin? Warm tones or classic vintage? Share your goals..."
                  className="premium-makeup-input"
                  style={{ minHeight: '120px', resize: 'vertical' }}
                  value={contactForm.details}
                  onChange={(e) => setContactForm({ ...contactForm, details: e.target.value })}
                />
              </div>

              {/* Honeypot */}
              <div className="premium-makeup-form-group premium-makeup-hidden-field">
                <input 
                  type="text" 
                  tabIndex="-1" 
                  value={contactForm.honeypot}
                  onChange={(e) => setContactForm({ ...contactForm, honeypot: e.target.value })}
                />
              </div>

              <button type="submit" className="premium-makeup-btn premium-makeup-btn-dark" style={{ gridColumn: 'span 2', marginTop: '16px' }}>
                Verify Availability
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 size={44} style={{ color: '#10b981' }} />
              </div>
              <h3 className="premium-makeup-serif" style={{ fontSize: '24px', color: 'var(--makeup-dark-accent)', marginBottom: '12px' }}>
                Availability Checked
              </h3>
              <p style={{ color: 'var(--makeup-text-muted)', fontSize: '14px', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                Thank you, <strong>{contactForm.name}</strong>. Priya has logged your date <strong>{contactForm.date}</strong>. Let's schedule your 30-minute virtual consultation call to confirm the details.
              </p>

              {/* Simulated Calendly booking widget */}
              {!consultSuccess ? (
                <div className="premium-makeup-calendar-booking-card">
                  <h4 className="premium-makeup-serif" style={{ fontSize: '18px', color: 'var(--makeup-dark-accent)', marginBottom: '16px' }}>
                    📅 Schedule Consultation Call
                  </h4>
                  <form onSubmit={handleConsultSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                    <div className="premium-makeup-form-group" style={{ width: '160px' }}>
                      <input 
                        type="date" 
                        required 
                        className="premium-makeup-input" 
                        value={consultDate} 
                        onChange={(e) => setConsultDate(e.target.value)} 
                      />
                    </div>
                    <div className="premium-makeup-form-group" style={{ width: '140px' }}>
                      <select 
                        className="premium-makeup-input" 
                        value={consultTime} 
                        onChange={(e) => setConsultTime(e.target.value)}
                      >
                        <option value="10:00">10:00 AM</option>
                        <option value="11:30">11:30 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:30">03:30 PM</option>
                      </select>
                    </div>
                    <button type="submit" className="premium-makeup-btn premium-makeup-btn-dark premium-makeup-btn-sm">
                      Book Slot
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e6faf0', border: '1px solid #10b981', padding: '12px 20px', maxWidth: '400px', margin: '0 auto', color: '#0f5132', fontSize: '13px' }}>
                  <CheckCircle2 size={16} />
                  <span>Consultation confirmed for <strong>{consultDate}</strong> at <strong>{consultTime}</strong>! check your inbox for the Zoom invitation.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="premium-makeup-footer">
        <div className="premium-makeup-footer-content">
          <div className="premium-makeup-footer-left">
            <div className="premium-makeup-logo" style={{ fontSize: '22px', marginBottom: '12px' }}>Priya</div>
            <p style={{ fontSize: '13px', color: 'var(--makeup-text-muted)', maxWidth: '280px' }}>
              Dermatologist-approved high-definition makeup styling for brides, editorial campaigns, and galas.
            </p>
          </div>
          
          <div className="premium-makeup-footer-right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="premium-makeup-label" style={{ color: 'var(--makeup-text-muted)' }}>Urgent Inquiries</span>
              <a href="tel:+12125550189" style={{ fontSize: '15px', color: 'inherit', fontWeight: 'bold' }}>+1 (212) 555-0189</a>
              <a href="https://wa.me/12125550189" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--makeup-text-muted)' }}>WhatsApp Chat</a>
              <a href="mailto:hello@priyamakeup.com" style={{ fontSize: '13px', color: 'var(--makeup-text-muted)' }}>hello@priyamakeup.com</a>
            </div>
            
            <div className="premium-makeup-footer-links" style={{ marginTop: '24px' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="premium-makeup-footer-link">Instagram</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="premium-makeup-footer-link">Pinterest</a>
            </div>
          </div>
        </div>

        <div className="premium-makeup-footer-copy">
          &copy; {new Date().getFullYear()} Priya Makeup Artistry. Boutique Bridal & Editorial Design. Soho, NYC & Destination.
        </div>
      </footer>
    </div>
  );
}
