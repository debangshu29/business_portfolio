import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "Debangshu completely transformed our online presence. We went from struggling with messy Instagram DMs to having a streamlined booking flow that fills our calendar automatically.",
      author: "Marcus Vance",
      company: "INK & SOUL STUDIO"
    },
    {
      quote: "The daylight timeline calculator and password-protected galleries on our photography site have saved us hours of back-and-forth. Our clients are wowed before we even shoot.",
      author: "Sarah & Mike",
      company: "LUNA & CO PHOTOGRAPHY"
    },
    {
      quote: "Our custom pre-order drawer cart allows customers to skip the line. The receipt logs locally and saves us so much coordination on busy mornings.",
      author: "Lara & Cole",
      company: "SAGE & SALT KITCHEN"
    }
  ];

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  };

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials">
      <div className="container">
        <div className="testimonials-wrapper animate-fade-in" key={activeIndex}>
          <p className="testimonial-quote">
            {current.quote}
          </p>
          <div className="testimonial-author">
            {current.author}
          </div>
          <span className="testimonial-company">
            {current.company}
          </span>
          
          <div className="testimonial-controls">
            <button className="testimonial-btn" onClick={handlePrev} aria-label="Previous testimonial">
              <ArrowLeft size={18} />
            </button>
            <button className="testimonial-btn" onClick={handleNext} aria-label="Next testimonial">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
