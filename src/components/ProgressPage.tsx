import React from 'react';
import type { Lesson } from '../types/validationData';
import { Trophy, CheckCircle2, Bookmark, FileText, FolderOpen, Award } from 'lucide-react';

interface ProgressPageProps {
  lessons: Lesson[];
  completedLessons: string[];
  markedConceptIds: string[];
  onSelectTab: (tab: string) => void;
  onSelectLesson: (lessonId: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  lessons,
  completedLessons,
  markedConceptIds,
  onSelectTab,
  onSelectLesson
}) => {
  const activeLessons = lessons.filter((l) => !l.isPlanned);
  const totalCount = activeLessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Group lessons by Modules (Folders/Chapters)
  const modules = [
    {
      name: 'תיקייה 1: מבוא וארכיטקטורת ליבה',
      lessonIds: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9', 'l10', 'l11', 'l12'],
      desc: 'יסודות המעבד, מחזור הפקודה ויחידות החישוב והפענוח.'
    },
    {
      name: 'תיקייה 2: היררכיית הזיכרון והאחסון',
      lessonIds: ['l13', 'l14', 'l15', 'l16', 'l17', 'l18', 'l19', 'l20', 'l21', 'l22'],
      desc: 'זכרונות מטמון (Caches), עקביות זיכרון, בקר הזיכרון ותהליך ה-Boot.'
    },
    {
      name: 'תיקייה 3: לוחות אם, ממשקים ופסיקות',
      lessonIds: ['l23', 'l24', 'l25', 'l26', 'l27', 'l28', 'l29', 'l30', 'l31'],
      desc: 'PCIe, USB, NVMe, פסיקות חומרה וגישה ישירה (DMA).'
    },
    {
      name: 'תיקייה 4: ניהול כוח, תזמון ושעונים',
      lessonIds: ['l32', 'l33', 'l34', 'l35', 'l36', 'l37', 'l38'],
      desc: 'מחזורי שעון, Clock/Power Gating, מצבי שינה (C-States/P-States) ו-VRM.'
    },
    {
      name: 'תיקייה 5: עקרונות הולידציה והבדיקות',
      lessonIds: ['l39', 'l40', 'l41', 'l42', 'l43', 'l44', 'l45', 'l46', 'l47', 'l48', 'l49', 'l50', 'l51'],
      desc: 'מתודולוגיות Pre-Silicon ו-Post-Silicon, בדיקות מאמץ ואימות ממשקים.'
    },
    {
      name: 'תיקייה 6: שלמות אותות, CDC ודיבאג מעבדה',
      lessonIds: ['l52', 'l53', 'l54', 'l55', 'l56', 'l57', 'l58', 'l59', 'l60'],
      desc: 'Signal Integrity, CDC, כלי דיבאג (JTAG/Oscilloscope) ושגרת המעבדה.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>מרכז התקדמות הלמידה האישי</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          עקוב אחר התקדמותך ב-6 תיקיות הלימוד של המנטור והסמכת הוולידציה שלך.
        </p>
      </div>

      {/* Progress Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Main completion card */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Trophy size={28} style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>שיעורים שהושלמו</span>
            <strong style={{ fontSize: '1.4rem', color: '#fff' }}>{completedCount} / {totalCount}</strong>
            <span style={{ fontSize: '0.68rem', color: 'var(--success)', display: 'block', marginTop: '2px' }}>
              {progressPercent}% הושלמו
            </span>
          </div>
        </div>

        {/* Marked Concepts Card */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--secondary)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bookmark size={26} style={{ color: 'var(--secondary)' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>מושגים לחזרה</span>
            <strong style={{ fontSize: '1.4rem', color: '#fff' }}>{markedConceptIds.length}</strong>
            <button 
              onClick={() => onSelectTab('glossary')}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.68rem', padding: '0', cursor: 'pointer', textDecoration: 'underline', display: 'block', marginTop: '2px' }}
            >
              למד מילון מושגים
            </button>
          </div>
        </div>

        {/* Certification Status Card */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--success)' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Award size={28} style={{ color: 'var(--success)' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>מצב הסמכה</span>
            <strong style={{ fontSize: '1rem', color: progressPercent === 100 ? 'var(--success)' : 'var(--text-secondary)' }}>
              {progressPercent === 100 ? 'זכאי לתעודה!' : 'בלמידה פעילה'}
            </strong>
            <button 
              onClick={() => onSelectTab('quiz')}
              style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.68rem', padding: '0', cursor: 'pointer', textDecoration: 'underline', display: 'block', marginTop: '2px' }}
            >
              גש למבחן הסופי
            </button>
          </div>
        </div>

      </div>

      {/* Progress Bar Header */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span>התקדמות הלמידה הכללית באקדמיה:</span>
          <strong>{progressPercent}%</strong>
        </div>
        <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', transition: 'width 0.6s ease-out' }}></div>
        </div>
      </div>

      {/* Folders Progress Breakdown */}
      <div>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FolderOpen size={18} style={{ color: 'var(--primary)' }} />
          <span>התקדמות לפי תיקיות לימוד (פרקים)</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {modules.map((mod, idx) => {
            const modLessons = lessons.filter((l) => mod.lessonIds.includes(l.id) && !l.isPlanned);
            const modCompleted = modLessons.filter((l) => completedLessons.includes(l.id));
            const modPercent = modLessons.length > 0 ? Math.round((modCompleted.length / modLessons.length) * 100) : 0;

            return (
              <div 
                key={idx} 
                className="glass-card"
                style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  borderRight: modPercent === 100 ? '4px solid var(--success)' : '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 'bold', color: '#fff' }}>{mod.name}</h4>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{mod.desc}</p>
                  </div>
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem', background: modPercent === 100 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(6, 182, 212, 0.1)', color: modPercent === 100 ? 'var(--success)' : 'var(--primary)', borderColor: modPercent === 100 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 182, 212, 0.2)' }}>
                    {modCompleted.length} מתוך {modLessons.length} הושלמו ({modPercent}%)
                  </span>
                </div>

                {/* Progress bar inside folder */}
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.03)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${modPercent}%`, height: '100%', background: modPercent === 100 ? 'var(--success)' : 'var(--primary)', transition: 'width 0.4s ease-out' }}></div>
                </div>

                {/* List of lessons in this folder */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {modLessons.map((les) => {
                    const isDone = completedLessons.includes(les.id);
                    return (
                      <button
                        key={les.id}
                        onClick={() => onSelectLesson(les.id)}
                        style={{
                          background: isDone ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${isDone ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-color)'}`,
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontSize: '0.68rem',
                          color: isDone ? 'var(--success)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'var(--transition)'
                        }}
                        className="btn-secondary"
                      >
                        {isDone ? <CheckCircle2 size={10} /> : <FileText size={10} />}
                        {les.titleHe}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
