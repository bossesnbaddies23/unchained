* {
  box-sizing: border-box;
}

:root {
  --bg: #0b1016;
  --panel: #151d2a;
  --panel-soft: #1d2a39;
  --primary: #7cf5c2;
  --primary-dark: #4bd2a1;
  --secondary: #f4f7fb;
  --text: #edf5ff;
  --muted: #a8bac8;
  --border: rgba(255, 255, 255, 0.08);
  --shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: linear-gradient(180deg, #0a0f17 0%, #10192a 100%);
  color: var(--text);
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select {
  font: inherit;
}

.container {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(9, 13, 19, 0.82);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
}

.brand {
  font-weight: 800;
  letter-spacing: 0.12em;
}

nav {
  display: flex;
  align-items: center;
  gap: 18px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button.primary {
  background: var(--primary);
  color: #0d1b14;
}

.button.secondary {
  background: #1d2733;
  color: var(--text);
  border: 1px solid var(--border);
}

.button.small {
  padding: 0.6rem 0.9rem;
  font-size: 0.9rem;
}

.button.full {
  width: 100%;
}

.hero {
  padding: 72px 0 48px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.35fr 0.9fr;
  gap: 28px;
  align-items: center;
}

.eyebrow {
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 700;
}

h1, h2, h3 {
  margin-top: 0;
}

h1 {
  font-size: clamp(2.3rem, 4vw, 4.2rem);
  line-height: 1.05;
  margin-bottom: 1rem;
}

.hero-copy {
  max-width: 620px;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
}

.cta-row {
  display: flex;
  gap: 12px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.mini-stats {
  display: flex;
  gap: 14px;
  list-style: none;
  padding: 0;
  margin-top: 28px;
  flex-wrap: wrap;
}

.mini-stats li {
  min-width: 120px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 0.8rem 1rem;
}

.mini-stats strong {
  display: block;
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.mini-stats span {
  color: var(--muted);
  font-size: 0.8rem;
}

.hero-card,
.feature-card,
.pricing-box,
.auth-card,
.dashboard-panel,
.stat-box {
  background: linear-gradient(180deg, rgba(25, 34, 47, 0.9), rgba(17, 24, 33, 0.85));
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
}

.hero-card {
  padding: 24px;
}

.card-label {
  color: var(--muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.metric {
  font-size: clamp(2.8rem, 7vw, 5rem);
  font-weight: 800;
  margin: 18px 0 10px;
}

.sparkline {
  margin-top: 18px;
  letter-spacing: 0.35rem;
  color: var(--primary);
  font-size: 2rem;
}

.section {
  padding: 36px 0 60px;
}

.section.alt {
  background: rgba(255, 255, 255, 0.02);
}

.feature-grid,
.info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 26px;
}

.info-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.feature-card,
.pricing-box {
  padding: 20px;
}

.feature-card p,
.pricing-box ul,
.auth-card p,
.dashboard-panel p {
  color: var(--muted);
  line-height: 1.7;
}

.pricing-box {
  max-width: 420px;
}

.plan {
  color: var(--primary);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.price {
  font-size: 3rem;
  font-weight: 800;
  margin: 12px 0;
}

.price span {
  font-size: 1.05rem;
  color: var(--muted);
}

.pricing-box ul {
  margin: 0 0 18px;
  padding-left: 18px;
}

.auth-page {
  display: grid;
  place-items: center;
  min-height: calc(100vh - 72px);
  padding: 48px 16px;
}

.auth-card {
  width: min(100%, 470px);
  padding: 28px 24px;
}

.auth-card.wide {
  width: min(100%, 600px);
}

form {
  display: grid;
  gap: 18px;
  margin-top: 18px;
}

label {
  display: grid;
  gap: 8px;
  color: var(--secondary);
  font-weight: 600;
}

input,
select {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
}

.auth-switch {
  margin-top: 18px;
  color: var(--muted);
  text-align: center;
}

.auth-switch a {
  color: var(--primary);
  font-weight: 700;
}

.subscription-plan {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(124,245,194,0.08);
  border: 1px solid rgba(124,245,194,0.28);
  border-radius: 12px;
  padding: 18px;
}

.plan-tag {
  color: var(--primary);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.plan-price {
  font-size: 2rem;
  font-weight: 800;
}

.dashboard-page {
  padding: 48px 0;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 22px;
}

.dashboard-panel {
  padding: 24px;
}

.dashboard-panel.large {
  min-height: 300px;
}

.member-meta {
  margin-top: 14px;
  color: var(--muted);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.stat-box {
  padding: 18px;
}

.stat-box span {
  display: block;
  color: var(--muted);
  margin-bottom: 8px;
}

.stat-box strong {
  font-size: 1.7rem;
}

.dashboard-actions {
  margin-top: 24px;
}

.footer {
  border-top: 1px solid var(--border);
  padding: 18px 0 32px;
}

.footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--muted);
}

@media (max-width: 760px) {
  nav {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .hero-grid,
  .feature-grid,
  .info-grid,
  .dashboard-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .nav {
    flex-direction: column;
    justify-content: center;
    padding: 16px 0;
  }
}
