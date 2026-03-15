import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi';

const empty = { name: '', role: '', bio: '', experienceYears: 0, photoUrl: '', linkedinUrl: '', githubUrl: '', isLead: false, displayOrder: 0 };

export default function AdminTeam() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.get('/api/admin/team')
      .then(({ data }) => setItems(data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const save = async () => {
    setSaving(true);
    try {
      if (editing.id) await api.put(`/api/admin/team/${editing.id}`, editing);
      else await api.post('/api/admin/team', editing);
      setEditing(null); load();
    } catch { alert('Error saving.'); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!confirm('Delete this team member?')) return;
    await api.delete(`/api/admin/team/${id}`); load();
  };

  if (loading) return <div className="page-loader"><div className="spinner-gradient" /></div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1 className="admin-page-title">Team Members</h1>
          <p className="admin-page-subtitle">{items.length} members</p>
        </div>
        <button className="btn-primary-gradient" style={{ padding: '10px 24px' }} onClick={() => setEditing({ ...empty })}>
          <FiPlus /> Add Member
        </button>
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-card p-5" style={{ width: '100%', maxWidth: '560px', backdropFilter: 'blur(20px)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 style={{ fontWeight: '700' }}>{editing.id ? 'Edit' : 'Add'} Team Member</h3>
              <button onClick={() => setEditing(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.25rem' }}><FiX /></button>
            </div>
            <div className="creatix-form d-flex flex-column gap-3">
              <div className="row g-3">
                <div className="col-6"><label className="form-label">Name *</label><input className="form-control" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></div>
                <div className="col-6"><label className="form-label">Role *</label><input className="form-control" value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })} /></div>
              </div>
              <div><label className="form-label">Bio</label><textarea className="form-control" rows={3} value={editing.bio} onChange={e => setEditing({ ...editing, bio: e.target.value })} /></div>
              <div className="row g-3">
                <div className="col-6"><label className="form-label">Years of Experience</label><input type="number" className="form-control" value={editing.experienceYears} onChange={e => setEditing({ ...editing, experienceYears: Number(e.target.value) })} /></div>
                <div className="col-6"><label className="form-label">Display Order</label><input type="number" className="form-control" value={editing.displayOrder} onChange={e => setEditing({ ...editing, displayOrder: Number(e.target.value) })} /></div>
              </div>
              <div><label className="form-label">Photo URL</label><input className="form-control" value={editing.photoUrl} onChange={e => setEditing({ ...editing, photoUrl: e.target.value })} /></div>
              <div><label className="form-label">LinkedIn URL</label><input className="form-control" value={editing.linkedinUrl} onChange={e => setEditing({ ...editing, linkedinUrl: e.target.value })} /></div>
              <div><label className="form-label">GitHub URL</label><input className="form-control" value={editing.githubUrl} onChange={e => setEditing({ ...editing, githubUrl: e.target.value })} /></div>
              <div className="d-flex align-items-center gap-2">
                <input type="checkbox" id="lead" checked={!!editing.isLead} onChange={e => setEditing({ ...editing, isLead: e.target.checked })} />
                <label htmlFor="lead" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Team Lead</label>
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
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>👥 No team members yet.</div>
        ) : (
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Role</th><th>Experience</th><th>Lead</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontWeight: '600' }}>{m.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{m.role}</td>
                  <td>{m.experienceYears} yrs</td>
                  <td>{m.isLead ? <span className="badge-status badge-confirmed">Lead</span> : '—'}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button onClick={() => setEditing({ ...m })} style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.3)', color: 'var(--primary-light)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}><FiEdit2 /></button>
                      <button onClick={() => remove(m.id)} style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: 'var(--accent)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer' }}><FiTrash2 /></button>
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
