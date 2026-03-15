import { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function ContactRequests() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    api.get('/api/admin/messages')
      .then(({ data }) => setMessages(data.data?.content || data.data || []))
      .catch(() => setMessages([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id, status) => {
    await api.put(`/api/admin/messages/${id}/status?status=${status}`);
    load();
  };

  const statusBadge = (s) => {
    const map = { NEW: 'badge-new', READ: 'badge-replied', REPLIED: 'badge-confirmed' };
    return <span className={`badge-status ${map[s] || 'badge-new'}`}>{s}</span>;
  };

  if (loading) return <div className="page-loader"><div className="spinner-gradient" /></div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Contact Requests</h1>
          <p className="admin-page-subtitle">{messages.length} total submissions</p>
        </div>
      </div>

      <div className="admin-table-wrapper">
        {messages.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
            📭 No contact requests yet.
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Service</th><th>Phone</th><th>Date</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: '600' }}>{m.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{m.email}</td>
                  <td>{m.service || '—'}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{m.phone || '—'}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td>{statusBadge(m.status)}</td>
                  <td>
                    <div className="d-flex gap-2">
                      {m.status === 'NEW' && (
                        <button onClick={() => updateStatus(m.id, 'READ')} style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: 'var(--secondary)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>Mark Read</button>
                      )}
                      {m.status !== 'REPLIED' && (
                        <button onClick={() => updateStatus(m.id, 'REPLIED')} style={{ background: 'rgba(0,214,143,0.1)', border: '1px solid rgba(0,214,143,0.3)', color: 'var(--success)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' }}>Replied</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Message detail (click row expands) - simplified inline */}
      {messages.length > 0 && (
        <div style={{ marginTop: '24px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          💡 Tip: {messages.filter(m => m.status === 'NEW').length} new message{messages.filter(m => m.status === 'NEW').length !== 1 ? 's' : ''} awaiting response.
        </div>
      )}
    </div>
  );
}
