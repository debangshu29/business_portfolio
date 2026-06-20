import { useState, useEffect } from 'react';
import { Menu, X, Feather, Sun, Moon } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Initialise from localStorage; default to dark
    const saved = localStorage.getItem('portfolio-theme');
    return saved ? saved === 'dark' : true;
  });

  // Apply theme to <html> on mount and on change
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {isMobileMenuOpen && (
        <div className="nav-overlay" onClick={closeMobileMenu} />
      )}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="logo" onClick={closeMobileMenu}>
          <Feather size={20} className="logo-dot" />
          <span>Debangshu</span>
        </a>

        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="#portfolio" className="nav-link" onClick={closeMobileMenu}>Work</a></li>
          <li><a href="#about"     className="nav-link" onClick={closeMobileMenu}>About</a></li>
          <li><a href="#process"   className="nav-link" onClick={closeMobileMenu}>Process</a></li>
          <li><a href="#services"  className="nav-link" onClick={closeMobileMenu}>Services</a></li>
          <li><a href="#why-website" className="nav-link" onClick={closeMobileMenu}>Why Web</a></li>
          <li><a href="#contact"   className="nav-link" onClick={closeMobileMenu}>Contact</a></li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(d => !d)}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="theme-toggle-btn"
          >
            {isDark
              ? <Sun  size={16} />
              : <Moon size={16} />
            }
            <span className="theme-toggle-label">
              {isDark ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button className="nav-mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle navigation menu">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </>
  );
}
