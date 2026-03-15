import { Link } from 'react-router-dom';
import { FiArrowRight, FiGlobe, FiUsers, FiAward, FiTarget } from 'react-icons/fi';

const team = [
  { name: 'Alex Thompson', role: 'Lead Software Architect', exp: '10+', emoji: '👨‍💻', lead: true },
  { name: 'Sarah Mitchell', role: 'Senior React Developer', exp: '6', emoji: '👩‍🦰' },
  { name: 'Mohammed Hassan', role: 'Java Backend Engineer', exp: '5', emoji: '👨‍🔬' },
  { name: 'Priya Sharma', role: 'WordPress & Shopify Dev', exp: '4', emoji: '👩‍💼' },
  { name: 'Luke Evans', role: 'Graphic Designer', exp: '5', emoji: '🎨' },
  { name: 'Zoe Williams', role: 'Social Media Strategist', exp: '3', emoji: '📱' },
  { name: 'David Park', role: 'DevOps & Cloud Engineer', exp: '4', emoji: '☁️' },
];

const expertise = [
  'Java / Spring Boot', 'React.js', 'WordPress', 'Shopify / Liquid',
  'PostgreSQL / MySQL', 'REST APIs', 'AWS / VPS Deployment', 'Docker',
  'Brand Identity', 'SEO Optimization', 'Social Media Strategy', 'Figma / Adobe',
];

export default function About() {
  return (
    <>
      {/* Page Header */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-800)' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="section-tag">Who We Are</div>
              <h1 className="section-title">
                A Team That <span className="gradient-text">Lives & Breathes</span> Digital
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Creatix Solutions is a UK-based digital agency with a global footprint. We're a team
                of 6–7 passionate developers led by a 10+ year veteran in software architecture — and
                we exist to make your digital presence extraordinary.
              </p>
              <Link to="/contact" className="btn-primary-gradient" style={{ padding: '14px 32px' }}>
                Work With Us <FiArrowRight />
              </Link>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="row g-3">
                {[
                  { icon: <FiGlobe />, label: 'Global Reach', desc: 'Serving clients across UK, EU, US & Middle East', color: 'var(--secondary)' },
                  { icon: <FiUsers />, label: 'Tight-Knit Team', desc: '6–7 specialist developers, no outsourcing', color: 'var(--primary)' },
                  { icon: <FiAward />, label: '10+ Years Experience', desc: 'Led by a veteran software architect', color: 'var(--warning)' },
                  { icon: <FiTarget />, label: 'Results Driven', desc: 'We measure success by your growth', color: 'var(--success)' },
                ].map((item, i) => (
                  <div key={i} className="col-6">
                    <div className="glass-card p-4 h-100" style={{ textAlign: 'left' }}>
                      <div style={{ color: item.color, fontSize: '1.5rem', marginBottom: '10px' }}>{item.icon}</div>
                      <div style={{ fontWeight: '700', marginBottom: '4px' }}>{item.label}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="page-section-sm" style={{ background: 'var(--bg-700)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="row g-3 text-center">
            {[
              { num: '100+', label: 'Projects Completed' },
              { num: '50+', label: 'Happy Clients' },
              { num: '6+', label: 'Countries Served' },
              { num: '10+', label: 'Years in Industry' },
            ].map((s, i) => (
              <div key={i} className="col-6 col-md-3" data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="about-stat">
                  <div className="about-stat-num gradient-text">{s.num}</div>
                  <div className="about-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="page-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="glass-card p-5 text-center">
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎯</div>
                <h3 style={{ marginBottom: '16px' }}>Our Mission</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                  To empower businesses of all sizes with world-class digital solutions —
                  building not just websites or software, but <strong style={{ color: 'var(--primary-light)' }}>
                    competitive advantages
                  </strong> that drive sustainable growth.
                </p>
              </div>
            </div>
            <div className="col-lg-7" data-aos="fade-left">
              <div className="section-tag">Expertise Areas</div>
              <h2 className="section-title mb-4">Technologies We <span className="gradient-text">Master</span></h2>
              <div className="d-flex flex-wrap">
                {expertise.map((skill) => (
                  <div key={skill} className="expertise-tag">
                    <span className="check">✓</span> {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="page-section" style={{ background: 'var(--bg-800)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <div className="section-tag">The Crew</div>
            <h2 className="section-title">Meet the <span className="gradient-text">Experts</span></h2>
          </div>
          <div className="row g-4">
            {team.map((member, i) => (
              <div key={i} className="col-lg-3 col-md-4 col-6" data-aos="fade-up" data-aos-delay={i * 60}>
                <div className="glass-card p-4 text-center h-100">
                  <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{member.emoji}</div>
                  {member.lead && (
                    <div style={{
                      display: 'inline-block', background: 'rgba(108,99,255,0.15)',
                      color: 'var(--primary-light)', borderRadius: '100px',
                      padding: '2px 10px', fontSize: '0.7rem', fontWeight: '600',
                      marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'
                    }}>Team Lead</div>
                  )}
                  <div style={{ fontWeight: '700', marginBottom: '4px' }}>{member.name}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '8px' }}>{member.role}</div>
                  <div style={{ color: 'var(--primary-light)', fontWeight: '700', fontSize: '0.85rem' }}>
                    {member.exp} yrs exp
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
