import React, { useState, useEffect } from 'react';
import type { Lesson, Concept } from '../types/validationData';
import { ChipletDiagram } from './ChipletDiagram';
import { InteractiveCheckpoints } from './InteractiveCheckpoints';
import { LogLab } from './LogLab';
import { Bookmark, CheckCircle2, Award } from 'lucide-react';

interface LessonViewerProps {
  lessons: Lesson[];
  concepts: Concept[];
  activeLessonId: string;
  setActiveLessonId: (id: string) => void;
  completedLessons: string[];
  setCompletedLessons: (ids: string[]) => void;
  difficulty: 'standard' | 'high';
  markedConceptIds: string[];
  onToggleMarkConcept: (conceptId: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lessons,
  concepts,
  activeLessonId,
  setActiveLessonId,
  completedLessons,
  setCompletedLessons,
  difficulty,
  markedConceptIds,
  onToggleMarkConcept
}) => {
  const lesson = lessons.find((l) => l.id === activeLessonId);
  const [slideIdx, setSlideIdx] = useState(0);
  const [checkpointPassed, setCheckpointPassed] = useState(false);
  const [labPassed, setLabPassed] = useState(false);
  
  // Note writing state
  const [noteText, setNoteText] = useState('');
  const [activeConceptForNote, setActiveConceptForNote] = useState<string | null>(null);

  useEffect(() => {
    setSlideIdx(0);
    setCheckpointPassed(false);
    setLabPassed(false);
    setActiveConceptForNote(null);
    setNoteText('');
  }, [activeLessonId]);

  if (!lesson) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
        בחר שיעור כדי להתחיל ללמוד.
      </div>
    );
  }

  // Filter concepts relevant to this unit
  const lessonConcepts = concepts.filter((c) => lesson.conceptIds.includes(c.id));

  const handleNextSlide = () => {
    if (slideIdx < lesson.contentSlides.length - 1) {
      setSlideIdx(slideIdx + 1);
    }
  };

  const handlePrevSlide = () => {
    if (slideIdx > 0) {
      setSlideIdx(slideIdx - 1);
    }
  };

  const handleSaveNote = (conceptId: string) => {
    const storedNotes = localStorage.getItem('validation_notes');
    let notes: { [key: string]: string } = {};
    if (storedNotes) {
      try {
        notes = JSON.parse(storedNotes);
      } catch (e) {
        console.error(e);
      }
    }
    notes[conceptId] = noteText;
    localStorage.setItem('validation_notes', JSON.stringify(notes));
    setActiveConceptForNote(null);
    setNoteText('');
    
    // Auto toggle mark concept for review so it shows up in their list
    if (!markedConceptIds.includes(conceptId)) {
      onToggleMarkConcept(conceptId);
    }
  };

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(lesson.id)) {
      const updated = [...completedLessons, lesson.id];
      setCompletedLessons(updated);
      localStorage.setItem('validation_completed_lessons', JSON.stringify(updated));
    }
    setActiveLessonId(''); // return to skill tree
  };

  const isLastSlide = slideIdx === lesson.contentSlides.length - 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Navigation and Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setActiveLessonId('')} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
            חזרה לעץ
          </button>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            מסלול {lesson.pathway === 'high' ? 'High-Level' : 'Low-Level'}
          </span>
        </div>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#fff' }}>{lesson.titleHe}</h3>
      </div>

      {/* Grid: Lesson content slides + Concept sidebar dictionary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Side: Learning Slide Stepper */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div className="glass-card" style={{ minHeight: '260px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            
            {/* Slide Index indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>סלייד {slideIdx + 1} מתוך {lesson.contentSlides.length}</span>
              <span>שיעור {lesson.id.replace('l', '').replace('_', '.')}</span>
            </div>

            {/* Markdown-style content parser */}
            <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: '1.6' }} className="slide-content-markdown">
              {lesson.contentSlides[slideIdx].split('\n').map((line, idx) => {
                if (line.startsWith('###')) {
                  return <h4 key={idx} style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#fff', margin: '14px 0 8px 0' }}>{line.replace('###', '').trim()}</h4>;
                }
                if (line.startsWith('*')) {
                  return <li key={idx} style={{ marginRight: '14px', listStyleType: 'disc', margin: '4px 0' }}>{line.replace('*', '').trim()}</li>;
                }
                return <p key={idx} style={{ margin: '6px 0' }}>{line}</p>;
              })}
            </div>

            {/* If Unit 1.1, render Multi-Chiplet Block Diagram */}
            {lesson.hasDiagram && slideIdx === 1 && (
              <ChipletDiagram />
            )}

            {/* Slide controls */}
            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <button
                onClick={handlePrevSlide}
                disabled={slideIdx === 0}
                className="btn btn-secondary"
                style={{ flex: 1, fontSize: '0.78rem', opacity: slideIdx === 0 ? 0.3 : 1 }}
              >
                הקודם
              </button>
              <button
                onClick={handleNextSlide}
                disabled={isLastSlide}
                className="btn btn-secondary"
                style={{ flex: 1, fontSize: '0.78rem', opacity: isLastSlide ? 0.3 : 1 }}
              >
                הבא
              </button>
            </div>

          </div>

          {/* Inline Checkpoint: Render only when reading completed slides */}
          {isLastSlide && lesson.checkpoints && (
            <InteractiveCheckpoints
              data={lesson.checkpoints}
              onSuccess={() => setCheckpointPassed(true)}
            />
          )}

          {/* End Unit Log Lab: Unlock only when checkpoint completed */}
          {isLastSlide && (!lesson.checkpoints || checkpointPassed) && lesson.logScenario && (
            <div className="glass-card" style={{ border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)' }}>
                <Award size={18} />
                <strong style={{ fontSize: '0.85rem' }}>מעבדת סוף יחידה פתוחה!</strong>
              </div>
              <LogLab
                data={lesson.logScenario}
                onSuccess={() => setLabPassed(true)}
              />
            </div>
          )}

          {/* Finalize button: Unlock when checkpoint and lab are completed */}
          {isLastSlide && 
           (!lesson.checkpoints || checkpointPassed) && 
           (!lesson.logScenario || labPassed) && (
            <button
              onClick={handleCompleteLesson}
              className="btn btn-cyan"
              style={{
                width: '100%',
                padding: '14px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                boxShadow: '0 0 15px rgba(6,182,212,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <CheckCircle2 size={18} />
              השלם שיעור ועבור הלאה
            </button>
          )}

        </div>

        {/* Right Side: Concepts sidebar dictionary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
            מושגי מפתח ללמידה בפרק זה:
          </h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '480px', overflowY: 'auto' }}>
            {lessonConcepts.map((concept) => {
              const isMarked = markedConceptIds.includes(concept.id);
              const isWritingNote = activeConceptForNote === concept.id;

              return (
                <div
                  key={concept.id}
                  className="glass-card"
                  style={{
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    borderColor: isMarked ? 'rgba(6, 182, 212, 0.2)' : 'var(--border-color)',
                    background: isMarked ? 'rgba(6, 182, 212, 0.02)' : 'rgba(255,255,255,0.01)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.8rem', color: '#fff', direction: 'ltr' }}>{concept.term}</strong>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      
                      {/* Note button */}
                      <button
                        onClick={() => {
                          setActiveConceptForNote(isWritingNote ? null : concept.id);
                          setNoteText('');
                        }}
                        style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.65rem', textDecoration: 'underline', padding: '0' }}
                      >
                        {isWritingNote ? 'ביטול הערה' : 'הוסף הערה 📝'}
                      </button>

                      {/* Bookmark button */}
                      <button
                        onClick={() => onToggleMarkConcept(concept.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: isMarked ? 'var(--primary)' : 'var(--text-muted)',
                          cursor: 'pointer'
                        }}
                        title={isMarked ? 'הסר מרשימת החזרה' : 'סמן לחזרה'}
                      >
                        <Bookmark size={12} fill={isMarked ? 'var(--primary)' : 'transparent'} />
                      </button>

                    </div>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {difficulty === 'high' ? concept.definitionHighLevel : concept.definition}
                  </p>

                  {/* Add note textarea panel */}
                  {isWritingNote && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '6px' }}>
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="כתוב הערה למושג זה..."
                        style={{
                          width: '100%',
                          minHeight: '44px',
                          background: 'rgba(0,0,0,0.4)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '4px',
                          fontSize: '0.74rem',
                          color: '#fff',
                          padding: '6px',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                      <button
                        onClick={() => handleSaveNote(concept.id)}
                        className="btn btn-cyan"
                        style={{ fontSize: '0.68rem', padding: '4px 10px', alignSelf: 'flex-end' }}
                      >
                        שמור הערה
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
