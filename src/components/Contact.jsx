import { useState } from 'react';
import { Send, CheckCircle2, Copy, Check } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessType: 'Bakery',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ghosh.debangshu02@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const subject = encodeURIComponent(`Website inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Project Category: ${formData.businessType}`,
        '',
        formData.message
      ].join('\n')
    );

    window.location.href = `mailto:ghosh.debangshu02@gmail.com?subject=${subject}&body=${body}`;

    setIsSubmitted(true);
    setLoading(false);
    setFormData({
      name: '',
      email: '',
      businessType: 'Bakery',
      message: ''
    });
  };

  return (
    <section id="contact" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="contact-grid">
          <div style={{ textAlign: 'left' }}>
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title" style={{ fontSize: '42px', fontWeight: 300 }}>
              Let's build something quiet and powerful.
            </h2>
            <p className="section-subtitle" style={{ maxWidth: '420px', fontSize: '15px' }}>
              Have questions about pricing, features, or the timeline? Drop me a line and let's discuss how we can get your business online.
            </p>
            
            <div style={{ marginTop: '32px' }}>
              <span className="form-label" style={{ display: 'block', marginBottom: '8px' }}>Direct Email</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <a href="mailto:ghosh.debangshu02@gmail.com" className="contact-email-large">
                  ghosh.debangshu02@gmail.com
                </a>
                <button 
                  onClick={handleCopyEmail}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px', marginTop: '16px' }}
                  title="Copy Email"
                >
                  {copied ? <Check size={18} style={{ color: 'var(--accent-gold)' }} /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '48px', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
              🇮🇳 BASED IN INDIA • DESIGNING WORLDWIDE
            </div>
          </div>

          <div>
            {isSubmitted ? (
              <div className="animate-fade-in" style={{ padding: '40px 0', textAlign: 'left' }}>
                <CheckCircle2 size={44} style={{ color: 'var(--accent-gold)', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '22px', fontFamily: 'var(--font-serif)', fontWeight: 300, marginBottom: '12px' }}>Inquiry Received.</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
                  Your email app should now be open with the inquiry prepared. Send it there, and I will get back to you within 24 hours.
                </p>
                <button className="form-submit-btn" onClick={() => setIsSubmitted(false)}>
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="e.g. Sarah Jenkins"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="e.g. sarah@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="businessType">Project Category</label>
                  <select
                    id="businessType"
                    className="form-control"
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                  >
                    <option value="Bakery">Home-based Bakery</option>
                    <option value="FoodTruck">Food Truck</option>
                    <option value="Photography">Wedding Photographer</option>
                    <option value="Makeup">Makeup Artist</option>
                    <option value="Tattoo">Tattoo Artist</option>
                    <option value="Other">Other Creative Business</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message Details</label>
                  <textarea
                    id="message"
                    className="form-control"
                    placeholder="Tell me a bit about your business and your website requirements..."
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                <button type="submit" className="form-submit-btn" disabled={loading}>
                  {loading ? 'Sending...' : (
                    <>
                      Submit Inquiry
                      <Send size={12} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
