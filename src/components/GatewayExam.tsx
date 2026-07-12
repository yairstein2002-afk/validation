import React, { useState, useEffect } from 'react';
import type { ExamScenario, Lesson } from '../types/validationData';
import { examScenarios } from '../data/initialData';
import { Trophy, AlertTriangle, RotateCcw } from 'lucide-react';

interface GatewayExamProps {
  pathway: 'high' | 'low';
  lessons: Lesson[];
  onPassExam: (pathway: 'high' | 'low') => void;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const GatewayExam: React.FC<GatewayExamProps> = ({
  pathway,
  lessons,
  onPassExam,
  onClose,
  onSelectLesson
}) => {
  const [questions, setQuestions] = useState<ExamScenario[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [scorePercent, setScorePercent] = useState(0);
  const [failedTopics, setFailedTopics] = useState<string[]>([]);

  useEffect(() => {
    // Filter questions matching pathway
    const pathQuestions = examScenarios.filter((q) => q.pathway === pathway);
    setQuestions(pathQuestions);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setExamSubmitted(false);
    setScorePercent(0);
    setFailedTopics([]);
  }, [pathway]);

  const handleSelectOption = (optIdx: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIdx]: optIdx });
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    const wrongTopicIds: string[] = [];

    questions.forEach((q, idx) => {
      const selected = selectedAnswers[idx];
      if (selected === q.correctIndex) {
        correctCount++;
      } else {
        // Collect review topics for wrong answers
        q.reviewTopicIds.forEach((tId) => {
          if (!wrongTopicIds.includes(tId)) {
            wrongTopicIds.push(tId);
          }
        });
      }
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    setScorePercent(percent);
    setExamSubmitted(true);
    setFailedTopics(wrongTopicIds);

    if (percent >= 85) {
      onPassExam(pathway);
    }
  };

  const isPassed = scorePercent >= 85;

  return (
    <div className="glass-card" style={{ maxWidth: '640px', margin: '20px auto', display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
        <div>
          <span className="badge badge-cyan" style={{ fontSize: '0.62rem', background: 'rgba(234,179,8,0.1)', color: '#eab308', borderColor: 'rgba(234,179,8,0.2)' }}>
            מבחן הסמכת שלב (Gateway Exam)
          </span>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginTop: '4px' }}>
            {pathway === 'high' ? 'מבחן הסמכה: High-Level Platform Architecture' : 'מבחן הסמכה: Low-Level Microarchitecture & Logic'}
          </h3>
        </div>
        <button onClick={onClose} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
          ביטול ויציאה
        </button>
      </div>

      {questions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
          לא נמצאו שאלות זמינות למבחן זה במאגר.
        </div>
      ) : !examSubmitted ? (
        // EXAM ACTIVE WORKSPACE
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Question Index Progress Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              <span>שאלה {currentIdx + 1} מתוך {questions.length}</span>
              <span>{Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${((currentIdx + 1) / questions.length) * 100}%`, height: '100%', background: 'var(--primary)' }}></div>
            </div>
          </div>

          {/* Question Title */}
          <div className="glass-card" style={{ padding: '16px', background: 'rgba(0,0,0,0.2)' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 'bold', color: '#fff', lineHeight: '1.5' }}>
              {questions[currentIdx].question}
            </h4>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {questions[currentIdx].options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentIdx] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="btn btn-secondary"
                  style={{
                    justifyContent: 'flex-start',
                    textAlign: 'right',
                    width: '100%',
                    fontSize: '0.8rem',
                    padding: '12px 16px',
                    background: isSelected ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255,255,255,0.02)',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--border-color)',
                    color: isSelected ? '#fff' : 'var(--text-secondary)',
                    fontWeight: isSelected ? 'bold' : 'normal'
                  }}
                >
                  <span style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '1px solid var(--border-color)',
                    marginLeft: '10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isSelected ? 'var(--primary)' : 'transparent',
                    fontSize: '0.6rem',
                    color: '#000',
                    fontWeight: 'bold'
                  }}>
                    {isSelected ? '✓' : ''}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '8px 14px', opacity: currentIdx === 0 ? 0.3 : 1 }}
              >
                הקודם
              </button>
              <button
                onClick={handleNext}
                disabled={currentIdx === questions.length - 1}
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '8px 14px', opacity: currentIdx === questions.length - 1 ? 0.3 : 1 }}
              >
                הבא
              </button>
            </div>

            {currentIdx === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length < questions.length}
                className="btn btn-cyan"
                style={{ fontSize: '0.8rem', padding: '8px 18px' }}
              >
                הגש מבחן
              </button>
            ) : (
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>עליך לענות על כל השאלות להגשה</span>
            )}
          </div>

        </div>
      ) : (
        // EXAM SUBMITTED RESULTS WORKSPACE
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', textAlign: 'center', padding: '10px 0' }}>
          
          {isPassed ? (
            // PASSED CARD
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                <Trophy size={42} />
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--success)' }}>מזל טוב! עברת את מבחן ההסמכה!</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                השגת ציון של **{scorePercent}%** (סף המעבר הוא 85%).
                {pathway === 'high' 
                  ? ' מסלול ה-Low-Level נפתח כעת לחלוטין ללמידה בעץ המיומנויות.' 
                  : ' השלמת בהצלחה את כל שלבי ההכשרה של האקדמיה למאבחני חומרה!'}
              </p>
            </div>
          ) : (
            // FAILED CARD
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--error)' }}>
                <AlertTriangle size={42} />
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--error)' }}>לא עברת את מבחן המחסום</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                הציון שהתקבל הוא **{scorePercent}%**. סף המעבר הנדרש באקדמיה הוא **85%**.
              </p>
            </div>
          )}

          {/* Review recommendation list if failed */}
          {!isPassed && failedTopics.length > 0 && (
            <div className="glass-card" style={{ width: '100%', borderRight: '4px solid var(--error)', background: 'rgba(239, 68, 68, 0.02)', textAlign: 'right', padding: '16px' }}>
              <strong style={{ fontSize: '0.8rem', color: 'var(--error)', display: 'block', marginBottom: '8px' }}>
                ⚠️ נושאים שעליך ללמוד ולסקור שוב לפני הגשה חוזרת:
              </strong>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {failedTopics.map((topicId) => {
                  const lesson = lessons.find((l) => l.id === topicId);
                  if (!lesson) return null;

                  return (
                    <button
                      key={topicId}
                      onClick={() => {
                        onClose();
                        onSelectLesson(topicId);
                      }}
                      className="btn btn-secondary"
                      style={{
                        justifyContent: 'flex-start',
                        textAlign: 'right',
                        fontSize: '0.78rem',
                        padding: '8px 12px',
                        background: 'rgba(255,255,255,0.01)',
                        width: '100%',
                        color: 'var(--primary)',
                        textDecoration: 'underline'
                      }}
                    >
                      📖 {lesson.titleHe}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reset / Actions */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            {!isPassed && (
              <button
                onClick={() => {
                  setExamSubmitted(false);
                  setCurrentIdx(0);
                  setSelectedAnswers({});
                  setFailedTopics([]);
                }}
                className="btn btn-cyan"
                style={{ fontSize: '0.8rem', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <RotateCcw size={14} />
                נסה שוב
              </button>
            )}
            <button onClick={onClose} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
              חזור לעץ מיומנויות
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
