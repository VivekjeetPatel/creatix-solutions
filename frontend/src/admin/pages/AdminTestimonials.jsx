import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi';

const empty = { clientName: '', company: '', review: '', rating: 5, isFeatured: false, displayOrder: 0 };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.get('/api/admin/testimonials')
      .then(({ data }) => setItems(data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async () => {
    setSaving(true);
    try {
      if (editing.id) await api.put(`/api/admin/testimonials/${editing.id}`, editing);
      else await api.post('/api/admin/testimonials', editing);
      setEditing(null);
      load();
    } catch (e) { alert('Error saving testimonial.'); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    await api.delete(`/api/admin/testimonials/${id}`);
    load();
  };

  if (loading) return <div className="page-loader"><div className="spinner-gradient" /></div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Testimonials</h1>
          <p className="admin-page-subtitle">{items.length} testimonials</p>
        </div>
        <button className="btn-primary-gradient" style={{ padding: '10px 24px' }} onClick={() => setEditing({ ...empty })}>
          <FiPlus /> Add New
        </button>
      </div>

      {/* Edit Form Modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-card p-5" style={{ width: '100%', maxWidth: '560px', backdropFilter: 'blur(20px)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 style={{ fontWeight: '700' }}>{editing.id ? 'Edit' : 'New'} Testimonial</h3>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.25rem' }}><FiX /></button>
            </div>
            <div className="creatix-form d-flex flex-column gap-3">
              <div>
                <label className="form-label">Client Name *</label>
                <input className="form-control" value={editing.clientName} onChange={e => setEditing({ ...editing, clientName: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Company</label>
                <input className="form-control" value={editing.company} onChange={e => setEditing({ ...editing, company: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Review *</label>
                <textarea className="form-control" rows={4} value={editing.review} onChange={e => setEditing({ ...editing, review: e.target.value })} />
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">Rating (1–5)</label>
                  <input type="number" className="form-control" min={1} max={5} value={editing.rating} onChange={e => setEditing({ ...editing, rating: Number(e.target.value) })} />
                </div>
                <div className="col-6">
                  <label className="form-label">Display Order</label>
                  <input type="number" className="form-control" value={editing.displayOrder} onChange={e => setEditing({ ...editing, displayOrder: Number(e.target.value) })} />
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" id="featured" checked={!!editing.isFeatured} onChange={e => setEditing({ ...editing, isFeatured: e.target.checked })} />
                <label htmlFor="featured" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Show on public testimonials</label>
              </div>
              <div className="d-flex gap-3 pt-2">
                <button className="btn-primary-gradient" style={{ padding: '12px 28px' }} onClick={save} disabled={saving}>
                  {saving ? 'Saving...' : <><FiCheck /> Save</>}
                </button>
                <button className="btn-outline-glass" style={{ padding: '12px 28px' }} onClick={() => setEditing(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="admin-table-wrapper">
        {items.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>⭐ No testimonials yet. Add your first one!</div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>#</th><th>Client</th><th>Company</th><th>Rating</th><th>Featured</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((t) => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--text-muted)' }}>{t.displayOrder}</td>
                  <td style={{ fontWeight: '600' }}>{t.clientName}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{t.company || '—'}</td>
                  <td>{'★'.repeat(t.rating)}<span style={{ color: 'var(--text-muted)' }}>{'★'.repeat(5 - t.rating)}</span></td>
                  <td>{t.isFeatured ? <span className="badge-status badge-confirmed">✓ Yes</span> : <span style={{ color: 'var(--text-muted)' }}>No</span>}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button onClick={() => setEditing({ ...t })} style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)', color: 'var(--primary-light)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}><FiEdit2 /></button>
                      <button onClick={() => remove(t.id)} style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: 'var(--accent)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}><FiTrash2 /></button>
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
