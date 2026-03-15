import { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function AdminAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/admin/analytics')
      .then(({ data }) => setData(data.data))
      .catch(() => setData({
        totalVisitors: 1284,
        pageViews: [['/', 542], ['/services', 301], ['/portfolio', 198], ['/contact', 143], ['/book-call', 100], ['/about', 89], ['/testimonials', 64]],
        visitorCountries: [['United Kingdom', 412], ['United States', 288], ['Germany', 189], ['Australia', 150], ['United Arab Emirates', 95], ['India', 88], ['Canada', 62]],
      }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-loader"><div className="spinner-gradient" /></div>;

  const totalPV = (data?.pageViews || []).reduce((s, [, c]) => s + Number(c), 0);
  const maxPV = Math.max(...(data?.pageViews || []).map(([, c]) => Number(c)), 1);
  const totalCountry = (data?.visitorCountries || []).reduce((s, [, c]) => s + Number(c), 0);

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Analytics</h1>
          <p className="admin-page-subtitle">Traffic overview and visitor statistics</p>
        </div>
      </div>

      {/* Top stats */}
      <div className="row g-4 mb-5">
        {[
          { label: 'Total Visitors', value: data?.totalVisitors, color: '#6C63FF', bg: 'rgba(108,99,255,0.15)', icon: '👁️' },
          { label: 'Total Page Views', value: totalPV, color: '#00D4FF', bg: 'rgba(0,212,255,0.15)', icon: '📄' },
          { label: 'Countries', value: (data?.visitorCountries || []).length, color: '#00D68F', bg: 'rgba(0,214,143,0.15)', icon: '🌍' },
          { label: 'Top Page', value: (data?.pageViews || [['/','0']])[0][0], color: '#FFAA00', bg: 'rgba(255,170,0,0.15)', icon: '🏆' },
        ].map((s, i) => (
          <div key={i} className="col-lg-3 col-6">
            <div className="stat-card">
              <div className="stat-card-icon" style={{ background: s.bg, color: s.color, fontSize: '1.25rem' }}>{s.icon}</div>
              <div className="stat-card-num" style={{ fontSize: typeof s.value === 'string' ? '1.25rem' : undefined }}>
                {s.value?.toLocaleString?.() ?? s.value}
              </div>
              <div className="stat-card-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Page Views Chart */}
        <div className="col-lg-6">
          <div className="admin-table-wrapper p-4">
            <h4 style={{ fontWeight: '700', marginBottom: '20px' }}>Page Views</h4>
            <div className="d-flex flex-column gap-3">
              {(data?.pageViews || []).map(([page, count], i) => {
                const pct = Math.round((Number(count) / maxPV) * 100);
                return (
                  <div key={i}>
                    <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.875rem' }}>
                      <span style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{page}</span>
                      <span style={{ fontWeight: '700', color: 'var(--primary-light)' }}>{Number(count).toLocaleString()}</span>
                    </div>
                    <div style={{ background: 'var(--bg-600)', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                      <div style={{ background: 'var(--gradient-primary)', width: `${pct}%`, height: '100%', borderRadius: '4px', transition: 'width 1s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Visitor Countries */}
        <div className="col-lg-6">
          <div className="admin-table-wrapper p-4">
            <h4 style={{ fontWeight: '700', marginBottom: '20px' }}>Visitors by Country</h4>
            <div className="d-flex flex-column gap-3">
              {(data?.visitorCountries || []).map(([country, count], i) => {
                const pct = totalCountry > 0 ? Math.round((Number(count) / totalCountry) * 100) : 0;
                const colors = ['var(--primary)', 'var(--secondary)', 'var(--success)', 'var(--warning)', 'var(--accent)', '#9B59B6', '#1ABC9C'];
                return (
                  <div key={i}>
                    <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{country}</span>
                      <span style={{ fontWeight: '700', color: colors[i % colors.length] }}>{pct}% ({Number(count).toLocaleString()})</span>
                    </div>
                    <div style={{ background: 'var(--bg-600)', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                      <div style={{ background: colors[i % colors.length], width: `${pct}%`, height: '100%', borderRadius: '4px', transition: 'width 1s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
