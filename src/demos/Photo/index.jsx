import { useState, useEffect } from 'react';
import { Camera, Heart, Lock, Unlock, ArrowRight, X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import './photo.css';

export default function LunaCo() {
  const [activeCategory, setActiveCategory] = useState('getting-ready');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isGalleryUnlocked, setIsGalleryUnlocked] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showDownloadAlert, setShowDownloadAlert] = useState(false);

  // Timeline Builder State
  const [ceremonyTime, setCeremonyTime] = useState('16:00');
  const [firstLook, setFirstLook] = useState(true);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', date: '', venue: '', budget: 'signature', details: '', honeypot: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Consultation booking state
  const [consultDate, setConsultDate] = useState('');
  const [consultTime, setConsultTime] = useState('11:00');
  const [consultSuccess, setConsultSuccess] = useState(false);

  // Curated Portfolio Images
  const galleryData = {
    'getting-ready': [
      { id: 1, url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop&q=80', desc: 'Silk ribbons and morning light over rings' },
      { id: 2, url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80', desc: 'Final touch of makeup and soft styling' },
      { id: 3, url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80', desc: 'Final touch of gold and soft fragrance' }
    ],
    'ceremony': [
      { id: 4, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80', desc: 'Tears during vows under wild cathedral branches' },
      { id: 5, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80', desc: 'The walk down the aisle as husband and wife' },
      { id: 6, url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80', desc: 'Handwritten vow books bound in raw leather' }
    ],
    'reception': [
      { id: 7, url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&auto=format&fit=crop&q=80', desc: 'Champagne toast in a candle-lit glass orangery' },
      { id: 8, url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80', desc: 'Dinner reception under warm candlelit wisterias' },
      { id: 9, url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=80', desc: 'Sparkler exit into a quiet Brooklyn evening' }
    ],
    'details': [
      { id: 10, url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&auto=format&fit=crop&q=80', desc: 'Elegant table settings with crystal glassware and gold plates' },
      { id: 11, url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80', desc: 'Heirloom rings placed on wedding flatlay lace' },
      { id: 12, url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop&q=80', desc: 'Artisanal champagne coupes ready for toast' }
    ]
  };

  // List of active gallery images in current tab
  const currentImages = galleryData[activeCategory];

  // Open Lightbox
  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxImage(currentImages[index]);
  };

  // Navigate Lightbox
  const handlePrevImage = (e) => {
    e.stopPropagation();
    const newIdx = (lightboxIndex - 1 + currentImages.length) % currentImages.length;
    setLightboxIndex(newIdx);
    setLightboxImage(currentImages[newIdx]);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    const newIdx = (lightboxIndex + 1) % currentImages.length;
    setLightboxIndex(newIdx);
    setLightboxImage(currentImages[newIdx]);
  };

  // Preloading next images for Core Web Vitals
  useEffect(() => {
    if (lightboxIndex !== -1) {
      const next1 = currentImages[(lightboxIndex + 1) % currentImages.length].url;
      const next2 = currentImages[(lightboxIndex + 2) % currentImages.length].url;
      const next3 = currentImages[(lightboxIndex + 3) % currentImages.length].url;
      [next1, next2, next3].forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [lightboxIndex, currentImages]);

  const handlePreviewGallery = () => {
    setIsGalleryUnlocked(true);
  };

  // Secret Client Gallery Mock Images
  const clientGalleryImages = [
    { id: 101, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80', desc: 'The quiet laugh between vows' },
    { id: 102, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80', desc: 'Holding hands in the meadows' },
    { id: 103, url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&auto=format&fit=crop&q=80', desc: 'First look under the weeping willow' },
    { id: 104, url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80', desc: 'Sunset embrace by the lake' }
  ];

  // Favoriting System
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Timeline Builder Calculation Logic
  // Golden Hour Sunset varies, but let's simulate standard offset calculations
  const getTimeline = () => {
    const [hours, mins] = ceremonyTime.split(':').map(Number);
    const dateObj = new Date();
    dateObj.setHours(hours, mins, 0);

    const formatTime = (timeOffset) => {
      const d = new Date(dateObj.getTime() + timeOffset * 60 * 1000);
      return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    if (firstLook) {
      return [
        { id: 1, label: 'Photographer Arrival & Details', time: formatTime(-150), desc: 'Capturing dress, rings, flatlays, and warm details.' },
        { id: 2, label: 'Getting Ready & Dressing', time: formatTime(-110), desc: 'Stolen candid moments with wedding party and mother.' },
        { id: 3, label: 'The First Look', time: formatTime(-70), desc: 'Intimate first encounter before guests arrive.' },
        { id: 4, label: 'Couples & Wedding Party Portraits', time: formatTime(-55), desc: 'Editorial portraits around the venue gardens.' },
        { id: 5, label: 'Stashing the Couple', time: formatTime(-20), desc: 'Resting while guests begin to arrive at the station.' },
        { id: 6, label: 'Ceremony Exchange', time: formatTime(0), desc: 'Wavelengths of love, vows, rings, and marriage kiss.' },
        { id: 7, label: 'Family Formal Portraits', time: formatTime(35), desc: 'Classic, heirloom groupings at the altar.' },
        { id: 8, label: 'Cocktail Hour Candidate candids', time: formatTime(60), desc: 'Spontaneous hugs, laughter, and drinks details.' },
        { id: 9, label: 'Golden Hour Sunset Portraits', time: formatTime(100), desc: 'Warm, low-sun, dreamlike portraits of the couple.' },
        { id: 10, label: 'Grand Entrance & First Dance', time: formatTime(130), desc: 'Warm welcome into candlelight tables and dinner.' }
      ];
    } else {
      return [
        { id: 1, label: 'Photographer Arrival & Details', time: formatTime(-120), desc: 'Styling invitation flatlays, florals, and heirlooms.' },
        { id: 2, label: 'Getting Ready candid session', time: formatTime(-90), desc: 'Final touches and emotional reveal to wedding party.' },
        { id: 3, label: 'Ceremony Exchange', time: formatTime(0), desc: 'The marriage celebration begins under soft twilight.' },
        { id: 4, label: 'Family & Group Altar Portraits', time: formatTime(35), desc: 'Heirloom formals in the chapel/gardens.' },
        { id: 5, label: 'Wedding Party Groupings', time: formatTime(55), desc: 'Dynamic, candid party shots.' },
        { id: 6, label: 'Cocktail Hour candids', time: formatTime(75), desc: 'Candid smiles, appetizers, and decor shots.' },
        { id: 7, label: 'Couples Twilight Portraits', time: formatTime(90), desc: 'Moody twilight, deep blue hour, romantic framing.' },
        { id: 8, label: 'Grand Entrance & Dinner Toast', time: formatTime(120), desc: 'Candlelight dinners, speech captures, and cake cutting.' }
      ];
    }
  };
  const timeline = getTimeline();

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

  return (
    <div className="premium-photo-body">
      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="premium-photo-nav-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* LUXURY NAVIGATION */}
      <nav className="premium-photo-navbar">
        <div className="premium-photo-logo">Luna & Co</div>
        
        <ul className={`premium-photo-nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#gallery" className="premium-photo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Curated Work</a></li>
          <li><a href="#story" className="premium-photo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>The Story</a></li>
          <li><a href="#experience" className="premium-photo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Experience</a></li>
          <li><a href="#packages" className="premium-photo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Collections</a></li>
          <li><a href="#timeline" className="premium-photo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Timeline Tool</a></li>
          <li><a href="#portal" className="premium-photo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Client Vault</a></li>
          <li><a href="#contact" className="premium-photo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Enquire</a></li>
        </ul>

        <button className="premium-photo-mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle navigation menu">
          {isMobileMenuOpen ? <X size={20} /> : <Camera size={20} />}
        </button>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="premium-photo-hero">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&auto=format&fit=crop&q=80" 
          alt="Couple holding hands walking quietly down a misty country road after ceremony" 
          className="premium-photo-hero-img"
        />
        <div className="premium-photo-hero-overlay animate-fade-in">
          <span className="premium-photo-hero-subtitle">Luna & Co Photography</span>
          <h1 className="premium-photo-hero-title">Love, Caught Quietly</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#gallery" className="premium-photo-btn">See The Work</a>
            <a href="#contact" className="premium-photo-btn premium-photo-btn-outline">Let's Talk</a>
          </div>
        </div>
      </header>

      {/* 2. PORTFOLIO / CURATED GALLERIES */}
      <section className="premium-photo-section" id="gallery">
        <span className="premium-photo-sec-subtitle">Curated Portfolios</span>
        <h2 className="premium-photo-sec-title">Captured Wavelengths</h2>
        
        {/* Gallery Tab Filters */}
        <div className="premium-photo-gallery-tabs">
          {['getting-ready', 'ceremony', 'reception', 'details'].map(cat => (
            <button 
              key={cat}
              className={`premium-photo-gallery-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <div className="premium-photo-gallery-grid">
          {currentImages.map((img, idx) => (
            <div 
              key={img.id} 
              className="premium-photo-gallery-item"
              onClick={() => handleOpenLightbox(idx)}
            >
              <img src={img.url} alt={img.desc} loading="lazy" className="premium-photo-gallery-img" />
              <div className="premium-photo-gallery-item-overlay">
                <span className="premium-photo-gallery-desc">{img.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div className="premium-photo-lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <button className="premium-photo-lightbox-close" onClick={() => setLightboxImage(null)}>
            <X size={24} />
          </button>
          
          <button className="premium-photo-lightbox-nav prev" onClick={handlePrevImage}>
            <ChevronLeft size={30} />
          </button>
          
          <div className="premium-photo-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImage.url} alt={lightboxImage.desc} className="premium-photo-lightbox-img" />
            <p className="premium-photo-lightbox-caption">{lightboxImage.desc}</p>
          </div>
          
          <button className="premium-photo-lightbox-nav next" onClick={handleNextImage}>
            <ChevronRight size={30} />
          </button>
        </div>
      )}

      {/* 3. ABOUT / STORY */}
      <section className="premium-photo-section" id="story" style={{ backgroundColor: 'var(--photo-bg-card)', maxWidth: '100%', borderTop: '1px solid var(--photo-border)', borderBottom: '1px solid var(--photo-border)' }}>
        <div className="premium-photo-story-wrapper">
          <div className="premium-photo-story-grid">
            <div className="premium-photo-story-img-wrap">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" 
                alt="Photographer smiling warmly holding a classic 35mm film camera" 
                className="premium-photo-story-img"
              />
            </div>
            <div className="premium-photo-story-content">
              <span className="premium-photo-sec-subtitle" style={{ textAlign: 'left', display: 'block', marginBottom: '16px' }}>The Photographer</span>
              <h2 className="premium-photo-story-title">Hi, I'm Clara</h2>
              <p className="premium-photo-story-text">
                I believe that marriage is the quietest, most courageous commitment two humans can make. My goal isn't to stage grand poses or chase internet trends, but to sit softly at the edges of your day and document the honest glances, the shaking hands, and the laughter you don't even know you're sharing.
              </p>
              <p className="premium-photo-story-text">
                You're building an heirloom; I'm just here to make sure it's caught in the warmest natural light.
              </p>
              <a href="#contact" className="premium-photo-btn premium-photo-btn-dark" style={{ marginTop: '16px' }}>Share Your Vision</a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROCESS / EXPERIENCE */}
      <section className="premium-photo-section" id="experience">
        <span className="premium-photo-sec-subtitle">The Flow</span>
        <h2 className="premium-photo-sec-title">Working Together</h2>
        
        <div className="premium-photo-process-grid">
          <div className="premium-photo-process-card">
            <span className="premium-photo-process-num">01</span>
            <h3 className="premium-photo-process-title">The Dialogue</h3>
            <p className="premium-photo-process-desc">We grab tea (or jump on a video call) to talk about what you value, how you met, and how you want your wedding to feel.</p>
          </div>
          
          <div className="premium-photo-process-card">
            <span className="premium-photo-process-num">02</span>
            <h3 className="premium-photo-process-title">Engagement session</h3>
            <p className="premium-photo-process-desc">An easy afternoon session under golden light. No stress. This helps you get comfortable before the main day.</p>
          </div>

          <div className="premium-photo-process-card">
            <span className="premium-photo-process-num">03</span>
            <h3 className="premium-photo-process-title">The Wedding Day</h3>
            <p className="premium-photo-process-desc">I guide when needed but mostly act as a calm observer. Capturing both the grand altar moment and the details.</p>
          </div>

          <div className="premium-photo-process-card">
            <span className="premium-photo-process-num">04</span>
            <h3 className="premium-photo-process-title">The Heirloom Gallery</h3>
            <p className="premium-photo-process-desc">Delivered via your secure online vault. Every photo is hand-graded with film tones and high-res printable exports.</p>
          </div>
        </div>
      </section>

      {/* 5. SERVICES & PACKAGES */}
      <section className="premium-photo-section" id="packages" style={{ borderTop: '1px solid var(--photo-border)', borderBottom: '1px solid var(--photo-border)', backgroundColor: '#fffdfb', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <span className="premium-photo-sec-subtitle">Investment Tiers</span>
          <h2 className="premium-photo-sec-title">Curated Collections</h2>
          
          <div className="premium-photo-pricing-grid">
            {/* Package 1 */}
            <div className="premium-photo-price-card">
              <h3 className="premium-photo-price-title">The Intimate</h3>
              <div className="premium-photo-price-rate">Starting at $2,400</div>
              <p className="premium-photo-price-desc">Perfect for small chapel ceremonies, garden elopements, and micro-weddings.</p>
              
              <ul className="premium-photo-price-features">
                <li>5 Hours of Wedding Coverage</li>
                <li>Single Lead Photographer (Clara)</li>
                <li>300+ Fine Art Hand-Edited Images</li>
                <li>Digital Online Gallery (6 Month Hosting)</li>
                <li>Turnaround: 6 Weeks</li>
              </ul>
              
              <a href="#contact" className="premium-photo-btn premium-photo-btn-outline" style={{ marginTop: '24px', width: '100%', textAlign: 'center' }}>Secure Intimate</a>
            </div>

            {/* Package 2 - Recommended */}
            <div className="premium-photo-price-card active">
              <span className="premium-photo-price-badge">Most Chosen</span>
              <h3 className="premium-photo-price-title">The Signature</h3>
              <div className="premium-photo-price-rate">Starting at $3,800</div>
              <p className="premium-photo-price-desc">Complete coverage designed to capture every chapter, from morning makeup to sparkler exit.</p>
              
              <ul className="premium-photo-price-features">
                <li>8 Hours of Full Wedding Coverage</li>
                <li>Lead Photographer + Second Associate</li>
                <li>Complimentary 1.5 Hour Engagement Session</li>
                <li>550+ Fine Art Hand-Edited Images</li>
                <li>Digital Vault Gallery (1 Year Hosting)</li>
                <li>Turnaround: 4 Weeks</li>
              </ul>
              
              <a href="#contact" className="premium-photo-btn" style={{ marginTop: '24px', width: '100%', textAlign: 'center' }}>Secure Signature</a>
            </div>

            {/* Package 3 */}
            <div className="premium-photo-price-card">
              <h3 className="premium-photo-price-title">The Heirloom</h3>
              <div className="premium-photo-price-rate">Starting at $5,200</div>
              <p className="premium-photo-price-desc">The complete digital and print experience. Designed for large destination gatherings.</p>
              
              <ul className="premium-photo-price-features">
                <li>10 Hours of Full Wedding Coverage</li>
                <li>Lead Photographer + Second Associate</li>
                <li>Complimentary 2 Hour Engagement Session</li>
                <li>700+ Fine Art Hand-Edited Images</li>
                <li>Luxury 10x10 Linen Layflat Wedding Album</li>
                <li>Digital Vault Gallery (Lifetime Hosting)</li>
                <li>Turnaround: 3 Weeks</li>
              </ul>
              
              <a href="#contact" className="premium-photo-btn premium-photo-btn-outline" style={{ marginTop: '24px', width: '100%', textAlign: 'center' }}>Secure Heirloom</a>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE TIMELINE BUILDER */}
      <section className="premium-photo-section" id="timeline">
        <span className="premium-photo-sec-subtitle">Planning Tool</span>
        <h2 className="premium-photo-sec-title">Daylight Timeline Calculator</h2>
        <p className="premium-photo-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          Coordinate your celebration based on natural light. Input your planned ceremony time, and we'll calculate key portrait and photo slots.
        </p>

        <div className="premium-photo-timeline-wrapper">
          <div className="premium-photo-timeline-controls">
            <div className="premium-photo-form-group">
              <label className="premium-photo-label">Planned Ceremony Time</label>
              <input 
                type="time" 
                className="premium-photo-input" 
                value={ceremonyTime} 
                onChange={(e) => setCeremonyTime(e.target.value)} 
              />
            </div>
            
            <div className="premium-photo-form-group" style={{ flexDirection: 'row', gap: '10px', alignItems: 'center', marginTop: '16px' }}>
              <input 
                type="checkbox" 
                id="firstLookToggle" 
                checked={firstLook} 
                onChange={() => setFirstLook(!firstLook)} 
                className="premium-photo-checkbox"
              />
              <label htmlFor="firstLookToggle" className="premium-photo-label" style={{ marginBottom: 0, cursor: 'pointer' }}>
                Include First Look Session? (Highly Recommended)
              </label>
            </div>
          </div>

          <div className="premium-photo-timeline-output">
            <div className="premium-photo-timeline-nodes">
              {timeline.map(node => (
                <div key={node.id} className="premium-photo-timeline-node">
                  <div className="premium-photo-timeline-time">{node.time}</div>
                  <div className="premium-photo-timeline-detail">
                    <h4>{node.label}</h4>
                    <p>{node.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="premium-photo-section" id="reviews" style={{ borderTop: '1px solid var(--photo-border)', borderBottom: '1px solid var(--photo-border)', backgroundColor: 'var(--photo-bg-card)', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <span className="premium-photo-sec-subtitle">Love Letters</span>
          <h2 className="premium-photo-sec-title">From Our Couples</h2>
          
          <div className="premium-photo-reviews-grid">
            <div className="premium-photo-review-card">
              <p className="premium-photo-review-text">
                "Clara felt like a quiet guest who just happened to see everything. She captured the moment my grandmother saw me in my dress, a tear starting down her cheek. I didn't even see Clara standing there. The photos look like organic film memories."
              </p>
              <div>
                <span className="premium-photo-review-author">Sarah & Mike</span>
                <span className="premium-photo-review-context">• June 2025 Wedding</span>
              </div>
            </div>

            <div className="premium-photo-review-card">
              <p className="premium-photo-review-text">
                "We had a tiny micro-wedding on a rainy afternoon in the vineyards. Clara told us to embrace the mist. The twilight portraits she took are now hanging in our living room. Her calm energy made all the wedding jitters disappear."
              </p>
              <div>
                <span className="premium-photo-review-author">Elena & David</span>
                <span className="premium-photo-review-context">• October 2025 Vineyard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BLOG / JOURNAL */}
      <section className="premium-photo-section" id="journal">
        <span className="premium-photo-sec-subtitle">Recent Stories</span>
        <h2 className="premium-photo-sec-title">The Journal</h2>
        
        <div className="premium-photo-blog-grid">
          <div className="premium-photo-blog-card">
            <div className="premium-photo-blog-img-wrap">
              <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80" alt="Sarah and Mike vineyard wedding couple portrait" className="premium-photo-blog-img" />
            </div>
            <div className="premium-photo-blog-meta">
              <span className="premium-photo-blog-tag">Vineyard Wedding</span>
              <h3 className="premium-photo-blog-title">Sarah & Mike's Candlelight Vineyard Wedding</h3>
              <p className="premium-photo-blog-desc">Rainy morning mist cleared just in time for an intimate candlelit celebration in the Willamette Valley.</p>
              <a href="#contact" className="premium-photo-blog-link">Read Story <ArrowRight size={14} /></a>
            </div>
          </div>

          <div className="premium-photo-blog-card">
            <div className="premium-photo-blog-img-wrap">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80" alt="Intimate forest wedding celebration altar setup" className="premium-photo-blog-img" />
            </div>
            <div className="premium-photo-blog-meta">
              <span className="premium-photo-blog-tag">Elopement</span>
              <h3 className="premium-photo-blog-title">Deep Forest Elopement in Oregon</h3>
              <p className="premium-photo-blog-desc">Documents a quiet, two-person promise exchanged under the towering fir trees and morning fog.</p>
              <a href="#contact" className="premium-photo-blog-link">Read Story <ArrowRight size={14} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PASSWORD-PROTECTED CLIENT PORTAL */}
      <section className="premium-photo-section" id="portal" style={{ borderTop: '1px solid var(--photo-border)', borderBottom: '1px solid var(--photo-border)', backgroundColor: '#faf9f6' }}>
        <span className="premium-photo-sec-subtitle">Client Portal</span>
        <h2 className="premium-photo-sec-title">The Vault</h2>
        <p className="premium-photo-section-subtitle" style={{ maxWidth: '500px', margin: '0 auto 40px' }}>
          Preview a client gallery experience with curated delivery, favorites, and download prompts. Real client galleries should be protected by server-side authentication.
        </p>

        <div className="premium-photo-portal-card">
          {!isGalleryUnlocked ? (
            <div className="premium-photo-portal-auth-form">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Lock size={32} style={{ color: 'var(--photo-accent)' }} />
              </div>
              <h3 className="premium-photo-serif" style={{ fontSize: '20px', color: 'var(--photo-dark-accent)', marginBottom: '12px' }}>
                Preview Heirloom Gallery
              </h3>

              <button type="button" className="premium-photo-btn premium-photo-btn-dark btn-sm" onClick={handlePreviewGallery}>
                Open Gallery Preview <Unlock size={14} style={{ marginLeft: '6px' }} />
              </button>
            </div>
          ) : (
            <div className="premium-photo-unlocked-gallery">
              <div className="premium-photo-gallery-unlocked-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Unlock size={22} style={{ color: '#10b981' }} />
                  <h3 className="premium-photo-serif" style={{ fontSize: '22px' }}>Sarah & Mike's Wedding Collection</h3>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="premium-photo-btn btn-sm" onClick={() => setShowDownloadAlert(true)}>
                    Download High-Res All
                  </button>
                  <button className="premium-photo-btn premium-photo-btn-outline btn-sm" onClick={() => setIsGalleryUnlocked(false)}>
                    Lock Vault
                  </button>
                </div>
              </div>

              {showDownloadAlert && (
                <div style={{ padding: '12px 16px', border: '1px solid #10b981', backgroundColor: '#e6faf0', color: '#0f5132', fontSize: '12px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>🎉 <strong>All 582 images</strong> packaged successfully. Downloading fine art batch to your device...</span>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'inherit' }} onClick={() => setShowDownloadAlert(false)}>
                    Dismiss
                  </button>
                </div>
              )}

              <div className="premium-photo-client-vault-grid">
                {clientGalleryImages.map(img => (
                  <div key={img.id} className="premium-photo-vault-item">
                    <img src={img.url} alt={img.desc} className="premium-photo-vault-img" />
                    <button 
                      className={`premium-photo-favorite-btn ${favorites.includes(img.id) ? 'active' : ''}`}
                      onClick={() => toggleFavorite(img.id)}
                      aria-label="Add to favorites"
                    >
                      <Heart size={16} fill={favorites.includes(img.id) ? 'var(--photo-accent)' : 'none'} style={{ color: favorites.includes(img.id) ? 'var(--photo-accent)' : '#fff' }} />
                    </button>
                    <div className="premium-photo-vault-desc-tag">{img.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 9. CONTACT / BOOKING & CALENDAR */}
      <section className="premium-photo-section" id="contact">
        <span className="premium-photo-sec-subtitle">Get in Touch</span>
        <h2 className="premium-photo-sec-title">Write Clara</h2>
        <p className="premium-photo-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          Please complete our brief inquiry form. We only take a limited amount of weddings each year to ensure focus and care.
        </p>

        <div className="premium-photo-contact-wrapper">
          {!contactSuccess ? (
            <form onSubmit={handleContactSubmit} className="premium-photo-form">
              <div className="premium-photo-form-group">
                <label className="premium-photo-label">Your Names</label>
                <input 
                  type="text" 
                  required
                  placeholder="Elena & David" 
                  className="premium-photo-input"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>

              <div className="premium-photo-form-group">
                <label className="premium-photo-label">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="elena@example.com" 
                  className="premium-photo-input"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>

              <div className="premium-photo-form-group">
                <label className="premium-photo-label">Wedding Date</label>
                <input 
                  type="date" 
                  required
                  className="premium-photo-input"
                  value={contactForm.date}
                  onChange={(e) => setContactForm({ ...contactForm, date: e.target.value })}
                />
              </div>

              <div className="premium-photo-form-group">
                <label className="premium-photo-label">Wedding Venue & City</label>
                <input 
                  type="text" 
                  required
                  placeholder="Willamette Valley, OR" 
                  className="premium-photo-input"
                  value={contactForm.venue}
                  onChange={(e) => setContactForm({ ...contactForm, venue: e.target.value })}
                />
              </div>

              <div className="premium-photo-form-group" style={{ gridColumn: 'span 2' }}>
                <label className="premium-photo-label">Expected Package Choice</label>
                <select 
                  className="premium-photo-input"
                  value={contactForm.budget}
                  onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                >
                  <option value="intimate">The Intimate (From $2,400)</option>
                  <option value="signature">The Signature (From $3,800)</option>
                  <option value="heirloom">The Heirloom (From $5,200)</option>
                </select>
              </div>

              <div className="premium-photo-form-group" style={{ gridColumn: 'span 2' }}>
                <label className="premium-photo-label">Describe Your Dream Wedding</label>
                <textarea 
                  required
                  placeholder="Tell us about the atmosphere, your story, your vision..."
                  className="premium-photo-input"
                  style={{ minHeight: '120px', resize: 'vertical' }}
                  value={contactForm.details}
                  onChange={(e) => setContactForm({ ...contactForm, details: e.target.value })}
                />
              </div>

              {/* Honeypot */}
              <div className="premium-photo-form-group premium-photo-hidden-field">
                <input 
                  type="text" 
                  tabIndex="-1" 
                  value={contactForm.honeypot}
                  onChange={(e) => setContactForm({ ...contactForm, honeypot: e.target.value })}
                />
              </div>

              <button type="submit" className="premium-photo-btn premium-photo-btn-dark" style={{ gridColumn: 'span 2', marginTop: '16px' }}>
                Send Inquiry
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 size={44} style={{ color: '#10b981' }} />
              </div>
              <h3 className="premium-photo-serif" style={{ fontSize: '24px', color: 'var(--photo-dark-accent)', marginBottom: '12px' }}>
                Inquiry Received
              </h3>
              <p style={{ color: 'var(--photo-text-muted)', fontSize: '14px', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                Thank you, <strong>{contactForm.name}</strong>. Clara has received your wedding inquiry details for <strong>{contactForm.date}</strong> at <strong>{contactForm.venue}</strong>. We will check availability and email you our complete custom pricing proposal guide within 12 hours.
              </p>

              {/* simulated tidycal calendar booking */}
              {!consultSuccess ? (
                <div className="premium-photo-calendar-booking-card">
                  <h4 className="premium-photo-serif" style={{ fontSize: '18px', color: 'var(--photo-dark-accent)', marginBottom: '16px' }}>
                    📅 Schedule Consultation Call
                  </h4>
                  <form onSubmit={handleConsultSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                    <div className="premium-photo-form-group" style={{ width: '160px' }}>
                      <input 
                        type="date" 
                        required 
                        className="premium-photo-input" 
                        value={consultDate} 
                        onChange={(e) => setConsultDate(e.target.value)} 
                      />
                    </div>
                    <div className="premium-photo-form-group" style={{ width: '140px' }}>
                      <select 
                        className="premium-photo-input" 
                        value={consultTime} 
                        onChange={(e) => setConsultTime(e.target.value)}
                      >
                        <option value="10:00">10:00 AM</option>
                        <option value="11:30">11:30 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:30">03:30 PM</option>
                      </select>
                    </div>
                    <button type="submit" className="premium-photo-btn premium-photo-btn-dark premium-photo-btn-sm">
                      Book Call
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e6faf0', border: '1px solid #10b981', padding: '12px 20px', maxWidth: '400px', margin: '0 auto', color: '#0f5132', fontSize: '13px' }}>
                  <CheckCircle2 size={16} />
                  <span>Call scheduled for <strong>{consultDate}</strong> at <strong>{consultTime}</strong>! Look out for a calendar invite.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Local business links / referrals */}
        <div style={{ marginTop: '60px', borderTop: '1px solid var(--photo-border)', paddingTop: '40px' }}>
          <h4 className="premium-photo-serif" style={{ fontSize: '20px', color: 'var(--photo-dark-accent)', marginBottom: '24px', textAlign: 'center' }}>
            Trusted Creative Referrals
          </h4>
          <div className="premium-photo-referrals-grid">
            <div className="premium-photo-referral-item">
              <strong>Planners</strong> • Willow & Ivory Co, Sage Events
            </div>
            <div className="premium-photo-referral-item">
              <strong>Florals</strong> • Heritage Blooms, The Rose Collective
            </div>
            <div className="premium-photo-referral-item">
              <strong>Venues</strong> • Willamette Barn Estates, Glass House Gardens
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="premium-photo-footer">
        <div className="premium-photo-footer-content">
          <div className="premium-photo-footer-left">
            <div className="premium-photo-logo" style={{ fontSize: '22px', marginBottom: '12px' }}>Luna & Co</div>
            <p style={{ fontSize: '13px', color: 'var(--photo-text-muted)', maxWidth: '280px' }}>
              Documenting the honest glances, quiet moments, and warm sunlight of creative love stories.
            </p>
          </div>
          
          <div className="premium-photo-footer-right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="premium-photo-label" style={{ color: 'var(--photo-text-muted)' }}>Locations Support</span>
              <a href="tel:+15035550188" style={{ fontSize: '15px', color: 'inherit', fontWeight: 'bold' }}>+1 (503) 555-0188</a>
              <a href="mailto:hello@lunacophoto.com" style={{ fontSize: '13px', color: 'var(--photo-text-muted)' }}>hello@lunacophoto.com</a>
            </div>
            
            <div className="premium-photo-footer-links" style={{ marginTop: '24px' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="premium-photo-footer-link">Instagram</a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="premium-photo-footer-link">Pinterest</a>
            </div>
          </div>
        </div>

        <div className="premium-photo-footer-copy">
          &copy; {new Date().getFullYear()} Luna & Co Photography. Heirloom Wedding Documentation. Oregon & Destination.
        </div>
      </footer>
    </div>
  );
}
