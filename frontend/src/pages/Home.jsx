import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { FiArrowRight, FiCalendar, FiCode, FiGlobe, FiLayers, FiShoppingCart, FiImage, FiInstagram } from 'react-icons/fi';
import { FaCode, FaWordpress, FaShopify } from 'react-icons/fa';

const services = [
  { icon: <FaCode />, title: 'Custom Software', desc: 'Enterprise-grade Java systems, full-stack apps, and scalable architecture.', color: '#6C63FF' },
  { icon: <FiGlobe />, title: 'Web Development', desc: 'Modern React websites and full-stack web applications built for speed.', color: '#00D4FF' },
  { icon: <FaWordpress />, title: 'WordPress', desc: 'Custom themes, plugins, and high-performance WordPress solutions.', color: '#00B4D8' },
  { icon: <FaShopify />, title: 'Shopify Stores', desc: 'Conversion-focused Shopify stores that grow your ecommerce revenue.', color: '#96BF48' },
  { icon: <FiImage />, title: 'Graphic Design', desc: 'Brand identity, logos, posters, and visual assets that stand out.', color: '#FF6B6B' },
  { icon: <FiInstagram />, title: 'Social Media', desc: 'Strategic Instagram management and content design to grow your brand.', color: '#E1306C' },
];

// Floating particles component
function Particles() {
  return (
    <div className="hero-particles">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            background: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero-section" id="hero">
        <Particles />
        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-7" data-aos="fade-right">
              <div className="section-tag mb-4">🇬🇧 UK-Based Digital Agency</div>
              <h1 className="hero-title">
                We Build Digital
                <br />
                <span className="gradient-text">Experiences That</span>
                <br />
                Drive Results
              </h1>
              <p className="hero-subtitle">
                Premium web development, custom software, and creative design services
                for businesses that refuse to settle for average.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/book-call" className="btn-primary-gradient" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                  Book a Free Call <FiArrowRight />
                </Link>
                <Link to="/portfolio" className="btn-outline-glass" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                  View Our Work
                </Link>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                {[
                  { num: '100+', label: 'Projects Delivered' },
                  { num: '50+', label: 'Happy Clients' },
                  { num: '10+', label: 'Years Experience' },
                  { num: '6+', label: 'Countries Served' },
                ].map((stat) => (
                  <div key={stat.num}>
                    <div className="hero-stat-num">{stat.num}</div>
                    <div className="hero-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="col-lg-5 d-none d-lg-block" data-aos="fade-left" data-aos-delay="200">
              <div className="position-relative" style={{ height: '500px' }}>
                {/* Glowing orb */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '300px', height: '300px',
                  background: 'radial-gradient(circle, rgba(108,99,255,0.3) 0%, transparent 70%)',
                  borderRadius: '50%',
                  animation: 'pulse-glow 4s ease-in-out infinite',
                }} />
                {/* Code card float */}
                <div className="glass-card p-4" style={{
                  position: 'absolute', top: '10%', left: '5%', width: '260px',
                  animation: 'float 4s ease-in-out infinite',
                }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--primary-light)' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>// Building the future</div>
                    <div><span style={{ color: 'var(--secondary)' }}>const</span> <span style={{ color: '#FF6B6B' }}>project</span> = {'{'}</div>
                    <div style={{ paddingLeft: '16px' }}>name: <span style={{ color: 'var(--success)' }}>"YourBrand"</span>,</div>
                    <div style={{ paddingLeft: '16px' }}>stack: <span style={{ color: 'var(--success)' }}>"React + Java"</span>,</div>
                    <div style={{ paddingLeft: '16px' }}>status: <span style={{ color: 'var(--success)' }}>"Live 🚀"</span></div>
                    <div>{'}'}</div>
                  </div>
                </div>
                {/* Metric card */}
                <div className="glass-card p-4" style={{
                  position: 'absolute', bottom: '15%', right: '0%', width: '200px',
                  animation: 'float 5s ease-in-out infinite reverse',
                }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '8px' }}>Conversion Rate</div>
                  <div style={{ fontSize: '2rem', fontWeight: '800' }} className="gradient-text">+147%</div>
                  <div style={{ color: 'var(--success)', fontSize: '0.8rem' }}>↑ After redesign</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </section>

      {/* =========================
          SERVICES PREVIEW
      ========================= */}
      <section className="page-section" style={{ background: 'var(--bg-800)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-tag">Our Expertise</div>
            <h2 className="section-title">Services That <span className="gradient-text">Scale</span></h2>
            <p className="section-subtitle mx-auto">
              From concept to launch — we cover every aspect of your digital journey with
              world-class quality and on-time delivery.
            </p>
          </div>

          <div className="row g-4">
            {services.map((svc, i) => (
              <div key={i} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="service-card h-100">
                  <div className="service-icon-wrapper" style={{ color: svc.color }}>
                    {svc.icon}
                  </div>
                  <h4>{svc.title}</h4>
                  <p>{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5" data-aos="fade-up">
            <Link to="/services" className="btn-outline-glass" style={{ padding: '14px 32px' }}>
              Explore All Services <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          WHY CHOOSE US
      ========================= */}
      <section className="page-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="section-tag">Why Creatix</div>
              <h2 className="section-title">The Agency That <span className="gradient-text">Delivers</span></h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                With 10+ years of combined experience, a UK base, and a global client roster,
                we know what it takes to build digital products that actually perform.
              </p>
              {[
                { title: 'Full-Stack Experts', desc: 'Java + React specialists in one team' },
                { title: 'UK-Based & Global', desc: 'Enterprise standards, international reach' },
                { title: 'On-Time Delivery', desc: 'Agile process with transparent timelines' },
                { title: 'Post-Launch Support', desc: 'We don\'t disappear after launch' },
              ].map((p, i) => (
                <div key={i} className="d-flex gap-3 mb-3">
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(108,99,255,0.15)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: 'var(--primary-light)', fontWeight: '700'
                  }}>✓</div>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{p.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{p.desc}</div>
                  </div>
                </div>
              ))}
              <Link to="/about" className="btn-primary-gradient mt-3" style={{ padding: '14px 30px' }}>
                About Our Team <FiArrowRight />
              </Link>
            </div>

            <div className="col-lg-7" data-aos="fade-left">
              <div className="row g-3">
                {[
                  { num: '100+', label: 'Projects Done', icon: '🚀', color: 'var(--primary)' },
                  { num: '50+', label: 'Happy Clients', icon: '😊', color: 'var(--secondary)' },
                  { num: '10+', label: 'Years of Experience', icon: '🏆', color: 'var(--success)' },
                  { num: '24hr', label: 'Response Time', icon: '⚡', color: 'var(--warning)' },
                ].map((item, i) => (
                  <div key={i} className="col-6">
                    <div className="glass-card p-4 text-center">
                      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{item.icon}</div>
                      <div style={{ fontSize: '2rem', fontWeight: '900', color: item.color }}>{item.num}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CTA BANNER
      ========================= */}
      <section className="page-section-sm" style={{
        background: 'linear-gradient(135deg, rgba(108,99,255,0.15) 0%, rgba(0,212,255,0.08) 100%)',
        borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)'
      }}>
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title mb-3">
            Ready to <span className="gradient-text">Transform</span> Your Business?
          </h2>
          <p className="section-subtitle mx-auto mb-4">
            Book a free 30-minute discovery call with our team. No commitment, just genuine advice.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/book-call" className="btn-primary-gradient" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
              <FiCalendar /> Book a Free Call
            </Link>
            <Link to="/contact" className="btn-outline-glass" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
