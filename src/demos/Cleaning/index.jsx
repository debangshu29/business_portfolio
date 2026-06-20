import { useState, useEffect } from 'react';
import './cleaning.css';

/* ── Inline SVG icons (thin line, consistent weight) ── */

const BrushIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="clean-service-icon">
    <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.48 1 3.5 1 1.96 0 3.5-1.54 3.5-3.5 0-1.67-1.35-3.04-3-3.04z" />
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="clean-service-icon">
    <path d="M12 3l1.88 5.76L20 10l-5.76 1.88L12 18l-1.88-5.76L4 10l5.76-1.88z" />
    <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
  </svg>
);

const DoorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="clean-service-icon">
    <path d="M3 21h18" />
    <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    <circle cx="14.5" cy="12" r="0.5" fill="currentColor" />
  </svg>
);

const RepeatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="clean-service-icon">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CheckBadgeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M9 12l2 2 4-4" />
    <path d="M12 2l2.09 4.24L18.5 7.5l-3.41 3.3.82 4.7L12 13.25l-3.91 2.25.82-4.7L5.5 7.5l4.41-1.26z" />
  </svg>
);

const StarBadgeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8l1.09 3.36L16.5 12l-3.41 1-1.09 3-1.09-3L7.5 12l3.41-1.64z" />
  </svg>
);

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <path d="M2 22c0-5.52 3.14-10.3 7.78-12.66C11.44 2.54 18.5 2 22 2c0 5.27-3.05 9.86-7.56 12.19C12.88 21.46 7.56 22 2 22z" />
    <path d="M2 22 12 12" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CalendarCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M9 16l2 2 4-4" />
  </svg>
);

const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="M9 12h6M9 16h4" />
  </svg>
);

const SprayIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M3 3h6v6H3zM14 3h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2V3z" />
    <path d="M8 6h6M9 9v12H7V9M17 7l2 12H15L13 9" />
    <circle cx="20" cy="6" r="1" fill="currentColor" /><circle cx="22" cy="4" r="1" fill="currentColor" /><circle cx="22" cy="8" r="1" fill="currentColor" />
  </svg>
);

const SofaIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
    <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
    <path d="M2 11a2 2 0 0 1 2-2 2 2 0 0 1 2 2v1h12v-1a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" />
    <path d="M4 18v2M20 18v2" />
  </svg>
);

const ChevronIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`clean-faq-chevron ${className || ''}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Data ── */

const services = [
  {
    icon: <BrushIcon />,
    name: 'Regular Cleaning',
    desc: 'Routine maintenance to keep your home consistently fresh. Dusting, vacuuming, mopping, kitchen, and bathrooms — all handled with care.',
    price: 'From $89',
  },
  {
    icon: <SparklesIcon />,
    name: 'Deep Cleaning',
    desc: 'A thorough, top-to-bottom clean that reaches every corner. Ideal for seasonal refreshes or homes that need extra attention.',
    price: 'From $149',
  },
  {
    icon: <DoorIcon />,
    name: 'Move-In / Move-Out',
    desc: 'Pristine spaces for fresh beginnings. We handle every detail so you can focus on your move, not the mess left behind.',
    price: 'From $199',
  },
  {
    icon: <RepeatIcon />,
    name: 'Recurring Plans',
    desc: 'Weekly, bi-weekly, or monthly visits with the same trusted team. Consistent care, automatic scheduling, up to 20% off.',
    price: 'From $79 / visit',
  },
];

const processSteps = [
  {
    num: '01',
    icon: <CalendarCheckIcon />,
    title: 'Book Online',
    desc: 'Choose your service, size, and preferred time in under 2 minutes. No phone call required.',
  },
  {
    num: '02',
    icon: <ClipboardIcon />,
    title: 'Confirm Details',
    desc: "We'll reach out to confirm specifics and any special requests before your appointment.",
  },
  {
    num: '03',
    icon: <SprayIcon />,
    title: 'We Clean',
    desc: 'Your trusted team arrives on time, fully equipped, and gets to work with quiet precision.',
  },
  {
    num: '04',
    icon: <SofaIcon />,
    title: 'You Relax',
    desc: 'Come home to calm. Everything in its place. We lock up when we are done.',
  },
];

const trustItems = [
  {
    icon: <ShieldIcon />,
    label: 'Insured & Bonded',
    desc: 'Fully insured with liability coverage. Your home and belongings are always protected.',
  },
  {
    icon: <CheckBadgeIcon />,
    label: 'Background Checked',
    desc: 'Every team member is thoroughly vetted, background-checked, and professionally trained.',
  },
  {
    icon: <StarBadgeIcon />,
    label: 'Satisfaction Guaranteed',
    desc: "If anything falls short, we return within 24 hours to make it right — no questions asked.",
  },
  {
    icon: <LeafIcon />,
    label: 'Eco-Friendly Products',
    desc: 'Plant-based, non-toxic formulas. Safe for your family, your pets, and the planet.',
  },
];

const reviews = [
  {
    quote: "I came home to a space that felt like a luxury hotel. Every surface gleamed. I genuinely exhaled when I walked through the door.",
    name: 'Sarah M.',
    loc: 'Upper West Side, NY',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80',
  },
  {
    quote: "After years of trying different cleaners, Spotless & Co. is the first team I've actually trusted in my home. Meticulous, discreet, and genuinely wonderful.",
    name: 'James T.',
    loc: 'Brooklyn Heights, NY',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
  },
  {
    quote: "The booking process was effortless, and the result exceeded every expectation. My kitchen has never looked this clean — and I didn't lift a finger.",
    name: 'Priya K.',
    loc: 'Tribeca, NY',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
  },
];

const teamMembers = [
  {
    name: 'Maria S.',
    role: 'Lead Cleaner',
    bio: '8 years of experience. Known for extraordinary attention to detail and gentle care with delicate surfaces.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'David L.',
    role: 'Deep Clean Specialist',
    bio: 'Expert in move-out and post-renovation cleaning. Quiet, efficient, and thorough in every corner.',
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80',
  },
  {
    name: 'Aisha R.',
    role: 'Eco Care Specialist',
    bio: 'Certified in green cleaning practices. Passionate about safe, sustainable products and calm homes.',
    photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&auto=format&fit=crop&q=80',
  },
];

const cities = [
  'Manhattan', 'Brooklyn', 'Queens', 'The Bronx',
  'Hoboken', 'Jersey City', 'Astoria', 'Long Island City',
  'Williamsburg', 'Park Slope', 'Tribeca', 'DUMBO',
];

const faqs = [
  {
    q: 'Do I need to be home during the cleaning?',
    a: "Not at all. Most of our clients leave a key or provide a lockbox code. We treat your home with the same care and respect whether you're present or not. You'll receive a notification when we arrive and when we leave.",
  },
  {
    q: 'Are your cleaning products safe for pets and children?',
    a: 'Yes. We use only plant-based, non-toxic, eco-certified cleaning products that are safe for children, pets, and sensitive individuals. If you have specific product preferences, just let us know.',
  },
  {
    q: "What if I'm not satisfied with the cleaning?",
    a: "We have a 24-hour satisfaction guarantee. If anything doesn't meet your expectations, contact us and we'll return to make it right — at no additional charge, no questions asked.",
  },
  {
    q: 'How do I prepare for my first cleaning?',
    a: "Simply tidy away loose clutter so we can focus on the actual cleaning. You don't need to pre-clean before we arrive — that's our job. Just note any areas that need special attention in your booking form.",
  },
  {
    q: 'Will I have the same team on every visit?',
    a: 'Yes. For recurring plans, we assign you a dedicated team so they learn your preferences and your home over time. Consistency is part of the service.',
  },
  {
    q: 'How do you handle keys and home access?',
    a: "All keys are stored in a secure, coded lockbox and labeled without any identifying information linked to your address. You'll always know exactly when your team arrives and departs.",
  },
  {
    q: 'Do you bring your own supplies and equipment?',
    a: "Yes — we arrive fully equipped with professional-grade tools and eco-certified products. If you'd prefer we use your own supplies for any reason, just note it in your booking and we'll accommodate.",
  },
];

const validZips = new Set([
  '10001','10002','10003','10004','10005','10006','10007',
  '10009','10010','10011','10012','10013','10014','10016',
  '10017','10018','10019','10020','10021','10022','10023',
  '10024','10025','10026','10027','10028','10029','11201',
  '11211','11215','11217','11231','07030','07302','07306',
]);

/* ── Price calculator ── */

const calcQuote = ({ bedrooms, bathrooms, serviceType, frequency }) => {
  const base  = { regular: 89, deep: 149, moveout: 199, recurring: 79 };
  const bdr   = { regular: 25, deep: 35,  moveout: 40,  recurring: 20 };
  const bth   = { regular: 20, deep: 30,  moveout: 35,  recurring: 18 };
  const disc  = { onetime: 0,  weekly: 0.2, biweekly: 0.15, monthly: 0.10 };
  const total = Math.round((base[serviceType] + bdr[serviceType] * bedrooms + bth[serviceType] * bathrooms) * (1 - (disc[frequency] || 0)));
  return { low: Math.round(total * 0.9), high: Math.round(total * 1.1) };
};

/* ── Main component ── */

export default function CleanHome() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [quoteStep, setQuoteStep]           = useState(1);
  const [quoteData, setQuoteData]           = useState({ bedrooms: 2, bathrooms: 1, serviceType: 'regular', frequency: 'biweekly' });
  const [openFaq, setOpenFaq]               = useState(null);
  const [activeReview, setActiveReview]     = useState(0);
  const [zipCode, setZipCode]               = useState('');
  const [zipResult, setZipResult]           = useState(null);
  const [footerEmail, setFooterEmail]       = useState('');
  const [formData, setFormData]             = useState({ name:'', email:'', phone:'', address:'', service:'', date:'', message:'', honeypot:'' });
  const [formSubmitted, setFormSubmitted]   = useState(false);
  const [baValues, setBaValues]             = useState([50, 50, 50, 50]);

  /* Scroll detection — listens on the nearest scrollable parent (.demo-viewport)
     so the sticky nav gets its shadow as the user scrolls within the demo frame */
  useEffect(() => {
    const scrollEl = document.querySelector('.demo-viewport') || window;
    const fn = () => {
      const top = scrollEl === window ? scrollEl.scrollY : scrollEl.scrollTop;
      setScrolled(top > 48);
    };
    scrollEl.addEventListener('scroll', fn, { passive: true });
    return () => scrollEl.removeEventListener('scroll', fn);
  }, []);

  /* Auto-rotate reviews */
  useEffect(() => {
    const id = setInterval(() => setActiveReview(p => (p + 1) % reviews.length), 8000);
    return () => clearInterval(id);
  }, []);

  /* Smooth scroll helper */
  const goTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  /* Zip checker */
  const checkZip = () => {
    if (zipCode.length === 5) setZipResult(validZips.has(zipCode) ? 'yes' : 'no');
  };

  /* Form submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.honeypot) return;
    const leads = JSON.parse(localStorage.getItem('spotless_leads') || '[]');
    leads.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('spotless_leads', JSON.stringify(leads));
    setFormSubmitted(true);
  };

  const resetQuote = () => {
    setQuoteStep(1);
    setQuoteData({ bedrooms: 2, bathrooms: 1, serviceType: 'regular', frequency: 'biweekly' });
  };

  const quote = calcQuote(quoteData);

  /* Frequency labels for result display */
  const freqLabel = { onetime: 'one-time', weekly: 'weekly', biweekly: 'bi-weekly', monthly: 'monthly' };
  const svcLabel  = { regular: 'regular', deep: 'deep clean', moveout: 'move-out', recurring: 'recurring' };

  /* ── JSX ── */
  return (
    <div className="cleaning-root">

      {/* ── NAVIGATION ── */}
      <nav className={`clean-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="clean-nav-inner">
          <div className="clean-logo">Spotless<span>&</span>Co.</div>

          <div className="clean-nav-links">
            {[['services','Services'],['pricing','Pricing'],['process','How It Works'],['reviews','Reviews'],['contact','Contact']].map(([id, label]) => (
              <button key={id} className="clean-nav-link" onClick={() => goTo(id)}>{label}</button>
            ))}
          </div>

          <button className="clean-nav-cta" onClick={() => goTo('contact')}>Get a Quote</button>

          <button className="clean-hamburger" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="clean-mobile-menu open">
          <button className="clean-mobile-close" onClick={() => setMobileOpen(false)}>×</button>
          {[['services','Services'],['pricing','Pricing'],['process','How It Works'],['reviews','Reviews'],['contact','Contact']].map(([id, label]) => (
            <button key={id} className="clean-mobile-link" onClick={() => goTo(id)}>{label}</button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section className="clean-hero">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&auto=format&fit=crop&q=70"
          alt="Beautifully clean, sunlit living room"
          className="clean-hero-bg"
          loading="lazy"
        />
        <div className="clean-hero-overlay" />
        <div className="clean-hero-content">
          <span className="clean-tag">Premium House Cleaning · New York</span>
          <h1 className="clean-hero-title">
            Come home<br />to <em>calm.</em>
          </h1>
          <p className="clean-hero-sub">
            Your home, thoughtfully cared for by a trusted, background-checked team. Eco-friendly products. Satisfaction guaranteed.
          </p>
          <div className="clean-hero-actions">
            <button className="clean-btn-primary" onClick={() => goTo('pricing')}>
              Get Instant Quote
            </button>
            <button className="clean-btn-ghost" onClick={() => goTo('process')}>
              How It Works
            </button>
          </div>
          <div className="clean-hero-stats">
            {[['500+','Homes cleaned'],['4.9 ★','Average rating'],['100%','Satisfaction rate']].map(([num, label]) => (
              <div key={label}>
                <span className="clean-stat-num">{num}</span>
                <div className="clean-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="clean-section clean-bg-warm">
        <div className="clean-container">
          <div className="clean-services-header">
            <div>
              <span className="clean-tag">What We Offer</span>
              <h2 className="clean-h2">Every home is different.<br />Every clean is personal.</h2>
            </div>
            <p className="clean-sub" style={{ maxWidth: 340 }}>
              Four service levels, one standard of exceptional care.
            </p>
          </div>
          <div className="clean-services-grid">
            {services.map((s, i) => (
              <div key={i} className="clean-service-card">
                {s.icon}
                <h3 className="clean-service-name">{s.name}</h3>
                <p className="clean-service-desc">{s.desc}</p>
                <span className="clean-service-price">{s.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTANT QUOTE ── */}
      <section id="pricing" className="clean-section clean-bg-light">
        <div className="clean-container">
          <div className="clean-quote-layout">
            {/* Left: intro */}
            <div className="clean-quote-intro">
              <span className="clean-tag">Instant Pricing</span>
              <h2 className="clean-h2">Know your price before you book.</h2>
              <p className="clean-sub">
                No hidden fees. No phone call required. A clear, honest estimate in under a minute.
              </p>
              <ul className="clean-quote-bullets">
                <li>No commitment until you confirm</li>
                <li>Prices lock in at the time of booking</li>
                <li>Free rescheduling, always</li>
                <li>Recurring plan discounts up to 20%</li>
              </ul>
            </div>

            {/* Right: calculator */}
            <div className="clean-quote-card">
              {/* Progress dots */}
              <div className="clean-quote-progress">
                {[1,2,3].map(n => (
                  <div key={n} className={`clean-quote-pip${quoteStep >= n ? ' done' : ''}`} />
                ))}
              </div>

              {/* Step 1: Home size */}
              {quoteStep === 1 && (
                <>
                  <div className="clean-quote-step-label">Step 1 of 3 — Home Size</div>

                  <label className="clean-quote-field-label">Bedrooms</label>
                  <div className="clean-quote-options">
                    {[1,2,3,4].map(n => (
                      <button
                        key={n}
                        className={`clean-quote-opt${quoteData.bedrooms === n ? ' sel' : ''}`}
                        onClick={() => setQuoteData(d => ({ ...d, bedrooms: n }))}
                      >
                        {n === 4 ? '4+' : n} {n === 1 ? 'Bed' : 'Beds'}
                      </button>
                    ))}
                  </div>

                  <label className="clean-quote-field-label">Bathrooms</label>
                  <div className="clean-quote-options">
                    {[1,2,3].map(n => (
                      <button
                        key={n}
                        className={`clean-quote-opt${quoteData.bathrooms === n ? ' sel' : ''}`}
                        onClick={() => setQuoteData(d => ({ ...d, bathrooms: n }))}
                      >
                        {n === 3 ? '3+' : n} {n === 1 ? 'Bath' : 'Baths'}
                      </button>
                    ))}
                  </div>

                  <button className="clean-quote-next-btn" onClick={() => setQuoteStep(2)}>
                    Continue →
                  </button>
                </>
              )}

              {/* Step 2: Service & Frequency */}
              {quoteStep === 2 && (
                <>
                  <div className="clean-quote-step-label">Step 2 of 3 — Service & Frequency</div>

                  <label className="clean-quote-field-label">Service Type</label>
                  <div className="clean-quote-options">
                    {[{k:'regular',l:'Regular'},{k:'deep',l:'Deep Clean'},{k:'moveout',l:'Move-Out'},{k:'recurring',l:'Recurring'}].map(({k,l}) => (
                      <button
                        key={k}
                        className={`clean-quote-opt${quoteData.serviceType === k ? ' sel' : ''}`}
                        onClick={() => setQuoteData(d => ({ ...d, serviceType: k }))}
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  <label className="clean-quote-field-label">Frequency</label>
                  <div className="clean-quote-options">
                    {[{k:'onetime',l:'One-time'},{k:'weekly',l:'Weekly −20%'},{k:'biweekly',l:'Bi-weekly −15%'},{k:'monthly',l:'Monthly −10%'}].map(({k,l}) => (
                      <button
                        key={k}
                        className={`clean-quote-opt${quoteData.frequency === k ? ' sel' : ''}`}
                        onClick={() => setQuoteData(d => ({ ...d, frequency: k }))}
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  <div className="clean-quote-btn-row">
                    <button className="clean-quote-back-btn" onClick={() => setQuoteStep(1)}>← Back</button>
                    <button className="clean-quote-next-btn" onClick={() => setQuoteStep(3)}>See My Price →</button>
                  </div>
                </>
              )}

              {/* Step 3: Result */}
              {quoteStep === 3 && (
                <div className="clean-quote-result">
                  <div className="clean-quote-step-label">Your Estimate</div>
                  <div className="clean-result-label">Estimated price range</div>
                  <div className="clean-result-price">${quote.low}–${quote.high}</div>
                  <div className="clean-result-note">
                    {quoteData.bedrooms} bed · {quoteData.bathrooms} bath · {svcLabel[quoteData.serviceType]} · {freqLabel[quoteData.frequency]}
                    {quoteData.frequency !== 'onetime' && ' · discount applied'}
                  </div>
                  <button className="clean-result-book" onClick={() => goTo('contact')}>
                    Book This Clean
                  </button>
                  <button className="clean-result-reset" onClick={resetQuote}>
                    Start over
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="clean-section clean-bg-warm">
        <div className="clean-container">
          <div className="clean-process-header">
            <span className="clean-tag">How It Works</span>
            <h2 className="clean-h2">Four steps to a cleaner home.</h2>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="clean-process-line" />
            <div className="clean-process-grid">
              {processSteps.map((step, i) => (
                <div key={i} className="clean-process-step">
                  <span className="clean-process-step-num">{step.num}</span>
                  <div className="clean-process-icon-wrap">{step.icon}</div>
                  <h3 className="clean-process-title">{step.title}</h3>
                  <p className="clean-process-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ── */}
      <section className="clean-section clean-bg-light">
        <div className="clean-container">
          <div className="clean-trust-header">
            <span className="clean-tag">Our Promise</span>
            <h2 className="clean-h2">Trust is earned, not assumed.</h2>
          </div>
          <div className="clean-trust-grid">
            {trustItems.map((item, i) => (
              <div key={i} className="clean-trust-item">
                <div className="clean-trust-icon">{item.icon}</div>
                <div className="clean-trust-label">{item.label}</div>
                <p className="clean-trust-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE & AFTER ── */}
      <section className="clean-section clean-bg-warm">
        <div className="clean-container">
          <div className="clean-ba-header">
            <span className="clean-tag">Real Results</span>
            <h2 className="clean-h2">See the difference we make.</h2>
            <p className="clean-sub" style={{ margin: '0 auto', textAlign: 'center' }}>
              Drag the handle left or right to reveal before and after each clean.
            </p>
          </div>
          <div className="clean-ba-grid">
            {[
              {
                room: 'Kitchen',
                service: 'Deep Clean',
                before: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=75',
                after:  'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&auto=format&fit=crop&q=75',
              },
              {
                room: 'Living Room',
                service: 'Regular Clean',
                before: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop&q=75',
                after:  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=75',
              },
              {
                room: 'Bathroom',
                service: 'Move-Out Clean',
                before: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop&q=75',
                after:  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&fit=crop&q=75',
              },
              {
                room: 'Bedroom',
                service: 'Recurring Plan',
                before: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=75',
                after:  'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&auto=format&fit=crop&q=75',
              },
            ].map((item, idx) => (
              <div key={idx} className="clean-ba-card">
                <div className="clean-ba-slider">
                  <div className="clean-ba-slider-track">
                    {/* After image (full width, always visible underneath) */}
                    <img src={item.after} alt={`${item.room} after cleaning`} className="clean-ba-img-after" />
                    {/* Before image clipped by slider value */}
                    <div
                      className="clean-ba-img-before-wrap"
                      style={{ width: `${baValues[idx]}%` }}
                    >
                      <img
                        src={item.before}
                        alt={`${item.room} before cleaning`}
                        className="clean-ba-img-before"
                        style={{ width: `${10000 / baValues[idx]}%`, maxWidth: 'none' }}
                      />
                    </div>
                    {/* Divider line + handle */}
                    <div className="clean-ba-divider" style={{ left: `${baValues[idx]}%` }} />
                    <div className="clean-ba-handle" style={{ left: `${baValues[idx]}%` }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                        <polyline points="15 18 9 12 15 6" />
                        <polyline points="9 18 3 12 9 6" style={{ opacity: 0 }} />
                      </svg>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" style={{ transform: 'rotate(180deg)' }}>
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </div>
                    {/* Invisible range input for drag interaction */}
                    <input
                      type="range"
                      min="5" max="95"
                      value={baValues[idx]}
                      className="clean-ba-range"
                      onChange={e => {
                        const next = [...baValues];
                        next[idx] = Number(e.target.value);
                        setBaValues(next);
                      }}
                    />
                  </div>
                  <div className="clean-ba-labels">
                    <span className="clean-ba-label-before">Before</span>
                    <span className="clean-ba-label-after">After ✓</span>
                  </div>
                </div>
                <div className="clean-ba-card-info">
                  <div className="clean-ba-room">{item.room}</div>
                  <div className="clean-ba-service-tag">{item.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="reviews" className="clean-section clean-bg-warm">
        <div className="clean-container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="clean-tag">What Clients Say</span>
            <h2 className="clean-h2">The feeling says it all.</h2>
          </div>
          <div className="clean-reviews-wrap">
            <div className="clean-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="clean-star">★</span>
              ))}
            </div>
            <p className="clean-review-quote">"{reviews[activeReview].quote}"</p>
            <div className="clean-review-author">
              <img
                src={reviews[activeReview].avatar}
                alt={reviews[activeReview].name}
                className="clean-review-avatar"
              />
              <div>
                <div className="clean-review-name">{reviews[activeReview].name}</div>
                <div className="clean-review-loc">{reviews[activeReview].loc}</div>
              </div>
            </div>
            <div className="clean-review-dots">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  className={`clean-dot-btn${i === activeReview ? ' on' : ''}`}
                  onClick={() => setActiveReview(i)}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT / TEAM ── */}
      <section className="clean-section clean-bg-light">
        <div className="clean-container">
          <div className="clean-about-grid">
            <img
              src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=700&auto=format&fit=crop&q=80"
              alt="Spotless & Co. team member carefully cleaning"
              className="clean-about-img"
              loading="lazy"
            />
            <div>
              <span className="clean-tag">About Us</span>
              <h2 className="clean-h2">Who will be<br />in your home?</h2>
              <p className="clean-about-body">
                We know it is a deeply personal question. That is why we take it seriously.
              </p>
              <p className="clean-about-body">
                Every member of our team is background-checked, professionally trained, and chosen not just for their cleaning skills — but for their care, discretion, and respect for your space.
              </p>
              <p className="clean-about-body">
                Founded in 2018, we started with three cleaners and a simple belief: that a clean home is a form of care. We still believe that.
              </p>
              <p className="clean-about-meta">Founded 2018 · New York City · Locally Owned</p>

              <div className="clean-team-grid">
                {teamMembers.map((m, i) => (
                  <div key={i} className="clean-team-card">
                    <img src={m.photo} alt={m.name} className="clean-team-photo" loading="lazy" />
                    <div className="clean-team-info">
                      <div className="clean-team-name">{m.name}</div>
                      <div className="clean-team-role">{m.role}</div>
                      <p className="clean-team-bio">{m.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COVERAGE AREA ── */}
      <section className="clean-section clean-bg-warm">
        <div className="clean-container">
          <div className="clean-coverage-layout">
            <div>
              <span className="clean-tag">Coverage Area</span>
              <h2 className="clean-h2">We clean across<br />the city.</h2>
              <p className="clean-sub" style={{ marginBottom: 40 }}>
                Serving Manhattan, Brooklyn, Queens, The Bronx, and surrounding areas in New Jersey.
              </p>

              <div className="clean-zip-box">
                <div className="clean-zip-heading">Check if we serve your area</div>
                <div className="clean-zip-row">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="10001"
                    maxLength={5}
                    value={zipCode}
                    className="clean-zip-input"
                    onChange={e => {
                      setZipCode(e.target.value.replace(/\D/g,'').slice(0,5));
                      setZipResult(null);
                    }}
                    onKeyDown={e => e.key === 'Enter' && checkZip()}
                  />
                  <button className="clean-zip-go" onClick={checkZip}>Check</button>
                </div>
                {zipResult && (
                  <div className={`clean-zip-result ${zipResult}`}>
                    {zipResult === 'yes'
                      ? '✓ Great news — we service your area! Book online in minutes.'
                      : "✗ We're not in your area yet, but we're expanding. Drop your email and we'll notify you."}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="clean-coverage-right-head">Neighborhoods Served</div>
              <div className="clean-cities-grid">
                {cities.map((c, i) => (
                  <div key={i} className="clean-city">
                    <div className="clean-city-dot" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="clean-section clean-bg-light">
        <div className="clean-container">
          <div className="clean-faq-header">
            <span className="clean-tag">Questions</span>
            <h2 className="clean-h2">Everything you'd want to know.</h2>
          </div>
          <div className="clean-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="clean-faq-item">
                <button
                  className="clean-faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronIcon className={openFaq === i ? 'open' : ''} />
                </button>
                <div className={`clean-faq-body${openFaq === i ? ' open' : ''}`}>
                  <div className="clean-faq-body-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / BOOKING ── */}
      <section id="contact" className="clean-section clean-bg-warm">
        <div className="clean-container">
          <div className="clean-contact-layout">
            {/* Left: info */}
            <div className="clean-contact-info">
              <span className="clean-tag">Book a Clean</span>
              <h2 className="clean-h2">Ready to come<br />home to calm?</h2>
              <p className="clean-sub">
                Fill out the form and we'll confirm your booking within 2 hours. No payment required today.
              </p>
              <div className="clean-contact-links">
                <a href="tel:+12125550199" className="clean-contact-link">
                  <div className="clean-contact-icon"><PhoneIcon /></div>
                  <div>
                    <div className="clean-contact-link-title">Prefer to call?</div>
                    <div className="clean-contact-link-val">+1 (212) 555-0199</div>
                  </div>
                </a>
                <a href="https://wa.me/12125550199" className="clean-contact-link">
                  <div className="clean-contact-icon"><MessageIcon /></div>
                  <div>
                    <div className="clean-contact-link-title">WhatsApp us</div>
                    <div className="clean-contact-link-val">Message anytime</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div>
              {formSubmitted ? (
                <div className="clean-form-card">
                  <div className="clean-form-success">
                    <div className="clean-form-success-icon">🌿</div>
                    <h3>You're all set.</h3>
                    <p>
                      We'll confirm your booking within 2 hours.<br />
                      Check your email for next steps.
                    </p>
                  </div>
                </div>
              ) : (
                <form className="clean-form-card" onSubmit={handleSubmit} noValidate>
                  <h3 className="clean-form-title">Request a Booking</h3>
                  <div className="clean-form-grid">
                    <div className="clean-field">
                      <label className="clean-label">Full Name</label>
                      <input className="clean-input" placeholder="Jane Smith" required value={formData.name} onChange={e => setFormData(d => ({...d, name: e.target.value}))} />
                    </div>
                    <div className="clean-field">
                      <label className="clean-label">Email</label>
                      <input type="email" className="clean-input" placeholder="jane@example.com" required value={formData.email} onChange={e => setFormData(d => ({...d, email: e.target.value}))} />
                    </div>
                    <div className="clean-field">
                      <label className="clean-label">Phone</label>
                      <input type="tel" className="clean-input" placeholder="+1 (212) 555-0100" value={formData.phone} onChange={e => setFormData(d => ({...d, phone: e.target.value}))} />
                    </div>
                    <div className="clean-field">
                      <label className="clean-label">Preferred Date</label>
                      <input type="date" className="clean-input" value={formData.date} min={new Date().toISOString().split('T')[0]} onChange={e => setFormData(d => ({...d, date: e.target.value}))} />
                    </div>
                    <div className="clean-field full">
                      <label className="clean-label">Address</label>
                      <input className="clean-input" placeholder="123 Main St, New York, NY 10001" required value={formData.address} onChange={e => setFormData(d => ({...d, address: e.target.value}))} />
                    </div>
                    <div className="clean-field full">
                      <label className="clean-label">Service Type</label>
                      <select className="clean-select" required value={formData.service} onChange={e => setFormData(d => ({...d, service: e.target.value}))}>
                        <option value="">Select a service...</option>
                        <option value="regular">Regular Cleaning</option>
                        <option value="deep">Deep Cleaning</option>
                        <option value="moveout">Move-In / Move-Out</option>
                        <option value="recurring">Recurring Plan</option>
                      </select>
                    </div>
                    <div className="clean-field full">
                      <label className="clean-label">Additional Notes</label>
                      <textarea className="clean-textarea" placeholder="Pets, allergies, areas that need special attention..." value={formData.message} onChange={e => setFormData(d => ({...d, message: e.target.value}))} />
                    </div>
                    {/* Honeypot */}
                    <input tabIndex={-1} className="clean-honeypot" value={formData.honeypot} onChange={e => setFormData(d => ({...d, honeypot: e.target.value}))} />
                  </div>
                  <button type="submit" className="clean-form-submit">
                    Request My Booking
                  </button>
                  <p className="clean-form-note">
                    We'll confirm within 2 hours. No payment required today.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="clean-footer">
        <div className="clean-container">
          <div className="clean-footer-grid">
            {/* Brand */}
            <div>
              <div className="clean-footer-logo">Spotless<span>&</span>Co.</div>
              <p className="clean-footer-tagline">
                Premium house cleaning for New Yorkers who value their time, their home, and their peace of mind. Locally owned since 2018.
              </p>
              <div className="clean-footer-socials">
                {['IG','FB','TW','LI'].map(s => (
                  <a key={s} href="#" className="clean-footer-social">{s}</a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="clean-footer-col-title">Services</div>
              <ul className="clean-footer-links">
                {['Regular Cleaning','Deep Cleaning','Move-In / Move-Out','Recurring Plans','Gift Cards'].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="clean-footer-col-title">Company</div>
              <ul className="clean-footer-links">
                {['About Us','Our Team','Careers','Blog','Reviews'].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <div className="clean-footer-col-title">Stay Clean</div>
              <p className="clean-footer-email-label">
                Tips for a calmer, cleaner home — delivered monthly. No noise, just care.
              </p>
              <div className="clean-footer-email-form">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="clean-footer-email-input"
                  value={footerEmail}
                  onChange={e => setFooterEmail(e.target.value)}
                />
                <button
                  className="clean-footer-email-btn"
                  onClick={() => footerEmail && setFooterEmail('✓ Subscribed')}
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="clean-footer-bottom">
            <span className="clean-footer-copy">© 2026 Spotless & Co. All rights reserved.</span>
            <div className="clean-footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
