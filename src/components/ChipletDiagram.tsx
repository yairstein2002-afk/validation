import React, { useState } from 'react';
import { Cpu, Zap, Radio, Database, Info } from 'lucide-react';

export const ChipletDiagram: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>('compute_p');

  const blocks = {
    compute_p: {
      name: 'Compute Die 0 (P-Cores)',
      nameHe: 'רכיב חישוב P-Cores (Compute Die)',
      icon: <Zap size={20} style={{ color: 'var(--primary)' }} />,
      role: 'מכיל את ליבות הביצוע החזקות (Performance Cores) וזיכרונות המטמון המהירים L1/L2 שלהן. אחראי על עיבוד עומסים כבדים ופעולות סינגל-תרד מהירות.',
      validationTip: 'בוולידציה בודקים את יציבות הליבות בתדרי הטורבו המקסימליים ואת מהירות הפענוח של פקודות x86 מורכבות.'
    },
    compute_e: {
      name: 'Compute Die 1 (E-Cores)',
      nameHe: 'רכיב חישוב E-Cores (Compute Die)',
      icon: <Cpu size={20} style={{ color: 'var(--secondary)' }} />,
      role: 'מכיל את ליבות היעילות האנרגטית (Efficient Cores) המשמשות להרצת משימות רקע ועיבוד מקבילי חסכוני בחשמל.',
      validationTip: 'בדיקות הוולידציה מתרכזות בעיקר בחלוקת המשימות על ידי ה-Thread Director ומניעת תקיעות במעבר ביניהן.'
    },
    uncore_ring: {
      name: 'LLC & Ring Interconnect (Uncore)',
      nameHe: 'אפיק קישור פנימי וזיכרון מטמון LLC (Uncore)',
      icon: <Radio size={20} style={{ color: '#eab308' }} />,
      role: 'אפיק ה-Ring Bus וה-Last Level Cache (L3 Cache) המשותף לכל הליבות. מנהל את זרימת המידע הפנימית ומבטיח תיאום מלא.',
      validationTip: 'בדיקות מנגנון ה-Cache Coherency (עקביות) מבוצעות פה כדי לוודא ששום ליבה לא קוראת נתון ישן.'
    },
    io_die: {
      name: 'I/O Die (PCIe & CXL)',
      nameHe: 'רכיב ממשקים חיצוניים (I/O Die)',
      icon: <Info size={20} style={{ color: '#a855f7' }} />,
      role: 'רכיב המנהל את כל התקשורת הטורית המהירה מול כרטיסי מסך (PCIe Gen 5), מאיצים (CXL) וחיבורי USB ו-SATA.',
      validationTip: 'מהנדסי ה-Post-Silicon מאבחנים כאן תקלות LTSSM ורוחב עין האות החשמלי במעבדה.'
    },
    mem_ctrl: {
      name: 'Memory Controller (DDR5)',
      nameHe: 'בקר הזיכרון (Memory Controller)',
      icon: <Database size={20} style={{ color: 'var(--success)' }} />,
      role: 'בקר הזיכרון הראשי המנהל את הגישות לכרטיסי ה-RAM החיצוניים (DDR5/LPDDR5) ומבצע את כיול הבוט הראשוני.',
      validationTip: 'מעבדות הדיבאג בודקות פה את שלבי ה-Memory Training (אימון הזיכרון) ותקנות קודי ה-POST.'
    }
  };

  const current = blocks[selectedBlock as keyof typeof blocks];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '14px' }}>
      
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--primary)' }}>תרשים ארכיטקטורת שבבים (Multi-Chiplet Architecture)</h4>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>הקלק על חלקי השבב השונים כדי לבחון את תפקידם הלוגי והמערכתי במעבד.</p>
      </div>

      {/* Chiplet Grid Visual Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        background: 'rgba(0,0,0,0.3)',
        padding: '16px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        maxWidth: '480px',
        margin: '0 auto',
        width: '100%'
      }}>
        
        {/* P-Compute Die */}
        <button
          onClick={() => setSelectedBlock('compute_p')}
          style={{
            gridColumn: '1',
            padding: '20px 10px',
            background: selectedBlock === 'compute_p' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.02)',
            border: selectedBlock === 'compute_p' ? '1px solid var(--primary)' : '1px solid var(--border-color)',
            color: '#fff',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.78rem',
            transition: 'var(--transition)'
          }}
        >
          Compute Die 0<br />(P-Cores)
        </button>

        {/* E-Compute Die */}
        <button
          onClick={() => setSelectedBlock('compute_e')}
          style={{
            gridColumn: '2',
            padding: '20px 10px',
            background: selectedBlock === 'compute_e' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255,255,255,0.02)',
            border: selectedBlock === 'compute_e' ? '1px solid var(--secondary)' : '1px solid var(--border-color)',
            color: '#fff',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.78rem',
            transition: 'var(--transition)'
          }}
        >
          Compute Die 1<br />(E-Cores)
        </button>

        {/* Ring Bus LLC Interconnect */}
        <button
          onClick={() => setSelectedBlock('uncore_ring')}
          style={{
            gridColumn: '1 / span 2',
            padding: '14px 10px',
            background: selectedBlock === 'uncore_ring' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(255,255,255,0.02)',
            border: selectedBlock === 'uncore_ring' ? '1px solid #eab308' : '1px solid var(--border-color)',
            color: '#fff',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.78rem',
            transition: 'var(--transition)'
          }}
        >
          LLC & Ring Interconnect (Uncore)
        </button>

        {/* I/O Die */}
        <button
          onClick={() => setSelectedBlock('io_die')}
          style={{
            gridColumn: '1',
            padding: '20px 10px',
            background: selectedBlock === 'io_die' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.02)',
            border: selectedBlock === 'io_die' ? '1px solid #a855f7' : '1px solid var(--border-color)',
            color: '#fff',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.78rem',
            transition: 'var(--transition)'
          }}
        >
          I/O Die<br />(PCIe / CXL)
        </button>

        {/* Memory Controller */}
        <button
          onClick={() => setSelectedBlock('mem_ctrl')}
          style={{
            gridColumn: '2',
            padding: '20px 10px',
            background: selectedBlock === 'mem_ctrl' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.02)',
            border: selectedBlock === 'mem_ctrl' ? '1px solid var(--success)' : '1px solid var(--border-color)',
            color: '#fff',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.78rem',
            transition: 'var(--transition)'
          }}
        >
          Memory Controller<br />(DDR5)
        </button>

      </div>

      {/* Selected Block Info Panel */}
      {current && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', borderLeft: '3px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {current.icon}
            <strong style={{ fontSize: '0.85rem', color: '#fff' }}>{current.nameHe}</strong>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            {current.role}
          </p>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '6px', marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>טיפ וולידציה במעבדה: </span>
            {current.validationTip}
          </div>
        </div>
      )}

    </div>
  );
};
