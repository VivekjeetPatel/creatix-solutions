import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiSend, FiMapPin, FiClock } from 'react-icons/fi';
import api from '../utils/api';

const serviceOptions = [
  'Custom Software Development', 'Web Development', 'WordPress Development',
  'Shopify Development', 'Graphic Design', 'Social Media Management', 'Other',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', service: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      const { data } = await api.post('/api/contact', form);
      setStatus({ type: 'success', msg: data.message || "Message sent! We'll reply within 24 hours." });
      setForm({ name: '', email: '', phone: '', message: '', service: '' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.message || 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'var(--bg-800)' }}>
        <div className="container text-center">
          <div className="section-tag" data-aos="fade-up">Get In Touch</div>
          <h1 className="section-title" data-aos="fade-up" data-aos-delay="100">
            Let's Start a <span className="gradient-text">Conversation</span>
          </h1>
          <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
            Have a project in mind? Fill out the form and our team will get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="row g-5">
            {/* Contact Info */}
            <div className="col-lg-4" data-aos="fade-right">
              <h3 className="mb-4" style={{ fontWeight: '700' }}>Contact Info</h3>
              {[
                { icon: <FiMail />, title: 'Email Us', value: 'hello@creatix.co.uk', color: 'var(--primary-light)' },
                { icon: <FiPhone />, title: 'Call Us', value: '+44 20 7946 0958', color: 'var(--secondary)' },
                { icon: <FiMapPin />, title: 'Office', value: 'London, United Kingdom', color: 'var(--success)' },
                { icon: <FiClock />, title: 'Working Hours', value: 'Mon–Fri, 9AM–6PM GMT', color: 'var(--warning)' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-4 mb-3 d-flex gap-3 align-items-start" style={{ textAlign: 'left' }}>
                  <div style={{ color: item.color, fontSize: '1.5rem', flexShrink: 0, marginTop: '2px' }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{item.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="col-lg-8" data-aos="fade-left">
              <div className="glass-card p-5">
                <h3 style={{ fontWeight: '700', marginBottom: '28px' }}>Send Us a Message</h3>

                {status && (
                  <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}
                       style={{ background: status.type === 'success' ? 'rgba(0,214,143,0.1)' : 'rgba(255,107,107,0.1)', border: `1px solid ${status.type === 'success' ? 'rgba(0,214,143,0.3)' : 'rgba(255,107,107,0.3)'}`, borderRadius: '8px', color: 'var(--text-primary)' }}>
                    {status.type === 'success' ? '✅' : '❌'} {status.msg}
                  </div>
                )}

                <form onSubmit={submit} className="creatix-form">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label"><FiUser className="me-1" /> Full Name *</label>
                      <input type="text" className="form-control" name="name" placeholder="John Smith" value={form.name} onChange={handle} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label"><FiMail className="me-1" /> Email Address *</label>
                      <input type="email" className="form-control" name="email" placeholder="john@example.com" value={form.email} onChange={handle} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label"><FiPhone className="me-1" /> Phone Number</label>
                      <input type="tel" className="form-control" name="phone" placeholder="+44 7700 000000" value={form.phone} onChange={handle} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Service Required</label>
                      <select className="form-select" name="service" value={form.service} onChange={handle}>
                        <option value="">Select a Service</option>
                        {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label"><FiMessageSquare className="me-1" /> Message *</label>
                      <textarea className="form-control" name="message" placeholder="Tell us about your project..." rows={5} value={form.message} onChange={handle} required />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-primary-gradient" style={{ padding: '14px 36px', fontSize: '1rem' }} disabled={loading}>
                        {loading ? 'Sending...' : <><FiSend /> Send Message</>}
                      </button>
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
