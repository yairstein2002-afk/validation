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
      if (selectedError.name.includes('Voltage')) {
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
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>מעבדת דיבאג וסימולטור שגיאות חומרה</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          תרגל פתרון תקלות (Troubleshooting) אמיתיות ממעבדות הסיליקון של Intel בעזרת פקודות מסוף.
        </p>
      </div>

      {/* Select error */}
      <div className="form-group">
        <label className="form-label">בחר מקרה תקלה לאבחון:</label>
        <select
          className="form-select"
          value={selectedError.name}
          onChange={(e) => {
            const err = initialLabErrors.find((le) => le.name === e.target.value);
            if (err) setSelectedError(err);
          }}
          style={{ width: '100%', padding: '10px' }}
        >
          {initialLabErrors.map((err) => (
            <option key={err.name} value={err.name}>
              {err.name}
            </option>
          ))}
        </select>
      </div>

      {/* Error Info Card */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
          <AlertTriangle size={18} style={{ color: 'var(--error)' }} />
          <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>תיאור התקלה: {selectedError.name}</strong>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
          {selectedError.description}
        </p>

        {/* Low vs High level explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--primary)', fontSize: '0.72rem', display: 'block' }}>רמת Low Level:</strong>
            {selectedError.standardExplanation}
          </p>

          {difficulty === 'high' && (
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)', paddingTop: '6px' }}>
              <strong style={{ color: 'var(--secondary)', fontSize: '0.72rem', display: 'block' }}>רמת High Level:</strong>
              {selectedError.highLevelExplanation}
            </p>
          )}
        </div>
      </div>

      {/* Interactive Terminal */}
      <div className="glass-card" style={{ background: '#020101', borderColor: 'var(--border-color)', padding: '0', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        
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
            <div key={idx} style={{ whiteSpace: 'pre-wrap', textAlign: 'right', direction: 'ltr' }}>
              {log}
            </div>
          ))}
          <div ref={consoleEndRef} />
        </div>

        {/* Terminal Input Form */}
        <form onSubmit={handleCommandSubmit} style={{ display: 'flex', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.5)' }}>
          <input
            type="text"
            className="form-input"
            placeholder="הקלד פקודה (למשל: help, status, debug)..."
            value={cmdInput}
            onChange={(e) => setCmdInput(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              borderRadius: '0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              color: '#fff',
              padding: '12px',
              direction: 'ltr',
              textAlign: 'left'
            }}
          />
          <button
            type="submit"
            className="btn"
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '0',
              borderLeft: '1px solid var(--border-color)',
              borderRight: 'none',
              borderTop: 'none',
              borderBottom: 'none',
              padding: '0 16px'
            }}
          >
            <Send size={14} style={{ color: 'var(--primary)' }} />
          </button>
        </form>

      </div>

    </div>
  );
};
