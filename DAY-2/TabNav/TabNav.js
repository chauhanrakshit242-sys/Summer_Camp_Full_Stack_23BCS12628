import React, { useState } from 'react';
import './TabNav.css';

const TABS = [
  {
    id: 'overview',
    label: '📊 Overview',
    content: {
      title: 'Project Overview',
      body: 'This project aims to deliver a scalable task management solution for enterprise teams. The current sprint is on track with 78% of planned features complete.',
      stats: [
        { label: 'Tasks Done', value: '124' },
        { label: 'In Progress', value: '18' },
        { label: 'Blocked', value: '3' },
        { label: 'Team Size', value: '12' },
      ],
    },
  },
  {
    id: 'details',
    label: '📋 Details',
    content: {
      title: 'Project Details',
      body: 'Built with React 18, Node.js 20, and PostgreSQL. Deployed on AWS with CI/CD via GitHub Actions. Test coverage currently at 84%.',
      items: [
        { label: 'Start Date', value: 'March 1, 2025' },
        { label: 'Deadline', value: 'July 31, 2025' },
        { label: 'Stack', value: 'React · Node · PostgreSQL' },
        { label: 'Status', value: '🟢 Active' },
        { label: 'Owner', value: 'Alex Kim' },
        { label: 'Coverage', value: '84%' },
      ],
    },
  },
  {
    id: 'settings',
    label: '⚙️ Settings',
    content: {
      title: 'Project Settings',
      body: 'Configure notifications, permissions, and integrations for this project.',
      toggles: [
        { label: 'Email Notifications', on: true },
        { label: 'Slack Integration', on: true },
        { label: 'Auto-assign Tasks', on: false },
        { label: 'Public Visibility', on: false },
        { label: 'Two-factor Auth', on: true },
      ],
    },
  },
];

function ToggleSwitch({ on, onChange }) {
  return (
    <button
      className={`tab-toggle ${on ? 'on' : ''}`}
      onClick={onChange}
      aria-checked={on}
      role="switch"
    >
      <span className="tab-toggle-knob" />
    </button>
  );
}

export default function TabNav() {
  const [active, setActive] = useState('overview');
  const [toggles, setToggles] = useState({ 0: true, 1: true, 2: false, 3: false, 4: true });
  const tab = TABS.find(t => t.id === active);

  return (
    <div className="tab-wrap">
      <h1 className="tab-main-title">Dashboard</h1>

      <div className="tab-bar">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn ${active === t.id ? 'active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="tab-panel">
        <h2 className="tab-panel-title">{tab.content.title}</h2>
        <p className="tab-panel-body">{tab.content.body}</p>

        {tab.content.stats && (
          <div className="tab-stats">
            {tab.content.stats.map((s, i) => (
              <div key={i} className="tab-stat">
                <div className="tab-stat-value">{s.value}</div>
                <div className="tab-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {tab.content.items && (
          <div className="tab-items">
            {tab.content.items.map((item, i) => (
              <div key={i} className="tab-item-row">
                <span className="tab-item-label">{item.label}</span>
                <span className="tab-item-value">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {tab.content.toggles && (
          <div className="tab-toggles">
            {tab.content.toggles.map((item, i) => (
              <div key={i} className="tab-toggle-row">
                <span className="tab-toggle-label">{item.label}</span>
                <ToggleSwitch
                  on={toggles[i]}
                  onChange={() => setToggles(prev => ({ ...prev, [i]: !prev[i] }))}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
