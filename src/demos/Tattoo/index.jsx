import { useState, useEffect } from 'react';
import { Eye, Shield, CheckCircle2, ChevronDown, ChevronUp, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './tattoo.css';

export default function InkSoul() {
  const [activeStyleTab, setActiveStyleTab] = useState('blackwork');
  const [flashFilter, setFlashFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  // Flash Claims State
  const [flashDesigns, setFlashDesigns] = useState([
    { id: 1, title: "The Snake & Peony", price: "$350", isClaimed: false, size: "5x7 in", placement: "Forearm / Thigh", style: "blackwork", img: "https://images.unsplash.com/photo-1550537687-c91072c4792d?w=600&auto=format&fit=crop&q=80" },
    { id: 2, title: "Dual Daggers", price: "$280", isClaimed: false, size: "4x6 in", placement: "Calf / Arm", style: "traditional", img: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=600&auto=format&fit=crop&q=80" },
    { id: 3, title: "Sacred Moon Moth", price: "$400", isClaimed: true, size: "6x6 in", placement: "Sternum / Back", style: "fine-line", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=80" },
    { id: 4, title: "Duality Skull", price: "$320", isClaimed: false, size: "5x5 in", placement: "Upper Arm / Leg", style: "blackwork", img: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=600&auto=format&fit=crop&q=80" }
  ]);
  const [claimingItem, setClaimingItem] = useState(null);
  const [claimForm, setClaimForm] = useState({ name: '', email: '', depositPaid: false });
  const [claimSuccess, setClaimSuccess] = useState(false);

  // Booking Custom Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', style: 'blackwork', placement: '', size: '', budget: '400-800', details: '', honeypot: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Consultation Calendar booking state
  const [consultDate, setConsultDate] = useState('');
  const [consultTime, setConsultTime] = useState('14:00');
  const [consultSuccess, setConsultSuccess] = useState(false);

  // Rich Portfolio Dataset with Healed vs Fresh tags
  const portfolioData = [
    // Blackwork
    { id: 1, style: 'blackwork', state: 'healed', url: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&auto=format&fit=crop&q=80', desc: 'Full geometric blackwork sleeve, 1 year settled', placement: 'Full Arm Sleeve', size: 'Large' },
    { id: 2, style: 'blackwork', state: 'healed', url: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?w=800&auto=format&fit=crop&q=80', desc: 'Mythological ornamental thigh piece, healed texture', placement: 'Upper Thigh', size: 'Large' },
    { id: 3, style: 'blackwork', state: 'fresh', url: 'https://images.unsplash.com/photo-1564426622559-5af68da63b96?w=800&auto=format&fit=crop&q=80', desc: 'Sacred geometry forearm chest extension', placement: 'Forearm', size: 'Medium' },

    // Fine Line
    { id: 4, style: 'fine-line', state: 'healed', url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&auto=format&fit=crop&q=80', desc: 'Delicate botanical single-needle leaf, 8 months healed', placement: 'Inner Wrist', size: 'Small' },
    { id: 5, style: 'fine-line', state: 'healed', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80', desc: 'Minimalist micro-realism solar system details', placement: 'Collarbone', size: 'Small' },
    { id: 6, style: 'fine-line', state: 'fresh', url: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&auto=format&fit=crop&q=80', desc: 'Symmetrical fine line abstract geometry', placement: 'Back of Neck', size: 'Medium' },

    // Neo-Traditional
    { id: 7, style: 'traditional', state: 'healed', url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80', desc: 'Neo-traditional colored tiger chest piece, 2 years settled', placement: 'Chest', size: 'Large' },
    { id: 8, style: 'traditional', state: 'healed', url: 'https://images.unsplash.com/photo-1707390588471-699062c9cac1?w=800&auto=format&fit=crop&q=80', desc: 'Ornate portrait with autumn gold shading details', placement: 'Calf', size: 'Medium' },
    { id: 9, style: 'traditional', state: 'fresh', url: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?w=800&auto=format&fit=crop&q=80', desc: 'Classic bold rose with deep emerald leaf coloring', placement: 'Hand', size: 'Small' }
  ];

  // Filtering portfolio
  const filteredPortfolio = portfolioData.filter(look => look.style === activeStyleTab);

  // Filtered Flash
  const filteredFlash = flashFilter === 'all' 
    ? flashDesigns 
    : flashDesigns.filter(item => item.style === flashFilter);

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

  // Preload next 3 images
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

  // Flash Reservation Submits
  const handleClaimClick = (item) => {
    if (item.isClaimed) return;
    setClaimingItem(item);
  };

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    setFlashDesigns(prev => prev.map(f => {
      if (f.id === claimingItem.id) {
        return { ...f, isClaimed: true };
      }
      return f;
    }));
    setClaimSuccess(true);
    setClaimingItem(null);
  };

  // Form Submissions
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.honeypot) return; // silent bot block
    setContactSuccess(true);
  };

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setConsultSuccess(true);
  };

  const faqData = [
    { q: "What is your deposit policy?", a: "We require a 50% non-refundable but transferable deposit to secure any appointment. This goes directly toward the final price of your tattoo session. Rescheduling requires 48 hours notice to preserve the deposit." },
    { q: "Are you booking custom designs or only flash?", a: "We book both! Flash designs are claimed instantly via the catalog below and tattooed only once. Custom projects require filling out the inquiry questionnaire to evaluate sizing, placement, and style alignment." },
    { q: "Do you offer touch-ups?", a: "Yes, touch-ups are complimentary within the first 3 months of receiving your tattoo to ensure it heals perfectly. After 3 months, they are billed at our standard hourly rate." },
    { q: "What are your studio hygiene standards?", a: "We operate a fully licensed private studio. We use 100% single-use disposable needles, tubes, and barriers. Our autoclave and sterilizers are spore-tested monthly, and we strictly exceed all municipal health codes." }
  ];

  return (
    <div className="premium-tattoo-body">
      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="premium-tattoo-nav-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* LUXURY NAVBAR */}
      <nav className="premium-tattoo-navbar">
        <div className="premium-tattoo-logo">Ink & Soul</div>
        
        <ul className={`premium-tattoo-nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#flash" className="premium-tattoo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Flash Catalogue</a></li>
          <li><a href="#portfolio" className="premium-tattoo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Curated Work</a></li>
          <li><a href="#rates" className="premium-tattoo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Investments</a></li>
          <li><a href="#story" className="premium-tattoo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>The Artist</a></li>
          <li><a href="#aftercare" className="premium-tattoo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Healing Guide</a></li>
          <li><a href="#faq" className="premium-tattoo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Studio Policies</a></li>
          <li><a href="#contact" className="premium-tattoo-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Bookings</a></li>
        </ul>

        <button className="premium-tattoo-mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle navigation menu">
          {isMobileMenuOpen ? <X size={20} /> : <Eye size={20} />}
        </button>
      </nav>

      {/* 1. HERO SECTION */}
      <header className="premium-tattoo-hero">
        <img 
          src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=1400&auto=format&fit=crop&q=80" 
          alt="Close up of a settled, healed geometric blackwork sleeve on skin" 
          className="premium-tattoo-hero-img"
        />
        <div className="premium-tattoo-hero-overlay animate-fade-in">
          <span className="premium-tattoo-hero-subtitle">Private Studio Chicago</span>
          <h1 className="premium-tattoo-hero-title">Made to Last, Made for You</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#flash" className="premium-tattoo-btn">Claim Flash</a>
            <a href="#contact" className="premium-tattoo-btn premium-tattoo-btn-outline">Book a Consult</a>
          </div>
        </div>
      </header>

      {/* 2. FLASH / AVAILABLE DESIGNS SECTION */}
      <section className="premium-tattoo-section" id="flash">
        <span className="premium-tattoo-sec-subtitle">Immediate Claims</span>
        <h2 className="premium-tattoo-sec-title">Available Flash Designs</h2>
        <p className="premium-tattoo-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          Pre-drawn designs ready to claim. Each custom flash artwork is tattooed exactly once. Claims require a 50% deposit.
        </p>

        {/* Style Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {['all', 'blackwork', 'traditional', 'fine-line'].map(style => (
            <button
              key={style}
              className={`premium-tattoo-filter-btn ${flashFilter === style ? 'active' : ''}`}
              onClick={() => setFlashFilter(style)}
              style={{ textTransform: 'capitalize' }}
            >
              {style === 'fine-line' ? 'Fine Line' : style}
            </button>
          ))}
        </div>

        {/* Flash Cards Grid */}
        <div className="premium-tattoo-flash-grid">
          {filteredFlash.map(item => (
            <div key={item.id} className="premium-tattoo-flash-card">
              <span className={`premium-tattoo-flash-badge ${item.isClaimed ? 'claimed' : 'available'}`}>
                {item.isClaimed ? 'Sold / Claimed' : 'Available'}
              </span>
              
              <div className="premium-tattoo-flash-img-wrap">
                <img src={item.img} alt={item.title} className="premium-tattoo-flash-img" />
              </div>

              <div className="premium-tattoo-flash-content">
                <h3 className="premium-tattoo-flash-title">{item.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '8px 0 16px' }}>
                  <span className="premium-tattoo-flash-price">{item.price}</span>
                  <span style={{ fontSize: '11px', color: 'var(--tattoo-text-muted)' }}>{item.size} • {item.placement}</span>
                </div>
                <button
                  className={`premium-tattoo-btn ${item.isClaimed ? 'premium-tattoo-btn-outline disabled' : ''}`}
                  disabled={item.isClaimed}
                  onClick={() => handleClaimClick(item)}
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {item.isClaimed ? 'claimed / Sold' : 'Claim This Design'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FLASH CLAIM MODAL */}
      {claimingItem && (
        <div className="premium-tattoo-modal-overlay" onClick={() => setClaimingItem(null)}>
          <div className="premium-tattoo-modal" onClick={(e) => e.stopPropagation()}>
            <button className="premium-tattoo-modal-close" onClick={() => setClaimingItem(null)}>
              <X size={20} />
            </button>
            <h3 className="premium-tattoo-serif" style={{ fontSize: '22px', color: 'var(--tattoo-accent)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Claim: {claimingItem.title}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--tattoo-text-muted)', marginBottom: '24px' }}>
              To lock this design, please provide your contact info and authorize the 50% booking deposit.
            </p>

            <form onSubmit={handleClaimSubmit} className="premium-tattoo-form" style={{ gridTemplateColumns: '1fr', gap: '16px' }}>
              <div className="premium-tattoo-form-group">
                <label className="premium-tattoo-label">Your Name</label>
                <input 
                  type="text" 
                  required 
                  className="premium-tattoo-input" 
                  placeholder="Claire Jenkins"
                  value={claimForm.name}
                  onChange={(e) => setClaimForm({ ...claimForm, name: e.target.value })}
                />
              </div>

              <div className="premium-tattoo-form-group">
                <label className="premium-tattoo-label">Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="premium-tattoo-input" 
                  placeholder="claire@example.com"
                  value={claimForm.email}
                  onChange={(e) => setClaimForm({ ...claimForm, email: e.target.value })}
                />
              </div>

              <div style={{ backgroundColor: '#131313', padding: '16px', border: '1px solid var(--tattoo-border)', fontSize: '11px', textAlign: 'left', color: 'var(--tattoo-text-muted)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Shield size={16} style={{ color: 'var(--tattoo-accent)', flexShrink: 0 }} />
                <span>Requires a <strong>50% deposit</strong>. Balance due upon completion of session in studio.</span>
              </div>

              <button type="submit" className="premium-tattoo-btn" style={{ marginTop: '8px' }}>
                Authorize Deposit & Book
              </button>
            </form>
          </div>
        </div>
      )}

      {claimSuccess && (
        <div className="premium-tattoo-modal-overlay">
          <div className="premium-tattoo-modal">
            <CheckCircle2 size={44} style={{ color: 'var(--tattoo-accent)', margin: '0 auto 16px' }} />
            <h3 className="premium-tattoo-serif" style={{ fontSize: '22px', marginBottom: '8px' }}>Design Secured!</h3>
            <p style={{ fontSize: '13px', color: 'var(--tattoo-text-muted)', lineHeight: 1.5, marginBottom: '24px' }}>
              Thank you! The design has been claimed and marked as sold. Look out for a deposit receipt and a booking scheduler link in your inbox.
            </p>
            <button className="premium-tattoo-btn" onClick={() => setClaimSuccess(false)}>
              Back to Studio
            </button>
          </div>
        </div>
      )}

      {/* 3. PORTFOLIO / GALLERY (HEALED PIECES PRIORITIZED) */}
      <section className="premium-tattoo-section" id="portfolio" style={{ backgroundColor: 'var(--tattoo-bg-card)', maxWidth: '100%', borderTop: '1px solid var(--tattoo-border)', borderBottom: '1px solid var(--tattoo-border)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <span className="premium-tattoo-sec-subtitle">Curated Gallery</span>
          <h2 className="premium-tattoo-sec-title">Healed Work</h2>
          
          <div className="premium-tattoo-gallery-tabs">
            {['blackwork', 'fine-line', 'traditional'].map(style => (
              <button
                key={style}
                className={`premium-tattoo-gallery-tab ${activeStyleTab === style ? 'active' : ''}`}
                onClick={() => setActiveStyleTab(style)}
              >
                {style === 'fine-line' ? 'Fine Line' : style}
              </button>
            ))}
          </div>

          <div className="premium-tattoo-gallery-grid">
            {filteredPortfolio.map((look, idx) => (
              <div 
                key={look.id} 
                className="premium-tattoo-gallery-item"
                onClick={() => handleOpenLightbox(idx)}
              >
                <img src={look.url} alt={look.desc} loading="lazy" className="premium-tattoo-gallery-img" />
                <div className="premium-tattoo-gallery-item-overlay">
                  <div style={{ width: '100%' }}>
                    <span className="premium-tattoo-gallery-tag" style={{ color: look.state === 'healed' ? 'var(--tattoo-accent)' : 'var(--tattoo-accent-rose)' }}>
                      ● {look.state}
                    </span>
                    <p className="premium-tattoo-gallery-desc">{look.desc}</p>
                    <small style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)' }}>{look.placement} • {look.size}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div className="premium-tattoo-lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <button className="premium-tattoo-lightbox-close" onClick={() => setLightboxImage(null)}>
            <X size={24} />
          </button>
          
          <button className="premium-tattoo-lightbox-nav prev" onClick={handlePrevImage}>
            <ChevronLeft size={30} />
          </button>
          
          <div className="premium-tattoo-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImage.url} alt={lightboxImage.desc} className="premium-tattoo-lightbox-img" />
            <div style={{ textAlign: 'left', width: '100%', maxWidth: '600px' }}>
              <span className="premium-tattoo-gallery-tag" style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', display: 'inline-block' }}>
                ● {lightboxImage.state}
              </span>
              <p className="premium-tattoo-lightbox-caption">{lightboxImage.desc}</p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '10px' }}>
                <strong style={{ fontSize: '12px', color: 'var(--tattoo-accent)' }}>Details:</strong>
                <p style={{ fontSize: '12px', color: '#dcd7d0', marginTop: '4px' }}>Placement: {lightboxImage.placement} | Sizing: {lightboxImage.size}</p>
              </div>
            </div>
          </div>
          
          <button className="premium-tattoo-lightbox-nav next" onClick={handleNextImage}>
            <ChevronRight size={30} />
          </button>
        </div>
      )}

      {/* 4. SERVICES & PRICING (NO DM FOR RATES) */}
      <section className="premium-tattoo-section" id="rates">
        <span className="premium-tattoo-sec-subtitle">Rates & Investment</span>
        <h2 className="premium-tattoo-sec-title">Transparent Pricing</h2>
        <p className="premium-tattoo-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          Tattooing is an investment in your skin. We bill transparently based on size, complexity, and session durations.
        </p>

        <div className="premium-tattoo-pricing-grid">
          {/* Path 1 */}
          <div className="premium-tattoo-price-card">
            <h3 className="premium-tattoo-price-title">Flash Catalogue</h3>
            <div className="premium-tattoo-price-rate">Flat Rates</div>
            <p className="premium-tattoo-price-desc">Designs claimed from the available catalogue. Priced individually based on layout sizing.</p>
            
            <ul className="premium-tattoo-price-features">
              <li>Priced between $250 - $600</li>
              <li>Tattooed exactly once</li>
              <li>Includes full aftercare pack</li>
              <li>Complimentary touch-up (3 months)</li>
              <li>50% booking deposit required</li>
            </ul>
            
            <a href="#flash" className="premium-tattoo-btn premium-tattoo-btn-outline" style={{ marginTop: '24px', width: '100%', textAlign: 'center' }}>Claim Flash</a>
          </div>

          {/* Path 2 - Custom */}
          <div className="premium-tattoo-price-card active">
            <span className="premium-tattoo-price-badge">Custom Art</span>
            <h3 className="premium-tattoo-price-title">Custom Design</h3>
            <div className="premium-tattoo-price-rate">$180 / Hour</div>
            <p className="premium-tattoo-price-desc">Unique designs drawn from scratch based on your custom themes, placement, and sizing.</p>
            
            <ul className="premium-tattoo-price-features">
              <li>Shop minimum: $150</li>
              <li>Includes 1-on-1 design consult</li>
              <li>Custom stencils built on skin shape</li>
              <li>50% deposit required to book slots</li>
              <li>Rescheduling requires 48hr notice</li>
            </ul>
            
            <a href="#contact" className="premium-tattoo-btn" style={{ marginTop: '24px', width: '100%', textAlign: 'center' }}>Request Custom</a>
          </div>

          {/* Path 3 */}
          <div className="premium-tattoo-price-card">
            <h3 className="premium-tattoo-price-title">Cover-Up</h3>
            <div className="premium-tattoo-price-rate">$200 / Hour</div>
            <p className="premium-tattoo-price-desc">Specialized cover-up designs. Requires an in-person structural consultation beforehand.</p>
            
            <ul className="premium-tattoo-price-features">
              <li>Shop minimum: $250</li>
              <li>Mandatory 30-min consultation</li>
              <li>High-opacity pigment shading</li>
              <li>Laser-lightening referral if needed</li>
              <li>50% deposit required to book</li>
            </ul>
            
            <a href="#contact" className="premium-tattoo-btn premium-tattoo-btn-outline" style={{ marginTop: '24px', width: '100%', textAlign: 'center' }}>Request Cover-up</a>
          </div>
        </div>
      </section>

      {/* 5. ABOUT / STORY */}
      <section className="premium-tattoo-section" id="story" style={{ backgroundColor: 'var(--tattoo-bg-card)', maxWidth: '100%', borderTop: '1px solid var(--tattoo-border)', borderBottom: '1px solid var(--tattoo-border)' }}>
        <div className="premium-tattoo-story-wrapper">
          <div className="premium-tattoo-story-grid">
            <div className="premium-tattoo-story-content">
              <span className="premium-tattoo-sec-subtitle" style={{ textAlign: 'left', display: 'block', marginBottom: '16px' }}>The Artist</span>
              <h2 className="premium-tattoo-story-title">Crafted by Marcus</h2>
              <p className="premium-tattoo-story-text">
                I don't just put ink on skin. I listen to what you want to carry. After a six-year classical fine-arts training, I turned to tattooing as a medium to mark memory permanently.
              </p>
              <p className="premium-tattoo-story-text">
                We operate a strict, private, licensed studio in Chicago. Our studio exceeding all municipal health codes, maintaining a quiet, gallery-like workspace for your comfort and safety.
              </p>
              <a href="#contact" className="premium-tattoo-btn premium-tattoo-btn-dark" style={{ marginTop: '16px' }}>Share Your Concept</a>
            </div>
            <div className="premium-tattoo-story-img-wrap">
              <img 
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&auto=format&fit=crop&q=80" 
                alt="Tattoo artist focusing at work table in private studio" 
                className="premium-tattoo-story-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROCESS & AFTERCARE TIMELINE */}
      <section className="premium-tattoo-section" id="aftercare">
        <span className="premium-tattoo-sec-subtitle">Healing & Recovery</span>
        <h2 className="premium-tattoo-sec-title">The Aftercare Guide</h2>
        <p className="premium-tattoo-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          tattoos are permanent. How you treat your skin during the first 30 days determines its lifetime quality.
        </p>

        <div className="premium-tattoo-process-grid">
          <div className="premium-tattoo-process-card">
            <span className="premium-tattoo-process-num">01</span>
            <h3 className="premium-tattoo-process-title">First 4 Hours</h3>
            <p className="premium-tattoo-process-desc">Keep the artist's wrap on. Once removed, wash gently with warm water and fragrance-free antibacterial soap. Pat dry.</p>
          </div>
          
          <div className="premium-tattoo-process-card">
            <span className="premium-tattoo-process-num">02</span>
            <h3 className="premium-tattoo-process-title">Days 2 - 4</h3>
            <p className="premium-tattoo-process-desc">Apply a very thin layer of tattoo ointment (Aquaphor) twice daily. Do not soak in water or swim.</p>
          </div>

          <div className="premium-tattoo-process-card">
            <span className="premium-tattoo-process-num">03</span>
            <h3 className="premium-tattoo-process-title">Days 5 - 14</h3>
            <p className="premium-tattoo-process-desc">The skin will peel and flake like a sunburn. Do NOT pick or scratch the scabs. Apply fragrance-free lotion.</p>
          </div>

          <div className="premium-tattoo-process-card">
            <span className="premium-tattoo-process-num">04</span>
            <h3 className="premium-tattoo-process-title">Week 3+ Healed</h3>
            <p className="premium-tattoo-process-desc">Deep layers are healed. Protect your tattoo from fading by applying SPF 30+ whenever exposed to sun.</p>
          </div>
        </div>
      </section>

      {/* 7. POLICIES & FAQ SECTION */}
      <section className="premium-tattoo-section" id="faq" style={{ borderTop: '1px solid var(--tattoo-border)', borderBottom: '1px solid var(--tattoo-border)', backgroundColor: 'var(--tattoo-bg-card)', maxWidth: '100%' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
          <span className="premium-tattoo-sec-subtitle">Studio Protocols</span>
          <h2 className="premium-tattoo-sec-title">FAQ & Policies</h2>
          
          <div className="premium-tattoo-faq-list" style={{ marginTop: '48px' }}>
            {faqData.map((faq, idx) => (
              <div key={idx} className="premium-tattoo-faq-item" style={{ borderBottom: '1px solid var(--tattoo-border)', paddingBottom: '16px', marginBottom: '16px' }}>
                <button
                  className="premium-tattoo-faq-trigger"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{ display: 'flex', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', color: 'var(--tattoo-text)', cursor: 'pointer', textAlign: 'left', fontWeight: 'bold', fontSize: '16px' }}
                >
                  <span>{faq.q}</span>
                  <span>{activeFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
                </button>
                {activeFaq === idx && (
                  <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--tattoo-text-muted)', lineHeight: 1.6 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BOOKING / CONTACT */}
      <section className="premium-tattoo-section" id="contact">
        <span className="premium-tattoo-sec-subtitle">Custom request</span>
        <h2 className="premium-tattoo-sec-title">Submit Concept</h2>
        <p className="premium-tattoo-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          Please complete the request details below. Marcus will review and reach out with a booking proposal.
        </p>

        <div className="premium-tattoo-contact-wrapper">
          {!contactSuccess ? (
            <form onSubmit={handleContactSubmit} className="premium-tattoo-form">
              <div className="premium-tattoo-form-group">
                <label className="premium-tattoo-label">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Claire Jenkins" 
                  className="premium-tattoo-input"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>

              <div className="premium-tattoo-form-group">
                <label className="premium-tattoo-label">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="claire@example.com" 
                  className="premium-tattoo-input"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>

              <div className="premium-tattoo-form-group">
                <label className="premium-tattoo-label">Style Preference</label>
                <select 
                  className="premium-tattoo-input"
                  value={contactForm.style}
                  onChange={(e) => setContactForm({ ...contactForm, style: e.target.value })}
                >
                  <option value="blackwork">Blackwork Geometry</option>
                  <option value="traditional">Neo-Traditional Color</option>
                  <option value="fine-line">Fine Line Minimalist</option>
                </select>
              </div>

              <div className="premium-tattoo-form-group">
                <label className="premium-tattoo-label">Body Placement</label>
                <input 
                  type="text" 
                  required
                  placeholder="Forearm / Sternum" 
                  className="premium-tattoo-input"
                  value={contactForm.placement}
                  onChange={(e) => setContactForm({ ...contactForm, placement: e.target.value })}
                />
              </div>

              <div className="premium-tattoo-form-group">
                <label className="premium-tattoo-label">Approx Size (Inches)</label>
                <input 
                  type="text" 
                  required
                  placeholder="5x5 in" 
                  className="premium-tattoo-input"
                  value={contactForm.size}
                  onChange={(e) => setContactForm({ ...contactForm, size: e.target.value })}
                />
              </div>

              <div className="premium-tattoo-form-group">
                <label className="premium-tattoo-label">Estimated Budget</label>
                <select 
                  className="premium-tattoo-input"
                  value={contactForm.budget}
                  onChange={(e) => setContactForm({ ...contactForm, budget: e.target.value })}
                >
                  <option value="150-400">$150 - $400 (Small Flash)</option>
                  <option value="400-800">$400 - $800 (Medium Session)</option>
                  <option value="800+">$800+ (Large / Full Day)</option>
                </select>
              </div>

              <div className="premium-tattoo-form-group" style={{ gridColumn: 'span 2' }}>
                <label className="premium-tattoo-label">Describe Your Concept Details</label>
                <textarea 
                  required
                  placeholder="Share details about theme, shading preference, and references..."
                  className="premium-tattoo-input"
                  style={{ minHeight: '120px', resize: 'vertical' }}
                  value={contactForm.details}
                  onChange={(e) => setContactForm({ ...contactForm, details: e.target.value })}
                />
              </div>

              {/* Honeypot */}
              <div className="premium-tattoo-form-group premium-tattoo-hidden-field">
                <input 
                  type="text" 
                  tabIndex="-1" 
                  value={contactForm.honeypot}
                  onChange={(e) => setContactForm({ ...contactForm, honeypot: e.target.value })}
                />
              </div>

              <button type="submit" className="premium-tattoo-btn" style={{ gridColumn: 'span 2', marginTop: '16px' }}>
                Submit Custom Inquiry
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 size={44} style={{ color: 'var(--tattoo-accent)' }} />
              </div>
              <h3 className="premium-tattoo-serif" style={{ fontSize: '24px', marginBottom: '12px' }}>
                Inquiry Received
              </h3>
              <p style={{ color: 'var(--tattoo-text-muted)', fontSize: '14px', maxWidth: '480px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                Thank you, <strong>{contactForm.name}</strong>. Marcus has logged your custom request details. Let's schedule your 15-minute consultation slot below to discuss.
              </p>

              {/* Simulated Calendly booking widget */}
              {!consultSuccess ? (
                <div className="premium-tattoo-calendar-booking-card">
                  <h4 className="premium-tattoo-serif" style={{ fontSize: '18px', color: 'var(--tattoo-accent)', marginBottom: '16px' }}>
                    📅 Schedule Consultation Call
                  </h4>
                  <form onSubmit={handleConsultSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                    <div className="premium-tattoo-form-group" style={{ width: '160px' }}>
                      <input 
                        type="date" 
                        required 
                        className="premium-tattoo-input" 
                        value={consultDate} 
                        onChange={(e) => setConsultDate(e.target.value)} 
                      />
                    </div>
                    <div className="premium-tattoo-form-group" style={{ width: '140px' }}>
                      <select 
                        className="premium-tattoo-input" 
                        value={consultTime} 
                        onChange={(e) => setConsultTime(e.target.value)}
                      >
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="18:30">06:30 PM</option>
                      </select>
                    </div>
                    <button type="submit" className="premium-tattoo-btn premium-tattoo-btn-sm">
                      Book Slot
                    </button>
                  </form>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', backgroundColor: '#131313', border: '1px solid var(--tattoo-accent)', padding: '12px 20px', maxWidth: '400px', margin: '0 auto', color: 'var(--tattoo-accent)', fontSize: '13px' }}>
                  <CheckCircle2 size={16} />
                  <span>Consultation confirmed for <strong>{consultDate}</strong> at <strong>{consultTime}</strong>! Look out for a calendar invite.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="premium-tattoo-footer">
        <div className="premium-tattoo-footer-content">
          <div className="premium-tattoo-footer-left">
            <div className="premium-tattoo-logo" style={{ fontSize: '22px', marginBottom: '12px' }}>Ink & Soul</div>
            <p style={{ fontSize: '13px', color: 'var(--tattoo-text-muted)', maxWidth: '280px' }}>
              Custom blackwork and fine line tattoo designs. Exclusively healing-prioritized private studio.
            </p>
          </div>
          
          <div className="premium-tattoo-footer-right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="premium-tattoo-label" style={{ color: 'var(--tattoo-text-muted)' }}>Quick Inquiries</span>
              <a href="tel:+13125550187" style={{ fontSize: '15px', color: 'inherit', fontWeight: 'bold' }}>+1 (312) 555-0187</a>
              <a href="https://wa.me/13125550187" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: 'var(--tattoo-text-muted)' }}>WhatsApp Chat</a>
              <a href="mailto:hello@inksoulstudio.com" style={{ fontSize: '13px', color: 'var(--tattoo-text-muted)' }}>hello@inksoulstudio.com</a>
            </div>
            
            <div className="premium-tattoo-footer-links" style={{ marginTop: '24px' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="premium-tattoo-footer-link">Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="premium-tattoo-footer-link">TikTok</a>
            </div>
          </div>
        </div>

        <div className="premium-tattoo-footer-copy">
          &copy; {new Date().getFullYear()} Ink & Soul Studio. Private Body Art Documentation. Chicago & Guest Spots.
        </div>
      </footer>
    </div>
  );
}
