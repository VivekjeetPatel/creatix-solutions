import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiEdit2, FiCheck, FiX } from 'react-icons/fi';

export default function AdminServices() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.get('/api/admin/services')
      .then(({ data }) => setItems(data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async () => {
    setSaving(true);
    try {
      await api.put(`/api/admin/services/${editing.id}`, editing);
      setEditing(null); load();
    } catch { alert('Error saving.'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="page-loader"><div className="spinner-gradient" /></div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Services Management</h1>
          <p className="admin-page-subtitle">Edit service descriptions shown on the public website</p>
        </div>
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-card p-5" style={{ width: '100%', maxWidth: '580px', backdropFilter: 'blur(20px)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 style={{ fontWeight: '700' }}>Edit Service</h3>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.25rem' }}><FiX /></button>
            </div>
            <div className="creatix-form d-flex flex-column gap-3">
              <div><label className="form-label">Title</label><input className="form-control" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
              <div><label className="form-label">Short Description (card subtitle)</label><input className="form-control" value={editing.shortDesc || ''} onChange={e => setEditing({ ...editing, shortDesc: e.target.value })} /></div>
              <div><label className="form-label">Full Description</label><textarea className="form-control" rows={4} value={editing.fullDesc || ''} onChange={e => setEditing({ ...editing, fullDesc: e.target.value })} /></div>
              <div><label className="form-label">Features (comma-separated)</label><textarea className="form-control" rows={3} value={editing.features || ''} onChange={e => setEditing({ ...editing, features: e.target.value })} placeholder="Feature 1, Feature 2, Feature 3" /></div>
              <div className="row g-3">
                <div className="col-6"><label className="form-label">Display Order</label><input type="number" className="form-control" value={editing.displayOrder} onChange={e => setEditing({ ...editing, displayOrder: Number(e.target.value) })} /></div>
                <div className="col-6 d-flex align-items-end pb-1">
                  <div className="d-flex gap-2"><input type="checkbox" id="active" checked={!!editing.isActive} onChange={e => setEditing({ ...editing, isActive: e.target.checked })} /><label htmlFor="active" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active (visible)</label></div>
                </div>
              </div>
              <div className="d-flex gap-3 pt-2">
                <button className="btn-primary-gradient" style={{ padding: '12px 28px' }} onClick={save} disabled={saving}>
                  {saving ? 'Saving...' : <><FiCheck /> Save Changes</>}
                </button>
                <button className="btn-outline-glass" style={{ padding: '12px 28px' }} onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row g-4">
        {items.map((s) => (
          <div key={s.id} className="col-lg-4 col-md-6">
            <div className="glass-card p-4 h-100">
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div>
                  <div style={{ fontWeight: '700', marginBottom: '4px' }}>{s.title}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--primary-light)' }}>/{s.slug}</div>
                </div>
                <button onClick={() => setEditing({ ...s })} style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)', color: 'var(--primary-light)', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer' }}>
                  <FiEdit2 />
                </button>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '12px' }}>{s.shortDesc}</p>
              {s.features && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {s.features.split(',').slice(0, 3).map((f) => (
                    <div key={f} style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ color: 'var(--success)' }}>✓</span> {f.trim()}
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3">
                <span className={`badge-status ${s.isActive ? 'badge-confirmed' : 'badge-cancelled'}`}>
                  {s.isActive ? 'Active' : 'Hidden'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
