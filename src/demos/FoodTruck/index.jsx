import { useState } from 'react';
import { MapPin, Clock, ShoppingBag, Plus, Minus, Trash2, X, AlertCircle, Menu } from 'lucide-react';
import './foodtruck.css';

export default function SageAndSaltKitchen() {
  const getDefaultRouteDay = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].includes(today) ? today : 'Monday';
  };

  const [activeDay, setActiveDay] = useState(getDefaultRouteDay);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'vegan' | 'gf'

  // Pre-Order Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '', phone: '', pickupTime: '12:00', honeypot: '' });
  const [orderReceipt, setOrderReceipt] = useState(null);

  // Catering Inquiry State
  const [cateringForm, setCateringForm] = useState({ name: '', email: '', date: '', location: '', guests: '50', details: '', honeypot: '' });
  const [showCateringModal, setShowCateringModal] = useState(false);

  // Weekly Email subscription state
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Dynamic wait-time simulator based on cart size
  const itemCount = cart.reduce((count, item) => count + item.qty, 0);
  const waitTime = 12 + itemCount * 3; // base 12 mins + 3 mins per item

  const schedule = {
    Monday: { spot: "Soho Creative Plaza", address: "580 Broadway, Soho, NY", hours: "11:30 AM - 2:30 PM", coords: "geo:40.7247,-73.9987", mapText: "Soho Broadway Core" },
    Tuesday: { spot: "Financial District Commons", address: "85 Broad St, Financial District, NY", hours: "11:30 AM - 2:30 PM", coords: "geo:40.7042,-74.0116", mapText: "Wall Street Commons" },
    Wednesday: { spot: "Union Square Greenmarket", address: "Union Sq W & E 15th St, NY", hours: "11:30 AM - 3:00 PM", coords: "geo:40.7359,-73.9911", mapText: "Union Square Pavilion" },
    Thursday: { spot: "Hudson Yards West Plaza", address: "11th Ave & W 33rd St, NY", hours: "11:30 AM - 2:30 PM", coords: "geo:40.7540,-74.0022", mapText: "Hudson Yards Court" },
    Friday: { spot: "Dumbo Archway Plaza", address: "155 Water St, Brooklyn, NY", hours: "12:00 PM - 8:00 PM", coords: "geo:40.7029,-73.9898", mapText: "Dumbo Archway Core" },
    Saturday: { spot: "Brooklyn Flea / Williamsburg", address: "90 Kent Ave, Brooklyn, NY", hours: "11:30 AM - 6:00 PM", coords: "geo:40.7214,-73.9622", mapText: "Williamsburg Waterfront" }
  };

  const menuItems = [
    { 
      id: 1, 
      name: "Smoked Brisket Sliders", 
      category: "mains", 
      price: "$16", 
      rawPrice: 16.00, 
      emoji: "🍔",
      desc: "12-hour oak-smoked beef brisket, house pickled red onion, gold barbecue drizzle, served on toasted artisanal brioche buns.", 
      tags: ["Today's Special", "Nut-Free"], 
      isVeg: false, 
      isGF: false, 
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80" 
    },
    { 
      id: 2, 
      name: "Truffle Mushroom Tacos", 
      category: "mains", 
      price: "$14", 
      rawPrice: 14.00, 
      emoji: "🌮",
      desc: "Crispy wild chanterelles, black truffle emulsion, shaved red cabbage, served on warm, heritage heirloom corn tortillas.", 
      tags: ["Vegan Option", "Gluten-Free", "Vegetarian"], 
      isVeg: true, 
      isGF: true, 
      img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&auto=format&fit=crop&q=80" 
    },
    { 
      id: 3, 
      name: "Rosemary Parmesan Pommes", 
      category: "sides", 
      price: "$8", 
      rawPrice: 8.00, 
      emoji: "🍟",
      desc: "Double-fried hand-cut russet potatoes tossed in garden-harvested rosemary, aged parmigiano-reggiano, and grey sea salt.", 
      tags: ["Gluten-Free", "Vegetarian"], 
      isVeg: true, 
      isGF: true, 
      img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop&q=80" 
    },
    { 
      id: 4, 
      name: "Burnt Caramel Panna Cotta", 
      category: "desserts", 
      price: "$9", 
      rawPrice: 9.00, 
      emoji: "🍮",
      desc: "Creamy vanilla bean custard, toasted hazelnut crumble, dark caramel reduction, served in a reusable heritage glass jar.", 
      tags: ["Gluten-Free"], 
      isVeg: true, 
      isGF: true, 
      img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&auto=format&fit=crop&q=80" 
    },
    { 
      id: 5, 
      name: "Cold-Brew Espresso Horchata", 
      category: "drinks", 
      price: "$6", 
      rawPrice: 6.00, 
      emoji: "☕",
      desc: "House-pressed sweet almond rice milk, ceylon cinnamon, topped with a double float of single-origin organic cold brew.", 
      tags: ["Vegan", "Gluten-Free"], 
      isVeg: true, 
      isGF: true, 
      img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&auto=format&fit=crop&q=80" 
    }
  ];

  // Cart Handlers
  const handleAddToCart = (item) => {
    setCart(prevCart => {
      const exists = prevCart.find(i => i.id === item.id);
      if (exists) {
        return prevCart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (itemId, amount) => {
    setCart(prevCart => prevCart.map(i => {
      if (i.id === itemId) {
        const newQty = i.qty + amount;
        return newQty > 0 ? { ...i, qty: newQty } : i;
      }
      return i;
    }).filter(i => i.qty > 0));
  };

  const handleRemoveItem = (itemId) => {
    setCart(prevCart => prevCart.filter(i => i.id !== itemId));
  };

  // Calculations
  const getSubtotal = () => cart.reduce((sum, i) => sum + (i.rawPrice * i.qty), 0);
  const getTax = () => getSubtotal() * 0.0825; // 8.25% NY sales tax
  const getTotal = () => getSubtotal() + getTax();

  // Pre-Order Submission
  const handlePreOrderSubmit = (e) => {
    e.preventDefault();
    if (checkoutForm.honeypot) return; // bot filter

    const orderNo = `#SS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReceipt = {
      orderNo,
      items: [...cart],
      subtotal: getSubtotal(),
      tax: getTax(),
      total: getTotal(),
      customer: { ...checkoutForm },
      location: schedule[activeDay].spot,
      address: schedule[activeDay].address,
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };

    // Save logs
    const existingOrders = JSON.parse(localStorage.getItem('foodtruck_orders') || '[]');
    localStorage.setItem('foodtruck_orders', JSON.stringify([...existingOrders, newReceipt]));

    setOrderReceipt(newReceipt);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // Catering Submission
  const handleCateringSubmit = (e) => {
    e.preventDefault();
    if (cateringForm.honeypot) return;
    setShowCateringModal(true);
  };

  // Subscription Submission
  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    setShowSubscriptionModal(true);
    setSubscriptionEmail('');
  };

  // Filtering Menu
  const filteredMenu = menuItems.filter(item => {
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    const dietaryMatch = 
      dietaryFilter === 'all' || 
      (dietaryFilter === 'vegan' && item.tags.includes('Vegan')) ||
      (dietaryFilter === 'gf' && item.isGF);
    return categoryMatch && dietaryMatch;
  });

  return (
    <div className="premium-truck-body">
      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="premium-truck-nav-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Navigation Header */}
      <nav className="premium-truck-navbar">
        <div className="premium-truck-logo">Sage & Salt</div>
        
        <ul className={`premium-truck-nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#featured" className="premium-truck-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Signature</a></li>
          <li><a href="#location" className="premium-truck-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Locations</a></li>
          <li><a href="#menu" className="premium-truck-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Menu</a></li>
          <li><a href="#catering" className="premium-truck-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Catering</a></li>
          <li><a href="#story" className="premium-truck-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Our Story</a></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {cart.length > 0 && (
            <button className="premium-truck-cart-badge-btn" onClick={() => setIsCartOpen(true)} aria-label={`Cart containing ${cart.length} items`}>
              <ShoppingBag size={20} />
              <span className="premium-truck-cart-count">{cart.reduce((s, i) => s + i.qty, 0)}</span>
            </button>
          )}

          <button className="premium-truck-mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle navigation menu">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="premium-truck-hero">
        <img 
          src="https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=1400&auto=format&fit=crop&q=80" 
          alt="A beautifully crafted food truck parked under warm streetlights serving charcoal-grilled gourmet dishes" 
          className="premium-truck-hero-img"
        />
        <div className="premium-truck-hero-overlay">
          <span className="premium-truck-hero-subtitle">Mobile Fine Dining</span>
          <h1 className="premium-truck-hero-title">Wherever We Park, You Eat Well</h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#location" className="premium-truck-btn">Find Us Today</a>
            <a href="#menu" className="premium-truck-btn premium-truck-btn-outline">View the Menu</a>
          </div>
        </div>
      </header>

      {/* Live Location / Schedule billboard */}
      <section className="premium-truck-section" id="location">
        <span className="premium-truck-sec-subtitle">Route Coordinates</span>
        <h2 className="premium-truck-sec-title">{activeDay}'s Station</h2>

        <div className="premium-truck-billboard">
          <div className="premium-truck-billboard-content">
            <div className="premium-truck-billboard-header">
              <span className="premium-truck-badge-live">● Active Location</span>
              <div className="premium-truck-queue-status">
                <Clock size={14} style={{ color: 'var(--truck-accent)' }} />
                <span>Pre-Order Queue: <strong>{waitTime} Min Wait</strong></span>
              </div>
            </div>
            
            <h3 className="premium-truck-billboard-spot">{schedule[activeDay].spot}</h3>
            <p className="premium-truck-billboard-addr">{schedule[activeDay].address}</p>
            <p className="premium-truck-billboard-hours">Serving: {schedule[activeDay].hours}</p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <a href={schedule[activeDay].coords} className="premium-truck-btn premium-truck-btn-dark premium-truck-btn-sm">
                Get Directions
              </a>
              <a href="#menu" className="premium-truck-btn premium-truck-btn-outline premium-truck-btn-sm">
                Skip The Line Pre-Order
              </a>
            </div>
          </div>

          <div className="premium-truck-billboard-map">
            <div className="premium-truck-map-mockup">
              <div className="premium-truck-map-pin">📍</div>
              <span>Sage & Salt: {schedule[activeDay].mapText}</span>
              <small>Click "Get Directions" to open maps</small>
            </div>
          </div>
        </div>

        {/* Weekly Schedule Grid */}
        <div style={{ marginTop: '56px' }}>
          <h4 className="premium-truck-serif" style={{ fontSize: '20px', color: 'var(--truck-text)', marginBottom: '20px', textAlign: 'center' }}>
            Weekly Route Coordinates
          </h4>
          <div className="premium-truck-schedule-grid">
            {Object.keys(schedule).map(day => (
              <button 
                key={day}
                className={`premium-truck-schedule-card ${activeDay === day ? 'active' : ''}`}
                onClick={() => {
                  setActiveDay(day);
                  document.getElementById('location').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="premium-truck-schedule-day">{day}</span>
                <span className="premium-truck-schedule-spot">{schedule[day].spot}</span>
                <span className="premium-truck-schedule-hours">{schedule[day].hours}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Dishes Section */}
      <section className="premium-truck-section" id="featured" style={{ borderTop: '1px solid var(--truck-border)', borderBottom: '1px solid var(--truck-border)', backgroundColor: '#fffdfa', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <span className="premium-truck-sec-subtitle">Chef's Signature Plates</span>
          <h2 className="premium-truck-sec-title">From the Grate</h2>
          
          <div className="premium-truck-featured-grid">
            {/* Card 1 */}
            <div className="premium-truck-featured-card">
              <div className="premium-truck-featured-img-wrap">
                <img src={menuItems[0].img} alt={menuItems[0].name} className="premium-truck-featured-img" />
              </div>
              <div className="premium-truck-featured-meta">
                <h3 className="premium-truck-featured-title">Oak-Smoked Brisket Sliders</h3>
                <p className="premium-truck-featured-desc">Twelve-hour slow oak wood smoked prime brisket, pickled red onion ribbons, sweet gold glaze, toasted brioche.</p>
                <div className="premium-truck-featured-bottom">
                  <span className="premium-truck-price">$16</span>
                  <button onClick={() => handleAddToCart(menuItems[0])} className="premium-truck-add-btn">
                    Pre-Order
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="premium-truck-featured-card">
              <div className="premium-truck-featured-img-wrap">
                <img src={menuItems[1].img} alt={menuItems[1].name} className="premium-truck-featured-img" />
              </div>
              <div className="premium-truck-featured-meta">
                <h3 className="premium-truck-featured-title">Truffle Mushroom Tacos</h3>
                <p className="premium-truck-featured-desc">Pan-seared chanterelle mushrooms, black truffle olive oil infusion, shredded red cabbage on stoneground blue corn tortillas.</p>
                <div className="premium-truck-featured-bottom">
                  <span className="premium-truck-price">$14</span>
                  <button onClick={() => handleAddToCart(menuItems[1])} className="premium-truck-add-btn">
                    Pre-Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete HTML Menu Grid */}
      <section className="premium-truck-section" id="menu">
        <span className="premium-truck-sec-subtitle">The Nomad Menu</span>
        <h2 className="premium-truck-sec-title">Artisanal Street Fare</h2>

        {/* Tab Filters */}
        <div className="premium-truck-menu-filters">
          <div className="premium-truck-filter-tabs">
            {['all', 'mains', 'sides', 'desserts', 'drinks'].map(cat => (
              <button 
                key={cat} 
                className={`premium-truck-filter-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="premium-truck-dietary-selectors">
            {['all', 'vegan', 'gf'].map(f => (
              <button 
                key={f}
                className={`premium-truck-dietary-btn ${dietaryFilter === f ? 'active' : ''}`}
                onClick={() => setDietaryFilter(f)}
              >
                {f === 'all' ? 'All Diets' : f === 'vegan' ? 'Vegan Only' : 'Gluten-Free'}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="premium-truck-menu-grid">
          {filteredMenu.map(item => (
            <div key={item.id} className="premium-truck-menu-item">
              <div className="premium-truck-menu-img-wrap">
                <img src={item.img} alt={item.name} className="premium-truck-menu-img" />
              </div>
              <div className="premium-truck-menu-info">
                <div className="premium-truck-menu-header">
                  <h3 className="premium-truck-menu-title">
                    {item.name}
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="premium-truck-dietary-badge">{t}</span>
                    ))}
                  </h3>
                  <span className="premium-truck-price">{item.price}</span>
                </div>
                <p className="premium-truck-featured-desc">{item.desc}</p>
                <button onClick={() => handleAddToCart(item)} className="premium-truck-add-btn" style={{ marginTop: '12px' }}>
                  Pre-Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Flow / Pre-Order Steps */}
      <section className="premium-truck-section" id="experience" style={{ borderTop: '1px solid var(--truck-border)', borderBottom: '1px solid var(--truck-border)' }}>
        <span className="premium-truck-sec-subtitle">Pre-Order & Pickup</span>
        <h2 className="premium-truck-sec-title">Three Paths to Dine</h2>

        <div className="premium-truck-flow">
          <div className="premium-truck-flow-step">
            <span className="premium-truck-flow-num">01</span>
            <h3 className="premium-truck-flow-title">Walk-Up Ordering</h3>
            <p className="premium-truck-flow-desc">Visit the window directly. Average cook times range between 8 to 15 minutes.</p>
          </div>
          
          <div className="premium-truck-flow-step">
            <span className="premium-truck-flow-num">02</span>
            <h3 className="premium-truck-flow-title">Pre-Order Online</h3>
            <p className="premium-truck-flow-desc">Select items, pick your pickup coordinate, and skip the line entirely.</p>
          </div>
          
          <div className="premium-truck-flow-step">
            <span className="premium-truck-flow-num">03</span>
            <h3 className="premium-truck-flow-title">Private Catering</h3>
            <p className="premium-truck-flow-desc">Hire Sage & Salt for weddings, corporate galas, and private outdoor celebrations.</p>
          </div>
        </div>
      </section>

      {/* Chef Story / Heritage */}
      <section className="premium-truck-section" id="story">
        <div className="premium-truck-story-grid">
          <div className="premium-truck-story-content">
            <span className="premium-truck-sec-subtitle" style={{ textAlign: 'left', display: 'block', marginBottom: '16px' }}>Our Founder</span>
            <h2 className="premium-truck-story-title">Crafted by Chef Marcus</h2>
            <p className="premium-truck-story-text">
              After a decade heading Michelin-starred kitchens in Manhattan, Chef Marcus felt a pull toward the raw, honest energy of wood-fired open flames.
            </p>
            <p className="premium-truck-story-text">
              "Fine dining doesn't belong behind marble pillars. It belongs where people live, work, and gather." Sage & Salt Kitchen was founded in 2022 to deliver complex, slow-cooked, wood-fired seasonal flavors to the street corners of Soho.
            </p>
          </div>
          <div className="premium-truck-story-img-wrap">
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&fit=crop&q=80" 
              alt="Professional chef in white apron adjusting flames under open coal cooking ovens" 
              className="premium-truck-story-img"
            />
          </div>
        </div>
      </section>

      {/* Catering Inquiry Section */}
      <section className="premium-truck-section" id="catering" style={{ borderTop: '1px solid var(--truck-border)', borderBottom: '1px solid var(--truck-border)', backgroundColor: '#fffdfa', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <span className="premium-truck-sec-subtitle">Private Bookings</span>
          <h2 className="premium-truck-sec-title">Catering Inquiry</h2>
          <p className="premium-truck-section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
            We bring our wood-fired grills directly to you. From corporate retreats to weddings, check availability and book Marcus's team.
          </p>

          <div className="premium-truck-catering-wrapper">
            <form onSubmit={handleCateringSubmit} className="premium-truck-form">
              <div className="premium-truck-form-group">
                <label className="premium-truck-label">Contact Person</label>
                <input 
                  type="text" 
                  required
                  placeholder="Claire Jenkins"
                  className="premium-truck-input"
                  value={cateringForm.name}
                  onChange={(e) => setCateringForm({ ...cateringForm, name: e.target.value })}
                />
              </div>

              <div className="premium-truck-form-group">
                <label className="premium-truck-label">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="claire@example.com"
                  className="premium-truck-input"
                  value={cateringForm.email}
                  onChange={(e) => setCateringForm({ ...cateringForm, email: e.target.value })}
                />
              </div>

              <div className="premium-truck-form-group">
                <label className="premium-truck-label">Event Date</label>
                <input 
                  type="date" 
                  required
                  className="premium-truck-input"
                  value={cateringForm.date}
                  onChange={(e) => setCateringForm({ ...cateringForm, date: e.target.value })}
                />
              </div>

              <div className="premium-truck-form-group">
                <label className="premium-truck-label">Estimated Guest Count</label>
                <select 
                  className="premium-truck-input"
                  value={cateringForm.guests}
                  onChange={(e) => setCateringForm({ ...cateringForm, guests: e.target.value })}
                >
                  <option value="25-50">25 - 50 guests</option>
                  <option value="50-100">50 - 100 guests</option>
                  <option value="100-200">100 - 200 guests</option>
                  <option value="200+">200+ guests (Grand Feast)</option>
                </select>
              </div>

              <div className="premium-truck-form-group" style={{ gridColumn: 'span 2' }}>
                <label className="premium-truck-label">Location / Details</label>
                <textarea 
                  required
                  placeholder="Tell us about the venue, date constraints, or menu preferences..."
                  className="premium-truck-input"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  value={cateringForm.details}
                  onChange={(e) => setCateringForm({ ...cateringForm, details: e.target.value })}
                />
              </div>

              {/* Honeypot field */}
              <div className="premium-truck-form-group premium-truck-hidden-field">
                <input 
                  type="text" 
                  tabIndex="-1" 
                  value={cateringForm.honeypot} 
                  onChange={(e) => setCateringForm({ ...cateringForm, honeypot: e.target.value })} 
                />
              </div>

              <button type="submit" className="premium-truck-btn premium-truck-btn-dark" style={{ gridColumn: 'span 2', marginTop: '12px' }}>
                Submit Catering Booking Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Social Proof Reviews */}
      <section className="premium-truck-section" id="reviews">
        <span className="premium-truck-sec-subtitle">Mobile Table Voices</span>
        <h2 className="premium-truck-sec-title">Gourmet Stories</h2>

        <div className="premium-truck-reviews-grid">
          <div className="premium-truck-review-card">
            <p className="premium-truck-review-text">
              "The chanterelle truffle mushroom tacos were transcendental. The corn tortillas were warm and had that perfect stoneground texture. Marcus has elevated mobile food to art."
            </p>
            <div>
              <span className="premium-truck-review-author">Julianne Cole</span>
              <span className="premium-truck-review-context">• Soho Station Guest</span>
            </div>
          </div>

          <div className="premium-truck-review-card">
            <p className="premium-truck-review-text">
              "Marcus and his crew catered our outdoor rehearsal dinner in Dumbo. They set up their wood-fire rotisseries right under the archway. The brisket sliders were legendary."
            </p>
            <div>
              <span className="premium-truck-review-author">Henry Vance</span>
              <span className="premium-truck-review-context">• Rehearsal Catering</span>
            </div>
          </div>
        </div>

        {/* Instagram Sim Grid */}
        <div className="premium-truck-insta-grid">
          <div className="premium-truck-insta-item">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=80" alt="Insta" className="premium-truck-insta-img" />
          </div>
          <div className="premium-truck-insta-item">
            <img src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&auto=format&fit=crop&q=80" alt="Insta" className="premium-truck-insta-img" />
          </div>
          <div className="premium-truck-insta-item">
            <img src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&auto=format&fit=crop&q=80" alt="Insta" className="premium-truck-insta-img" />
          </div>
          <div className="premium-truck-insta-item">
            <img src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&auto=format&fit=crop&q=80" alt="Insta" className="premium-truck-insta-img" />
          </div>
        </div>
      </section>

      {/* Footer / Location Alert Signup */}
      <footer className="premium-truck-footer">
        <div className="premium-truck-footer-content">
          <div className="premium-truck-footer-left">
            <div className="premium-truck-logo" style={{ fontSize: '22px', marginBottom: '12px' }}>Sage & Salt</div>
            <p style={{ fontSize: '13px', color: 'var(--truck-text-muted)', maxWidth: '280px', marginBottom: '24px' }}>
               Michelin-caliber street food. Follow our coordinates weekly for fresh bakes.
            </p>
            
            {/* Route Alerts Form */}
            <form onSubmit={handleSubscribeSubmit} className="premium-truck-subscribe-form">
              <input 
                type="email" 
                required
                placeholder="weekly-route@email.com" 
                className="premium-truck-input"
                style={{ fontSize: '12px', padding: '10px 14px' }}
                value={subscriptionEmail}
                onChange={(e) => setSubscriptionEmail(e.target.value)}
              />
              <button type="submit" className="premium-truck-btn premium-truck-btn-dark premium-truck-btn-xs" style={{ width: 'auto' }}>
                Join Route Alerts
              </button>
            </form>
          </div>

          <div className="premium-truck-footer-right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="premium-truck-label" style={{ color: 'var(--truck-text-muted)' }}>Locations Support</span>
              <a href="tel:+12125550143" style={{ fontSize: '15px', color: 'inherit', fontWeight: 'bold' }}>+1 (212) 555-0143</a>
              <a href="mailto:nomad@sageandsalt.com" style={{ fontSize: '13px', color: 'var(--truck-text-muted)' }}>nomad@sageandsalt.com</a>
            </div>
            
            <div className="premium-truck-footer-links" style={{ marginTop: '24px' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="premium-truck-footer-link">Instagram</a>
              <a href="mailto:nomad@sageandsalt.com" className="premium-truck-footer-link">Email alerts</a>
            </div>
          </div>
        </div>

        <div className="premium-truck-footer-copy">
          &copy; {new Date().getFullYear()} Sage & Salt Mobile Gastronomy. All rights reserved.
        </div>
      </footer>

      {/* PRE-ORDER SHOPPING CART DRAWER */}
      {isCartOpen && (
        <div className="premium-truck-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="premium-truck-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="premium-truck-drawer-header">
              <h3 className="premium-truck-drawer-title">Pre-Order Basket</h3>
              <button className="premium-truck-drawer-close" onClick={() => setIsCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="premium-truck-empty-cart">
                <ShoppingBag size={44} style={{ strokeWidth: 1, color: 'var(--truck-accent)' }} />
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '18px' }}>Your basket is empty</p>
                <button className="premium-truck-btn premium-truck-btn-dark premium-truck-btn-sm" onClick={() => setIsCartOpen(false)}>
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="premium-truck-cart-items-list">
                  {cart.map(item => (
                    <div key={item.id} className="premium-truck-cart-item">
                      <img src={item.img} alt={item.name} className="premium-truck-cart-item-img" />
                      <div className="premium-truck-cart-item-info">
                        <h4 className="premium-truck-cart-item-title">{item.name}</h4>
                        <span className="premium-truck-cart-item-price">{item.price} each</span>
                      </div>
                      
                      <div className="premium-truck-qty-controls">
                        <button className="premium-truck-qty-btn" onClick={() => handleUpdateQty(item.id, -1)}>
                          <Minus size={12} />
                        </button>
                        <span className="premium-truck-qty-value">{item.qty}</span>
                        <button className="premium-truck-qty-btn" onClick={() => handleUpdateQty(item.id, 1)}>
                          <Plus size={12} />
                        </button>
                      </div>

                      <button className="premium-truck-cart-item-remove" onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="premium-truck-drawer-summary">
                  <div style={{ backgroundColor: '#FAF9F6', padding: '12px', border: '1px solid var(--truck-border)', display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                    <MapPin size={16} style={{ color: 'var(--truck-accent)', flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', color: 'var(--truck-text-muted)' }}>
                      Pickup Station: <strong>{schedule[activeDay].spot}</strong> ({activeDay})
                    </span>
                  </div>

                  <div className="premium-truck-summary-row">
                    <span>Pre-Order Subtotal:</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="premium-truck-summary-row">
                    <span>Est. Tax (8.25%):</span>
                    <span>${getTax().toFixed(2)}</span>
                  </div>
                  <div className="premium-truck-summary-row total">
                    <span>Amount Due:</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="premium-truck-btn premium-truck-btn-dark"
                    style={{ width: '100%', marginTop: '16px' }}
                  >
                    Confirm Pickup Pre-Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* PRE-ORDER CHECKOUT WIZARD MODAL */}
      {isCheckoutOpen && (
        <div className="premium-truck-modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="premium-truck-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px', textAlign: 'left' }}>
            <div className="premium-truck-drawer-header" style={{ marginBottom: '20px' }}>
              <h3 className="premium-truck-drawer-title">Pre-Order Details</h3>
              <button className="premium-truck-drawer-close" onClick={() => setIsCheckoutOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePreOrderSubmit} className="premium-truck-form">
              <div className="premium-truck-form-group">
                <label className="premium-truck-label">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="premium-truck-input"
                  placeholder="Julianne Cole"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                />
              </div>

              <div className="premium-truck-form-group">
                <label className="premium-truck-label">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="premium-truck-input"
                  placeholder="julianne@example.com"
                  value={checkoutForm.email}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                />
              </div>

              <div className="premium-truck-form-group">
                <label className="premium-truck-label">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  className="premium-truck-input"
                  placeholder="(212) 555-0143"
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                />
              </div>

              <div className="premium-truck-form-group">
                <label className="premium-truck-label">Desired Pickup Time ({activeDay})</label>
                <select 
                  className="premium-truck-input"
                  value={checkoutForm.pickupTime}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, pickupTime: e.target.value })}
                >
                  <option value="11:45">11:45 AM - Early Lunch</option>
                  <option value="12:15">12:15 PM - Peak Lunch</option>
                  <option value="12:45">12:45 PM - Afternoon Batch</option>
                  <option value="13:30">01:30 PM - Late Lunch</option>
                  <option value="14:15">02:15 PM - Afternoon Snack</option>
                </select>
              </div>

              {/* Honeypot */}
              <div className="premium-truck-form-group premium-truck-hidden-field">
                <input 
                  type="text" 
                  tabIndex="-1" 
                  value={checkoutForm.honeypot} 
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, honeypot: e.target.value })} 
                />
              </div>

              <div className="premium-truck-form-full" style={{ borderTop: '1px solid var(--truck-border)', paddingTop: '20px', marginTop: '12px' }}>
                <h4 className="premium-truck-label" style={{ marginBottom: '12px' }}>Payment Method</h4>
                <div style={{ padding: '12px 16px', border: '1px solid var(--truck-accent)', backgroundColor: '#fffdfb', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <AlertCircle size={16} style={{ color: 'var(--truck-accent)', flexShrink: 0 }} />
                  <div style={{ fontSize: '11px', color: 'var(--truck-text-muted)' }}>
                    <strong>Pay cash at the window</strong> • Skip the ordering queue. Your order will be boxed fresh for your pickup time, pay upon collection.
                  </div>
                </div>
              </div>

              <div className="premium-truck-form-full" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
                <span className="premium-truck-price" style={{ fontSize: '20px' }}>Total Due: ${getTotal().toFixed(2)}</span>
                <button type="submit" className="premium-truck-btn premium-truck-btn-dark">
                  Place Pre-Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FINAL PRE-ORDER RECEIPT MODAL */}
      {orderReceipt && (
        <div className="premium-truck-modal-overlay">
          <div className="premium-truck-modal" style={{ maxWidth: '520px' }}>
            <h3 className="premium-truck-modal-title" style={{ color: 'var(--truck-accent)' }}>Pre-Order Secured</h3>
            <p className="premium-truck-modal-text" style={{ marginBottom: '20px' }}>
              Thank you, <strong>{orderReceipt.customer.name}</strong>! Marcus's team is prepping your gourmet box.
            </p>

            <div className="premium-truck-receipt-card">
              <div className="premium-truck-receipt-title">
                Sage & Salt Mobile Gastronomy
                <div style={{ fontSize: '11px', fontWeight: 'normal', color: 'var(--truck-text-muted)', marginTop: '4px' }}>
                  {orderReceipt.orderNo} • {orderReceipt.date}
                </div>
              </div>

              <table className="premium-truck-receipt-table">
                <thead>
                  <tr>
                    <th>Gourmet Item</th>
                    <th style={{ textAlign: 'center' }}>Qty</th>
                    <th style={{ textAlign: 'right' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderReceipt.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.emoji} {item.name}</td>
                      <td style={{ textAlign: 'center' }}>{item.qty}</td>
                      <td style={{ textAlign: 'right' }}>${(item.rawPrice * item.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="premium-truck-summary-row" style={{ fontSize: '12px' }}>
                <span>Subtotal:</span>
                <span>${orderReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="premium-truck-summary-row" style={{ fontSize: '12px' }}>
                <span>Tax (8.25%):</span>
                <span>${orderReceipt.tax.toFixed(2)}</span>
              </div>
              <div className="premium-truck-summary-row total" style={{ fontSize: '16px', paddingTop: '8px', marginTop: '8px' }}>
                <span>Amount Due:</span>
                <span>${orderReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--truck-text-muted)', textAlign: 'left', marginBottom: '24px', backgroundColor: 'var(--truck-bg-card)', padding: '12px', border: '1px solid var(--truck-border)' }}>
              🏪 <strong>Window Pickup:</strong> Scheduled for <strong>{orderReceipt.customer.pickupTime}</strong> ({activeDay}) at our <strong>{orderReceipt.location}</strong> station ({orderReceipt.address}). Give your order number <strong>{orderReceipt.orderNo}</strong> at the pre-order pick counter and pay cash.
            </div>

            <button className="premium-truck-btn premium-truck-btn-dark" onClick={() => setOrderReceipt(null)}>
              Done
            </button>
          </div>
        </div>
      )}

      {/* CATERING INQUIRY SUCCESS MODAL */}
      {showCateringModal && (
        <div className="premium-truck-modal-overlay">
          <div className="premium-truck-modal">
            <h3 className="premium-truck-modal-title">Inquiry Received</h3>
            <p className="premium-truck-modal-text">
              Thank you, <strong>{cateringForm.name}</strong>. Chef Marcus has received your catering booking details for <strong>{cateringForm.date}</strong> (Guests: {cateringForm.guests}, Details: {cateringForm.details}). We will check calendar conflicts and email you a customized proposal within 12 hours.
            </p>
            <button className="premium-truck-btn premium-truck-btn-dark" onClick={() => {
              setShowCateringModal(false);
              setCateringForm({ name: '', email: '', date: '', location: '', guests: '50', details: '', honeypot: '' });
            }}>
              Return to Station
            </button>
          </div>
        </div>
      )}

      {/* EMAIL ALERTS ROUTE SUCCESS MODAL */}
      {showSubscriptionModal && (
        <div className="premium-truck-modal-overlay">
          <div className="premium-truck-modal">
            <h3 className="premium-truck-modal-title">Subscribed</h3>
            <p className="premium-truck-modal-text">
              Your email has been added to our route alerts. Every Sunday morning at 8:00 AM, you will receive our coordinates for the coming week directly in your inbox.
            </p>
            <button className="premium-truck-btn premium-truck-btn-dark" onClick={() => setShowSubscriptionModal(false)}>
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
