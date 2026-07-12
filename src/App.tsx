import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SkillTree } from './components/SkillTree';
import { LessonViewer } from './components/LessonViewer';
import { Glossary } from './components/Glossary';
import { BugMatrix } from './components/BugMatrix';
import { ProgressPage } from './components/ProgressPage';
import { ManagerInsights } from './components/ManagerInsights';
import { GatewayExam } from './components/GatewayExam';
import type { Concept, Lesson } from './types/validationData';
import { initialLessons, initialConcepts } from './data/initialData';
import { BookOpen, Layers, Bug, Trophy, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState<string>('skill-tree');
  const [difficulty, setDifficulty] = useState<'standard' | 'high'>('standard');
  
  const [lessons] = useState<Lesson[]>(initialLessons);
  const [concepts] = useState<Concept[]>(initialConcepts);
  
  // Progress states
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [passedExams, setPassedExams] = useState<string[]>([]);
  const [markedConceptIds, setMarkedConceptIds] = useState<string[]>([]);
  
  // Active lesson / exam states
  const [activeLessonId, setActiveLessonId] = useState<string>('');
  const [activeExamPathway, setActiveExamPathway] = useState<'high' | 'low' | null>(null);

  // Load progress on mount
  useEffect(() => {
    // Completed lessons
    const storedCompleted = localStorage.getItem('validation_completed_lessons');
    if (storedCompleted) {
      try {
        const parsed = JSON.parse(storedCompleted);
        if (Array.isArray(parsed)) setCompletedLessons(parsed);
      } catch (e) {
        console.error(e);
      }
    }

    // Passed exams
    const storedExams = localStorage.getItem('validation_passed_exams');
    if (storedExams) {
      try {
        const parsed = JSON.parse(storedExams);
        if (Array.isArray(parsed)) setPassedExams(parsed);
      } catch (e) {
        console.error(e);
      }
    }

    // Bookmarks
    const storedMarked = localStorage.getItem('validation_marked_concept_ids');
    if (storedMarked) {
      try {
        const parsed = JSON.parse(storedMarked);
        if (Array.isArray(parsed)) setMarkedConceptIds(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Toggle marked concepts
  const handleToggleMarkConcept = (conceptId: string) => {
    const currentMarked = Array.isArray(markedConceptIds) ? markedConceptIds : [];
    let updated;
    if (currentMarked.includes(conceptId)) {
      updated = currentMarked.filter((id) => id !== conceptId);
    } else {
      updated = [...currentMarked, conceptId];
    }
    setMarkedConceptIds(updated);
    localStorage.setItem('validation_marked_concept_ids', JSON.stringify(updated));
  };

  // Pass gateway exam handler
  const handlePassExam = (pathway: 'high' | 'low') => {
    const examCode = `${pathway}_gateway`;
    if (!passedExams.includes(examCode)) {
      const updated = [...passedExams, examCode];
      setPassedExams(updated);
      localStorage.setItem('validation_passed_exams', JSON.stringify(updated));
    }
  };

  const handleSelectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveTab('lesson-viewer');
  };

  const handleStartExam = (pathway: 'high' | 'low') => {
    setActiveExamPathway(pathway);
    setActiveTab('exam-viewer');
  };

  return (
    <div className="app-container">
      {/* Header containing level switcher and tabs */}
      <Header
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClearActiveLesson={() => setActiveLessonId('')}
      />

      {/* Main content routing panel */}
      <main className="main-content">
        
        {/* Brand Promise Welcome card (only shown on dashboard/skill-tree) */}
        {activeTab === 'skill-tree' && (
          <section
            className="glass-card glow-glow"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(9, 9, 11, 0.7))',
              borderRadius: 'var(--radius-lg)',
              borderLeft: '4px solid var(--primary)',
              padding: '20px',
              marginBottom: '10px'
            }}
          >
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>מנטור הולידציה המעשי</span>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#fff' }}>
                אקדמיית וולידציה למעבדים | CPU Validation Academy
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                ברוך הבא למערכת ההכשרה המעשית למהנדסי פלטפורמה וחומרה. האקדמיה מבוססת על **הבטחה מחמירה:** רק מעבר של מבחני מחסום ומענה נכון של 85%+ במבחני הסמכת השלב יסמיכו אותך לעבודה במעבדות החברה.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px', fontSize: '0.78rem', color: 'var(--text-primary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)' }}>
                  <ShieldCheck size={14} /> רמת קושי פעילה: {difficulty === 'high' ? 'High-Level (ארכיטקטורה)' : 'Low-Level (חומרה)'}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)' }}>
                  <CheckCircle2 size={14} /> סך שיעורים שהושלמו: {completedLessons.length} / {lessons.length}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Tab content rendering */}
        {activeTab === 'skill-tree' && (
          <SkillTree
            lessons={lessons}
            completedLessons={completedLessons}
            passedExams={passedExams}
            onSelectLesson={handleSelectLesson}
            onStartExam={handleStartExam}
          />
        )}

        {activeTab === 'lesson-viewer' && (
          <LessonViewer
            lessons={lessons}
            concepts={concepts}
            activeLessonId={activeLessonId}
            setActiveLessonId={setActiveLessonId}
            completedLessons={completedLessons}
            setCompletedLessons={setCompletedLessons}
            difficulty={difficulty}
            markedConceptIds={markedConceptIds}
            onToggleMarkConcept={handleToggleMarkConcept}
          />
        )}

        {activeTab === 'exam-viewer' && activeExamPathway && (
          <GatewayExam
            pathway={activeExamPathway}
            lessons={lessons}
            onPassExam={handlePassExam}
            onClose={() => {
              setActiveExamPathway(null);
              setActiveTab('skill-tree');
            }}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {activeTab === 'glossary' && (
          <Glossary
            concepts={concepts}
            lessons={lessons}
            difficulty={difficulty}
            markedConceptIds={markedConceptIds}
            onToggleMarkConcept={handleToggleMarkConcept}
          />
        )}

        {activeTab === 'bug-matrix' && (
          <BugMatrix />
        )}

        {activeTab === 'progress' && (
          <ProgressPage
            lessons={lessons}
            completedLessons={completedLessons}
            passedExams={passedExams}
            markedConceptIds={markedConceptIds}
            onSelectTab={setActiveTab}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {activeTab === 'manager-insights' && (
          <ManagerInsights />
        )}

      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-color)',
          padding: '20px 0',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: 'auto'
        }}
      >
        <span>
          © {new Date().getFullYear()} Validation Academy. מותאם למסכי מחשב ונייד (PWA ready).
        </span>
        <span style={{ fontFamily: 'Outfit', color: 'var(--primary)', fontWeight: 600, fontSize: '0.72rem' }}>
          INTEL PLATFORM VALIDATION TRAINING SYSTEM
        </span>
      </footer>

      {/* Navigation Floating Bottom Bar */}
      <nav className="bottom-nav">
        <button
          className={`bottom-nav-item ${activeTab === 'skill-tree' || activeTab === 'lesson-viewer' || activeTab === 'exam-viewer' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('skill-tree');
            setActiveLessonId('');
            setActiveExamPathway(null);
          }}
        >
          <BookOpen size={20} />
          <span>מיומנויות</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'glossary' ? 'active' : ''}`}
          onClick={() => setActiveTab('glossary')}
        >
          <Layers size={20} />
          <span>מונחים</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('progress')}
        >
          <Trophy size={20} />
          <span>התקדמות</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'bug-matrix' ? 'active' : ''}`}
          onClick={() => setActiveTab('bug-matrix')}
        >
          <Bug size={20} />
          <span>שגיאות</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'manager-insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('manager-insights')}
        >
          <Users size={20} />
          <span>מנהל</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
