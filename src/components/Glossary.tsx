import React, { useState } from 'react';
import type { Concept, Lesson } from '../types/validationData';
import { Search, Bookmark, BookmarkCheck } from 'lucide-react';

interface GlossaryProps {
  concepts: Concept[];
  lessons: Lesson[];
  difficulty: 'standard' | 'high';
  markedConceptIds: string[];
  onToggleMarkConcept: (id: string) => void;
}

export const Glossary: React.FC<GlossaryProps> = ({
  concepts,
  lessons,
  difficulty,
  markedConceptIds,
  onToggleMarkConcept
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(concepts.map((c) => c.category)))];

  const filteredConcepts = concepts.filter((c) => {
    const matchesSearch =
      c.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.definitionHighLevel.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>מילון מושגים מעבדתי (Glossary)</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          מאגר מונחי המפתח בארכיטקטורת מעבדים, סיליקון, תזמונים ושיטות בדיקה של Intel.
        </p>
      </div>

      {/* Search and Category Filter Row */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '8px 12px' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="חפש מונח או הגדרה..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '0.82rem'
            }}
          />
        </div>

        {/* Categories Tab Scrollbar */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', whiteSpace: 'nowrap' }} className="no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="btn btn-secondary"
              style={{
                fontSize: '0.72rem',
                padding: '6px 12px',
                background: activeCategory === cat ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255,255,255,0.01)',
                borderColor: activeCategory === cat ? 'var(--primary)' : 'var(--border-color)',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)'
              }}
            >
              {cat === 'All' ? 'הכל' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Concept Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredConcepts.map((concept) => {
          const isMarked = markedConceptIds.includes(concept.id);
          const lesson = lessons.find((l) => l.conceptIds.includes(concept.id));

          return (
            <div
              key={concept.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                borderLeft: isMarked ? '3px solid var(--primary)' : '1px solid var(--border-color)',
                background: isMarked ? 'rgba(6, 182, 212, 0.02)' : 'rgba(15, 15, 20, 0.4)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.88rem', color: '#fff', direction: 'ltr' }}>{concept.term}</strong>
                
                <button
                  onClick={() => onToggleMarkConcept(concept.id)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: isMarked ? 'var(--primary)' : 'var(--text-muted)' }}
                  title={isMarked ? 'הסר מרשימת החזרה' : 'סמן לחזרה'}
                >
                  {isMarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                </button>
              </div>

              {/* Tag metadata */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.58rem', padding: '0 4px' }}>{concept.category}</span>
                {lesson && (
                  <span className="badge badge-secondary" style={{ fontSize: '0.58rem', padding: '0 4px' }}>
                    {lesson.titleHe.split(':')[0]}
                  </span>
                )}
              </div>

              {/* Toggleable explanation */}
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginTop: '4px' }}>
                {difficulty === 'high' ? concept.definitionHighLevel : concept.definition}
              </p>

              {/* Micro-lab context usage tip */}
              <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--primary)' }}>הקשר בדיקה: </span>
                {concept.context}
              </div>
            </div>
          );
        })}

        {filteredConcepts.length === 0 && (
          <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
            לא נמצאו מונחים המתאימים למילת החיפוש.
          </div>
        )}
      </div>

    </div>
  );
};
