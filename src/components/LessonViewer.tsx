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
        const parsed = JSON.parse(notes);
        if (parsed && typeof parsed === 'object') {
          setSavedNotes(parsed);
        } else {
          setSavedNotes({});
        }
      } catch (e) {
        console.error(e);
        setSavedNotes({});
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
      const activeNotes = (savedNotes && typeof savedNotes === 'object') ? savedNotes : {};
      setNoteText(activeNotes[activeConcept.id] || '');
      setFlipped(false);
    }
  }, [currentSlideIndex, activeConcept, savedNotes]);

  const handleSaveNote = () => {
    if (!activeConcept) return;
    const activeNotes = (savedNotes && typeof savedNotes === 'object') ? savedNotes : {};
    const newNotes = { ...activeNotes, [activeConcept.id]: noteText };
    setSavedNotes(newNotes);
    localStorage.setItem('validation_notes', JSON.stringify(newNotes));
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
      // Determine if passed
      const req = Math.ceil(lesson.quizQuestions.length * 0.8);
      if (quizScore >= req) {
        const completed = Array.isArray(completedLessons) ? completedLessons : [];
        if (!completed.includes(lesson.id)) {
          const updated = [...completed, lesson.id];
          setCompletedLessons(updated);
          localStorage.setItem('validation_completed_lessons', JSON.stringify(updated));
        }
      }
    }
  };

  // Helper to handle final score logic on complete
  const handleCompleteQuiz = () => {
    const req = Math.ceil(lesson.quizQuestions.length * 0.8);
    const passed = quizScore >= req;

    if (passed) {
      const completed = Array.isArray(completedLessons) ? completedLessons : [];
      if (!completed.includes(lesson.id)) {
        const updated = [...completed, lesson.id];
        setCompletedLessons(updated);
        localStorage.setItem('validation_completed_lessons', JSON.stringify(updated));
      }
    }
    setQuizCompleted(true);
  };

  const handleNextSlide = () => {
    if (currentSlideIndex + 1 < lessonConcepts.length) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
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
  const currentMarked = Array.isArray(markedConceptIds) ? markedConceptIds : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Back Button */}
      <button
        onClick={() => setActiveLessonId('')}
        className="btn btn-secondary"
        style={{ alignSelf: 'flex-start', padding: '6px 12px', fontSize: '0.8rem', gap: '4px' }}
      >
        <ArrowRight size={14} />
        <span>חזרה למסלול</span>
      </button>

      {/* Lesson Header */}
      <div>
        <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>שיעור פעיל</span>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 'bold' }}>{lesson.titleHe}</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', direction: 'ltr', textAlign: 'right' }}>
          {lesson.title}
        </p>
      </div>

      {/* Video Embed */}
      {lesson.videoUrl && (
        <section className="glass-card" style={{ padding: '12px' }}>
          <div className="video-wrapper">
            <iframe
              src={lesson.videoUrl}
              title={lesson.titleHe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
            <Video size={14} style={{ color: 'var(--primary)' }} />
            <span>סרטון הסבר: מונחים והרצאה מעשית על החומר</span>
          </div>
        </section>
      )}

      {/* Pedagogical Rationale Panel */}
      <section
        className="glass-card"
        style={{
          borderLeft: '3px solid var(--secondary)',
          background: 'rgba(59, 130, 246, 0.03)',
          padding: '16px'
        }}
      >
        <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--secondary)', marginBottom: '6px' }}>
          מדוע אנו לומדים את זה כאן? (רציונל פדגוגי)
        </h4>
        <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
          {lesson.whyItIsHere}
        </p>
      </section>

      {/* Architectural Diagram (Slideshow Presentation Mode) */}
      {lesson.diagram && (
        <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff' }}>🗺️ דיאגרמת זרימה ארכיטקטונית</h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{lesson.diagram.title}</p>
          
          <div className="diagram-container">
            <div className="diagram-nodes">
              {lesson.diagram.nodes.map((node, idx) => (
                <React.Fragment key={node.id}>
                  <div className="diagram-node" style={{
                    borderColor: node.type === 'input' ? 'var(--secondary)' : node.type === 'process' ? 'var(--primary)' : node.type === 'decision' ? '#eab308' : 'var(--success)',
                    background: 'rgba(255, 255, 255, 0.01)'
                  }}>
                    <strong style={{ fontSize: '0.74rem', display: 'block', color: 'var(--text-muted)', marginBottom: '2px' }}>שלב {idx + 1}</strong>
                    {node.label}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Concept Presentation Flashcard (Flip Mode) */}
      {lessonConcepts.length > 0 && currentSlideIndex < lessonConcepts.length && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>🗂️ כרטיסיות מונחים (לחץ להפיכה)</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>מונח {currentSlideIndex + 1} מתוך {lessonConcepts.length}</span>
          </div>

          {activeConcept && (
            <div className="flip-card-container">
              <div className={`flip-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(!flipped)}>
                
                {/* Front Side */}
                <div className="flip-card-front">
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>לחץ להצגת הגדרה</span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMarkConcept(activeConcept.id);
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: currentMarked.includes(activeConcept.id) ? 'var(--primary)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        outline: 'none',
                        padding: '4px'
                      }}
                      title={currentMarked.includes(activeConcept.id) ? 'הסר מרשימת החזרה' : 'סמן לחזרה'}
                    >
                      <Bookmark size={16} fill={currentMarked.includes(activeConcept.id) ? 'var(--primary)' : 'none'} />
                    </button>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                    <h3 style={{ fontSize: '1.6rem', color: '#fff', letterSpacing: '0.02em', direction: 'ltr' }}>{activeConcept.term}</h3>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>לחץ על הכרטיסייה לקריאת ההסבר והקשר המעבדה</span>
                  </div>

                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>כרטיסיית וולידציה - אינטל</span>
                </div>

                {/* Back Side */}
                <div className="flip-card-back">
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.62rem' }}>הגדרה מפורטת</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', direction: 'ltr' }}>{activeConcept.term}</span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', textAlign: 'right', width: '100%', overflowY: 'auto', padding: '10px 0' }}>
                    
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                      <strong style={{ color: 'var(--primary)', fontSize: '0.72rem', display: 'block' }}>בסיסי (Low Level):</strong>
                      {activeConcept.definition}
                    </p>

                    {difficulty === 'high' && (
                      <p style={{ fontSize: '0.76rem', color: 'var(--text-primary)', borderTop: '1px solid var(--border-color)', paddingTop: '6px', lineHeight: '1.4' }}>
                        <strong style={{ color: 'var(--secondary)', fontSize: '0.72rem', display: 'block' }}>מתקדם (High Level):</strong>
                        {activeConcept.definitionHighLevel}
                      </p>
                    )}

                    <p style={{ fontSize: '0.76rem', color: 'var(--text-primary)', borderTop: '1px solid var(--border-color)', paddingTop: '6px', lineHeight: '1.4' }}>
                      <strong style={{ color: 'var(--success)', fontSize: '0.72rem', display: 'block' }}>במעבדה (Lab Context):</strong>
                      {activeConcept.context}
                    </p>

                  </div>

                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>לחץ שוב להפיכה לחזית</span>
                </div>

              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '4px' }}>
            <button
              onClick={handlePrevSlide}
              disabled={currentSlideIndex === 0}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem' }}
            >
              הקודם
            </button>
            <button
              onClick={handleNextSlide}
              disabled={currentSlideIndex + 1 === lessonConcepts.length}
              className="btn btn-secondary"
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem' }}
            >
              הבא
            </button>
          </div>

          {/* Personal Notes Section */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Edit3 size={14} style={{ color: 'var(--primary)' }} />
              <strong style={{ fontSize: '0.82rem' }}>הערות לימוד אישיות על המושג:</strong>
            </div>
            
            <textarea
              className="form-textarea"
              placeholder="כתוב לעצמך הערות לימוד (למשל: סקריפט ספציפי, פקודה, או תזכורת)..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              style={{ minHeight: '60px', fontSize: '0.78rem', padding: '8px 10px' }}
            />

            <button
              onClick={handleSaveNote}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.74rem', gap: '4px', alignSelf: 'flex-end', border: '1px solid rgba(6, 182, 212, 0.2)' }}
            >
              <Save size={12} style={{ color: 'var(--primary)' }} />
              <span>שמור הערה</span>
            </button>
          </div>
        </section>
      )}

      {/* Lesson Quiz Section */}
      {lesson.quizQuestions && lesson.quizQuestions.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold' }}>📝 בוחן הבנת שיעור</h3>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {!quizCompleted ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>שאלה {currentQuizIndex + 1} מתוך {lesson.quizQuestions.length}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ציון עובר: {requiredToPass}/{lesson.quizQuestions.length} שאלות</span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '16px', color: '#fff', textAlign: 'right', lineHeight: '1.4' }}>
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
                    
                    {currentQuizIndex + 1 === lesson.quizQuestions.length ? (
                      <button
                        onClick={handleCompleteQuiz}
                        className="btn btn-primary"
                        style={{ marginTop: '12px', width: '100%', fontSize: '0.8rem', padding: '8px' }}
                      >
                        סיים בוחן
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuizQuestion}
                        className="btn btn-primary"
                        style={{ marginTop: '12px', width: '100%', fontSize: '0.8rem', padding: '8px' }}
                      >
                        שאלה הבאה
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '2.5rem' }}>
                  {quizScore >= requiredToPass ? '🏆' : '❌'}
                </div>
                
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 'bold' }}>
                    {quizScore >= requiredToPass ? 'עברת בהצלחה את הבוחן!' : 'לא עברת את רף המעבר'}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.4' }}>
                    ענית נכון על **{quizScore} מתוך {lesson.quizQuestions.length} שאלות** ({Math.round((quizScore / lesson.quizQuestions.length) * 100)}%).
                    <br />
                    {quizScore >= requiredToPass
                      ? 'השיעור סומן כהושלם בהצלחה והנתיב הבא פתוח בפניך!'
                      : 'כדי לסמן את השיעור כהושלם עליך לקבל לפחות 80% (ענה נכון על לפחות 2 שאלות).'}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button
                    onClick={handleRestartQuiz}
                    className="btn btn-secondary"
                    style={{ flex: 1, fontSize: '0.8rem', padding: '8px' }}
                  >
                    נסה שוב
                  </button>
                  <button
                    onClick={() => setActiveLessonId('')}
                    className="btn btn-primary"
                    style={{ flex: 1, fontSize: '0.8rem', padding: '8px' }}
                  >
                    חזור למסלול
                  </button>
                </div>
              </div>
            )}

          </div>
        </section>
      )}

    </div>
  );
};
