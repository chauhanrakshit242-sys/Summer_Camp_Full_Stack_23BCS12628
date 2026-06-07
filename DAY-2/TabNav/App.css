.app-shell {
  display: flex;
  min-height: 100vh;
}

.app-sidebar {
  width: 220px;
  min-height: 100vh;
  background: var(--surface);
  border-right: 1px solid var(--border);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.app-logo {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.04em;
  padding: 0 8px 20px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 12px;
}

.nav-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 14px;
  border: none;
  background: transparent;
  color: var(--muted);
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.15s;
  letter-spacing: 0.02em;
}

.nav-btn:hover {
  background: rgba(124, 106, 247, 0.1);
  color: var(--text);
}

.nav-btn.active {
  background: rgba(124, 106, 247, 0.18);
  color: var(--accent);
  font-weight: 600;
}

.app-main {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  max-width: calc(100vw - 220px);
}

@media (max-width: 768px) {
  .app-shell { flex-direction: column; }
  .app-sidebar { width: 100%; min-height: auto; height: auto; position: static; flex-direction: row; flex-wrap: wrap; padding: 12px; }
  .app-logo { display: none; }
  .nav-btn { width: auto; padding: 8px 12px; font-size: 12px; }
  .app-main { max-width: 100%; padding: 20px; }
}
