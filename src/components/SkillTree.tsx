import React from 'react';
import type { Lesson } from '../types/validationData';
import { Lock, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';

interface SkillTreeProps {
  lessons: Lesson[];
  completedLessons: string[];
  passedExams: string[]; // e.g. ['high_gateway', 'low_gateway']
  onSelectLesson: (lessonId: string) => void;
  onStartExam: (pathway: 'high' | 'low') => void;
}

export const SkillTree: React.FC<SkillTreeProps> = ({
  lessons,
  completedLessons,
  passedExams,
  onSelectLesson,
  onStartExam
}) => {
  
  // Helper to determine lock status
  const getLessonStatus = (lesson: Lesson) => {
    const isCompleted = completedLessons.includes(lesson.id);
    
    if (lesson.pathway === 'high') {
      // High Level progression: l1_1 -> l1_2 -> l1_3 -> l1_4
      if (lesson.id === 'l1_1') {
        return { locked: false, completed: isCompleted };
      }
      
      const prevId = lesson.id === 'l1_2' ? 'l1_1' : lesson.id === 'l1_3' ? 'l1_2' : lesson.id === 'l1_4' ? 'l1_3' : '';
      const prevCompleted = completedLessons.includes(prevId);
      return { locked: !prevCompleted, completed: isCompleted };
    } else {
      // Low Level progression: l2_1 -> l2_2 -> l2_3 -> l2_4
      // Locked until High-Level Gateway Exam is passed!
      const highExamPassed = passedExams.includes('high_gateway');
      if (!highExamPassed) {
        return { locked: true, completed: false, reason: 'דורש מעבר מבחן הסמכה High-Level' };
      }
      
      if (lesson.id === 'l2_1') {
        return { locked: false, completed: isCompleted };
      }
      
      const prevId = lesson.id === 'l2_2' ? 'l2_1' : lesson.id === 'l2_3' ? 'l2_2' : lesson.id === 'l2_4' ? 'l2_3' : '';
      const prevCompleted = completedLessons.includes(prevId);
      return { locked: !prevCompleted, completed: isCompleted };
    }
  };

  const highLessons = lessons.filter((l) => l.pathway === 'high');
  const lowLessons = lessons.filter((l) => l.pathway === 'low');

  // Exam unlock conditions
  const allHighCompleted = highLessons.every((l) => completedLessons.includes(l.id));
  const highExamUnlocked = allHighCompleted;
  const highExamPassed = passedExams.includes('high_gateway');

  const allLowCompleted = lowLessons.every((l) => completedLessons.includes(l.id));
  const lowExamUnlocked = allLowCompleted && highExamPassed;
  const lowExamPassed = passedExams.includes('low_gateway');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Visual Header */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>עץ מיומנויות וולידציה (Visual Skill Tree)</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          השלם את יחידות ה-High-Level ועבור את מבחן המחסום כדי לפתוח את יחידות ה-Low-Level.
        </p>
      </div>

      {/* Pathways Map */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}>
        
        {/* Pathway Section A: HIGH LEVEL */}
        <div className="glass-card" style={{ borderRight: '4px solid var(--primary)', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <span className="badge badge-cyan" style={{ fontSize: '0.62rem' }}>מסלול ראשון</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginTop: '4px' }}>HIGH LEVEL: ארכיטקטורה, מערכת ואינטגרציה</h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              הושלמו: {highLessons.filter(l => completedLessons.includes(l.id)).length} מתוך {highLessons.length}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            {highLessons.map((lesson) => {
              const status = getLessonStatus(lesson);
              return (
                <div key={lesson.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
                  
                  {/* Skill Node Badge */}
                  <button
                    onClick={() => !status.locked && onSelectLesson(lesson.id)}
                    className="glass-card"
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 20px',
                      cursor: status.locked ? 'not-allowed' : 'pointer',
                      background: status.completed 
                        ? 'rgba(16, 185, 129, 0.05)' 
                        : status.locked 
                        ? 'rgba(255,255,255,0.01)' 
                        : 'rgba(6, 182, 212, 0.05)',
                      borderColor: status.completed 
                        ? 'rgba(16, 185, 129, 0.25)' 
                        : status.locked 
                        ? 'var(--border-color)' 
                        : 'var(--primary)',
                      opacity: status.locked ? 0.5 : 1,
                      transition: 'all 0.2s ease',
                      textAlign: 'right'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: status.completed 
                          ? 'rgba(16, 185, 129, 0.1)' 
                          : status.locked 
                          ? 'rgba(255,255,255,0.05)' 
                          : 'rgba(6, 182, 212, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: status.completed ? 'var(--success)' : status.locked ? 'var(--text-muted)' : 'var(--primary)'
                      }}>
                        {status.completed ? <CheckCircle size={16} /> : status.locked ? <Lock size={16} /> : <BookOpen size={16} />}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold', color: '#fff' }}>{lesson.titleHe}</h4>
                        <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{lesson.description}</p>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {status.completed ? 'הושלם' : status.locked ? 'נעול' : 'זמין ללמידה'}
                    </div>
                  </button>
                </div>
              );
            })}

            {/* High Level Gateway Exam Node */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px' }}>
              <button
                onClick={() => highExamUnlocked && !highExamPassed && onStartExam('high')}
                className="glass-card"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  cursor: !highExamUnlocked ? 'not-allowed' : highExamPassed ? 'default' : 'pointer',
                  background: highExamPassed 
                    ? 'rgba(16, 185, 129, 0.1)' 
                    : !highExamUnlocked 
                    ? 'rgba(255,255,255,0.01)' 
                    : 'rgba(234, 179, 8, 0.08)',
                  borderColor: highExamPassed 
                    ? 'var(--success)' 
                    : !highExamUnlocked 
                    ? 'var(--border-color)' 
                    : 'var(--secondary)',
                  opacity: !highExamUnlocked ? 0.5 : 1,
                  textAlign: 'right'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: highExamPassed 
                      ? 'rgba(16, 185, 129, 0.2)' 
                      : 'rgba(234, 179, 8, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: highExamPassed ? 'var(--success)' : '#eab308'
                  }}>
                    <HelpCircle size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>🏆 מבחן הסמכת שלב: High-Level Gateway Exam</h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      מבחן מסכם של 5 תרחישי כשל מאמצים. דורש ציון 85% לפתיחת שלב ה-Low-Level.
                    </p>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: highExamPassed ? 'var(--success)' : '#eab308' }}>
                  {highExamPassed ? 'עבר בהצלחה!' : !highExamUnlocked ? 'נעול (השלם את כל השיעורים)' : 'זמין להסמכה'}
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* Pathway Section B: LOW LEVEL */}
        <div className="glass-card" style={{ borderRight: '4px solid var(--secondary)', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <span className="badge badge-blue" style={{ fontSize: '0.62rem' }}>מסלול שני</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff', marginTop: '4px' }}>LOW LEVEL: מיקרו-ארכיטקטורה, סיליקון ולוגיקה</h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              הושלמו: {lowLessons.filter(l => completedLessons.includes(l.id)).length} מתוך {lowLessons.length}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {lowLessons.map((lesson) => {
              const status = getLessonStatus(lesson);
              return (
                <button
                  key={lesson.id}
                  onClick={() => !status.locked && onSelectLesson(lesson.id)}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 20px',
                    cursor: status.locked ? 'not-allowed' : 'pointer',
                    background: status.completed 
                      ? 'rgba(16, 185, 129, 0.05)' 
                      : status.locked 
                      ? 'rgba(255,255,255,0.01)' 
                      : 'rgba(59, 130, 246, 0.05)',
                    borderColor: status.completed 
                      ? 'rgba(16, 185, 129, 0.25)' 
                      : status.locked 
                      ? 'var(--border-color)' 
                      : 'var(--secondary)',
                    opacity: status.locked ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                    textAlign: 'right'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: status.completed 
                        ? 'rgba(16, 185, 129, 0.1)' 
                        : status.locked 
                        ? 'rgba(255,255,255,0.05)' 
                        : 'rgba(59, 130, 246, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: status.completed ? 'var(--success)' : status.locked ? 'var(--text-muted)' : 'var(--secondary)'
                    }}>
                      {status.completed ? <CheckCircle size={16} /> : status.locked ? <Lock size={16} /> : <BookOpen size={16} />}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold', color: '#fff' }}>{lesson.titleHe}</h4>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{lesson.description}</p>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {status.completed ? 'הושלם' : status.locked ? 'נעול' : 'זמין ללמידה'}
                  </div>
                </button>
              );
            })}

            {/* Low Level Gateway Exam Node */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px' }}>
              <button
                onClick={() => lowExamUnlocked && !lowExamPassed && onStartExam('low')}
                className="glass-card"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  cursor: !lowExamUnlocked ? 'not-allowed' : lowExamPassed ? 'default' : 'pointer',
                  background: lowExamPassed 
                    ? 'rgba(16, 185, 129, 0.1)' 
                    : !lowExamUnlocked 
                    ? 'rgba(255,255,255,0.01)' 
                    : 'rgba(234, 179, 8, 0.08)',
                  borderColor: lowExamPassed 
                    ? 'var(--success)' 
                    : !lowExamUnlocked 
                    ? 'var(--border-color)' 
                    : 'var(--secondary)',
                  opacity: !lowExamUnlocked ? 0.5 : 1,
                  textAlign: 'right'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: lowExamPassed 
                      ? 'rgba(16, 185, 129, 0.2)' 
                      : 'rgba(234, 179, 8, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: lowExamPassed ? 'var(--success)' : '#eab308'
                  }}>
                    <HelpCircle size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff' }}>🏆 מבחן הסמכת שלב: Low-Level Gateway Exam</h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      מבחן מסכם על לוגיקה דיגיטלית, תזמונים וסימולציות. דורש ציון 85% לקבלת תעודת מוסמך.
                    </p>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: lowExamPassed ? 'var(--success)' : '#eab308' }}>
                  {lowExamPassed ? 'עבר בהצלחה!' : !lowExamUnlocked ? 'נעול' : 'זמין להסמכה'}
                </div>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
