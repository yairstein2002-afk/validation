import React, { useState, useMemo } from 'react';
import type { Concept, Lesson } from '../types/validationData';
import { Search, BookOpen, User, Bookmark, Tag } from 'lucide-react';

interface GlossaryProps {
  concepts: Concept[];
  lessons: Lesson[];
  difficulty: 'standard' | 'high';
  markedConceptIds: string[];
  onToggleMarkConcept: (conceptId: string) => void;
}

export const Glossary: React.FC<GlossaryProps> = ({
  concepts,
  lessons,
  difficulty,
  markedConceptIds,
  onToggleMarkConcept
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories from all concepts
  const categories = useMemo(() => {
    const allCats = concepts.map((c) => c.category).filter((cat): cat is string => !!cat);
    return Array.from(new Set(allCats)).sort();
  }, [concepts]);

  const filteredConcepts = useMemo(() => {
    return concepts.filter((c) => {
      const matchQuery =
        c.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.definitionHighLevel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchLesson = selectedLessonId === 'all' ? true : c.lessonId === selectedLessonId;
      const matchCategory = selectedCategory === 'all' ? true : c.category === selectedCategory;

      return matchQuery && matchLesson && matchCategory;
    });
  }, [concepts, searchQuery, selectedLessonId, selectedCategory]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>מילון מונחי הולידציה של Intel</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          חיפוש, סינון וחקירת מונחי המעבדות של Intel.
        </p>
      </div>

      {/* Filter and Search controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', right: '12px', top: '14px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            placeholder="חפש מונח או הגדרה..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', paddingRight: '36px' }}
          />
        </div>

        {/* Filters grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          {/* Lesson Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.72rem', marginBottom: '4px', display: 'block' }}>סינון לפי שיעור:</label>
            <select
              className="form-select"
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '0.8rem' }}
            >
              <option value="all">כל השיעורים</option>
              {lessons.map((lesson, idx) => (
                <option key={lesson.id} value={lesson.id}>
                  שיעור {idx + 1}: {lesson.titleHe}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.72rem', marginBottom: '4px', display: 'block' }}>סינון לפי קטגוריית מפתח:</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ width: '100%', padding: '10px', fontSize: '0.8rem' }}
            >
              <option value="all">כל הקטגוריות</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of concept cards */}
      {filteredConcepts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {filteredConcepts.map((concept) => {
            const lessonName = lessons.find((l) => l.id === concept.lessonId)?.titleHe || 'מושג מותאם אישית';

            return (
              <div
                key={concept.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                  borderRight: concept.isCustom ? '4px solid var(--success)' : '1px solid var(--border-color)',
                  boxShadow: concept.isCustom ? '0 0 10px rgba(16, 185, 129, 0.1)' : 'var(--box-shadow)',
                  padding: '16px'
                }}
              >
                <div>
                  {/* Badge row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <BookOpen size={12} />
                      {lessonName}
                    </span>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {concept.category && (
                        <span className="badge badge-blue" style={{ gap: '4px', fontSize: '0.62rem' }}>
                          <Tag size={10} />
                          {concept.category}
                        </span>
                      )}
                      
                      {concept.isCustom && (
                        <span className="badge badge-success" style={{ gap: '4px', fontSize: '0.62rem' }}>
                          <User size={10} />
                          מושג משתמש
                        </span>
                      )}
                      
                      <button
                        onClick={() => onToggleMarkConcept(concept.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: markedConceptIds.includes(concept.id) ? 'var(--primary)' : 'var(--text-muted)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          outline: 'none',
                          padding: '2px'
                        }}
                        title={markedConceptIds.includes(concept.id) ? 'הסר מרשימת החזרה' : 'סמן לחזרה'}
                      >
                        <Bookmark size={14} fill={markedConceptIds.includes(concept.id) ? 'var(--primary)' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Term title */}
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', direction: 'ltr', textAlign: 'right' }}>
                    {concept.term}
                  </h3>

                  {/* Explanations */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                      <strong style={{ color: 'var(--primary)', fontSize: '0.72rem', display: 'block' }}>הגדרה (Low Level):</strong>
                      {concept.definition}
                    </p>

                    {difficulty === 'high' && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-primary)', borderTop: '1px solid var(--border-color)', paddingTop: '8px', lineHeight: '1.4' }}>
                        <strong style={{ color: 'var(--secondary)', fontSize: '0.72rem', display: 'block' }}>ארכיטקטורה (High Level):</strong>
                        {concept.definitionHighLevel}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '8px',
                    padding: '8px 10px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '4px',
                    fontSize: '0.74rem',
                    color: 'var(--text-secondary)',
                    borderLeft: '2px solid var(--success)'
                  }}
                >
                  <strong style={{ color: 'var(--success)' }}>הקשר במעבדה: </strong>
                  {concept.context}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
          לא נמצאו מושגים התואמים את החיפוש.
        </div>
      )}

    </div>
  );
};
