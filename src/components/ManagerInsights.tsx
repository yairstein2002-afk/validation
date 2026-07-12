import React from 'react';
import { Users, Clock, AlertTriangle, ShieldCheck, BarChart3 } from 'lucide-react';

export const ManagerInsights: React.FC = () => {
  
  const teamStats = {
    averageProgress: 72,
    certifiedCount: 4,
    totalEngineers: 12,
    avgHoursPerModule: [
      { name: 'יחידה 1.1: מבנה ה-CPU וה-Uncore', hours: 3.4 },
      { name: 'יחידה 1.2: מדרג זיכרון ו-Coherency', hours: 5.2 },
      { name: 'יחידה 1.3: ממשקים מהירים (PCIe/CXL)', hours: 6.1 },
      { name: 'יחידה 1.4: ניהול הספק ותרמי', hours: 4.8 },
      { name: 'יחידה 2.1: OoO ומיקרו-ארכיטקטורה', hours: 7.5 },
      { name: 'יחידה 2.2: לוגיקה דיגיטלית ותזמון CDC', hours: 8.9 }
    ],
    commonFailureAreas: [
      { area: 'שגיאות תזמון (Setup/Hold Violation)', failRate: 48, count: 24 },
      { area: 'עקביות זיכרון מטמון (MESI Protocol)', failRate: 35, count: 18 },
      { area: 'מכונת מצבים PCIe LTSSM', failRate: 29, count: 14 },
      { area: 'פענוח פקודות uOps', failRate: 18, count: 9 }
    ],
    engineers: [
      { name: 'דניאל כהן', progress: 100, status: 'מוסמך מעבדה מלא (Post-Silicon)', examScore: 92 },
      { name: 'שירה לוי', progress: 100, status: 'מוסמכת מעבדה מלא (Post-Silicon)', examScore: 88 },
      { name: 'יוני אשכנזי', progress: 85, status: 'מוסמך שלב High-Level', examScore: 90 },
      { name: 'רוני מזרחי', progress: 60, status: 'בלמידה פעילה (Low-Level)', examScore: 0 },
      { name: 'עמית רפאלי', progress: 45, status: 'בלמידה פעילה (High-Level)', examScore: 0 }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>דשבורד מעקב מנהלים (Manager Insights)</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          נתוני ביצועים של צוות מהנדסי הוולידציה, זמני למידה ממוצעים ונקודות כשל נפוצות במעבדות.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        {/* Progress Card */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--primary)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
            <Users size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>ממוצע התקדמות הצוות</span>
            <strong style={{ fontSize: '1.25rem', color: '#fff' }}>{teamStats.averageProgress}%</strong>
            <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>12 מהנדסים רשומים</span>
          </div>
        </div>

        {/* Certified Card */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--success)' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)', flexShrink: 0 }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'block' }}>מוסמכים לעבודה במעבדה</span>
            <strong style={{ fontSize: '1.25rem', color: '#fff' }}>{teamStats.certifiedCount} / {teamStats.totalEngineers}</strong>
            <span style={{ fontSize: '0.62rem', color: 'var(--success)', display: 'block', marginTop: '2px' }}>עברו את המבחנים בהצלחה</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Completion Times + Failure Rates */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        {/* Left Card: Average module times */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            <Clock size={16} style={{ color: 'var(--primary)' }} />
            <strong style={{ fontSize: '0.88rem', color: '#fff' }}>זמן למידה ממוצע לכל יחידה (שעות)</strong>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {teamStats.avgHoursPerModule.map((mod, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{mod.name}</span>
                  <strong style={{ color: '#fff' }}>{mod.hours} שעות</strong>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                  {/* Map values up to max 10 hours for bar width */}
                  <div style={{ width: `${(mod.hours / 10) * 100}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Common Failure Areas */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
            <AlertTriangle size={16} style={{ color: 'var(--error)' }} />
            <strong style={{ fontSize: '0.88rem', color: '#fff' }}>נקודות כשל נפוצות במבחנים (Failure Rate)</strong>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {teamStats.commonFailureAreas.map((fail, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{fail.area}</span>
                  <strong style={{ color: 'var(--error)' }}>{fail.failRate}% כשלונות</strong>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${fail.failRate}%`, height: '100%', background: 'var(--error)', borderRadius: '3px' }}></div>
                </div>
                <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>נרשמו {fail.count} טעויות של מהנדסים שונים</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Team Engineers list */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '8px' }}>
          <BarChart3 size={16} style={{ color: 'var(--success)' }} />
          <strong style={{ fontSize: '0.88rem', color: '#fff' }}>סטטוס הסמכה פרטני של חברי הצוות</strong>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'right' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '8px 12px' }}>שם המהנדס/ת</th>
                <th style={{ padding: '8px 12px' }}>אחוז התקדמות</th>
                <th style={{ padding: '8px 12px' }}>סטטוס הסמכה</th>
                <th style={{ padding: '8px 12px' }}>ציון מבחן אחרון</th>
              </tr>
            </thead>
            <tbody>
              {teamStats.engineers.map((eng, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--text-primary)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 'bold' }}>{eng.name}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{eng.progress}%</span>
                      <div style={{ width: '60px', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${eng.progress}%`, height: '100%', background: eng.progress === 100 ? 'var(--success)' : 'var(--primary)' }}></div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span className="badge" style={{
                      background: eng.progress === 100 ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.03)',
                      color: eng.progress === 100 ? 'var(--success)' : 'var(--text-secondary)',
                      borderColor: eng.progress === 100 ? 'rgba(16,185,129,0.2)' : 'var(--border-color)',
                      fontSize: '0.65rem'
                    }}>
                      {eng.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', fontFamily: 'var(--font-mono)' }}>
                    {eng.examScore > 0 ? `${eng.examScore}%` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
