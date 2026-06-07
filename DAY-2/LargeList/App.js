import React, { useState } from 'react';
import TodoApp from './Q1_Todo/TodoApp';
import CharCounter from './Q2_CharCounter/CharCounter';
import Carousel from './Q3_Carousel/Carousel';
import SkeletonScroll from './Q4_SkeletonScroll/SkeletonScroll';
import TabNav from './Q5_TabNav/TabNav';
import LargeList from './Q6_LargeList/LargeList';
import KanbanBoard from './Q7_Kanban/KanbanBoard';
import Dashboard from './Q8_Dashboard/Dashboard';
import './App.css';

const questions = [
  { id: 'q1', label: 'Q1 · Todo App', component: TodoApp },
  { id: 'q2', label: 'Q2 · Char Counter', component: CharCounter },
  { id: 'q3', label: 'Q3 · Carousel', component: Carousel },
  { id: 'q4', label: 'Q4 · Skeleton Scroll', component: SkeletonScroll },
  { id: 'q5', label: 'Q5 · Tab Nav', component: TabNav },
  { id: 'q6', label: 'Q6 · Large List', component: LargeList },
  { id: 'q7', label: 'Q7 · Kanban', component: KanbanBoard },
  { id: 'q8', label: 'Q8 · Dashboard', component: Dashboard },
];

export default function App() {
  const [active, setActive] = useState('q1');
  const ActiveComponent = questions.find(q => q.id === active)?.component;

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-logo">⬡ ReactTasks</div>
        <nav>
          {questions.map(q => (
            <button
              key={q.id}
              className={`nav-btn ${active === q.id ? 'active' : ''}`}
              onClick={() => setActive(q.id)}
            >
              {q.label}
            </button>
          ))}
        </nav>
      </aside>
      <main className="app-main">
        {ActiveComponent && <ActiveComponent />}
      </main>
    </div>
  );
}
