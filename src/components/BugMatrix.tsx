import React, { useState } from 'react';
import { bugMatrixItems } from '../data/initialData';
import { Bug } from 'lucide-react';

export const BugMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(bugMatrixItems[0].category);

  const getSeverity = (cat: string) => {
    switch (cat) {
      case 'Silent Data Corruption (SDC)': return { label: 'קריטי ביותר (Fatal SDC)', color: 'var(--error)' };
      case 'Functional Deadlock': return { label: 'קריטי (Core Hang)', color: '#ef4444' };
      case 'Cache Incoherency': return { label: 'קריטי (Data Stale)', color: '#f97316' };
      case 'Timing/Setup Violation': return { label: 'בינוני-גבוה (Silicon Drift)', color: '#eab308' };
      default: return { label: 'בינוני (Link Drop)', color: 'var(--primary)' };
    }
  };

  const getVisualSim = (cat: string) => {
    switch (cat) {
      case 'Timing/Setup Violation':
        return (
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', direction: 'ltr', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
            <span style={{ color: 'var(--secondary)', display: 'block', marginBottom: '6px' }}>// WAVEFORM VISUALIZATION (SETUP TIMING DRIFT)</span>
            <div>CLK:  __/\_/\_/\_/\_  (Ideal Clock Trigger)</div>
            <div>DATA: ____/========\__ (Signal Transition Delay)</div>
            <div style={{ color: 'var(--error)' }}>        [^] SETUP VIOLATION: Data changes inside Setup Window!</div>
          </div>
        );
      case 'Cache Incoherency':
        return (
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', direction: 'ltr', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
            <span style={{ color: 'var(--success)', display: 'block', marginBottom: '6px' }}>// MESI TRANSITION LOG</span>
            <div>Core 0: [Read Hit] Line 0xFF88 -&gt; State: SHARED</div>
            <div>Core 1: [Write Hit] Line 0xFF88 -&gt; State: MODIFIED</div>
            <div style={{ color: 'var(--error)' }}>Core 0: [Read Hit] Line 0xFF88 -&gt; State: SHARED (STUCK! Should be INVALID)</div>
          </div>
        );
      case 'Functional Deadlock':
        return (
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', direction: 'ltr', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
            <span style={{ color: '#ef4444', display: 'block', marginBottom: '6px' }}>// ROB DEPENDENCY GRAPH</span>
            <div>ROB[0]: Load Address 0x8A (Waiting for L3 cache memory lock)</div>
            <div>ROB[1]: Add Register R1, R2 (Waiting for ROB[0] retirement)</div>
            <div style={{ color: 'var(--error)' }}>CYCLE HANG: Core execution unit stalled. No instructions retiring.</div>
          </div>
        );
      case 'Link Training Failure':
        return (
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', direction: 'ltr', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
            <span style={{ color: 'var(--primary)', display: 'block', marginBottom: '6px' }}>// LTSSM STATE TRANSITIONS</span>
            <div>DETECT -&gt; POLLING -&gt; CONFIG -&gt; RECOVERY</div>
            <div style={{ color: 'var(--error)' }}>RECOVERY -&gt; CONFIG -&gt; RECOVERY (Training Loopout, Jitter limit exceeded)</div>
          </div>
        );
      default:
        return (
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-color)', direction: 'ltr', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
            <span style={{ color: '#a855f7', display: 'block', marginBottom: '6px' }}>// SDC VERIFICATION SCAN</span>
            <div>Core 0 Execution result: 0x4FF5A2B3</div>
            <div>Golden model benchmark:  0x4FF5A2B0</div>
            <div style={{ color: 'var(--error)' }}>MUTATION DISCREPANCY: Silent bits mismatch detected in FPU add register!</div>
          </div>
        );
    }
  };

  const current = bugMatrixItems.find((item) => item.category === selectedCategory) || bugMatrixItems[0];
  const severity = getSeverity(current.category);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>מטריצת שגיאות וולידציה (Validation Bug Matrix)</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          קטלוג שגיאות החומרה הנפוצות במעבדות אינטל, אבחונן החומרתי וזרימת הדיבאג שלהן.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Side: Bug categories list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ fontSize: '0.88rem', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '4px' }}>קטגוריות שגיאה:</h3>
          {bugMatrixItems.map((item) => {
            const sev = getSeverity(item.category);
            return (
              <button
                key={item.category}
                onClick={() => setSelectedCategory(item.category)}
                className="btn btn-secondary"
                style={{
                  justifyContent: 'space-between',
                  textAlign: 'right',
                  width: '100%',
                  padding: '14px 18px',
                  fontSize: '0.82rem',
                  borderRight: selectedCategory === item.category ? `3px solid ${sev.color}` : '1px solid var(--border-color)',
                  background: selectedCategory === item.category ? 'rgba(255,255,255,0.03)' : 'rgba(255, 255, 255, 0.01)',
                  color: selectedCategory === item.category ? '#fff' : 'var(--text-secondary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bug size={14} style={{ color: sev.color }} />
                  <strong>{item.category}</strong>
                </div>
                <span style={{ fontSize: '0.62rem', color: sev.color }}>{sev.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Selected Bug Information Sheet */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="badge" style={{ background: `${severity.color}15`, color: severity.color, borderColor: `${severity.color}30` }}>
                {severity.label}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Bug Matrix Class</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}>{current.category}</h3>
          </div>

          <div>
            <strong style={{ fontSize: '0.74rem', color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>תיאור טכני של הכשל:</strong>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
              {current.description}
            </p>
          </div>

          <div>
            <strong style={{ fontSize: '0.74rem', color: '#eab308', display: 'block', marginBottom: '4px' }}>מתודולוגיית הדיבאג הנלמדת:</strong>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', borderRight: '3px solid #eab308', paddingRight: '8px' }}>
              {current.debugFlow}
            </p>
          </div>

          {/* Visual simulation box */}
          <div style={{ marginTop: '6px' }}>
            <strong style={{ fontSize: '0.74rem', color: 'var(--secondary)', display: 'block', marginBottom: '6px' }}>סימולציית אות / תחקיר לוגים מדומה:</strong>
            {getVisualSim(current.category)}
          </div>

        </div>

      </div>

    </div>
  );
};
