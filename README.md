const api = {
  async request(path, options = {}) {
    const response = await fetch(path, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || 'Request failed.');
    }

    return data;
  },
};

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const subscribeForm = document.getElementById('subscribeForm');
const logoutBtn = document.getElementById('logoutBtn');

if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const result = await api.request('/api/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      localStorage.setItem('unchainedUser', JSON.stringify(result.user));
      window.location.href = '/dashboard.html';
    } catch (error) {
      alert(error.message);
    }
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const result = await api.request('/api/login', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      localStorage.setItem('unchainedUser', JSON.stringify(result.user));
      window.location.href = '/dashboard.html';
    } catch (error) {
      alert(error.message);
    }
  });
}

if (subscribeForm) {
  subscribeForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(subscribeForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const result = await api.request('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const user = result.user;
      localStorage.setItem('unchainedUser', JSON.stringify(user));
      window.location.href = '/dashboard.html';
    } catch (error) {
      alert(error.message);
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await api.request('/api/logout', { method: 'POST' });
      localStorage.removeItem('unchainedUser');
      window.location.href = '/login.html';
    } catch (error) {
      alert(error.message);
    }
  });
}

async function loadDashboard() {
  const memberName = document.getElementById('memberName');
  const memberPlan = document.getElementById('memberPlan');
  const memberEmail = document.getElementById('memberEmail');
  const monthlyRevenue = document.getElementById('monthlyRevenue');
  const statusBadge = document.getElementById('statusBadge');

  if (!memberName) return;

  try {
    const session = await api.request('/api/session');
    const user = session.user;

    memberName.textContent = user.name;
    memberEmail.textContent = user.email;
    memberPlan.textContent = user.plan === 'none' ? 'No active subscription' : `Active ${user.plan} membership`;
    monthlyRevenue.textContent = `$${Number(user.monthlyRevenue || 0).toFixed(2)}`;
    statusBadge.textContent = user.active ? 'Active' : 'Inactive';
    statusBadge.style.color = user.active ? '#7cf5c2' : '#f5b7b1';
  } catch (error) {
    window.location.href = '/login.html';
  }
}

if (document.body) {
  loadDashboard();
}
