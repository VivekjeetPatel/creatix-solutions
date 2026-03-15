import { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiGrid, FiMail, FiCalendar, FiStar, FiBriefcase, FiBarChart2, FiUsers, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

// Admin pages (lazy-ish)
import Dashboard from './pages/Dashboard';
import ContactRequests from './pages/ContactRequests';
import CallBookings from './pages/CallBookings';
import AdminTestimonials from './pages/AdminTestimonials';
import AdminPortfolio from './pages/AdminPortfolio';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminTeam from './pages/AdminTeam';
import AdminServices from './pages/AdminServices';

const navItems = [
  { to: 'dashboard', icon: <FiGrid />, label: 'Dashboard' },
  { to: 'messages', icon: <FiMail />, label: 'Contact Requests' },
  { to: 'bookings', icon: <FiCalendar />, label: 'Call Bookings' },
  { to: 'testimonials', icon: <FiStar />, label: 'Testimonials' },
  { to: 'portfolio', icon: <FiBriefcase />, label: 'Portfolio' },
  { to: 'analytics', icon: <FiBarChart2 />, label: 'Analytics' },
  { to: 'team', icon: <FiUsers />, label: 'Team Members' },
  { to: 'services', icon: <FiSettings />, label: 'Services' },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }}
             onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <span className="gradient-text">Creatix</span><span style={{ color: 'var(--secondary)' }}>.</span>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 400, marginTop: '2px' }}>Admin Panel</div>
        </div>

        <nav className="admin-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={`/admin/${item.to}`}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '8px' }}>
            {admin?.email}
          </div>
          <button className="admin-nav-item" style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={handleLogout}>
            <span className="nav-icon"><FiLogOut /></span> Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {/* Mobile header */}
        <div className="d-lg-none mb-4 d-flex align-items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px 12px', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <FiMenu />
          </button>
          <span style={{ fontWeight: '700' }}>Admin Panel</span>
        </div>

        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="messages" element={<ContactRequests />} />
          <Route path="bookings" element={<CallBookings />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="team" element={<AdminTeam />} />
          <Route path="services" element={<AdminServices />} />
        </Routes>
      </main>
    </div>
  );
}
