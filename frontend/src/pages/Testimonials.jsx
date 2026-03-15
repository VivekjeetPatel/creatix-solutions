import { useState, useEffect } from 'react';
import api from '../utils/api';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const fallbackTestimonials = [
  { id: 1, clientName: 'James Mitchell', company: 'TechVentures UK', review: 'Creatix delivered exactly what we envisioned — a stunning, high-performance web application. Professional and responsive throughout.', rating: 5 },
  { id: 2, clientName: 'Sophia Andersson', company: 'Nordic Retail Group', review: 'Our Shopify store went from average to exceptional. Sales increased 40% within the first month after launch. Incredible work!', rating: 5 },
  { id: 3, clientName: 'Ahmed Al-Rashid', company: 'Gulf Enterprises Co.', review: 'The custom software system they built transformed our operations. Clean code, great documentation, and delivered on time.', rating: 5 },
  { id: 4, clientName: 'Emily Clarke', company: 'Clarke GFX Studio', review: 'Our brand identity redesign was everything we hoped for. Modern, sleek and uniquely ours. Will work with Creatix again!', rating: 4 },
  { id: 5, clientName: 'David Kim', company: 'StartUp Labs NYC', review: 'From WordPress site to full-stack platform — Creatix handled everything seamlessly. Outstanding technical team.', rating: 5 },
];

function StarRating({ rating }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ opacity: i < rating ? 1 : 0.3 }}>★</span>
      ))}
    </div>
  );
}

function TestimonialCard({ t }) {
  const initials = t.clientName.split(' ').map((n) => n[0]).join('').slice(0, 2);
  return (
    <div className="testimonial-card mx-2">
      <StarRating rating={t.rating} />
      <p className="testimonial-text">"{t.review}"</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar">{initials}</div>
        <div>
          <div className="testimonial-name">{t.clientName}</div>
          <div className="testimonial-company">{t.company}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
    api.get('/api/public/testimonials')
      .then(({ data }) => {
        if (data?.data?.length) setTestimonials(data.data);
      })
      .catch(() => {});
  }, []);

  const sliderSettings = {
    dots: true, infinite: true, speed: 600,
    slidesToShow: 2, slidesToScroll: 1, autoplay: true, autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
  };

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-800)' }}>
        <div className="container text-center">
          <div className="section-tag" data-aos="fade-up">Client Reviews</div>
          <h1 className="section-title" data-aos="fade-up" data-aos-delay="100">
            What Our Clients <span className="gradient-text">Say</span>
          </h1>
          <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
            Don't take our word for it — here's what the people we work with have to say.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="page-section-sm" style={{ background: 'var(--bg-700)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="row g-3 text-center">
            {[
              { num: '5.0', label: 'Average Rating', icon: '⭐' },
              { num: '50+', label: 'Happy Clients', icon: '😊' },
              { num: '100%', label: 'Would Recommend', icon: '👍' },
              { num: '3+', label: 'Continents Served', icon: '🌍' },
            ].map((s, i) => (
              <div key={i} className="col-6 col-md-3" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="about-stat">
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{s.icon}</div>
                  <div className="about-stat-num gradient-text">{s.num}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slider */}
      <section className="page-section">
        <div className="container">
          <div data-aos="fade-up">
            <Slider {...sliderSettings}>
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} t={t} />
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Grid fallback / all reviews */}
      <section className="page-section" style={{ background: 'var(--bg-800)', paddingTop: '0' }}>
        <div className="container">
          <h3 className="text-center mb-5" style={{ fontWeight: '700' }}>All <span className="gradient-text">Reviews</span></h3>
          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div key={t.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={i * 70}>
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
