export const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

async function http(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });
  if (!res.ok) {
    let text;
    try { text = await res.text(); } catch {}
    throw new Error(text || `Request failed: ${res.status}`);
  }
  try { return await res.json(); } catch { return null; }
}

export const api = {
  async getProducts(params = {}) {
    const qs = new URLSearchParams(params).toString();
    const data = await http(`/api/products${qs ? `?${qs}` : ''}`);
    if (Array.isArray(data) && data.length === 0) {
      try { await http('/api/seed', { method: 'POST' }); } catch {}
      return await http(`/api/products${qs ? `?${qs}` : ''}`);
    }
    return data;
  },
  getProduct: (slug) => http(`/api/products/${slug}`),
  createOrder: (payload) => http('/api/orders', { method: 'POST', body: JSON.stringify(payload) }),
  getOrder: (code) => http(`/api/orders/${code}`),
  notifyPayment: (payload) => http('/api/payments/notify', { method: 'POST', body: JSON.stringify(payload) }),
  getTestimonials: () => http('/api/testimonials'),
  createTestimonial: (payload) => http('/api/testimonials', { method: 'POST', body: JSON.stringify(payload) }),
  contact: (payload) => http('/api/contact', { method: 'POST', body: JSON.stringify(payload) }),
  test: () => http('/test'),
};
