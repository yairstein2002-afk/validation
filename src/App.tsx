import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LessonViewer } from './components/LessonViewer';
import { Glossary } from './components/Glossary';
import { AddConcept } from './components/AddConcept';
import { QuizManager } from './components/QuizManager';
import { ErrorLab } from './components/ErrorLab';
import type { Concept, Lesson } from './types/validationData';
import { initialLessons, initialConcepts } from './data/initialData';
import { BookOpen, Layers, ShieldAlert, FilePlus, HelpCircle } from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [difficulty, setDifficulty] = useState<'standard' | 'high'>('standard');
  
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [concepts, setConcepts] = useState<Concept[]>(initialConcepts);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<string>('l1');
  const [markedConceptIds, setMarkedConceptIds] = useState<string[]>([]);

  // Load data and completed status on mount
  useEffect(() => {
    // 1. Load concepts
    const storedConcepts = localStorage.getItem('validation_all_concepts');
    if (storedConcepts) {
      try {
        setConcepts(JSON.parse(storedConcepts));
      } catch (e) {
        console.error('Error loading concepts', e);
      }
    } else {
      localStorage.setItem('validation_all_concepts', JSON.stringify(initialConcepts));
    }

    // 2. Load lessons
    const storedLessons = localStorage.getItem('validation_all_lessons');
    if (storedLessons) {
      try {
        setLessons(JSON.parse(storedLessons));
      } catch (e) {
        console.error('Error loading lessons', e);
      }
    } else {
      localStorage.setItem('validation_all_lessons', JSON.stringify(initialLessons));
    }

    // 3. Load completed lessons
    const storedCompleted = localStorage.getItem('validation_completed_lessons');
    if (storedCompleted) {
      try {
        setCompletedLessons(JSON.parse(storedCompleted));
      } catch (e) {
        console.error('Error loading completed lessons', e);
      }
    }

    // 4. Load marked concepts
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

  // Handle adding custom concepts
  const handleAddConcept = (newConcept: Concept) => {
    // 1. Update concepts state and save to local storage
    const updatedConcepts = [...concepts, newConcept];
    setConcepts(updatedConcepts);
    localStorage.setItem('validation_all_concepts', JSON.stringify(updatedConcepts));

    // 2. Generate a custom quiz question for this concept
    const newQuestion = {
      id: `q_auto_${Date.now()}`,
      question: `מהי ההגדרה הנכונה עבור המושג "${newConcept.term}" בהקשר של וולידציה?`,
      options: [
        newConcept.definition, // Correct
        'ממשק קישוריות מאווררי לוח האם',
        'פרוטוקול תקשורת חיצוני שאינו בשימוש באינטל',
        'רכיב המכייל את מהירות הדיסק הקשיח'
      ],
      correctIndex: 0,
      explanation: `ההגדרה של ${newConcept.term} היא: ${newConcept.definition}. יישום במעבדה: ${newConcept.context}`
    };

    // 3. Update lessons state (append concept ID and the new quiz question) and save to local storage
    const updatedLessons = lessons.map((l) => {
      if (l.id === newConcept.lessonId) {
        return {
          ...l,
          conceptIds: [...l.conceptIds, newConcept.id],
          quizQuestions: [...l.quizQuestions, newQuestion]
        };
      }
      return l;
    });

    setLessons(updatedLessons);
    localStorage.setItem('validation_all_lessons', JSON.stringify(updatedLessons));
  };

  // Handle adding custom lessons
  const handleAddLesson = (newLesson: Lesson) => {
    const updatedLessons = [...lessons, newLesson];
    setLessons(updatedLessons);
    localStorage.setItem('validation_all_lessons', JSON.stringify(updatedLessons));
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

        {activeTab === 'add-concept' && (
          <AddConcept
            lessons={lessons}
            onAddConcept={handleAddConcept}
            onAddLesson={handleAddLesson}
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
            // If returning from lesson viewer, clear active lesson to show dashboard list
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
          className={`bottom-nav-item ${activeTab === 'add-concept' ? 'active' : ''}`}
          onClick={() => setActiveTab('add-concept')}
        >
          <FilePlus size={20} />
          <span>הוספה</span>
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
