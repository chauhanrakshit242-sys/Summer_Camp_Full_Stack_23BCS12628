import React, { useState, useRef } from 'react';
import './KanbanBoard.css';

const INITIAL_COLS = {
  todo: {
    id: 'todo',
    title: 'To Do',
    color: '#7c6af7',
    cards: [
      { id: 'c1', text: 'Design new landing page', tag: 'Design' },
      { id: 'c2', text: 'Set up CI/CD pipeline', tag: 'DevOps' },
      { id: 'c3', text: 'Write API documentation', tag: 'Docs' },
    ],
  },
  inprogress: {
    id: 'inprogress',
    title: 'In Progress',
    color: '#f7c26a',
    cards: [
      { id: 'c4', text: 'Implement auth flow', tag: 'Dev' },
      { id: 'c5', text: 'User research interviews', tag: 'Research' },
    ],
  },
  done: {
    id: 'done',
    title: 'Done',
    color: '#6af7a8',
    cards: [
      { id: 'c6', text: 'Project kickoff meeting', tag: 'Planning' },
      { id: 'c7', text: 'Wireframes approved', tag: 'Design' },
    ],
  },
};

export default function KanbanBoard() {
  const [cols, setCols] = useState(INITIAL_COLS);
  const [newText, setNewText] = useState({ todo: '', inprogress: '', done: '' });
  const [addingIn, setAddingIn] = useState(null);
  const dragCard = useRef(null);
  const dragFrom = useRef(null);
  const [dragOver, setDragOver] = useState(null);

  const handleDragStart = (colId, cardId) => {
    dragCard.current = cardId;
    dragFrom.current = colId;
  };

  const handleDrop = (toColId) => {
    const fromColId = dragFrom.current;
    const cardId = dragCard.current;
    if (!cardId || fromColId === toColId) {
      setDragOver(null);
      return;
    }
    setCols(prev => {
      const card = prev[fromColId].cards.find(c => c.id === cardId);
      return {
        ...prev,
        [fromColId]: { ...prev[fromColId], cards: prev[fromColId].cards.filter(c => c.id !== cardId) },
        [toColId]: { ...prev[toColId], cards: [...prev[toColId].cards, card] },
      };
    });
    dragCard.current = null;
    dragFrom.current = null;
    setDragOver(null);
  };

  const addCard = (colId) => {
    const text = newText[colId].trim();
    if (!text) return;
    setCols(prev => ({
      ...prev,
      [colId]: {
        ...prev[colId],
        cards: [...prev[colId].cards, { id: `c${Date.now()}`, text, tag: 'New' }],
      },
    }));
    setNewText(prev => ({ ...prev, [colId]: '' }));
    setAddingIn(null);
  };

  const deleteCard = (colId, cardId) => {
    setCols(prev => ({
      ...prev,
      [colId]: { ...prev[colId], cards: prev[colId].cards.filter(c => c.id !== cardId) },
    }));
  };

  return (
    <div className="kb-wrap">
      <h1 className="kb-title">Kanban Board</h1>

      <div className="kb-board">
        {Object.values(cols).map(col => (
          <div
            key={col.id}
            className={`kb-col ${dragOver === col.id ? 'drag-over' : ''}`}
            onDragOver={e => { e.preventDefault(); setDragOver(col.id); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={() => handleDrop(col.id)}
          >
            <div className="kb-col-header">
              <div className="kb-col-dot" style={{ background: col.color }} />
              <span className="kb-col-title">{col.title}</span>
              <span className="kb-col-count">{col.cards.length}</span>
            </div>

            <div className="kb-cards">
              {col.cards.map(card => (
                <div
                  key={card.id}
                  className="kb-card"
                  draggable
                  onDragStart={() => handleDragStart(col.id, card.id)}
                >
                  <div className="kb-card-top">
                    <span className="kb-card-tag" style={{ borderColor: col.color, color: col.color }}>
                      {card.tag}
                    </span>
                    <button className="kb-card-del" onClick={() => deleteCard(col.id, card.id)}>✕</button>
                  </div>
                  <p className="kb-card-text">{card.text}</p>
                  <div className="kb-card-drag-hint">⠿ drag</div>
                </div>
              ))}
            </div>

            {addingIn === col.id ? (
              <div className="kb-add-form">
                <textarea
                  className="kb-add-input"
                  placeholder="Task description…"
                  autoFocus
                  value={newText[col.id]}
                  onChange={e => setNewText(prev => ({ ...prev, [col.id]: e.target.value }))}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addCard(col.id); }
                    if (e.key === 'Escape') setAddingIn(null);
                  }}
                  rows={3}
                />
                <div className="kb-add-actions">
                  <button className="kb-save-btn" onClick={() => addCard(col.id)}>Add Card</button>
                  <button className="kb-cancel-btn" onClick={() => setAddingIn(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <button className="kb-add-btn" onClick={() => setAddingIn(col.id)}>
                + Add card
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
