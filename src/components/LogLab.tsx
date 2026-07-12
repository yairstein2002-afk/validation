import React, { useState, useEffect } from 'react';
import type { LogScenarioData } from '../types/validationData';
import { Terminal, Filter, CheckCircle2, AlertCircle } from 'lucide-react';

interface LogLabProps {
  data: LogScenarioData;
  onSuccess: () => void;
}

export const LogLab: React.FC<LogLabProps> = ({ data, onSuccess }) => {
  const [filterText, setFilterText] = useState('');
  const [selectedAbsoluteLineIndex, setSelectedAbsoluteLineIndex] = useState<number | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ status: 'success' | 'error'; msg: string } | null>(null);

  useEffect(() => {
    setFilterText('');
    setSelectedAbsoluteLineIndex(null);
    setSelectedOptionIndex(null);
    setFeedback(null);
  }, [data]);

  // Match line absolute index
  const filteredLines = data.logLines
    .map((line, index) => ({ line, absoluteIndex: index }))
    .filter((item) =>
      item.line.toLowerCase().includes(filterText.toLowerCase())
    );

  const handleVerify = () => {
    if (selectedAbsoluteLineIndex === null) {
      setFeedback({ status: 'error', msg: 'אנא סמן את שורת השגיאה המדויקת בקובץ הלוג לפני האימות.' });
      return;
    }

    if (selectedOptionIndex === null) {
      setFeedback({ status: 'error', msg: 'אנא בחר את סיבת השורש המדויקת מהשאלון למטה.' });
      return;
    }

    const isLineCorrect = selectedAbsoluteLineIndex === data.correctLineIndex;
    const isAnswerCorrect = selectedOptionIndex === data.questions[0].correctIndex;

    if (isLineCorrect && isAnswerCorrect) {
      setFeedback({
        status: 'success',
        msg: 'מעולה! זיהית נכון את שורת השגיאה ואת סיבת השורש. המעבדה הושלמה בהצלחה!'
      });
      onSuccess();
    } else if (!isLineCorrect) {
      setFeedback({
        status: 'error',
        msg: 'שורת השגיאה שסימנת אינה נכונה. עיין בלוג מחדש וחפש את הודעת הכשל הקריטית.'
      });
    } else {
      setFeedback({
        status: 'error',
        msg: 'סימנת את שורת השגיאה הנכונה, אך אבחון סיבת השורש שגוי. קרא את האפשרויות שוב.'
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Title */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={18} />
          <span>מעבדת ניתוח לוגים (Log-Based Debugging Lab): {data.title}</span>
        </h3>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          השתמש במסננים כדי לאתר את השורה המדויקת שגרמה לקריסה, לחץ עליה לסמן אותה, וענה על שאלת האבחון.
        </p>
      </div>

      {/* Filter and controls bar */}
      <div className="glass-card" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px' }}>
          <Filter size={16} style={{ color: 'var(--primary)' }} />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="סנן לפי מילת מפתח (למשל: ERROR, TIMEOUT)..."
            style={{
              flex: 1,
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '0.78rem',
              color: '#fff',
              outline: 'none'
            }}
          />
        </div>

        {/* Quick Filter buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {data.filterKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setFilterText(kw)}
              className="btn btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.68rem', textTransform: 'uppercase' }}
            >
              {kw}
            </button>
          ))}
          {filterText && (
            <button
              onClick={() => setFilterText('')}
              className="btn btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.68rem', color: 'var(--error)' }}
            >
              נקה מסנן
            </button>
          )}
        </div>
      </div>

      {/* Log CRT Terminal View */}
      <div style={{
        background: '#030202',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.9)'
      }}>
        
        {/* Terminal Header */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          padding: '8px 16px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>LOG_VIEWER_V1.1_SUT_CRASH.txt</span>
          <span style={{ color: 'var(--primary)', fontSize: '0.68rem' }}>שורות מוצגות: {filteredLines.length}</span>
        </div>

        {/* Lines box */}
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '2px', maxHeight: '260px', overflowY: 'auto' }}>
          {filteredLines.map((item) => {
            const isSelected = selectedAbsoluteLineIndex === item.absoluteIndex;

            return (
              <button
                key={item.absoluteIndex}
                onClick={() => {
                  setSelectedAbsoluteLineIndex(item.absoluteIndex);
                  setFeedback(null);
                }}
                style={{
                  display: 'flex',
                  width: '100%',
                  textAlign: 'right',
                  padding: '6px 8px',
                  background: isSelected ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
                  border: isSelected ? '1px solid #ef4444' : '1px solid transparent',
                  borderRadius: '4px',
                  color: isSelected ? '#fff' : 'var(--primary)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  gap: '12px',
                  outline: 'none',
                  transition: 'background 0.15s ease'
                }}
                className="log-line-item"
              >
                <span style={{ color: 'var(--text-muted)', width: '30px', flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.06)', direction: 'ltr', textAlign: 'left', paddingLeft: '8px' }}>
                  {item.absoluteIndex + 1}
                </span>
                <span style={{ flex: 1, direction: 'ltr', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.line}
                </span>
              </button>
            );
          })}

          {filteredLines.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              לא נמצאו שורות התואמות למסנן המבוקש.
            </div>
          )}
        </div>
      </div>

      {/* Selected line indicator and Multiple Choice questions */}
      {selectedAbsoluteLineIndex !== null && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px', borderRight: '4px solid #ef4444' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 'bold' }}>שורה מסומנת כשגיאה:</span>
            <p style={{ fontSize: '0.78rem', color: '#fff', fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '4px', marginTop: '4px', direction: 'ltr', textAlign: 'left' }}>
              {data.logLines[selectedAbsoluteLineIndex]}
            </p>
          </div>

          {/* Question panel */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>
              {data.questions[0].question}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {data.questions[0].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedOptionIndex(idx);
                    setFeedback(null);
                  }}
                  className="btn btn-secondary"
                  style={{
                    justifyContent: 'flex-start',
                    textAlign: 'right',
                    width: '100%',
                    fontSize: '0.78rem',
                    padding: '10px 14px',
                    background: selectedOptionIndex === idx ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255,255,255,0.01)',
                    borderColor: selectedOptionIndex === idx ? 'var(--primary)' : 'var(--border-color)',
                    color: selectedOptionIndex === idx ? '#fff' : 'var(--text-secondary)'
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
                    background: selectedOptionIndex === idx ? 'var(--primary)' : 'transparent',
                    fontSize: '0.6rem',
                    color: '#000',
                    fontWeight: 'bold'
                  }}>
                    {selectedOptionIndex === idx ? '✓' : ''}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnostics Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginTop: '4px' }}>
            <button onClick={handleVerify} className="btn btn-cyan" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
              אמת אבחון מעבדה
            </button>

            {feedback && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.78rem',
                color: feedback.status === 'success' ? 'var(--success)' : 'var(--error)'
              }}>
                {feedback.status === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                <span>{feedback.msg}</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
