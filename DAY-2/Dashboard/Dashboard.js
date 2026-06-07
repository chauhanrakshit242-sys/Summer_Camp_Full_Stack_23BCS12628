import React, { useState } from 'react';
import './Dashboard.css';

const KPI_CARDS = [
  { label: 'Total Revenue', value: '$124,850', change: '+12.4%', up: true, icon: '💰' },
  { label: 'Active Users', value: '8,342', change: '+5.2%', up: true, icon: '👥' },
  { label: 'Conversion Rate', value: '3.67%', change: '-0.4%', up: false, icon: '📈' },
  { label: 'Avg. Session', value: '4m 32s', change: '+8.1%', up: true, icon: '⏱️' },
];

const TABLE_DATA = [
  { name: 'Pro Plan', users: 4210, revenue: '$84,200', growth: '+14%', status: 'Active' },
  { name: 'Basic Plan', users: 2890, revenue: '$28,900', growth: '+6%', status: 'Active' },
  { name: 'Enterprise', users: 312, revenue: '$62,400', growth: '+22%', status: 'Growing' },
  { name: 'Free Tier', users: 11200, revenue: '$0', growth: '+3%', status: 'Stable' },
  { name: 'Legacy Plan', users: 430, revenue: '$8,600', growth: '-2%', status: 'Declining' },
];

const BAR_DATA = [
  { month: 'Jan', value: 65 }, { month: 'Feb', value: 72 },
  { month: 'Mar', value: 58 }, { month: 'Apr', value: 88 },
  { month: 'May', value: 94 }, { month: 'Jun', value: 78 },
  { month: 'Jul', value: 102 }, { month: 'Aug', value: 115 },
];

export default function Dashboard() {
  const [activeBar, setActiveBar] = useState(null);
  const maxVal = Math.max(...BAR_DATA.map(d => d.value));

  return (
    <div className="dash-wrap">
      <header className="dash-header">
        <div>
          <h1 className="dash-title">Analytics Dashboard</h1>
          <p className="dash-sub">June 2026 · Updated just now</p>
        </div>
        <div className="dash-actions">
          <button className="dash-btn-secondary">Export</button>
          <button className="dash-btn-primary">+ Report</button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="dash-kpis">
        {KPI_CARDS.map((kpi, i) => (
          <div key={i} className="kpi-card">
            <div className="kpi-top">
              <span className="kpi-icon">{kpi.icon}</span>
              <span className={`kpi-change ${kpi.up ? 'up' : 'down'}`}>
                {kpi.up ? '↑' : '↓'} {kpi.change}
              </span>
            </div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-label">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="dash-charts">
        {/* Bar Chart */}
        <div className="dash-card dash-chart-card">
          <h2 className="dash-card-title">Monthly Revenue</h2>
          <div className="bar-chart">
            {BAR_DATA.map((d, i) => (
              <div
                key={i}
                className={`bar-col ${activeBar === i ? 'hovered' : ''}`}
                onMouseEnter={() => setActiveBar(i)}
                onMouseLeave={() => setActiveBar(null)}
              >
                {activeBar === i && (
                  <div className="bar-tooltip">${d.value}k</div>
                )}
                <div
                  className="bar-fill"
                  style={{ height: `${(d.value / maxVal) * 100}%` }}
                />
                <span className="bar-label">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Summary */}
        <div className="dash-card dash-summary-card">
          <h2 className="dash-card-title">Plan Distribution</h2>
          <div className="summary-list">
            {[
              { label: 'Pro Plan', pct: 44, color: '#7c6af7' },
              { label: 'Free Tier', pct: 30, color: '#6aaff7' },
              { label: 'Basic', pct: 15, color: '#f7c26a' },
              { label: 'Enterprise', pct: 8, color: '#6af7a8' },
              { label: 'Legacy', pct: 3, color: '#f76a6a' },
            ].map((item, i) => (
              <div key={i} className="summary-row">
                <div className="summary-dot" style={{ background: item.color }} />
                <span className="summary-label">{item.label}</span>
                <div className="summary-bar-wrap">
                  <div className="summary-bar" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
                <span className="summary-pct">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="dash-card">
        <h2 className="dash-card-title">Plan Performance</h2>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Users</th>
                <th>Revenue</th>
                <th>Growth</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_DATA.map((row, i) => (
                <tr key={i}>
                  <td className="td-name">{row.name}</td>
                  <td>{row.users.toLocaleString()}</td>
                  <td className="td-revenue">{row.revenue}</td>
                  <td className={`td-growth ${row.growth.startsWith('-') ? 'neg' : 'pos'}`}>{row.growth}</td>
                  <td>
                    <span className={`td-status status-${row.status.toLowerCase()}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
