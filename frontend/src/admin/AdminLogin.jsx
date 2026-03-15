import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLock, FiMail, FiLogIn } from 'react-icons/fi';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        {/* Logo */}
        <div className="text-center mb-5">
          <div className="gradient-text" style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '2rem', marginBottom: '8px' }}>
            Creatix<span style={{ color: 'var(--secondary)' }}>.</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Admin Dashboard</div>
        </div>

        <h2 style={{ fontWeight: 800, marginBottom: '8px' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.9rem' }}>
          Sign in to manage your business.
        </p>

        {error && (
          <div style={{
            background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)',
            borderRadius: '8px', padding: '12px 16px', color: 'var(--accent)', marginBottom: '20px', fontSize: '0.9rem'
          }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={submit} className="creatix-form">
          <div className="mb-4">
            <label className="form-label"><FiMail className="me-1" /> Email Address</label>
            <input type="email" className="form-control" name="email" placeholder="admin@creatix.com"
              value={form.email} onChange={handle} required autoComplete="username" />
          </div>
          <div className="mb-5">
            <label className="form-label"><FiLock className="me-1" /> Password</label>
            <input type="password" className="form-control" name="password" placeholder="••••••••"
              value={form.password} onChange={handle} required autoComplete="current-password" />
          </div>
          <button type="submit" className="btn-primary-gradient w-100 justify-content-center" style={{ padding: '14px', fontSize: '1rem' }} disabled={loading}>
            {loading ? 'Signing In...' : <><FiLogIn style={{ marginRight: '8px' }} /> Sign In</>}
          </button>
        </form>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', marginTop: '24px' }}>
          Default: admin@creatix.com / Admin@123
        </p>
      </div>
    </div>
  );
}
