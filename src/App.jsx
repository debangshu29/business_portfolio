import { useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Services from './components/Services';
import WhyWebsite from './components/WhyWebsite';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DemoViewer from './components/DemoViewer';
import './portfolio.css';

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const activeDemo = params.get('demo'); // 'bakery' | 'foodtruck' | 'photography' | 'makeup' | 'tattoo' | null

  const cursorRef = useRef(null);

  useEffect(() => {
    // Reset scroll to top on page reload & disable browser auto-scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeDemo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeDemo]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isClickable = target.closest('a') || 
                          target.closest('button') || 
                          target.closest('select') ||
                          target.closest('input') ||
                          target.closest('textarea') ||
                          target.closest('.portfolio-thumbnail-wrapper');
      if (isClickable) {
        cursor.classList.add('hovering');
      } else {
        cursor.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const handleSelectDemo = (demoKey) => {
    const url = `${window.location.origin}${window.location.pathname}?demo=${demoKey}`;
    window.open(url, '_blank');
  };

  const handleCloseDemo = () => {
    window.close();
    // Fallback if window.close() was blocked by browser (e.g. opened directly)
    setTimeout(() => {
      window.location.assign(`${window.location.origin}${window.location.pathname}`);
    }, 100);
  };

  return (
    <>
      {/* Custom cursor dot — always rendered, works in both portfolio and demo views */}
      <div ref={cursorRef} className="custom-cursor" />
      {/* 2-3% noise texture overlay — always rendered */}
      <div className="grain-overlay" />

      {activeDemo ? (
        <DemoViewer activeDemo={activeDemo} onClose={handleCloseDemo} />
      ) : (
        <>
          <Navigation />
          
          <div className="animate-fade-in">
            <Hero />
            <Portfolio onSelectDemo={handleSelectDemo} />
            <About />
            <Process />
            <WhyWebsite />
            <Services />
            <Testimonials />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
