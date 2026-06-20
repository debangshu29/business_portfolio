import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShoppingBag, Plus, Minus, Trash2, X, AlertCircle, Menu } from 'lucide-react';
import './bakery.css';

export default function MaisonBoulangerie() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Custom Cake Builder State
  const [cakeSize, setCakeSize] = useState('6in');
  const [cakeFlavor, setCakeFlavor] = useState('vanilla');
  const [cakeDesign, setCakeDesign] = useState('minimal');
  const [cakeDate, setCakeDate] = useState('');
  const [showCakeModal, setShowCakeModal] = useState(false);

  // Delivery Zip Checker State
  const [zipInput, setZipInput] = useState('');
  const [zipMessage, setZipMessage] = useState('');
  const [zipStatus, setZipStatus] = useState(null); // 'success' | 'error' | null

  // Cart & Checkout State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' | 'delivery'
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '', phone: '', address: '', zip: '', pickupTime: '08:00', honeypot: '' });
  const [orderReceipt, setOrderReceipt] = useState(null);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // General Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [showContactModal, setShowContactModal] = useState(false);

  // Dynamic Cake Pricing Logic
  const getCakeQuote = () => {
    let price = 80; // base price for 6in
    if (cakeSize === '8in') price = 120;
    if (cakeSize === '10in') price = 160;

    if (cakeFlavor === 'espresso') price += 15;
    if (cakeFlavor === 'lemon') price += 20;

    if (cakeDesign === 'floral') price += 20;
    if (cakeDesign === 'textured') price += 30;

    return price;
  };
  const cakeQuote = getCakeQuote();

  const menuItems = [
    // Breads
    { id: 1, name: "36-Hour Sourdough Boule", category: "breads", price: "$9", rawPrice: 9.00, emoji: "🍞", desc: "Slow fermented using our heritage wild yeast culture. Dark, blistered, crunchy crust with a soft open crumb.", tags: ["Vegan", "Nut-Free"], img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80" },
    { id: 2, name: "Toasted Sesame Rye", category: "breads", price: "$10", rawPrice: 10.00, emoji: "🍞", desc: "Earthy heritage rye bread loaded with black and white sesame seeds, organic grains.", tags: ["Vegan", "Nut-Free"], img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&auto=format&fit=crop&q=80" },
    { id: 3, name: "Wild Rosemary Focaccia", category: "breads", price: "$8", rawPrice: 8.00, emoji: "🫓", desc: "Fluffy Ligurian-style focaccia topped with garden rosemary, flaky sea salt, cold-pressed olive oil.", tags: ["Vegan", "Nut-Free"], img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop&q=80" },
    
    // Pastries
    { id: 4, name: "Cardamom Morning Bun", category: "pastries", price: "$6", rawPrice: 6.00, emoji: "🧁", desc: "Flaky, laminated croissant dough twisted with freshly ground green cardamom, vanilla sugar glaze.", tags: ["Nut-Free"], img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop&q=80" },
    { id: 5, name: "Almond Frangipane Croissant", category: "pastries", price: "$7", rawPrice: 7.00, emoji: "🥐", desc: "Twice-baked butter croissant filled with organic almond frangipane, topped with sliced almonds.", tags: ["Vegetarian"], img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80" },
    { id: 6, name: "Peach & Vanilla Bean Tart", category: "pastries", price: "$9", rawPrice: 9.00, emoji: "🥧", desc: "Crisp butter pastry shell with organic vanilla custard, loaded with ripe garden peaches.", tags: ["Vegetarian"], img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&auto=format&fit=crop&q=80" },
    
    // Celebration
    { id: 7, name: "Lemon Lavender Butter Cake", category: "celebration", price: "$75", rawPrice: 75.00, emoji: "🎂", desc: "Dense vanilla bean crumb layered with house lemon curd, frosted with organic lavender buttercream.", tags: ["Vegetarian", "Nut-Free"], img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&auto=format&fit=crop&q=80" },
    { id: 8, name: "Vegan Espresso Chocolate Cake", category: "celebration", price: "$85", rawPrice: 85.00, emoji: "🎂", desc: "Rich double dark chocolate cake infused with cold brew espresso, frosted with rich avocado cacao ganache.", tags: ["Vegan", "Gluten-Free"], img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&auto=format&fit=crop&q=80" }
  ];

  // E-commerce Cart Logic
  const handleAddToCart = (item) => {
    setCart(prevCart => {
      const exists = prevCart.find(i => i.id === item.id);
      if (exists) {
        return prevCart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
    // Optional: trigger cart open on first add to show feedback
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

  // Cart Math Calculations
  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.rawPrice * item.qty), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.0825; // 8.25% local tax
  };

  const getDeliveryFee = () => {
    return deliveryType === 'delivery' ? 5.00 : 0.00;
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + getDeliveryFee();
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.qty, 0);
  };

  const isDeliverableZip = (zip) => {
    return zip.startsWith('100') || zip === '90210' || zip === '94102';
  };

  const handleZipCheck = (e) => {
    e.preventDefault();
    if (!zipInput.trim()) return;
    const isDeliverable = isDeliverableZip(zipInput);
    
    if (isDeliverable) {
      setZipStatus('success');
      setZipMessage(`Maison delivery is available to ${zipInput}! Deliveries leave at 8 AM daily.`);
      setCheckoutForm(prev => ({ ...prev, zip: zipInput }));
    } else {
      setZipStatus('error');
      setZipMessage(`ZIP code ${zipInput} is outside our delivery radius. Pickup is available daily.`);
    }
  };

  const handleCakeSubmit = (e) => {
    e.preventDefault();
    setShowCakeModal(true);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (checkoutForm.honeypot) {
      console.warn("Bot submission detected!");
      return;
    }

    if (deliveryType === 'delivery' && !isDeliverableZip(checkoutForm.zip)) {
      setZipStatus('error');
      setZipMessage(`ZIP code ${checkoutForm.zip || 'provided'} is outside our delivery radius. Please choose pickup or enter a covered ZIP code.`);
      return;
    }

    // Generate random order receipt
    const orderNo = `#HH-${Math.floor(100000 + Math.random() * 900000)}`;
    const newReceipt = {
      orderNo,
      items: [...cart],
      deliveryType,
      subtotal: getSubtotal(),
      tax: getTax(),
      deliveryFee: getDeliveryFee(),
      total: getTotal(),
      customer: { ...checkoutForm },
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    };

    // Save to local storage order logs
    const existingOrders = JSON.parse(localStorage.getItem('bakery_orders') || '[]');
    localStorage.setItem('bakery_orders', JSON.stringify([...existingOrders, newReceipt]));

    setOrderReceipt(newReceipt);
    setCart([]); // Clear cart
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.honeypot) return;
    setShowContactModal(true);
  };

  const filteredMenu = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="premium-bakery-body">
      {/* Navbar Header Mobile Click-Outside Overlay */}
      {isMobileMenuOpen && (
        <div className="premium-bakery-nav-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      {/* Navbar Header */}
      <nav className="premium-bakery-navbar">
        <div className="premium-bakery-logo">Hearth & Harvest</div>
        
        <ul className={`premium-bakery-nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#featured" className="premium-bakery-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Featured</a></li>
          <li><a href="#menu" className="premium-bakery-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Menu</a></li>
          <li><a href="#experience" className="premium-bakery-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Ordering</a></li>
          <li><a href="#builder" className="premium-bakery-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Custom Cakes</a></li>
          <li><a href="#story" className="premium-bakery-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Story</a></li>
          <li><a href="#contact" className="premium-bakery-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Hearth</a></li>
        </ul>

        <button className="premium-bakery-mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle navigation menu">
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Hero Section */}
      <header className="premium-bakery-hero">
        <img 
          src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=1400&auto=format&fit=crop&q=80" 
          alt="Artisanal sourdough loaves resting on cooling racks in a quiet, flour-dusted morning kitchen" 
          className="premium-bakery-hero-img"
        />
        <div className="premium-bakery-hero-overlay">
          <h1 className="premium-bakery-hero-title">Pure Joy, Baked In</h1>
          <a href="#menu" className="premium-bakery-btn">Explore the bakes</a>
        </div>
      </header>

      {/* Floating Cart Button */}
      {getCartCount() > 0 && (
        <button 
          className="premium-bakery-floating-cart" 
          onClick={() => setIsCartOpen(true)}
          aria-label={`Open shopping cart showing ${getCartCount()} items`}
        >
          <ShoppingBag size={24} />
          <span className="premium-bakery-cart-count-badge">{getCartCount()}</span>
        </button>
      )}

      {/* Featured / Seasonal Section */}
      <section className="premium-bakery-section" id="featured">
        <span className="premium-bakery-sec-subtitle">Seasonal Selections</span>
        <h2 className="premium-bakery-sec-title">From the Morning Hearth</h2>
        
        <div className="premium-bakery-featured-grid">
          {/* Card 1 */}
          <div className="premium-bakery-featured-card">
            <div className="premium-bakery-featured-img-wrap">
              <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80" alt="Freshly baked organic sourdough loaf" className="premium-bakery-featured-img" />
            </div>
            <div className="premium-bakery-featured-meta">
              <h3 className="premium-bakery-featured-title">Heritage Sourdough</h3>
              <p className="premium-bakery-featured-desc">Our signature 36-hour slow fermented loaf. Crisp caramelized crust with a moist, wild-yeast crumb.</p>
              <div className="premium-bakery-featured-bottom">
                <span className="premium-bakery-price">$9</span>
                <button 
                  onClick={() => handleAddToCart(menuItems[0])}
                  className="premium-bakery-menu-add-btn"
                  style={{ margin: 0 }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="premium-bakery-featured-card">
            <div className="premium-bakery-featured-img-wrap">
              <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80" alt="Warm rolled cardamom morning buns dusted with raw sugar" className="premium-bakery-featured-img" />
            </div>
            <div className="premium-bakery-featured-meta">
              <h3 className="premium-bakery-featured-title">Cardamom Morning Bun</h3>
              <p className="premium-bakery-featured-desc">Twisted layers of laminated, organic butter pastry flavored with fresh green cardamom pods.</p>
              <div className="premium-bakery-featured-bottom">
                <span className="premium-bakery-price">$6</span>
                <button 
                  onClick={() => handleAddToCart(menuItems[3])}
                  className="premium-bakery-menu-add-btn"
                  style={{ margin: 0 }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="premium-bakery-featured-card">
            <div className="premium-bakery-featured-img-wrap">
              <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80" alt="Elegant celebration cake decorated with soft rosebuds" className="premium-bakery-featured-img" />
            </div>
            <div className="premium-bakery-featured-meta">
              <h3 className="premium-bakery-featured-title">Lemon Lavender Cake</h3>
              <p className="premium-bakery-featured-desc">Organic butter sponge layered with fresh lemon curd and fragrant garden lavender frosting.</p>
              <div className="premium-bakery-featured-bottom">
                <span className="premium-bakery-price">$75</span>
                <button 
                  onClick={() => handleAddToCart(menuItems[6])}
                  className="premium-bakery-menu-add-btn"
                  style={{ margin: 0 }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Showcase Section */}
      <section className="premium-bakery-section" id="menu" style={{ borderTop: '1px solid var(--bakery-border)', borderBottom: '1px solid var(--bakery-border)' }}>
        <span className="premium-bakery-sec-subtitle">The Complete Collection</span>
        <h2 className="premium-bakery-sec-title">Baked Fresh Daily</h2>

        {/* Categories Tab */}
        <div className="premium-bakery-menu-tabs">
          <button onClick={() => setActiveCategory('all')} className={`premium-bakery-menu-tab ${activeCategory === 'all' ? 'active' : ''}`}>All Offerings</button>
          <button onClick={() => setActiveCategory('breads')} className={`premium-bakery-menu-tab ${activeCategory === 'breads' ? 'active' : ''}`}>Artisan Breads</button>
          <button onClick={() => setActiveCategory('pastries')} className={`premium-bakery-menu-tab ${activeCategory === 'pastries' ? 'active' : ''}`}>Pastries & Viennoiserie</button>
          <button onClick={() => setActiveCategory('celebration')} className={`premium-bakery-menu-tab ${activeCategory === 'celebration' ? 'active' : ''}`}>Celebration Cakes</button>
        </div>

        {/* Menu Grid */}
        <div className="premium-bakery-menu-grid">
          {filteredMenu.map(item => (
            <div key={item.id} className="premium-bakery-menu-item">
              <div className="premium-bakery-menu-img-wrap">
                <img src={item.img} alt={item.name} className="premium-bakery-menu-img" />
              </div>
              <div className="premium-bakery-menu-info">
                <div className="premium-bakery-menu-header">
                  <h3 className="premium-bakery-menu-title">
                    {item.name}
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="premium-bakery-dietary-badge">{tag}</span>
                    ))}
                  </h3>
                  <span className="premium-bakery-price">{item.price}</span>
                </div>
                <p className="premium-bakery-featured-desc">{item.desc}</p>
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="premium-bakery-menu-add-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Flow Section */}
      <section className="premium-bakery-section" id="experience">
        <span className="premium-bakery-sec-subtitle">Seamless Convenience</span>
        <h2 className="premium-bakery-sec-title">The Maison Experience</h2>
        
        <div className="premium-bakery-flow">
          <div className="premium-bakery-flow-step">
            <span className="premium-bakery-flow-num">I</span>
            <h3 className="premium-bakery-flow-title">Select bakes</h3>
            <p className="premium-bakery-flow-desc">Browse our seasonal menu and custom builder options to select your order.</p>
          </div>
          
          <div className="premium-bakery-flow-step">
            <span className="premium-bakery-flow-num">II</span>
            <h3 className="premium-bakery-flow-title">Pick a Date</h3>
            <p className="premium-bakery-flow-desc">Confirm your pickup day. Celebration cakes require 48 hours notice.</p>
          </div>
          
          <div className="premium-bakery-flow-step">
            <span className="premium-bakery-flow-num">III</span>
            <h3 className="premium-bakery-flow-title">Hearth Pickup</h3>
            <p className="premium-bakery-flow-desc">Collect your freshly baked packages straight from our clay ovens at 8 AM.</p>
          </div>
        </div>

        {/* Zip Code Checker */}
        <div style={{ marginTop: '80px', borderTop: '1px dashed var(--bakery-border)', paddingTop: '40px', textAlign: 'center' }}>
          <h3 className="premium-bakery-serif" style={{ fontSize: '20px', color: 'var(--bakery-dark-accent)', marginBottom: '8px' }}>
            Check Delivery Options
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--bakery-text-muted)' }}>
            Enter your zip code to see if we deliver fresh bread directly to your door.
          </p>
          
          <form onSubmit={handleZipCheck} className="premium-bakery-zip-checker">
            <input 
              type="text" 
              className="premium-bakery-input" 
              placeholder="e.g. 10001" 
              maxLength="5"
              required
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value.replace(/\D/g, ''))}
              style={{ width: '160px', textAlign: 'center' }}
            />
            <button type="submit" className="premium-bakery-btn premium-bakery-btn-dark">Check ZIP</button>
          </form>
          
          {zipStatus && (
            <div 
              style={{ 
                marginTop: '16px', 
                fontSize: '13px', 
                fontWeight: 600, 
                color: zipStatus === 'success' ? 'var(--bakery-secondary)' : '#b91c1c' 
              }}
            >
              {zipMessage}
            </div>
          )}
        </div>
      </section>

      {/* Cake Builder Section */}
      <section className="premium-bakery-section" id="builder" style={{ borderTop: '1px solid var(--bakery-border)', borderBottom: '1px solid var(--bakery-border)', backgroundColor: 'var(--bakery-bg-card)', maxWidth: '100%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
          <span className="premium-bakery-sec-subtitle">Artisan Cake Architect</span>
          <h2 className="premium-bakery-sec-title">Custom Cake Builder</h2>
          
          <div className="premium-bakery-builder">
            <form onSubmit={handleCakeSubmit} className="premium-bakery-form">
              
              <div className="premium-bakery-form-group">
                <label className="premium-bakery-label">1. Select Cake Size</label>
                <select 
                  className="premium-bakery-input"
                  value={cakeSize}
                  onChange={(e) => setCakeSize(e.target.value)}
                >
                  <option value="6in">6" Round Cake (Serves 8) - $80 base</option>
                  <option value="8in">8" Round Cake (Serves 15) - $120 base</option>
                  <option value="10in">10" Round Cake (Serves 25) - $160 base</option>
                </select>
              </div>

              <div className="premium-bakery-form-group">
                <label className="premium-bakery-label">2. Cake Flavour Profile</label>
                <select 
                  className="premium-bakery-input"
                  value={cakeFlavor}
                  onChange={(e) => setCakeFlavor(e.target.value)}
                >
                  <option value="vanilla">Madagascar Vanilla Bean & Raspberry jam</option>
                  <option value="espresso">Double Espresso Dark Chocolate (+$15)</option>
                  <option value="lemon">Organic Meyer Lemon & Lavender Curd (+$20)</option>
                </select>
              </div>

              <div className="premium-bakery-form-group">
                <label className="premium-bakery-label">3. Outer Surface Design</label>
                <select 
                  className="premium-bakery-input"
                  value={cakeDesign}
                  onChange={(e) => setCakeDesign(e.target.value)}
                >
                  <option value="minimal">Minimal Naked (Rustic exposed crumb)</option>
                  <option value="floral">Soft Botanical (Muted garden flower buds) (+$20)</option>
                  <option value="textured">Textured Plaster (Thick sculptural icing) (+$30)</option>
                </select>
              </div>

              <div className="premium-bakery-form-group">
                <label className="premium-bakery-label">4. Required Date</label>
                <input 
                  type="date" 
                  className="premium-bakery-input"
                  required
                  value={cakeDate}
                  onChange={(e) => setCakeDate(e.target.value)}
                />
              </div>

              <div className="premium-bakery-form-footer">
                <div>
                  <span className="premium-bakery-label" style={{ color: 'var(--bakery-text-muted)' }}>Estimated Quote:</span>
                  <div style={{ fontSize: '28px', color: 'var(--bakery-dark-accent)', fontWeight: 300 }} className="premium-bakery-serif">
                    ${cakeQuote}.00
                  </div>
                </div>
                <button type="submit" className="premium-bakery-btn premium-bakery-btn-dark">
                  Request Custom Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="premium-bakery-section" id="story">
        <div className="premium-bakery-story-grid">
          <div className="premium-bakery-story-content">
            <span className="premium-bakery-sec-subtitle" style={{ textAlign: 'left', display: 'block', marginBottom: '16px' }}>Our Heritage</span>
            <h2 className="premium-bakery-story-title">Crafting Sourdough Since 1994</h2>
            <p className="premium-bakery-story-text">
              We believe a bakery is the heartbeat of a neighborhood. Our starter culture was born in 1994 in a small kitchen, fed daily using only organic stoneground rye flour and filtered mineral water.
            </p>
            <p className="premium-bakery-story-text">
              Every loaf we sell is slow-fermented for 36 hours, hand-shaped by our small team of bakers, and baked in our traditional stone clay hearths at dawn. No artificial additives, no shortcuts. Just grain, water, salt, and time.
            </p>
          </div>
          <div className="premium-bakery-story-img-wrap">
            <img 
              src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&auto=format&fit=crop&q=80" 
              alt="Hands of a professional baker gently shaping raw sourdough dough on a flour-covered surface" 
              className="premium-bakery-story-img"
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Reviews Section */}
      <section className="premium-bakery-section" id="reviews" style={{ borderTop: '1px solid var(--bakery-border)', borderBottom: '1px solid var(--bakery-border)' }}>
        <span className="premium-bakery-sec-subtitle">Maison Voices</span>
        <h2 className="premium-bakery-sec-title">Occasion Stories</h2>
        
        <div className="premium-bakery-reviews-grid">
          <div className="premium-bakery-review-card">
            <p className="premium-bakery-review-text">
              "We ordered the Lavender Celebration cake for my daughter's wedding. The texture was incredibly light, and the floral notes were perfectly balanced. Every guest asked where it came from."
            </p>
            <div>
              <span className="premium-bakery-review-author">Sarah Jenkins</span>
              <span className="premium-bakery-review-context">• Wedding Celebration</span>
            </div>
          </div>

          <div className="premium-bakery-review-card">
            <p className="premium-bakery-review-text">
              "The cardamoms are transcendental. Walking in at 8 AM, picking up a warm morning bun, and tasting those cardamoms has become our weekly family ritual. Incredible restraint in the baking."
            </p>
            <div>
              <span className="premium-bakery-review-author">David Vance</span>
              <span className="premium-bakery-review-context">• Sunday Ritual</span>
            </div>
          </div>
        </div>

        {/* Instagram Sim */}
        <div className="premium-bakery-insta-grid">
          <div className="premium-bakery-insta-item">
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80" alt="Insta" className="premium-bakery-insta-img" />
          </div>
          <div className="premium-bakery-insta-item">
            <img src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&auto=format&fit=crop&q=80" alt="Insta" className="premium-bakery-insta-img" />
          </div>
          <div className="premium-bakery-insta-item">
            <img src="https://images.unsplash.com/photo-1587314168485-3236d6710814?w=300&auto=format&fit=crop&q=80" alt="Insta" className="premium-bakery-insta-img" />
          </div>
          <div className="premium-bakery-insta-item">
            <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&auto=format&fit=crop&q=80" alt="Insta" className="premium-bakery-insta-img" />
          </div>
        </div>
      </section>

      {/* Location / Contact Section */}
      <section className="premium-bakery-section" id="contact">
        <div className="premium-bakery-contact-grid">
          <div className="premium-bakery-contact-info">
            <h2 className="premium-bakery-story-title">Visit the Hearth</h2>
            
            <ul className="premium-bakery-contact-list">
              <li>
                <div className="premium-bakery-contact-title"><Clock size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Hours</div>
                <div className="premium-bakery-contact-detail">Tuesday – Sunday • 7:00 AM – 3:00 PM</div>
              </li>
              <li>
                <div className="premium-bakery-contact-title"><MapPin size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Address</div>
                <div className="premium-bakery-contact-detail">148 Mercer St, Soho, New York City</div>
              </li>
              <li>
                <div className="premium-bakery-contact-title"><Phone size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Phone</div>
                <div className="premium-bakery-contact-detail">
                  <a href="tel:+12125550198" style={{ color: 'inherit' }}>+1 (212) 555-0198</a>
                </div>
              </li>
              <li>
                <div className="premium-bakery-contact-title"><Mail size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Email</div>
                <div className="premium-bakery-contact-detail">
                  <a href="mailto:hearth@maison.com" style={{ color: 'inherit' }}>hearth@maison.com</a>
                </div>
              </li>
            </ul>

            <div className="premium-bakery-map-placeholder">
              📍 Map: 148 Mercer St, Soho
            </div>
          </div>

          {/* Simple Contact Form */}
          <div style={{ backgroundColor: 'var(--bakery-bg-card)', padding: '40px', border: '1px solid var(--bakery-border)' }}>
            <h3 className="premium-bakery-serif" style={{ fontSize: '24px', color: 'var(--bakery-dark-accent)', marginBottom: '24px' }}>
              Send a Message
            </h3>
            
            <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="premium-bakery-form-group">
                <label className="premium-bakery-label" htmlFor="contact-name">Name</label>
                <input 
                  type="text" 
                  id="contact-name"
                  required
                  className="premium-bakery-input" 
                  placeholder="Sarah"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
              </div>

              <div className="premium-bakery-form-group">
                <label className="premium-bakery-label" htmlFor="contact-email">Email</label>
                <input 
                  type="email" 
                  id="contact-email"
                  required
                  className="premium-bakery-input" 
                  placeholder="sarah@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
              </div>

              {/* Honeypot Form Security Field */}
              <div className="premium-bakery-form-group bakery-hidden-field">
                <label className="premium-bakery-label" htmlFor="contact-website">Website</label>
                <input 
                  type="text" 
                  id="contact-website"
                  tabIndex="-1"
                  autoComplete="off"
                  className="premium-bakery-input"
                  value={contactForm.honeypot}
                  onChange={(e) => setContactForm({ ...contactForm, honeypot: e.target.value })}
                />
              </div>

              <div className="premium-bakery-form-group">
                <label className="premium-bakery-label" htmlFor="contact-message">Message</label>
                <textarea 
                  id="contact-message"
                  required
                  className="premium-bakery-input" 
                  style={{ minHeight: '100px', resize: 'vertical' }}
                  placeholder="How can we help you..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="premium-bakery-btn premium-bakery-btn-dark">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="premium-bakery-footer">
        <div className="premium-bakery-footer-content">
          <div className="premium-bakery-logo" style={{ fontSize: '20px' }}>Hearth & Harvest</div>
          <div className="premium-bakery-footer-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="premium-bakery-footer-link">Instagram</a>
            <a href="mailto:hearth@maison.com" className="premium-bakery-footer-link">Email</a>
          </div>
          <div className="premium-bakery-footer-copy">
            &copy; {new Date().getFullYear()} Hearth & Harvest Boulangerie. All rights reserved.
          </div>
        </div>
      </footer>

      {/* CUSTOM CAKE BUILDER SUCCESS MODAL */}
      {showCakeModal && (
        <div className="premium-bakery-modal-overlay">
          <div className="premium-bakery-modal">
            <h3 className="premium-bakery-modal-title">Quote Request Received</h3>
            <p className="premium-bakery-modal-text">
              We have received your custom cake builder quote request. Our cake decorator will review the details for <strong>{cakeDate}</strong> (Size: {cakeSize === '6in' ? '6"' : cakeSize === '8in' ? '8"' : '10"'}, Flavor: {cakeFlavor}, Design: {cakeDesign}) and email you the finalized booking invoice.
            </p>
            <div style={{ backgroundColor: '#F5F0E8', padding: '16px', border: '1px solid var(--bakery-border)', textAlign: 'left', fontSize: '13px', color: 'var(--bakery-text-muted)', marginBottom: '24px' }}>
              <strong>Cake Quote Total: ${cakeQuote}.00</strong>
            </div>
            <button className="premium-bakery-btn premium-bakery-btn-dark" onClick={() => setShowCakeModal(false)}>
              Return to Hearth
            </button>
          </div>
        </div>
      )}

      {/* CONTACT FORM SUCCESS MODAL */}
      {showContactModal && (
        <div className="premium-bakery-modal-overlay">
          <div className="premium-bakery-modal">
            <h3 className="premium-bakery-modal-title">Inquiry Sent</h3>
            <p className="premium-bakery-modal-text">
              Thank you, <strong>{contactForm.name}</strong>. Your inquiry has been secured. We will contact you at <strong>{contactForm.email}</strong> within 12 hours.
            </p>
            <button className="premium-bakery-btn premium-bakery-btn-dark" onClick={() => setShowContactModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* INTERACTIVE SHOPPING CART DRAWER (SIDEBAR) */}
      {isCartOpen && (
        <div className="premium-bakery-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="premium-bakery-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="premium-bakery-drawer-header">
              <h3 className="premium-bakery-drawer-title">Your Basket</h3>
              <button className="premium-bakery-drawer-close" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="premium-bakery-empty-cart">
                <ShoppingBag size={48} style={{ strokeWidth: 1, color: 'var(--bakery-accent)' }} />
                <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '18px' }}>Your basket is empty</p>
                <button className="premium-bakery-btn premium-bakery-btn-dark btn-sm" onClick={() => setIsCartOpen(false)}>
                  Browse Offerings
                </button>
              </div>
            ) : (
              <>
                {/* Cart list */}
                <div className="premium-bakery-cart-items-list">
                  {cart.map(item => (
                    <div key={item.id} className="premium-bakery-cart-item">
                      <img src={item.img} alt={item.name} className="premium-bakery-cart-item-img" />
                      <div className="premium-bakery-cart-item-info">
                        <h4 className="premium-bakery-cart-item-title">{item.name}</h4>
                        <div className="premium-bakery-cart-item-price">{item.price} each</div>
                      </div>
                      
                      <div className="premium-bakery-qty-controls">
                        <button className="premium-bakery-qty-btn" onClick={() => handleUpdateQty(item.id, -1)} aria-label="Decrease quantity">
                          <Minus size={12} />
                        </button>
                        <span className="premium-bakery-qty-value">{item.qty}</span>
                        <button className="premium-bakery-qty-btn" onClick={() => handleUpdateQty(item.id, 1)} aria-label="Increase quantity">
                          <Plus size={12} />
                        </button>
                      </div>

                      <button className="premium-bakery-cart-item-remove" onClick={() => handleRemoveItem(item.id)} aria-label="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Subtotal summary */}
                <div className="premium-bakery-drawer-summary">
                  <div className="premium-bakery-toggle-group">
                    <button 
                      type="button"
                      className={`premium-bakery-toggle-btn ${deliveryType === 'pickup' ? 'active' : ''}`}
                      onClick={() => setDeliveryType('pickup')}
                    >
                      Store Pickup
                    </button>
                    <button 
                      type="button"
                      className={`premium-bakery-toggle-btn ${deliveryType === 'delivery' ? 'active' : ''}`}
                      onClick={() => setDeliveryType('delivery')}
                    >
                      Maison Delivery
                    </button>
                  </div>

                  <div className="premium-bakery-summary-row">
                    <span>Subtotal:</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="premium-bakery-summary-row">
                    <span>Est. Tax (8.25%):</span>
                    <span>${getTax().toFixed(2)}</span>
                  </div>
                  {deliveryType === 'delivery' && (
                    <div className="premium-bakery-summary-row">
                      <span>Delivery Fee:</span>
                      <span>$5.00</span>
                    </div>
                  )}
                  <div className="premium-bakery-summary-row total">
                    <span>Total due:</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="premium-bakery-btn premium-bakery-btn-dark"
                    style={{ width: '100%', marginTop: '16px' }}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT SYSTEM FORM MODAL */}
      {isCheckoutOpen && (
        <div className="premium-bakery-modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="premium-bakery-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', textAlign: 'left' }}>
            <div className="premium-bakery-drawer-header" style={{ marginBottom: '20px' }}>
              <h3 className="premium-bakery-drawer-title">Order Checkout</h3>
              <button className="premium-bakery-drawer-close" onClick={() => setIsCheckoutOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="premium-bakery-form">
              <div className="premium-bakery-form-group">
                <label className="premium-bakery-label">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="premium-bakery-input"
                  placeholder="John Miller"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                />
              </div>

              <div className="premium-bakery-form-group">
                <label className="premium-bakery-label">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="premium-bakery-input"
                  placeholder="john@example.com"
                  value={checkoutForm.email}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                />
              </div>

              <div className="premium-bakery-form-group">
                <label className="premium-bakery-label">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  className="premium-bakery-input"
                  placeholder="(212) 555-0198"
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                />
              </div>

              {deliveryType === 'delivery' ? (
                <>
                  <div className="premium-bakery-form-group">
                    <label className="premium-bakery-label">Delivery Address</label>
                    <input 
                      type="text" 
                      required
                      className="premium-bakery-input"
                      placeholder="Apartment, Street Address"
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                    />
                  </div>
                  <div className="premium-bakery-form-group">
                    <label className="premium-bakery-label">ZIP Code</label>
                    <input 
                      type="text" 
                      required
                      maxLength="5"
                      className="premium-bakery-input"
                      placeholder="e.g. 10001"
                      value={checkoutForm.zip}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, zip: e.target.value.replace(/\D/g, '') })}
                    />
                  </div>
                </>
              ) : (
                <div className="premium-bakery-form-group">
                  <label className="premium-bakery-label">Desired Pickup Time (July 2026)</label>
                  <select 
                    className="premium-bakery-input"
                    value={checkoutForm.pickupTime}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, pickupTime: e.target.value })}
                  >
                    <option value="08:00">08:00 AM - Fresh out of Ovens</option>
                    <option value="10:00">10:00 AM - Morning Batch</option>
                    <option value="12:00">12:00 PM - Midday Selection</option>
                    <option value="14:00">02:00 PM - Afternoon Pickup</option>
                  </select>
                </div>
              )}

              {/* Honeypot */}
              <div className="premium-bakery-form-group bakery-hidden-field">
                <input 
                  type="text" 
                  tabIndex="-1" 
                  value={checkoutForm.honeypot} 
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, honeypot: e.target.value })} 
                />
              </div>

              <div className="premium-bakery-form-full" style={{ borderTop: '1px solid var(--bakery-border)', paddingTop: '20px', marginTop: '12px' }}>
                <h4 className="premium-bakery-label" style={{ marginBottom: '12px' }}>Payment Method</h4>
                <div style={{ padding: '12px 16px', border: '1px solid var(--bakery-accent)', backgroundColor: '#fffdfb', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <AlertCircle size={16} style={{ color: 'var(--bakery-accent)', flexShrink: 0 }} />
                  <div style={{ fontSize: '12px', color: 'var(--bakery-text)' }}>
                    <strong>Cash on {deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}</strong> • Online card transactions are coming soon. Pay with cash upon collection.
                  </div>
                </div>
              </div>

              <div className="premium-bakery-form-full" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span className="premium-bakery-price" style={{ fontSize: '20px' }}>Total Due: ${getTotal().toFixed(2)}</span>
                <button type="submit" className="premium-bakery-btn premium-bakery-btn-dark">
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FINAL RECEIPT SCREEN MODAL */}
      {orderReceipt && (
        <div className="premium-bakery-modal-overlay">
          <div className="premium-bakery-modal" style={{ maxWidth: '520px' }}>
            <h3 className="premium-bakery-modal-title" style={{ color: 'var(--bakery-secondary)' }}>Order Confirmed</h3>
            <p className="premium-bakery-modal-text" style={{ marginBottom: '20px' }}>
              Thank you, <strong>{orderReceipt.customer.name}</strong>! Your artisanal bake order has been placed in our baking queue.
            </p>

            <div className="premium-bakery-receipt-card">
              <div className="premium-bakery-receipt-title">
                Hearth & Harvest Boulangerie
                <div style={{ fontSize: '11px', fontWeight: 'normal', color: 'var(--bakery-text-muted)', marginTop: '4px' }}>
                  {orderReceipt.orderNo} • {orderReceipt.date}
                </div>
              </div>

              <table className="premium-bakery-receipt-table">
                <thead>
                  <tr>
                    <th>Item</th>
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

              <div className="premium-bakery-summary-row" style={{ fontSize: '12px' }}>
                <span>Subtotal:</span>
                <span>${orderReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="premium-bakery-summary-row" style={{ fontSize: '12px' }}>
                <span>Tax (8.25%):</span>
                <span>${orderReceipt.tax.toFixed(2)}</span>
              </div>
              {orderReceipt.deliveryFee > 0 && (
                <div className="premium-bakery-summary-row" style={{ fontSize: '12px' }}>
                  <span>Delivery Fee:</span>
                  <span>$5.00</span>
                </div>
              )}
              <div className="premium-bakery-summary-row total" style={{ fontSize: '16px', paddingTop: '8px', marginTop: '8px' }}>
                <span>Amount Due:</span>
                <span>${orderReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--bakery-text-muted)', textAlign: 'left', marginBottom: '24px', backgroundColor: 'var(--bakery-bg-card)', padding: '12px', border: '1px solid var(--bakery-border)' }}>
              {orderReceipt.deliveryType === 'delivery' ? (
                <>
                  🚚 <strong>Delivery Address:</strong> {orderReceipt.customer.address}, ZIP {orderReceipt.customer.zip}. Our driver will arrive between 8 AM – 10 AM. Pay cash at the door.
                </>
              ) : (
                <>
                  🏪 <strong>Store Pickup:</strong> Scheduled for <strong>{orderReceipt.customer.pickupTime}</strong>. Please provide your order number {orderReceipt.orderNo} at our counter.
                </>
              )}
            </div>

            <button className="premium-bakery-btn premium-bakery-btn-dark" onClick={() => setOrderReceipt(null)}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
