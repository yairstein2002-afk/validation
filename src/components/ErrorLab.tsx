import React, { useState, useEffect, useRef } from 'react';
import type { LabError } from '../types/validationData';
import { initialLabErrors } from '../data/initialData';
import { Terminal, Send, AlertTriangle } from 'lucide-react';

interface ErrorLabProps {
  difficulty: 'standard' | 'high';
}

export const ErrorLab: React.FC<ErrorLabProps> = ({ difficulty }) => {
  const [selectedError, setSelectedError] = useState<LabError>(initialLabErrors[0]);
  const [cmdInput, setCmdInput] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [debugStepIndex, setDebugStepIndex] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset terminal when error type is changed
    setConsoleLogs([
      `=== SUT DIAGNOSTIC CONSOLE PORT ===`,
      `[STATUS] SUT state detected: CRITICAL FAULT (${selectedError.name})`,
      `[INFO] Type 'help' to see list of available diagnosis tools.`,
      `====================================`
    ]);
    setDebugStepIndex(0);
    setResolved(false);
  }, [selectedError]);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmdInput.trim()) return;

    const command = cmdInput.trim().toLowerCase();
    const newLogs = [...consoleLogs, `SUT@LAB_CONSOLE:~$ ${cmdInput}`];

    if (command === 'help') {
      newLogs.push(
        `AVAILABLE DIAGNOSTIC COMMANDS:`,
        `  - help     : Displays this command manual.`,
        `  - status   : Check the SUT current registers and POST code status.`,
        `  - scope    : Attaches virtual oscilloscope to measure Vcc sensing rails.`,
        `  - debug    : Advance one step in the recommended triage flow.`,
        `  - bkc      : Query current validation best known configuration baseline.`,
        `  - clear    : Clear SUT console screen logs.`
      );
    } else if (command === 'clear') {
      setConsoleLogs([`=== SUT CONSOLE CLEARED ===`]);
      setCmdInput('');
      return;
    } else if (command === 'status') {
      newLogs.push(
        `[SUT DIAGNOSTIC READOUT]:`,
        `  - SUT Error Code: ${selectedError.code}`,
        `  - Observed Symptoms: ${selectedError.symptoms.join(', ')}`
      );
    } else if (command === 'bkc') {
      newLogs.push(
        `[BKC STATE VERIFICATION]:`,
        `  - BIOS Revision: BKC_REL_V26_SECURE`,
        `  - Microcode: uCode_v0x24_PATCH`,
        `  - Platform: Intel validation platform ref_v3`
      );
    } else if (command === 'scope') {
      if (selectedError.name.includes('Voltage') || selectedError.name.includes('Vdroop')) {
        newLogs.push(
          `[OSCILLOSCOPE TELEMETRY]:`,
          `  - Target Sensing Point: CPU Core Vcc`,
          `  - Measured Signal: 1.02V (nominal 1.25V) - CRITICAL VOLTAGE DROOP DETECTED!`,
          `  - Signal analysis indicates a di/dt transients failure.`
        );
      } else {
        newLogs.push(
          `[OSCILLOSCOPE TELEMETRY]:`,
          `  - Target Sensing Point: CPU Core Vcc`,
          `  - Measured Signal: 1.25V (nominal 1.25V) - Stable.`,
          `  - Voltage lines show no significant droops.`
        );
      }
    } else if (command === 'debug') {
      if (resolved) {
        newLogs.push(`[INFO] SUT has already been successfully debugged and resolved.`);
      } else {
        const nextStep = selectedError.debugFlow[debugStepIndex];
        newLogs.push(`[TRIAGE STEP ${debugStepIndex + 1}/${selectedError.debugFlow.length}]: ${nextStep}`);

        if (debugStepIndex + 1 >= selectedError.debugFlow.length) {
          setResolved(true);
          newLogs.push(
            `====================================`,
            `🎉 [SUCCESS] SUT fault has been successfully resolved!`,
            `🎉 [STATUS] SUT state changed to: BOOT_COMPLETED (STABLE).`,
            `====================================`
          );
        } else {
          setDebugStepIndex((prev) => prev + 1);
        }
      }
    } else {
      newLogs.push(`bash: ${command}: command not found. Type 'help' for manual.`);
    }

    setConsoleLogs(newLogs);
    setCmdInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>קטלוג שגיאות וולידציה וחומרה</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          הכרות מעמיקה עם כשלי הסיליקון והפלטפורמה המרכזיים במעבדות אינטל, ללא צורך בכתיבת קוד.
        </p>
      </div>

      {/* Main Grid Layout: Error List + Error Detail Pane */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Side: Errors List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '4px' }}>רשימת שגיאות החומרה:</h3>
          {initialLabErrors.map((err) => (
            <button
              key={err.name}
              onClick={() => setSelectedError(err)}
              className="btn btn-secondary"
              style={{
                justifyContent: 'flex-start',
                textAlign: 'right',
                width: '100%',
                padding: '12px 16px',
                fontSize: '0.82rem',
                borderRight: selectedError.name === err.name ? '3px solid var(--primary)' : '1px solid var(--border-color)',
                background: selectedError.name === err.name ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                color: selectedError.name === err.name ? '#fff' : 'var(--text-secondary)',
                fontWeight: selectedError.name === err.name ? 'bold' : 'normal'
              }}
            >
              <AlertTriangle size={14} style={{ marginLeft: '8px', color: selectedError.name === err.name ? 'var(--primary)' : 'var(--text-muted)' }} />
              {err.name}
            </button>
          ))}
        </div>

        {/* Right Side: Selected Error Detail Panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '24px' }}>
          
          {/* Header Info */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-danger" style={{ fontSize: '0.62rem' }}>שגיאת חומרה פעילה</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>CODE: {selectedError.code}</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#fff' }}>{selectedError.name}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', borderLeft: '3px solid var(--error)', paddingRight: '8px' }}>
              {selectedError.description}
            </p>
          </div>

          {/* Low level explanation */}
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>הסבר לוגי (Low Level):</span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
              {selectedError.standardExplanation}
            </p>
          </div>

          {/* High level microarchitecture explanation */}
          {difficulty === 'high' && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--secondary)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>ארכיטקטורת סיליקון (High Level):</span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', lineHeight: '1.4', fontFamily: 'var(--font-mono)', direction: 'ltr', textAlign: 'left', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '4px' }}>
                {selectedError.highLevelExplanation}
              </p>
            </div>
          )}

          {/* Symptoms in the lab */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>כיצד זה נראה במעבדה (Observed Symptoms):</span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {selectedError.symptoms.map((sym, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--error)' }}></span>
                  {sym}
                </li>
              ))}
            </ul>
          </div>

          {/* Debug and Triage process */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
            <span style={{ fontSize: '0.72rem', color: '#eab308', fontWeight: 600, display: 'block', marginBottom: '8px' }}>שלבי אבחון ובידוד (Debug & Triage Flow):</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {selectedError.debugFlow.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ width: '18px', height: '18px', background: 'rgba(234,179,8,0.1)', color: '#eab308', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 'bold', flexShrink: 0 }}>
                    {idx + 1}
                  </span>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Terminal Section (Collapsible debug playground) */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setShowTerminal(!showTerminal)}
          className="btn btn-secondary"
          style={{ width: '100%', justifyContent: 'space-between', fontSize: '0.8rem', padding: '12px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={16} style={{ color: 'var(--primary)' }} />
            <span>הפעלת מסוף דיאגנוסטיקה מדומה (לחובבים/לתרגול פקודות)</span>
          </div>
          <span>{showTerminal ? 'הסתר מסוף [-]' : 'הצג מסוף [+]'}</span>
        </button>

        {showTerminal && (
          <div className="glass-card" style={{ background: '#020101', borderColor: 'var(--border-color)', padding: '0', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginTop: '10px' }}>
            
            {/* Terminal Header */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={14} style={{ color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  LAB_SUT_TERMINAL_UART0.sh
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></span>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
              </div>
            </div>

            {/* Terminal Output Logs */}
            <div
              style={{
                padding: '16px',
                height: '240px',
                overflowY: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                lineHeight: '1.5',
                color: 'var(--primary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              {consoleLogs.map((log, idx) => (
                <div key={idx} style={{ whiteSpace: 'pre-wrap', direction: 'ltr', textAlign: 'left' }}>{log}</div>
              ))}
              <div ref={consoleEndRef} />
            </div>

            {/* Terminal Command Input Form */}
            <form
              onSubmit={handleCommandSubmit}
              style={{
                display: 'flex',
                borderTop: '1px solid var(--border-color)',
                background: 'rgba(0,0,0,0.5)',
                direction: 'ltr'
              }}
            >
              <span style={{ padding: '12px 0 12px 16px', color: 'var(--text-secondary)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center' }}>
                SUT@LAB_CONSOLE:~$
              </span>
              <input
                type="text"
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                placeholder="type 'help' or 'debug'..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  padding: '12px'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  padding: '0 16px',
                  display: 'flex',
                  alignItems: 'center',
                  outline: 'none'
                }}
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
};
