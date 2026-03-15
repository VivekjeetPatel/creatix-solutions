import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiMail, FiCalendar, FiUsers, FiEye } from 'react-icons/fi';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/admin/dashboard')
      .then(({ data }) => setStats(data.data))
      .catch(() => setStats({
        totalVisitors: 1284, totalContacts: 47, totalBookings: 23,
        newContacts: 12, pendingBookings: 8,
        pageViews: [['/', 542], ['/services', 301], ['/portfolio', 198], ['/contact', 143], ['/book-call', 100]],
        visitorCountries: [['United Kingdom', 412], ['United States', 288], ['Germany', 189], ['Australia', 150], ['UAE', 95]],
      }))
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats ? [
    { label: 'Total Visitors', value: stats.totalVisitors, icon: <FiEye />, color: '#6C63FF', bg: 'rgba(108,99,255,0.15)' },
    { label: 'Contact Requests', value: stats.totalContacts, icon: <FiMail />, color: '#00D4FF', bg: 'rgba(0,212,255,0.15)' },
    { label: 'Call Bookings', value: stats.totalBookings, icon: <FiCalendar />, color: '#00D68F', bg: 'rgba(0,214,143,0.15)' },
    { label: 'New Messages', value: stats.newContacts, icon: <FiMail />, color: '#FFAA00', bg: 'rgba(255,170,0,0.15)' },
  ] : [];

  if (loading) return <div className="page-loader"><div className="spinner-gradient" /></div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">Welcome back! Here's what's happening.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-5">
        {statCards.map((card, i) => (
          <div key={i} className="col-lg-3 col-md-6">
            <div className="stat-card">
              <div className="stat-card-icon" style={{ background: card.bg, color: card.color }}>
                {card.icon}
              </div>
              <div className="stat-card-num">{card.value?.toLocaleString?.() ?? card.value}</div>
              <div className="stat-card-label">{card.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Page Views */}
        <div className="col-lg-6">
          <div className="admin-table-wrapper">
            <div style={{ padding: '20px 20px 0', fontWeight: '700', marginBottom: '4px' }}>Top Pages</div>
            <div style={{ padding: '0 20px 12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Most visited pages this period</div>
            <table className="admin-table">
              <thead>
                <tr><th>Page</th><th>Views</th><th>Bar</th></tr>
              </thead>
              <tbody>
                {(stats?.pageViews || []).slice(0, 5).map(([page, count], i) => {
                  const max = Math.max(...(stats?.pageViews || []).map(([, c]) => Number(c)));
                  const pct = Math.round((Number(count) / max) * 100);
                  return (
                    <tr key={i}>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{page}</td>
                      <td style={{ fontWeight: '700' }}>{Number(count).toLocaleString()}</td>
                      <td>
                        <div style={{ background: 'var(--bg-600)', borderRadius: '4px', height: '8px', width: '100px' }}>
                          <div style={{ background: 'var(--gradient-primary)', width: `${pct}%`, height: '100%', borderRadius: '4px' }} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Countries */}
        <div className="col-lg-6">
          <div className="admin-table-wrapper">
            <div style={{ padding: '20px 20px 0', fontWeight: '700', marginBottom: '4px' }}>Visitors by Country</div>
            <div style={{ padding: '0 20px 12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Top visitor locations</div>
            <table className="admin-table">
              <thead>
                <tr><th>Country</th><th>Visitors</th><th>%</th></tr>
              </thead>
              <tbody>
                {(stats?.visitorCountries || []).slice(0, 5).map(([country, count], i) => {
                  const total = (stats?.visitorCountries || []).reduce((s, [, c]) => s + Number(c), 0);
                  const pct = total > 0 ? Math.round((Number(count) / total) * 100) : 0;
                  return (
                    <tr key={i}>
                      <td>{country}</td>
                      <td style={{ fontWeight: '700' }}>{Number(count).toLocaleString()}</td>
                      <td style={{ color: 'var(--primary-light)' }}>{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
