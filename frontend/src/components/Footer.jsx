import { Link } from 'react-router-dom';
import { FiInstagram, FiLinkedin, FiTwitter, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const footerLinks = {
  Company: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Portfolio', to: '/portfolio' },
  ],
  Services: [
    { label: 'Web Development', to: '/services' },
    { label: 'Custom Software', to: '/services' },
    { label: 'WordPress', to: '/services' },
    { label: 'Shopify Stores', to: '/services' },
  ],
  'Get in Touch': [
    { label: 'Contact Us', to: '/contact' },
    { label: 'Book a Call', to: '/book-call' },
    { label: 'Client Reviews', to: '/testimonials' },
  ],
};

export default function Footer() {
  return (
    <footer className="creatix-footer">
      <div className="container">
        <div className="row g-4">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand gradient-text">Creatix.</div>
            <p className="footer-desc">
              Premium digital agency based in the United Kingdom. We build world-class
              websites, software, and brands that grow businesses globally.
            </p>
            <div className="d-flex gap-3">
              {[
                { icon: <FiLinkedin />, href: '#' },
                { icon: <FiInstagram />, href: '#' },
                { icon: <FiTwitter />, href: '#' },
                { icon: <FiFacebook />, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} className="footer-social-link" target="_blank" rel="noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="col-lg-2 col-md-3 col-6">
              <div className="footer-heading">{heading}</div>
              {links.map((link) => (
                <Link key={link.label} to={link.to} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          {/* Contact */}
          <div className="col-lg-2 col-md-3">
            <div className="footer-heading">Contact</div>
            <div className="footer-contact-item">
              <FiMail className="icon" />
              <span>hello@creatix.co.uk</span>
            </div>
            <div className="footer-contact-item">
              <FiPhone className="icon" />
              <span>+44 20 7946 0958</span>
            </div>
            <div className="footer-contact-item">
              <FiMapPin className="icon" />
              <span>London, United Kingdom</span>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <p className="footer-copy mb-0">
            © {new Date().getFullYear()} Creatix Solutions Ltd. All rights reserved.
          </p>
          <div className="d-flex gap-4">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a key={item} href="#" className="footer-copy" style={{ textDecoration: 'none' }}
                 onMouseEnter={(e) => e.target.style.color = 'var(--primary-light)'}
                 onMouseLeave={(e) => e.target.style.color = ''}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
