import { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function CallBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.get('/api/admin/bookings')
      .then(({ data }) => setBookings(data.data?.content || data.data || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id, status) => {
    await api.put(`/api/admin/bookings/${id}/status?status=${status}`);
    load();
  };

  const statusBadge = (s) => {
    const map = { PENDING: 'badge-pending', CONFIRMED: 'badge-confirmed', CANCELLED: 'badge-cancelled' };
    return <span className={`badge-status ${map[s] || 'badge-pending'}`}>{s}</span>;
  };

  if (loading) return <div className="page-loader"><div className="spinner-gradient" /></div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Call Bookings</h1>
          <p className="admin-page-subtitle">{bookings.length} total bookings</p>
        </div>
      </div>

      <div className="admin-table-wrapper">
        {bookings.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>📅 No call bookings yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Date</th><th>Time</th><th>Status</th><th>Project</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td style={{ fontWeight: '600' }}>{b.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{b.email}</td>
                  <td>{b.preferredDate}</td>
                  <td>{b.preferredTime}</td>
                  <td>{statusBadge(b.status)}</td>
                  <td style={{ color: 'var(--text-secondary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
                    {b.projectDescription || '—'}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      {b.status === 'PENDING' && (
                        <>
                          <button onClick={() => updateStatus(b.id, 'CONFIRMED')} style={{ background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', color: 'var(--success)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>✓ Confirm</button>
                          <button onClick={() => updateStatus(b.id, 'CANCELLED')} style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: 'var(--accent)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>✕ Cancel</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
