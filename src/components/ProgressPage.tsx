import React from 'react';
import type { Lesson } from '../types/validationData';
import { Trophy, Bookmark, Award, FileText, Lock } from 'lucide-react';

interface ProgressPageProps {
  lessons: Lesson[];
  completedLessons: string[];
  passedExams: string[];
  markedConceptIds: string[];
  onSelectTab: (tab: string) => void;
  onSelectLesson: (lessonId: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  lessons,
  completedLessons,
  passedExams,
  markedConceptIds,
  onSelectTab,
  onSelectLesson
}) => {
  const totalCount = lessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const highLessons = lessons.filter((l) => l.pathway === 'high');
  const lowLessons = lessons.filter((l) => l.pathway === 'low');

  const isLowLevelUnlocked = passedExams.includes('high_gateway');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>מרכז התקדמות הלמידה האישי</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          עקוב אחר התקדמותך במסלולי ה-High-Level וה-Low-Level והסמכת הוולידציה שלך.
        </p>
      </div>

      {/* Progress Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Main completion card */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Trophy size={26} style={{ color: 'var(--primary)' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>יחידות שהושלמו</span>
            <strong style={{ fontSize: '1.4rem', color: '#fff' }}>{completedCount} / {totalCount}</strong>
            <span style={{ fontSize: '0.68rem', color: 'var(--success)', display: 'block', marginTop: '2px' }}>
              {progressPercent}% הושלמו
            </span>
          </div>
        </div>

        {/* Marked Concepts Card */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--secondary)' }}>
          <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bookmark size={24} style={{ color: 'var(--secondary)' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>מונחים שסומנו לחזרה</span>
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
          <div style={{ width: '58px', height: '58px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Award size={26} style={{ color: 'var(--success)' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>מצב הסמכות</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
              <span style={{ fontSize: '0.7rem', color: passedExams.includes('high_gateway') ? 'var(--success)' : 'var(--text-muted)' }}>
                {passedExams.includes('high_gateway') ? '✓ עברת הסמכת High-Level' : '• הסמכת High-Level טרם הושלמה'}
              </span>
              <span style={{ fontSize: '0.7rem', color: passedExams.includes('low_gateway') ? 'var(--success)' : 'var(--text-muted)' }}>
                {passedExams.includes('low_gateway') ? '✓ עברת הסמכת Low-Level' : '• הסמכת Low-Level טרם הושלמה'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Progress Bar Gauge */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span>התקדמות הלמידה הכללית באקדמיה:</span>
          <strong>{progressPercent}%</strong>
        </div>
        <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', transition: 'width 0.6s ease-out' }}></div>
        </div>
      </div>

      {/* Pathway Progress Breakdown Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        {/* Pathway A */}
        <div className="glass-card" style={{ borderRight: '4px solid var(--primary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '0.96rem', fontWeight: 'bold', color: '#fff' }}>התקדמות מסלול High-Level</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {highLessons.map((les) => {
              const isDone = completedLessons.includes(les.id);
              return (
                <button
                  key={les.id}
                  onClick={() => onSelectLesson(les.id)}
                  className="btn btn-secondary"
                  style={{
                    justifyContent: 'space-between',
                    width: '100%',
                    fontSize: '0.78rem',
                    padding: '10px 14px',
                    borderColor: isDone ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-color)',
                    background: isDone ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255,255,255,0.01)',
                    color: isDone ? 'var(--success)' : 'var(--text-secondary)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={13} />
                    <span>{les.titleHe}</span>
                  </div>
                  <span style={{ fontSize: '0.68rem' }}>{isDone ? 'הושלם ✓' : 'למידה'}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pathway B */}
        <div className="glass-card" style={{ borderRight: '4px solid var(--secondary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '0.96rem', fontWeight: 'bold', color: '#fff' }}>התקדמות מסלול Low-Level</h3>
          
          {!isLowLevelUnlocked ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '24px 10px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <Lock size={24} />
              <span style={{ fontSize: '0.78rem' }}>המסלול נעול. השלם את הסמכת ה-High-Level לפתיחה.</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {lowLessons.map((les) => {
                const isDone = completedLessons.includes(les.id);
                // Check if unlocked locally
                const isFirst = les.id === 'l2_1';
                const prevId = les.id === 'l2_2' ? 'l2_1' : les.id === 'l2_3' ? 'l2_2' : les.id === 'l2_4' ? 'l2_3' : '';
                const isUnlocked = isFirst || completedLessons.includes(prevId);

                return (
                  <button
                    key={les.id}
                    onClick={() => isUnlocked && onSelectLesson(les.id)}
                    disabled={!isUnlocked}
                    className="btn btn-secondary"
                    style={{
                      justifyContent: 'space-between',
                      width: '100%',
                      fontSize: '0.78rem',
                      padding: '10px 14px',
                      opacity: isUnlocked ? 1 : 0.5,
                      cursor: isUnlocked ? 'pointer' : 'not-allowed',
                      borderColor: isDone ? 'rgba(16, 185, 129, 0.25)' : 'var(--border-color)',
                      background: isDone ? 'rgba(16, 185, 129, 0.03)' : 'rgba(255,255,255,0.01)',
                      color: isDone ? 'var(--success)' : 'var(--text-secondary)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {isUnlocked ? <FileText size={13} /> : <Lock size={13} />}
                      <span>{les.titleHe}</span>
                    </div>
                    <span style={{ fontSize: '0.68rem' }}>{isDone ? 'הושלם ✓' : isUnlocked ? 'למידה' : 'נעול'}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
