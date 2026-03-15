import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi';

const categoryOptions = ['WEB', 'GRAPHIC_DESIGN', 'BRANDING', 'SOFTWARE', 'SHOPIFY', 'WORDPRESS'];
const empty = { projectName: '', category: 'WEB', description: '', clientName: '', technologies: '', imageUrl: '', projectUrl: '', isFeatured: false, displayOrder: 0 };

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.get('/api/admin/portfolio')
      .then(({ data }) => setItems(data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async () => {
    setSaving(true);
    try {
      if (editing.id) await api.put(`/api/admin/portfolio/${editing.id}`, editing);
      else await api.post('/api/admin/portfolio', editing);
      setEditing(null);
      load();
    } catch { alert('Error saving.'); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this portfolio item?')) return;
    await api.delete(`/api/admin/portfolio/${id}`);
    load();
  };

  if (loading) return <div className="page-loader"><div className="spinner-gradient" /></div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Portfolio</h1>
          <p className="admin-page-subtitle">{items.length} projects</p>
        </div>
        <button className="btn-primary-gradient" style={{ padding: '10px 24px' }} onClick={() => setEditing({ ...empty })}>
          <FiPlus /> Add Project
        </button>
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-card p-5" style={{ width: '100%', maxWidth: '620px', backdropFilter: 'blur(20px)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 style={{ fontWeight: '700' }}>{editing.id ? 'Edit' : 'New'} Portfolio Item</h3>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.25rem' }}><FiX /></button>
            </div>
            <div className="creatix-form d-flex flex-column gap-3">
              <div>
                <label className="form-label">Project Name *</label>
                <input className="form-control" value={editing.projectName} onChange={e => setEditing({ ...editing, projectName: e.target.value })} />
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">Category *</label>
                  <select className="form-select" value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })}>
                    {categoryOptions.map(c => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label">Client Name</label>
                  <input className="form-control" value={editing.clientName} onChange={e => setEditing({ ...editing, clientName: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea className="form-control" rows={3} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} />
              </div>
              <div>
                <label className="form-label">Technologies (comma-separated)</label>
                <input className="form-control" value={editing.technologies} onChange={e => setEditing({ ...editing, technologies: e.target.value })} placeholder="React, Spring Boot, MySQL" />
              </div>
              <div>
                <label className="form-label">Image URL</label>
                <input className="form-control" value={editing.imageUrl} onChange={e => setEditing({ ...editing, imageUrl: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <label className="form-label">Project URL</label>
                <input className="form-control" value={editing.projectUrl} onChange={e => setEditing({ ...editing, projectUrl: e.target.value })} placeholder="https://..." />
              </div>
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label">Display Order</label>
                  <input type="number" className="form-control" value={editing.displayOrder} onChange={e => setEditing({ ...editing, displayOrder: Number(e.target.value) })} />
                </div>
                <div className="col-6 d-flex align-items-end pb-1">
                  <div className="d-flex align-items-center gap-2">
                    <input type="checkbox" id="feat" checked={!!editing.isFeatured} onChange={e => setEditing({ ...editing, isFeatured: e.target.checked })} />
                    <label htmlFor="feat" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Featured</label>
                  </div>
                </div>
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

      <div className="admin-table-wrapper">
        {items.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>💼 No portfolio items yet.</div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Project</th><th>Category</th><th>Client</th><th>Featured</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: '600' }}>{p.projectName}</td>
                  <td><span className="portfolio-category-badge">{p.category?.replace('_', ' ')}</span></td>
                  <td style={{ color: 'var(--text-secondary)' }}>{p.clientName || '—'}</td>
                  <td>{p.isFeatured ? <span className="badge-status badge-confirmed">✓</span> : '—'}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button onClick={() => setEditing({ ...p })} style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)', color: 'var(--primary-light)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}><FiEdit2 /></button>
                      <button onClick={() => remove(p.id)} style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: 'var(--accent)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}><FiTrash2 /></button>
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
