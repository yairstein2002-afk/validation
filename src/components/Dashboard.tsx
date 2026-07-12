import React, { useState, useEffect } from 'react';
import type { Lesson, Concept } from '../types/validationData';
import { ArrowLeft, CheckCircle2, ShieldCheck, Smartphone, Info, Bookmark, Trash2, Folder, FolderOpen, Lock, ChevronDown, ChevronUp } from 'lucide-react';

interface DashboardProps {
  lessons: Lesson[];
  concepts: Concept[];
  completedLessons: string[];
  onSelectLesson: (lessonId: string) => void;
  difficulty: 'standard' | 'high';
  markedConceptIds: string[];
  onToggleMarkConcept: (conceptId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  lessons,
  concepts,
  completedLessons,
  onSelectLesson,
  difficulty,
  markedConceptIds,
  onToggleMarkConcept
}) => {
  const [userNotes, setUserNotes] = useState<{ [key: string]: string }>({});
  const [expandedModules, setExpandedModules] = useState<number[]>([0]); // Expand first chapter by default

  useEffect(() => {
    const storedNotes = localStorage.getItem('validation_notes');
    if (storedNotes) {
      try {
        const parsed = JSON.parse(storedNotes);
        if (parsed && typeof parsed === 'object') {
          setUserNotes(parsed);
        } else {
          setUserNotes({});
        }
      } catch (e) {
        console.error(e);
        setUserNotes({});
      }
    }
  }, [markedConceptIds]);

  const isLessonLocked = (lesson: Lesson) => {
    const completed = Array.isArray(completedLessons) ? completedLessons : [];
    return lesson.prerequisites.some((prereqId) => !completed.includes(prereqId));
  };

  const getLessonProgress = (lessonId: string) => {
    const completed = Array.isArray(completedLessons) ? completedLessons : [];
    return completed.includes(lessonId);
  };

  const toggleModule = (idx: number) => {
    if (expandedModules.includes(idx)) {
      setExpandedModules(expandedModules.filter(i => i !== idx));
    } else {
      setExpandedModules([...expandedModules, idx]);
    }
  };

  const currentMarked = Array.isArray(markedConceptIds) ? markedConceptIds : [];
  const reviewConcepts = concepts.filter((c) => currentMarked.includes(c.id));
  const activeLessonsCount = lessons.filter(l => !l.isPlanned).length;

  // Group lessons by Modules (Folders/Chapters)
  const modules = [
    {
      name: 'תיקייה 1: מבוא לעולם המעבדים וארכיטקטורה',
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Brand Hero / Promise Section */}
      <section
        className="glass-card glow-glow"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(9, 9, 11, 0.7))',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg)',
          borderLeft: '4px solid var(--primary)',
          padding: '20px'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>מנטור הולידציה האישי שלך</span>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            הבטחת הולידציה: שליטה מלאה בסיליקון
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.5' }}>
            בעולם ה-Post-Silicon Validation של אינטל, באגים בסיליקון עולים מיליונים. האקדמיה מבוססת על **הבטחה מחמירה:** רק מענה נכון של 80%+ במבחני ההסמכה מזכה בציון עובר.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)' }}>
              <ShieldCheck size={16} />
              <span>תוכנית למידה מקצועית המותאמת למעבדות Intel</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)' }}>
              <CheckCircle2 size={16} />
              <span>שילוב רמות ידע: Low-Level (חומרה וקודי POST) ו-High-Level (ארכיטקטורה)</span>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                רמת למידה פעילה: <strong style={{ color: 'var(--primary)' }}>{difficulty === 'high' ? 'High-Level' : 'Low-Level'}</strong>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                מושגים במאגר: <strong style={{ color: 'var(--primary)' }}>{concepts.length}</strong>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                הושלמו: <strong style={{ color: 'var(--success)' }}>{completedLessons.length}/{activeLessonsCount} שיעורים</strong>
              </div>
            </div>
            
            {/* Visual Progress bar */}
            <div style={{ width: '100%', maxWidth: '240px', marginTop: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>
                <span>התקדמות כללית:</span>
                <strong>{activeLessonsCount > 0 ? Math.round((completedLessons.length / activeLessonsCount) * 100) : 0}%</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <div style={{ width: `${activeLessonsCount > 0 ? (completedLessons.length / activeLessonsCount) * 100 : 0}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', transition: 'width 0.4s ease-out', borderRadius: '3px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info grids */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* PWA installation banner */}
        <div className="glass-card" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px' }}>
          <Smartphone size={22} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '4px' }}>📱 התקנת האפליקציה (PWA)</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              גלוש מהטלפון הנייד והתקן את האקדמיה למסך הבית לחוויה מלאה:
              <br />
              • **בכרום (Android/PC)**: 3 נקודות &lsaquo; התקן אפליקציה.
              <br />
              • **בספארי (iOS)**: כפתור שיתוף &lsaquo; הוסף למסך הבית.
            </p>
          </div>
        </div>

        {/* How to study */}
        <div className="glass-card" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px' }}>
          <Info size={22} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '4px' }}>💡 איך ללמוד נכון?</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              פתחו את אחת מ-6 תיקיות הלימוד במסלול. השלימו את כרטיסיות המושגים, רשמו הערות ועברו את מבחן הסיכום כדי לפתוח את השיעור הבא.
            </p>
          </div>
        </div>

      </div>

      {/* Review concepts bookmark list */}
      {reviewConcepts.length > 0 && (
        <div className="glass-card" style={{ border: '1px solid rgba(6, 182, 212, 0.25)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bookmark size={18} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 'bold' }}>מושגים שסימנת לחזרה (סביבת למידה אישית)</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {reviewConcepts.map((concept) => {
              const lessonName = lessons.find((l) => l.id === concept.lessonId)?.titleHe || 'מושג מותאם אישית';
              const savedNote = (userNotes && typeof userNotes === 'object') ? userNotes[concept.id] : undefined;

              return (
                <div
                  key={concept.id}
                  style={{
                    padding: '12px',
                    background: 'rgba(0,0,0,0.25)',
                    borderRadius: 'var(--radius-sm)',
                    borderRight: '3px solid var(--primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    position: 'relative'
                  }}
                >
                  <button
                    onClick={() => onToggleMarkConcept(concept.id)}
                    style={{
                      position: 'absolute',
                      left: '8px',
                      top: '8px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                    title="הסר מרשימת החזרה"
                  >
                    <Trash2 size={13} style={{ color: 'var(--error)' }} />
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '24px' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#fff', direction: 'ltr' }}>{concept.term}</strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{lessonName}</span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {difficulty === 'high' ? concept.definitionHighLevel : concept.definition}
                  </p>

                  {savedNote && (
                    <div style={{ marginTop: '4px', padding: '6px 8px', background: 'rgba(6, 182, 212, 0.05)', borderRadius: '4px', border: '1px solid rgba(6, 182, 212, 0.1)', fontSize: '0.75rem' }}>
                      <strong style={{ color: 'var(--primary)' }}>הערה שלך: </strong>
                      <span style={{ color: 'var(--text-primary)' }}>{savedNote}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Logical Pathway - Collapsible Folders */}
      <div>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '16px', fontWeight: 'bold' }}>תיקיות לימוד ומסלול התקדמות</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {modules.map((mod, modIdx) => {
            const isExpanded = expandedModules.includes(modIdx);
            const modLessons = lessons.filter(l => mod.lessonIds.includes(l.id));
            const completedInMod = modLessons.filter(l => completedLessons.includes(l.id)).length;

            return (
              <div 
                key={modIdx} 
                className="glass-card" 
                style={{ 
                  padding: '0', 
                  overflow: 'hidden', 
                  borderRadius: 'var(--radius-md)', 
                  border: isExpanded ? '1px solid rgba(6, 182, 212, 0.25)' : '1px solid var(--border-color)' 
                }}
              >
                {/* Folder Header Row */}
                <div 
                  onClick={() => toggleModule(modIdx)}
                  style={{ 
                    padding: '16px 20px', 
                    background: isExpanded ? 'rgba(6, 182, 212, 0.04)' : 'rgba(255, 255, 255, 0.01)', 
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {isExpanded ? (
                      <FolderOpen size={22} style={{ color: 'var(--primary)' }} />
                    ) : (
                      <Folder size={22} style={{ color: 'var(--text-muted)' }} />
                    )}
                    <div>
                      <h4 style={{ fontSize: '0.96rem', fontWeight: 'bold', color: '#fff' }}>{mod.name}</h4>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{mod.desc}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="badge badge-cyan" style={{ fontSize: '0.66rem' }}>
                      {completedInMod} / {modLessons.length} הושלמו
                    </span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>

                {/* Folder Body (List of Lessons) */}
                {isExpanded && (
                  <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.1)' }}>
                    <div className="lessons-grid">
                      {modLessons.map((lesson) => {
                        const locked = isLessonLocked(lesson);
                        const done = getLessonProgress(lesson.id);

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => !locked && !lesson.isPlanned && onSelectLesson(lesson.id)}
                            className={`glass-card ${locked || lesson.isPlanned ? '' : 'glass-card-interactive'}`}
                            style={{
                              padding: '12px 16px',
                              background: 'rgba(15, 15, 20, 0.5)',
                              borderRight: lesson.isPlanned
                                ? '4px solid var(--text-muted)'
                                : done
                                ? '4px solid var(--success)'
                                : locked
                                ? '4px solid var(--text-muted)'
                                : '4px solid var(--primary)',
                              opacity: locked || lesson.isPlanned ? 0.6 : 1,
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              gap: '12px'
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <h5 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff', marginBottom: '2px' }}>
                                {lesson.titleHe}
                              </h5>
                              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', direction: 'ltr', textAlign: 'right', marginBottom: '6px' }}>
                                {lesson.title}
                              </p>
                              
                              {lesson.isPlanned ? (
                                <span className="badge badge-cyan" style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', borderColor: 'rgba(234, 179, 8, 0.2)', padding: '0 4px', fontSize: '0.62rem' }}>
                                  בקרוב
                                </span>
                              ) : locked ? (
                                <span className="badge badge-danger" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)', background: 'transparent', padding: '0 4px', fontSize: '0.62rem', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                  <Lock size={8} /> נעול (השלם שיעור קודם)
                                </span>
                              ) : done ? (
                                <span className="badge badge-success" style={{ padding: '0 4px', fontSize: '0.62rem' }}>
                                  הושלם
                                </span>
                              ) : (
                                <span className="badge badge-cyan" style={{ padding: '0 4px', fontSize: '0.62rem' }}>
                                  זמין
                                </span>
                              )}
                            </div>

                            {!locked && !lesson.isPlanned && (
                              <ArrowLeft size={14} style={{ color: 'var(--primary)', transform: 'scaleX(-1)', flexShrink: 0 }} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
