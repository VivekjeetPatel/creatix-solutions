import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/testimonials', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`creatix-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Brand */}
          <Link to="/" className="navbar-brand gradient-text text-decoration-none">
            Creatix<span className="brand-dot">.</span>
          </Link>

          {/* Desktop Nav */}
          <div className="d-none d-lg-flex align-items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            <Link to="/book-call" className="btn-primary-gradient" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
              Book a Call <FiArrowRight />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="d-lg-none btn p-0 border-0"
            style={{ color: 'var(--text-primary)', background: 'none', fontSize: '1.5rem' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="navbar-collapse mt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav-link d-block py-2 ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/book-call"
              className="btn-primary-gradient d-inline-flex mt-3"
              style={{ padding: '10px 24px', fontSize: '0.9rem' }}
              onClick={() => setMenuOpen(false)}
            >
              Book a Call <FiArrowRight />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
