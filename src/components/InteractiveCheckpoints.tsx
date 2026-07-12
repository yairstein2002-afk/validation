import React, { useState, useEffect } from 'react';
import type { CheckpointData } from '../types/validationData';
import { CheckCircle2, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';

interface InteractiveCheckpointsProps {
  data: CheckpointData;
  onSuccess: () => void;
}

export const InteractiveCheckpoints: React.FC<InteractiveCheckpointsProps> = ({ data, onSuccess }) => {
  // Drag and Drop (List Sorting) State
  const [items, setItems] = useState<string[]>([]);
  const [dragDropSuccess, setDragDropSuccess] = useState<boolean | null>(null);

  // Bit Mask Simulator State
  const [register, setRegister] = useState<number[]>([]);
  const [bitMaskSuccess, setBitMaskSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (data.type === 'drag-drop' && data.dragDropData) {
      setItems([...data.dragDropData.items]);
      setDragDropSuccess(null);
    } else if (data.type === 'bit-mask' && data.bitMaskData) {
      setRegister([...data.bitMaskData.initialRegister]);
      setBitMaskSuccess(null);
    }
  }, [data]);

  // Drag and drop helper: Move item up
  const moveItemUp = (idx: number) => {
    if (idx === 0) return;
    const newItems = [...items];
    const temp = newItems[idx];
    newItems[idx] = newItems[idx - 1];
    newItems[idx - 1] = temp;
    setItems(newItems);
    setDragDropSuccess(null);
  };

  // Drag and drop helper: Move item down
  const moveItemDown = (idx: number) => {
    if (idx === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[idx];
    newItems[idx] = newItems[idx + 1];
    newItems[idx + 1] = temp;
    setItems(newItems);
    setDragDropSuccess(null);
  };

  // Check Drag and Drop Order
  const verifyDragDrop = () => {
    if (!data.dragDropData) return;
    const correct = data.dragDropData.correctOrder;
    const isCorrect = items.every((val, index) => val === correct[index]);
    
    setDragDropSuccess(isCorrect);
    if (isCorrect) {
      onSuccess();
    }
  };

  // Bit Mask toggle
  const toggleBit = (idx: number) => {
    const newRegister = [...register];
    // Bits are index from right (Bit 0 is index 7 of register array)
    const arrayIdx = 7 - idx;
    newRegister[arrayIdx] = newRegister[arrayIdx] === 0 ? 1 : 0;
    setRegister(newRegister);
    setBitMaskSuccess(null);
  };

  // Check Bit Mask settings
  const verifyBitMask = () => {
    if (!data.bitMaskData) return;
    const target = data.bitMaskData.targetRegister;
    const isCorrect = register.every((val, index) => val === target[index]);
    
    setBitMaskSuccess(isCorrect);
    if (isCorrect) {
      onSuccess();
    }
  };

  return (
    <div className="glass-card" style={{ border: '1px solid rgba(234,179,8,0.2)', padding: '20px', marginTop: '16px' }}>
      
      {/* Checkpoint Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
        <span className="badge badge-cyan" style={{ background: 'rgba(234,179,8,0.1)', color: '#eab308', borderColor: 'rgba(234,179,8,0.2)' }}>
          מבחן מחסום (Inline Checkpoint)
        </span>
      </div>

      {/* RENDER DRAG & DROP TOPOLOGY */}
      {data.type === 'drag-drop' && data.dragDropData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold', color: '#fff' }}>מיון אלמנטים לפי סדר מהירות הגישה:</h4>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              סדר את הרשימה הבאה מהמהיר ביותר (למעלה) לאיטי ביותר (למטה) באמצעות חיצי המיקום.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {items.map((item, idx) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => moveItemUp(idx)}
                    disabled={idx === 0}
                    className="btn btn-secondary"
                    style={{ padding: '4px 6px', opacity: idx === 0 ? 0.3 : 1 }}
                    title="העבר למעלה"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <button
                    onClick={() => moveItemDown(idx)}
                    disabled={idx === items.length - 1}
                    className="btn btn-secondary"
                    style={{ padding: '4px 6px', opacity: idx === items.length - 1 ? 0.3 : 1 }}
                    title="העבר למטה"
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
            <button onClick={verifyDragDrop} className="btn btn-cyan" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
              אמת מיון
            </button>

            {dragDropSuccess === true && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '0.78rem' }}>
                <CheckCircle2 size={16} />
                <span>מצוין! סדר האלמנטים נכון. המחסום נפתח.</span>
              </div>
            )}

            {dragDropSuccess === false && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--error)', fontSize: '0.78rem' }}>
                <AlertCircle size={16} />
                <span>סדר שגוי. נסה שוב!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* RENDER BIT MASK SIMULATOR */}
      {data.type === 'bit-mask' && data.bitMaskData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 'bold', color: '#fff' }}>סימולציית ביטים באוגר (Register Bit Mask):</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              <strong>הנחיה:</strong> {data.bitMaskData.instruction}
            </p>
          </div>

          {/* Register Visual */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignSelf: 'center', width: '100%', maxWidth: '440px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px', fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <span>MSB (Bit 7)</span>
              <span>LSB (Bit 0)</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px' }}>
              {Array.from({ length: 8 }).map((_, idx) => {
                const bitIndex = 7 - idx; // 7, 6, 5, 4, 3, 2, 1, 0
                const isSet = register[idx] === 1;

                return (
                  <button
                    key={bitIndex}
                    onClick={() => toggleBit(bitIndex)}
                    style={{
                      padding: '12px 0',
                      background: isSet ? 'rgba(6,182,212,0.18)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${isSet ? 'var(--primary)' : 'var(--border-color)'}`,
                      borderRadius: '4px',
                      color: isSet ? '#fff' : 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      outline: 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', fontWeight: 'bold' }}>{register[idx]}</span>
                    <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>B{bitIndex}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', flexWrap: 'wrap', gap: '10px' }}>
            <button onClick={verifyBitMask} className="btn btn-cyan" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
              אמת אוגר
            </button>

            {bitMaskSuccess === true && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '0.78rem' }}>
                <CheckCircle2 size={16} />
                <span>מצוין! ערך האוגר תואם להנחיות. המחסום נפתח.</span>
              </div>
            )}

            {bitMaskSuccess === false && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--error)', fontSize: '0.78rem' }}>
                <AlertCircle size={16} />
                <span>ערכי ביט שגויים. בדוק את ההנחיה ונסה שוב!</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
