import React, { useState, useEffect } from 'react';
import type { Lesson, QuizQuestion } from '../types/validationData';
import { ShieldCheck, AlertTriangle, RefreshCw, CheckCircle } from 'lucide-react';

interface QuizManagerProps {
  lessons: Lesson[];
  completedLessons: string[];
}

export const QuizManager: React.FC<QuizManagerProps> = ({
  lessons,
  completedLessons
}) => {
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Generate exam questions from all active completed lessons
  useEffect(() => {
    if (started && !completed) {
      const activeCompleted = lessons.filter((l) => completedLessons.includes(l.id) && !l.isPlanned);
      let allQuestions: QuizQuestion[] = [];
      
      activeCompleted.forEach((lesson) => {
        allQuestions = [...allQuestions, ...lesson.quizQuestions];
      });

      // Shuffle and pick at most 10 questions
      const shuffled = allQuestions.sort(() => 0.5 - Math.random());
      setExamQuestions(shuffled.slice(0, 10));
    }
  }, [started]);

  const activeQuestion = examQuestions[currentIdx];

  const handleAnswerSelect = (optIdx: number) => {
    if (answered) return;
    setSelectedAnswer(optIdx);
    setAnswered(true);

    if (optIdx === activeQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setAnswered(false);

    if (currentIdx + 1 < examQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setCompleted(false);
    setExamQuestions([]);
  };

  const requiredToPass = Math.ceil(examQuestions.length * 0.8);
  const passed = score >= requiredToPass;

  // Render before starting
  if (!started) {
    const activeLessonsCount = lessons.filter(l => !l.isPlanned).length;
    const completedCount = completedLessons.length;
    const canTakeExam = completedCount >= 1; // Require at least 1 completed lesson

    return (
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <ShieldCheck size={48} style={{ color: 'var(--primary)', marginBottom: '12px' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>מבחן הסמכת מהנדס וולידציה</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>
            מבחן זה מסכם את הידע שלך מכל השיעורים שהשלמת. כדי לקבל תעודת הסמכה ועובר, עליך לענות נכון על **לפחות 80% מהשאלות** במבחן.
          </p>
        </div>

        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span>שיעורים שהושלמו:</span>
            <strong style={{ color: completedCount > 0 ? 'var(--success)' : 'var(--error)' }}>
              {completedCount} מתוך {activeLessonsCount}
            </strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span>הרכב שאלות המבחן:</span>
            <strong>שאלות רנדומליות מהשיעורים שהשלמת</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <span>תנאי מעבר:</span>
            <strong style={{ color: 'var(--primary)' }}>80% הצלחה (מבוסס על הסמכות Intel)</strong>
          </div>
        </div>

        {canTakeExam ? (
          <button onClick={() => setStarted(true)} className="btn btn-primary" style={{ width: '100%' }}>
            התחל במבחן ההסמכה
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', padding: '12px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
            <AlertTriangle size={16} style={{ color: 'var(--error)', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              על מנת לגשת למבחן ההסמכה, עליך להשלים בהצלחה לפחות שיעור אחד במסלול הלמידה (לענות נכון על 80% מבוחן השיעור).
            </p>
          </div>
        )}
      </div>
    );
  }

  // Render loading state if questions are not generated
  if (examQuestions.length === 0) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
        <RefreshCw size={24} className="animate-pulse" style={{ color: 'var(--primary)' }} />
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
          מייצר שאלות מבחן מותאמות...
        </p>
      </div>
    );
  }

  // Render completed view
  if (completed) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '30px 10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ fontSize: '3rem' }}>
          {passed ? '🏆' : '❌'}
        </div>
        
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 'bold' }}>
            {passed ? 'עברת את בחינת ההסמכה!' : 'לא קיבלת ציון עובר במבחן'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>
            התוצאה שלך: **{score} מתוך {examQuestions.length} תשובות נכונות** ({Math.round((score / examQuestions.length) * 100)}%).
            <br />
            {passed
              ? 'מזל טוב! הוכחת שליטה מקצועית במושגי החומרה והוולידציה במעבדות. אתה מוסמך באופן רשמי!'
              : 'אינך עומד ברף המעבר המחמיר של 80%. חזור על השיעורים, קרא את המושגים לחזרה ונסה שוב.'}
          </p>
        </div>

        {passed && (
          <div
            style={{
              padding: '16px',
              background: 'rgba(16, 185, 129, 0.05)',
              border: '2px dashed var(--success)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle size={32} style={{ color: 'var(--success)' }} />
            <strong style={{ fontSize: '0.95rem', color: '#fff' }}>תעודת הסמכה: SILICON VALIDATION SPECIALIST</strong>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>מזהה הסמכה: INTEL-VAL-{Date.now().toString().slice(-6)}</span>
          </div>
        )}

        <button onClick={handleRestart} className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
          נסה שוב / חזרה לתפריט
        </button>
      </div>
    );
  }

  // Render question card
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>שאלה {currentIdx + 1} מתוך {examQuestions.length}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>הצלחה: {score} נכונות</span>
      </div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#fff', textAlign: 'right', lineHeight: '1.4' }}>
        {activeQuestion?.question}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {activeQuestion?.options.map((option, idx) => {
          let btnBg = 'rgba(255, 255, 255, 0.02)';
          let btnBorder = 'var(--border-color)';

          if (answered) {
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
              onClick={() => handleAnswerSelect(idx)}
              disabled={answered}
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

      {answered && (
        <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <strong style={{ color: selectedAnswer === activeQuestion.correctIndex ? 'var(--success)' : 'var(--error)', display: 'block', fontSize: '0.8rem', marginBottom: '4px' }}>
            {selectedAnswer === activeQuestion.correctIndex ? '✨ תשובה נכונה!' : '❌ תשובה שגויה'}
          </strong>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            {activeQuestion.explanation}
          </p>
          
          <button
            onClick={handleNext}
            className="btn btn-primary"
            style={{ marginTop: '12px', width: '100%', fontSize: '0.8rem', padding: '8px' }}
          >
            {currentIdx + 1 === examQuestions.length ? 'סיים מבחן מסכם' : 'שאלה הבאה'}
          </button>
        </div>
      )}

    </div>
  );
};
