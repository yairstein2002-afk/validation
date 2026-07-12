import React, { useState, useEffect } from 'react';
import type { Lesson, Concept } from '../types/validationData';
import { ArrowRight, Edit3, Save, Video, Bookmark } from 'lucide-react';

interface LessonViewerProps {
  lessons: Lesson[];
  concepts: Concept[];
  activeLessonId: string;
  setActiveLessonId: (id: string) => void;
  completedLessons: string[];
  setCompletedLessons: (lessons: string[]) => void;
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
  const lesson = lessons.find((l) => l.id === activeLessonId) || lessons[0];
  const lessonConcepts = concepts.filter((c) => lesson.conceptIds.includes(c.id));

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [savedNotes, setSavedNotes] = useState<{ [key: string]: string }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answeredQuestion, setAnsweredQuestion] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [_, setQuizAttempted] = useState(false);

  useEffect(() => {
    const notes = localStorage.getItem('validation_notes');
    if (notes) {
      try {
        setSavedNotes(JSON.parse(notes));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    setCurrentSlideIndex(0);
    setFlipped(false);
    setSelectedAnswer(null);
    setAnsweredQuestion(false);
    setQuizScore(0);
    setCurrentQuizIndex(0);
    setQuizCompleted(false);
  }, [activeLessonId]);

  const activeConcept = lessonConcepts[currentSlideIndex];

  useEffect(() => {
    if (activeConcept) {
      setNoteText(savedNotes[activeConcept.id] || '');
      setFlipped(false);
    }
  }, [currentSlideIndex, activeConcept, savedNotes]);

  const handleSaveNote = () => {
    if (!activeConcept) return;
    const newNotes = { ...savedNotes, [activeConcept.id]: noteText };
    setSavedNotes(newNotes);
    localStorage.setItem('validation_notes', JSON.stringify(newNotes));
  };

  const getConceptQuestion = (concept: Concept) => {
    return {
      q: `מהי המטרה של המושג ${concept.term} בוולידציה?`,
      a: concept.context || 'משמש לאימות הלוגיקה החשמלית או הפונקציונלית של המעבד במעבדה.'
    };
  };

  const handleQuizAnswer = (optionIdx: number) => {
    if (answeredQuestion) return;
    setSelectedAnswer(optionIdx);
    setAnsweredQuestion(true);
    setQuizAttempted(true);

    const question = lesson.quizQuestions[currentQuizIndex];
    if (optionIdx === question.correctIndex) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedAnswer(null);
    setAnsweredQuestion(false);

    if (currentQuizIndex + 1 < lesson.quizQuestions.length) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
      const passScore = Math.ceil(lesson.quizQuestions.length * 0.8);
      if (quizScore >= passScore && !completedLessons.includes(lesson.id)) {
        const updated = [...completedLessons, lesson.id];
        setCompletedLessons(updated);
        localStorage.setItem('validation_completed_lessons', JSON.stringify(updated));
      }
    }
  };

  const handleRestartQuiz = () => {
    setSelectedAnswer(null);
    setAnsweredQuestion(false);
    setQuizScore(0);
    setCurrentQuizIndex(0);
    setQuizCompleted(false);
  };

  const activeQuestion = lesson.quizQuestions[currentQuizIndex];
  const requiredToPass = Math.ceil(lesson.quizQuestions.length * 0.8);
  const quizPassed = quizScore >= requiredToPass;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Back button to dashboard */}
      <button
        onClick={() => setActiveLessonId('')}
        className="btn btn-secondary"
        style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '6px 12px', fontSize: '0.8rem' }}
      >
        <ArrowRight size={14} />
        חזרה למסלול הלמידה
      </button>

      {/* Lesson title */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{lesson.titleHe}</h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', direction: 'ltr', display: 'block', textAlign: 'right' }}>
          {lesson.title}
        </span>
      </div>

      {/* Rationale explanation */}
      <div className="glass-card" style={{ borderRight: '4px solid var(--secondary)', background: 'rgba(59, 130, 246, 0.03)', padding: '14px' }}>
        <strong style={{ fontSize: '0.82rem', color: 'var(--secondary)' }}>למה השיעור ממוקם כאן? </strong>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
          {lesson.whyItIsHere}
        </p>
      </div>

      {/* логиק diagrams */}
      {lesson.diagram && currentSlideIndex < lessonConcepts.length && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>תרשים זרימה אינטראקטיבי</h3>
          <div className="diagram-container">
            <div className="diagram-nodes">
              {lesson.diagram.nodes.map((node, index) => {
                const isNodeActive = index === currentSlideIndex % lesson.diagram!.nodes.length;
                return (
                  <React.Fragment key={node.id}>
                    <div
                      className={`diagram-node ${node.type || 'process'}`}
                      style={{
                        border: isNodeActive ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        boxShadow: isNodeActive ? '0 0 15px var(--primary-glow)' : 'none',
                        background: isNodeActive ? 'rgba(6, 182, 212, 0.1)' : 'rgba(30, 41, 59, 0.7)',
                        transform: isNodeActive ? 'scale(1.03)' : 'none',
                        fontSize: '0.75rem',
                        padding: '8px 12px'
                      }}
                    >
                      {node.label}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Video section */}
      {currentSlideIndex < lessonConcepts.length && lesson.videoUrl && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Video size={16} style={{ color: 'var(--secondary)' }} />
            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>שיעור וידאו מלווה</h3>
          </div>
          <div className="video-wrapper">
            <iframe
              src={lesson.videoUrl}
              title={lesson.titleHe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Main Flashcard Carousel */}
      {currentSlideIndex < lessonConcepts.length ? (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>מושג {currentSlideIndex + 1} מתוך {lessonConcepts.length}</span>
            
            {activeConcept && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleMarkConcept(activeConcept.id);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: markedConceptIds.includes(activeConcept.id) ? 'var(--primary)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.78rem',
                  outline: 'none'
                }}
              >
                <Bookmark size={14} fill={markedConceptIds.includes(activeConcept.id) ? 'var(--primary)' : 'none'} />
                <span>{markedConceptIds.includes(activeConcept.id) ? 'סומן לחזרה' : 'סמן לחזרה'}</span>
              </button>
            )}
          </div>

          {/* Flip card */}
          <div className="flip-card-container">
            <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
              
              {/* Front view */}
              <div className="flip-card-front">
                <div style={{ width: '100%' }}>
                  <span className="badge badge-blue" style={{ marginBottom: '8px', fontSize: '0.62rem' }}>לחץ להצגת שאלת הבנה</span>
                  <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '12px', direction: 'ltr', textAlign: 'right' }}>
                    {activeConcept?.term}
                  </h3>
                  
                  <div style={{ textAlign: 'right', marginTop: '12px' }}>
                    <strong style={{ color: 'var(--primary)', display: 'block', fontSize: '0.78rem', marginBottom: '2px' }}>
                      הסבר Low Level:
                    </strong>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: '1.4' }}>
                      {activeConcept?.definition}
                    </p>
                  </div>

                  {difficulty === 'high' && (
                    <div style={{ textAlign: 'right', marginTop: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                      <strong style={{ color: 'var(--secondary)', display: 'block', fontSize: '0.78rem', marginBottom: '2px' }}>
                        הסבר High Level Architecture:
                      </strong>
                      <p style={{ color: 'var(--text-primary)', fontSize: '0.82rem', lineHeight: '1.4' }}>
                        {activeConcept?.definitionHighLevel}
                      </p>
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>שאלת הבנה מחכה מאחור &lsaquo;</span>
              </div>

              {/* Back view */}
              <div className="flip-card-back">
                <div style={{ width: '100%' }}>
                  <span className="badge badge-success" style={{ marginBottom: '8px', fontSize: '0.62rem' }}>איך זה נראה במעבדה?</span>
                  <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '12px', textAlign: 'right' }}>
                    {activeConcept && getConceptQuestion(activeConcept).q}
                  </h4>
                  <div style={{ textAlign: 'right', marginTop: '10px', background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <strong style={{ color: 'var(--success)', display: 'block', fontSize: '0.78rem', marginBottom: '2px' }}>
                      תשובה והקשר מעשי:
                    </strong>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', lineHeight: '1.4' }}>
                      {activeConcept && getConceptQuestion(activeConcept).a}
                    </p>
                  </div>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>לחץ לחזרה להסבר &lsaquo;</span>
              </div>

            </div>
          </div>

          {/* User study notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Edit3 size={14} style={{ color: 'var(--primary)' }} />
              <label className="form-label" style={{ marginBottom: 0 }}>הערות הלימוד האישיות שלך על מושג זה:</label>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="כתוב הערה אישית (למשל: 'לבדוק בלוח StarGate-3 במעבדה...')"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem' }}
              />
              <button onClick={handleSaveNote} className="btn btn-primary" style={{ padding: '8px 12px' }}>
                <Save size={14} />
              </button>
            </div>
          </div>

          {/* Carousel controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button
              onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            >
              הקודם
            </button>
            <button
              onClick={() => setCurrentSlideIndex((prev) => prev + 1)}
              className="btn btn-primary"
              style={{ padding: '6px 16px', fontSize: '0.78rem' }}
            >
              {currentSlideIndex + 1 === lessonConcepts.length ? 'המשך למבחן' : 'הבא'}
            </button>
          </div>

        </div>
      ) : (
        
        /* 4. Lesson Quiz Section */
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {!quizCompleted ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>שאלה {currentQuizIndex + 1} מתוך {lesson.quizQuestions.length}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ציון עובר: {requiredToPass}/{lesson.quizQuestions.length} שאלות</span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '16px', color: '#fff', textAlign: 'right' }}>
                {activeQuestion?.question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeQuestion?.options.map((option, idx) => {
                  let btnBg = 'rgba(255, 255, 255, 0.02)';
                  let btnBorder = 'var(--border-color)';

                  if (answeredQuestion) {
                    if (idx === activeQuestion.correctIndex) {
                      btnBg = 'rgba(16, 185, 129, 0.15)';
                      btnBorder = 'var(--success)';
                    } else if (idx === selectedAnswer) {
                      btnBg = 'rgba(239, 68, 68, 0.15)';
                      btnBorder = 'var(--error)';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={answeredQuestion}
                      className="btn btn-secondary"
                      style={{
                        justifyContent: 'flex-start',
                        textAlign: 'right',
                        background: btnBg,
                        borderColor: btnBorder,
                        padding: '12px',
                        fontSize: '0.82rem',
                        fontWeight: 'normal',
                        lineHeight: '1.4'
                      }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {answeredQuestion && (
                <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: selectedAnswer === activeQuestion.correctIndex ? 'var(--success)' : 'var(--error)', display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>
                    {selectedAnswer === activeQuestion.correctIndex ? '✨ תשובה נכונה!' : '❌ תשובה שגויה'}
                  </strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {activeQuestion.explanation}
                  </p>
                  
                  <button
                    onClick={handleNextQuizQuestion}
                    className="btn btn-primary"
                    style={{ marginTop: '12px', width: '100%', fontSize: '0.8rem', padding: '8px' }}
                  >
                    {currentQuizIndex + 1 === lesson.quizQuestions.length ? 'סיים מבחן' : 'השאלה הבאה'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            
            /* Quiz Completed screen */
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
                {quizPassed ? '🎉' : '❌'}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '8px' }}>
                {quizPassed ? 'עברת בהצלחה!' : 'לא קיבלת ציון עובר'}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                ענית נכון על {quizScore} מתוך {lesson.quizQuestions.length} שאלות.
                <br />
                {quizPassed ? 'השיעור סומן כהושלם והשיעור הבא נפתח במסלול!' : 'על מנת לעבור את השיעור, עליך לענות נכון על לפחות 80% מהשאלות.'}
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button onClick={handleRestartQuiz} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                  נסה שוב
                </button>
                <button onClick={() => setActiveLessonId('')} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                  חזור למסלול
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
