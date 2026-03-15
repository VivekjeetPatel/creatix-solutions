import { useState } from 'react';
import { FiCalendar, FiClock, FiUser, FiMail, FiFileText, FiSend } from 'react-icons/fi';
import api from '../utils/api';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

export default function BookCall() {
  const [form, setForm] = useState({ name: '', email: '', preferredDate: '', preferredTime: '', projectDescription: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.preferredDate || !form.preferredTime) return;
    setLoading(true);
    try {
      const { data } = await api.post('/api/book-call', form);
      setStatus({ type: 'success', msg: data.message || "Booking received! We'll confirm shortly." });
      setForm({ name: '', email: '', preferredDate: '', preferredTime: '', projectDescription: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.message || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Minimum date = tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-800)' }}>
        <div className="container text-center">
          <div className="section-tag" data-aos="fade-up">Free Consultation</div>
          <h1 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Book a <span className="gradient-text">Discovery Call</span>
          </h1>
          <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
            Schedule a free 30-minute call with our team. We'll discuss your project and map out the best path forward.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="row justify-content-center g-5">
            {/* What to Expect */}
            <div className="col-lg-4" data-aos="fade-right">
              <h3 style={{ fontWeight: '700', marginBottom: '24px' }}>What to Expect</h3>
              {[
                { icon: '🎯', title: 'Project Analysis', desc: 'We\'ll review your requirements and goals in detail.' },
                { icon: '💡', title: 'Expert Advice', desc: 'Get honest recommendations on tech stack and approach.' },
                { icon: '📋', title: 'Free Proposal', desc: 'Receive a tailored quote and project roadmap.' },
                { icon: '🤝', title: 'No Pressure', desc: 'No commitments required — just a conversation.' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-4 mb-3">
                  <div style={{ fontSize: '1.75rem', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Booking Form */}
            <div className="col-lg-8" data-aos="fade-left">
              <div className="glass-card p-5">
                <h3 style={{ fontWeight: '700', marginBottom: '28px' }}>
                  <FiCalendar style={{ marginRight: '10px', color: 'var(--primary-light)' }} />
                  Schedule Your Call
                </h3>

                {status && (
                  <div className="mb-4" style={{
                    background: status.type === 'success' ? 'rgba(0,214,143,0.1)' : 'rgba(255,107,107,0.1)',
                    border: `1px solid ${status.type === 'success' ? 'rgba(0,214,143,0.3)' : 'rgba(255,107,107,0.3)'}`,
                    borderRadius: '8px', padding: '16px', color: 'var(--text-primary)'
                  }}>
                    {status.type === 'success' ? '✅' : '❌'} {status.msg}
                  </div>
                )}

                <form onSubmit={submit} className="creatix-form">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label"><FiUser className="me-1" /> Your Name *</label>
                      <input type="text" className="form-control" name="name" placeholder="John Smith" value={form.name} onChange={handle} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label"><FiMail className="me-1" /> Email Address *</label>
                      <input type="email" className="form-control" name="email" placeholder="john@example.com" value={form.email} onChange={handle} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label"><FiCalendar className="me-1" /> Preferred Date *</label>
                      <input type="date" className="form-control" name="preferredDate" min={minDateStr} value={form.preferredDate} onChange={handle} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label"><FiClock className="me-1" /> Preferred Time * (GMT)</label>
                      <select className="form-select" name="preferredTime" value={form.preferredTime} onChange={handle} required>
                        <option value="">Select a time slot</option>
                        {timeSlots.map((t) => <option key={t} value={t}>{t} GMT</option>)}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label"><FiFileText className="me-1" /> Tell Us About Your Project</label>
                      <textarea className="form-control" name="projectDescription" placeholder="Briefly describe what you want to build, the problem it solves, and any specific requirements..." rows={5} value={form.projectDescription} onChange={handle} />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-primary-gradient" style={{ padding: '14px 36px', fontSize: '1rem' }} disabled={loading}>
                        {loading ? 'Scheduling...' : <><FiCalendar style={{ marginRight: '8px' }} />Book My Free Call</>}
                      </button>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '12px' }}>
                        ✓ No commitment &nbsp;·&nbsp; ✓ 30 minutes &nbsp;·&nbsp; ✓ Google Meet / Zoom
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
