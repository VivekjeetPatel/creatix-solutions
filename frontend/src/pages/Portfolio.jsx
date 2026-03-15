import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiArrowRight } from 'react-icons/fi';

const allProjects = [
  { id: 1, name: 'FinTrack Pro', category: 'SOFTWARE', desc: 'Enterprise financial tracking system with real-time analytics and role-based access.', tech: 'Java · React · MySQL', emoji: '📊', client: 'FinTrack Ltd' },
  { id: 2, name: 'NordicShop', category: 'SHOPIFY', desc: 'Custom Shopify theme with advanced filtering, multi-currency support and speed optimization.', tech: 'Shopify · Liquid · JS', emoji: '🛍️', client: 'Nordic Retail Group' },
  { id: 3, name: 'BrandWave Identity Package', category: 'BRANDING', desc: 'Complete brand identity: logo, color system, typography guide, and brand manual.', tech: 'Illustrator · Photoshop', emoji: '🎨', client: 'BrandWave Agency' },
  { id: 4, name: 'LegalEase Website', category: 'WEB', desc: 'Modern law firm website with appointment booking, case tracker, and blog CMS.', tech: 'React · Spring Boot · PG', emoji: '⚖️', client: 'LegalEase Partners' },
  { id: 5, name: 'EduCraft Platform', category: 'WORDPRESS', desc: 'Education platform with LMS, student portal, and integrated payment gateways.', tech: 'WordPress · WooCommerce', emoji: '📚', client: 'EduCraft Academy' },
  { id: 6, name: 'SocialBlitz Graphics', category: 'GRAPHIC_DESIGN', desc: '50+ social media assets: stories, reel covers, and ad banners for a full campaign.', tech: 'Photoshop · Figma', emoji: '📸', client: 'SocialBlitz Agency' },
  { id: 7, name: 'HealthPulse App', category: 'SOFTWARE', desc: 'Healthcare management system with appointment scheduling and patient records.', tech: 'Spring Boot · React · PG', emoji: '🏥', client: 'HealthPulse UK' },
  { id: 8, name: 'FreshBites Store', category: 'SHOPIFY', desc: 'Food & beverage Shopify store with subscription boxes and loyalty rewards.', tech: 'Shopify · Liquid', emoji: '🥗', client: 'FreshBites Ltd' },
];

const categories = [
  { key: 'ALL', label: 'All Work' },
  { key: 'WEB', label: 'Web Dev' },
  { key: 'SOFTWARE', label: 'Software' },
  { key: 'SHOPIFY', label: 'Shopify' },
  { key: 'WORDPRESS', label: 'WordPress' },
  { key: 'GRAPHIC_DESIGN', label: 'Graphic Design' },
  { key: 'BRANDING', label: 'Branding' },
];

const categoryColors = {
  WEB: '#00D4FF', SOFTWARE: '#6C63FF', SHOPIFY: '#96BF48',
  WORDPRESS: '#00B4D8', GRAPHIC_DESIGN: '#FF6B6B', BRANDING: '#FFAA00',
};

export default function Portfolio() {
  const [active, setActive] = useState('ALL');
  const filtered = active === 'ALL' ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-800)' }}>
        <div className="container text-center">
          <div className="section-tag" data-aos="fade-up">Our Work</div>
          <h1 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Projects We're <span className="gradient-text">Proud Of</span>
          </h1>
          <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
            A selection from our portfolio across web development, software, design, and ecommerce.
          </p>
        </div>
      </section>

      {/* Portfolio */}
      <section className="page-section">
        <div className="container">
          {/* Filter Tabs */}
          <div className="filter-tabs" data-aos="fade-up">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`filter-tab ${active === cat.key ? 'active' : ''}`}
                onClick={() => setActive(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="row g-4">
            {filtered.map((project, i) => (
              <div key={project.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={i * 70}>
                <div className="portfolio-card h-100">
                  <div className="portfolio-img" style={{ background: `linear-gradient(135deg, ${categoryColors[project.category]}22, ${categoryColors[project.category]}11)` }}>
                    <span style={{ fontSize: '4rem' }}>{project.emoji}</span>
                  </div>
                  <div className="portfolio-body">
                    <div className="portfolio-category-badge" style={{ color: categoryColors[project.category], background: `${categoryColors[project.category]}22` }}>
                      {project.category.replace('_', ' ')}
                    </div>
                    <h5>{project.name}</h5>
                    <p className="mb-2">{project.desc}</p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      Client: {project.client}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: '600' }}>
                      {project.tech}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section-sm" style={{ background: 'var(--bg-800)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container text-center" data-aos="zoom-in">
          <h2 className="section-title mb-3">Want to Be Our <span className="gradient-text">Next Case Study?</span></h2>
          <p className="section-subtitle mx-auto mb-4">Let's build something remarkable together.</p>
          <Link to="/book-call" className="btn-primary-gradient" style={{ padding: '16px 40px', fontSize: '1.05rem' }}>
            Start a Project <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
