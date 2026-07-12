import React from 'react';
import { Logo } from './Logo';
import { Cpu, Zap } from 'lucide-react';

interface HeaderProps {
  difficulty: 'standard' | 'high';
  setDifficulty: (level: 'standard' | 'high') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClearActiveLesson: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  difficulty,
  setDifficulty,
  activeTab,
  setActiveTab,
  onClearActiveLesson
}) => {
  return (
    <header
      className="glass-card"
      style={{
        marginTop: '16px',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        background: 'rgba(15, 15, 20, 0.5)'
      }}
    >
      {/* Brand logo */}
      <Logo size={28} />

      {/* Desktop Top Nav Bar */}
      <nav className="desktop-nav">
        <button
          className={`desktop-nav-item ${activeTab === 'skill-tree' || activeTab === 'lesson-viewer' || activeTab === 'exam-viewer' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('skill-tree');
            onClearActiveLesson();
          }}
        >
          מיומנויות
        </button>

        <button
          className={`desktop-nav-item ${activeTab === 'glossary' ? 'active' : ''}`}
          onClick={() => setActiveTab('glossary')}
        >
          מונחים
        </button>

        <button
          className={`desktop-nav-item ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          התקדמות
        </button>

        <button
          className={`desktop-nav-item ${activeTab === 'bug-matrix' ? 'active' : ''}`}
          onClick={() => setActiveTab('bug-matrix')}
        >
          מטריצת שגיאות
        </button>

        <button
          className={`desktop-nav-item ${activeTab === 'manager-insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('manager-insights')}
        >
          מעקב מנהלים
        </button>
      </nav>

      {/* Level Selection Switcher */}
      <div
        style={{
          display: 'flex',
          padding: '2px',
          gap: '2px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid var(--border-color)',
          width: '150px'
        }}
      >
        <button
          onClick={() => setDifficulty('standard')}
          className="btn"
          style={{
            flex: 1,
            padding: '4px 6px',
            fontSize: '0.68rem',
            background: difficulty === 'standard' ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
            border: 'none',
            color: difficulty === 'standard' ? '#fff' : 'var(--text-secondary)',
            boxShadow: difficulty === 'standard' ? '0 0 8px rgba(6, 182, 212, 0.2)' : 'none',
            outline: difficulty === 'standard' ? '1px solid var(--primary)' : 'none',
            gap: '3px'
          }}
        >
          <Cpu size={10} />
          Low Level
        </button>
        <button
          onClick={() => setDifficulty('high')}
          className="btn"
          style={{
            flex: 1,
            padding: '4px 6px',
            fontSize: '0.68rem',
            background: difficulty === 'high' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
            border: 'none',
            color: difficulty === 'high' ? '#fff' : 'var(--text-secondary)',
            boxShadow: difficulty === 'high' ? '0 0 8px rgba(59, 130, 246, 0.2)' : 'none',
            outline: difficulty === 'high' ? '1px solid var(--secondary)' : 'none',
            gap: '3px'
          }}
        >
          <Zap size={10} />
          High Level
        </button>
      </div>
    </header>
  );
};
