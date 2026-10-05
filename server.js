const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const users = [];
const sessions = {};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  const cookieHeader = req.headers.cookie || '';
  const cookies = {};

  cookieHeader.split(';').forEach((pair) => {
    const [key, ...valueParts] = pair.trim().split('=');
    if (key) {
      cookies[key] = valueParts.join('=');
    }
  });

  req.cookies = cookies;
  next();
});

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    joinedAt: user.joinedAt,
    monthlyRevenue: user.monthlyRevenue,
    active: user.active,
  };
}

function getSessionUser(req) {
  const sessionId = req.cookies.sessionId;
  const userId = sessions[sessionId];
  if (!userId) return null;
  return users.find((user) => user.id === userId) || null;
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'Unchained API is running.' });
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(409).json({ message: 'An account with that email already exists.' });
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    plan: 'none',
    joinedAt: new Date().toISOString(),
    monthlyRevenue: 0,
    active: true,
  };

  users.push(newUser);

  const sessionId = crypto.randomUUID();
  sessions[sessionId] = newUser.id;

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return res.status(201).json({
    message: 'Account created successfully.',
    user: sanitizeUser(newUser),
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = users.find(
    (entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const sessionId = crypto.randomUUID();
  sessions[sessionId] = user.id;

  res.cookie('sessionId', sessionId, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return res.json({
    message: 'Login successful.',
    user: sanitizeUser(user),
  });
});

app.post('/api/logout', (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId) {
    delete sessions[sessionId];
  }

  res.clearCookie('sessionId');
  return res.json({ message: 'Logged out successfully.' });
});

app.get('/api/session', (req, res) => {
  const user = getSessionUser(req);

  if (!user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  return res.json({ user: sanitizeUser(user) });
});

app.post('/api/subscribe', (req, res) => {
  const user = getSessionUser(req);

  if (!user) {
    return res.status(401).json({ message: 'Please sign in to subscribe.' });
  }

  const { plan = 'monthly', amount = 15 } = req.body;

  const updateUser = users.find((entry) => entry.id === user.id);
  if (!updateUser) {
    return res.status(404).json({ message: 'User not found.' });
  }

  updateUser.plan = plan;
  updateUser.monthlyRevenue = Number(amount) || 15;
  updateUser.active = true;

  return res.json({
    message: 'Subscription activated successfully.',
    user: sanitizeUser(updateUser),
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/subscribe', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'subscribe.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Unchained app running on http://localhost:${PORT}`);
});
