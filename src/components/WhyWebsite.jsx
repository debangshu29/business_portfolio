import { useState } from 'react';
import { EyeOff, Search, Info } from 'lucide-react';

export default function WhyWebsite() {
  const [searchQuery, setSearchQuery] = useState('Photographer near me');

  const searchScenarios = {
    'Photographer near me': {
      visible: {
        title: "Luna & Co Photography | Local Wedding Photographer",
        url: "www.lunaandcophoto.com",
        snippet: "Documenting organic wedding stories. View packages, check wedding dates availability, and book consultation online.",
        rating: "5.0 ★★★★★ (18 reviews)"
      },
      invisibleName: "@luna.co.photos (Instagram-only)"
    },
    'Bakery near me': {
      visible: {
        title: "Sweet Crumbs Bakery | Custom Cakes & Treat Boxes",
        url: "www.sweetcrumbsbakery.com",
        snippet: "Freshly baked artisan treats in Austin. Order custom treats box, browse menu online, and read local pickup details.",
        rating: "4.9 ★★★★★ (32 reviews)"
      },
      invisibleName: "@sweetcrumbs_bakery (Instagram-only)"
    }
  };

  const currentScenario = searchScenarios[searchQuery] || searchScenarios['Photographer near me'];

  return (
    <section id="why-website" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="why-website-grid">
          {/* Left Column */}
          <div style={{ textAlign: 'left' }}>
            <span className="section-tag">Why A Website?</span>
            <h2 className="section-title">Social media is not enough anymore</h2>
            <p className="section-subtitle" style={{ marginBottom: '40px', fontSize: '15px' }}>
              Instagram is amazing for showing off pretty pictures, but it's not a tool built to capture serious local business search queries.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--portfolio-accent)', fontWeight: 'bold', lineHeight: 1 }}>62%</span>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Ignore You Without a Site</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>A recent study shows 62% of consumers will ignore a local business if they cannot find their website online.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--portfolio-accent)', fontWeight: 'bold', lineHeight: 1 }}>84%</span>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Immediate Trust Boost</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>84% of consumers agree that a business with its own website is far more credible than one with only an Instagram page.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <span style={{ fontSize: '32px', fontFamily: 'var(--font-serif)', color: 'var(--portfolio-accent)', fontWeight: 'bold', lineHeight: 1 }}>10x</span>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>Google Maps Visibility</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Over 80% of local buying decisions begin on Google Search, not Instagram. A custom domain maps your craft to local searchers.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Simulator */}
          <div>
            <h4 style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-secondary)', marginBottom: '20px', textAlign: 'left' }}>
              Interactive Google Search Simulator
            </h4>
            
            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fbbf24' }}></div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                </div>
                
                <div style={{ flex: 1, backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-subtle)', borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '6px 12px', gap: '8px' }}>
                  <Search size={12} style={{ color: 'var(--text-muted)' }} />
                  <select 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}
                  >
                    <option value="Photographer near me">Search: "Photographer near me"</option>
                    <option value="Bakery near me">Search: "Bakery near me"</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
                {/* Visible result */}
                <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    {currentScenario.visible.url}
                  </div>
                  <div style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--portfolio-accent)', fontWeight: 400, marginBottom: '4px' }}>
                    {currentScenario.visible.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#fbbf24', marginBottom: '8px' }}>
                    {currentScenario.visible.rating}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {currentScenario.visible.snippet}
                  </div>
                </div>

                {/* Invisible result */}
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#ef4444', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>
                    <EyeOff size={16} />
                    <span>Business "{currentScenario.invisibleName}" is hidden from search results.</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Google cannot list Instagram-only pages in local maps because social profiles lack the structured website schema required. Without a dedicated website, you are invisible to local searches.
                  </p>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start', textAlign: 'left' }}>
              <Info size={16} style={{ color: 'var(--portfolio-accent)', flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong>Local Schema Setup:</strong> I register your site on Google Search Console and implement structured schemas so Google understands and indexes your business, placing you directly in front of searchers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
