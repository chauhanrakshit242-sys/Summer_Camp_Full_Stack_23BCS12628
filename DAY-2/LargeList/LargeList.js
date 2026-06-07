import React, { useState, useRef, useCallback } from 'react';
import './LargeList.css';

function generateItems(count) {
  const verbs = ['Implement', 'Fix', 'Review', 'Deploy', 'Analyze', 'Update', 'Refactor', 'Test', 'Document', 'Optimize'];
  const nouns = ['authentication', 'dashboard', 'API endpoint', 'user profile', 'payment flow', 'search index', 'cache layer', 'onboarding', 'analytics', 'data pipeline'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `${verbs[i % verbs.length]} the ${nouns[i % nouns.length]} #${i + 1}`,
    priority: ['High', 'Medium', 'Low'][i % 3],
  }));
}

const INITIAL = generateItems(1000);

export default function LargeList() {
  const [items, setItems] = useState(INITIAL);
  const [deleted, setDeleted] = useState(0);
  const listRef = useRef(null);

  // Single event listener via event delegation
  const handleClick = useCallback((e) => {
    const btn = e.target.closest('[data-delete-id]');
    if (!btn) return;
    const id = Number(btn.dataset.deleteId);
    setItems(prev => prev.filter(item => item.id !== id));
    setDeleted(d => d + 1);
  }, []);

  const priorityColor = (p) => p === 'High' ? 'var(--danger)' : p === 'Medium' ? 'var(--accent2)' : 'var(--success)';

  return (
    <div className="ll-wrap">
      <header className="ll-header">
        <div>
          <h1 className="ll-title">Large List</h1>
          <p className="ll-sub">Event delegation · 1 listener for {items.length.toLocaleString()} items</p>
        </div>
        <div className="ll-stats">
          <div className="ll-stat-box">
            <span className="ll-stat-num">{items.length.toLocaleString()}</span>
            <span className="ll-stat-label">Remaining</span>
          </div>
          <div className="ll-stat-box deleted">
            <span className="ll-stat-num">{deleted}</span>
            <span className="ll-stat-label">Deleted</span>
          </div>
        </div>
      </header>

      {/* Single onClick on container = event delegation */}
      <ul className="ll-list" ref={listRef} onClick={handleClick}>
        {items.map(item => (
          <li key={item.id} className="ll-item">
            <span className="ll-num">#{item.id}</span>
            <span className="ll-text">{item.title}</span>
            <span className="ll-priority" style={{ color: priorityColor(item.priority) }}>
              {item.priority}
            </span>
            <button
              className="ll-del-btn"
              data-delete-id={item.id}
              title="Delete"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
