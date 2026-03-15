import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaCode, FaWordpress, FaShopify, FaPalette, FaInstagram } from 'react-icons/fa';
import { FiGlobe } from 'react-icons/fi';

const services = [
  {
    icon: <FaCode />, title: 'Custom Software Development', color: '#6C63FF',
    desc: 'We architect and build enterprise-grade software solutions tailored to your exact business requirements — from backend APIs to full-stack platforms.',
    features: ['Java Spring Boot systems', 'Full-stack applications', 'Enterprise systems', 'API integrations', 'System architecture consulting'],
  },
  {
    icon: <FiGlobe />, title: 'Web Development', color: '#00D4FF',
    desc: 'Blazing-fast, beautifully designed websites and web applications built with modern React and robust backends.',
    features: ['React websites & PWAs', 'Full-stack applications', 'REST API development', 'Performance optimization', 'SEO-ready builds'],
  },
  {
    icon: <FaWordpress />, title: 'WordPress Development', color: '#00B4D8',
    desc: 'Custom WordPress solutions that go far beyond templates — fully bespoke themes, plugins, and high-performance CMS setups.',
    features: ['Custom theme development', 'Plugin development', 'Business websites', 'WooCommerce stores', 'Speed & performance tuning'],
  },
  {
    icon: <FaShopify />, title: 'Shopify Development', color: '#96BF48',
    desc: 'End-to-end Shopify store creation and optimization designed to convert visitors into customers and grow your revenue.',
    features: ['Custom Shopify themes', 'Store setup & optimization', 'App integration', 'Product & collection setup', 'Conversion rate optimization'],
  },
  {
    icon: <FaPalette />, title: 'Graphic Design', color: '#FF6B6B',
    desc: 'Premium visual design that elevates your brand identity and creates lasting impressions across all platforms.',
    features: ['Logo & brand identity', 'Poster & banner design', 'Social media graphics', 'Brand style guides', 'Print design'],
  },
  {
    icon: <FaInstagram />, title: 'Social Media Management', color: '#E1306C',
    desc: 'Strategic, data-driven social media management that builds your audience and turns followers into loyal clients.',
    features: ['Instagram management', 'Content creation & design', 'Brand growth strategies', 'Analytics & reporting', 'Paid advertising'],
  },
];

export default function Services() {
  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-800)' }}>
        <div className="container text-center">
          <div className="section-tag" data-aos="fade-up">What We Do</div>
          <h1 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Services Built to <span className="gradient-text">Grow Your Business</span>
          </h1>
          <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
            Six specialised services, one expert team. We cover every digital need your business has.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="page-section">
        <div className="container">
          <div className="row g-4">
            {services.map((svc, i) => (
              <div key={i} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="service-card h-100">
                  <div className="service-icon-wrapper" style={{ color: svc.color }}>
                    {svc.icon}
                  </div>
                  <h4>{svc.title}</h4>
                  <p>{svc.desc}</p>
                  <ul className="service-features-list">
                    {svc.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <div className="mt-auto pt-3">
                    <Link to="/contact" className="btn-outline-glass" style={{ padding: '10px 24px', fontSize: '0.875rem' }}>
                      Get Quote <FiArrowRight />
                    </Link>
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
          <h2 className="section-title mb-3">Let's Talk About <span className="gradient-text">Your Project</span></h2>
          <p className="section-subtitle mx-auto mb-4">Not sure which service fits? Book a free discovery call and we'll guide you.</p>
          <Link to="/book-call" className="btn-primary-gradient" style={{ padding: '16px 40px', fontSize: '1.05rem' }}>
            Book a Free Call <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
