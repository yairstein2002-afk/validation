import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LessonViewer } from './components/LessonViewer';
import { Glossary } from './components/Glossary';
import { QuizManager } from './components/QuizManager';
import { ErrorLab } from './components/ErrorLab';
import type { Concept, Lesson } from './types/validationData';
import { initialLessons, initialConcepts } from './data/initialData';
import { BookOpen, Layers, ShieldAlert, HelpCircle } from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [difficulty, setDifficulty] = useState<'standard' | 'high'>('standard');
  
  const [lessons] = useState<Lesson[]>(initialLessons);
  const [concepts] = useState<Concept[]>(initialConcepts);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<string>('l1');
  const [markedConceptIds, setMarkedConceptIds] = useState<string[]>([]);

  // Load completed lessons and bookmarks on mount
  useEffect(() => {
    // Load completed lessons
    const storedCompleted = localStorage.getItem('validation_completed_lessons');
    if (storedCompleted) {
      try {
        setCompletedLessons(JSON.parse(storedCompleted));
      } catch (e) {
        console.error('Error loading completed lessons', e);
      }
    }

    // Load marked concepts
    const storedMarked = localStorage.getItem('validation_marked_concept_ids');
    if (storedMarked) {
      try {
        setMarkedConceptIds(JSON.parse(storedMarked));
      } catch (e) {
        console.error('Error loading marked concepts', e);
      }
    }
  }, []);

  // Toggle marked concept for review
  const handleToggleMarkConcept = (conceptId: string) => {
    let updated;
    if (markedConceptIds.includes(conceptId)) {
      updated = markedConceptIds.filter((id) => id !== conceptId);
    } else {
      updated = [...markedConceptIds, conceptId];
    }
    setMarkedConceptIds(updated);
    localStorage.setItem('validation_marked_concept_ids', JSON.stringify(updated));
  };

  const handleSelectLessonFromDashboard = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveTab('lesson-viewer');
  };

  return (
    <div className="app-container">
      {/* Header with logo and difficulty settings */}
      <Header
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      {/* Main learning workspace */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard
            lessons={lessons}
            concepts={concepts}
            completedLessons={completedLessons}
            onSelectLesson={handleSelectLessonFromDashboard}
            difficulty={difficulty}
            markedConceptIds={markedConceptIds}
            onToggleMarkConcept={handleToggleMarkConcept}
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

        {activeTab === 'glossary' && (
          <Glossary
            concepts={concepts}
            lessons={lessons}
            difficulty={difficulty}
            markedConceptIds={markedConceptIds}
            onToggleMarkConcept={handleToggleMarkConcept}
          />
        )}

        {activeTab === 'errors' && (
          <ErrorLab
            difficulty={difficulty}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizManager
            lessons={lessons}
            completedLessons={completedLessons}
          />
        )}
      </main>

      {/* Premium Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-color)',
          padding: '24px 0',
          textAlign: 'center',
          fontSize: '0.8rem',
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
          © {new Date().getFullYear()} Validation Academy. נבנה עבור מהנדסי פלטפורמה וחומרה.
        </span>
        <span style={{ fontFamily: 'Outfit', color: 'var(--primary)', fontWeight: 600, fontSize: '0.72rem' }}>
          INTEL SILICON VALIDATION EDUCATION SYSTEM
        </span>
      </footer>

      {/* Floating Bottom Navigation Bar */}
      <nav className="bottom-nav">
        <button
          className={`bottom-nav-item ${activeTab === 'dashboard' || activeTab === 'lesson-viewer' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('dashboard');
            if (activeTab === 'lesson-viewer') {
              setActiveLessonId('');
            }
          }}
        >
          <BookOpen size={20} />
          <span>מסלול</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'glossary' ? 'active' : ''}`}
          onClick={() => setActiveTab('glossary')}
        >
          <Layers size={20} />
          <span>מושגים</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'errors' ? 'active' : ''}`}
          onClick={() => setActiveTab('errors')}
        >
          <ShieldAlert size={20} />
          <span>שגיאות</span>
        </button>

        <button
          className={`bottom-nav-item ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          <HelpCircle size={20} />
          <span>מבחן</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
