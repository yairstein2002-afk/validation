import React, { useState } from 'react';
import type { Concept, Lesson } from '../types/validationData';
import { Plus, Sparkles, Check, AlertCircle } from 'lucide-react';

interface AddConceptProps {
  lessons: Lesson[];
  onAddConcept: (concept: Concept) => void;
  onAddLesson: (lesson: Lesson) => void;
}

export const AddConcept: React.FC<AddConceptProps> = ({
  lessons,
  onAddConcept,
  onAddLesson
}) => {
  // Concept Form State
  const [term, setTerm] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState(lessons[0]?.id || 'l1');
  const [definition, setDefinition] = useState('');
  const [definitionHigh, setDefinitionHigh] = useState('');
  const [context, setContext] = useState('');
  const [conceptSuccess, setConceptSuccess] = useState(false);

  // Lesson Form State
  const [lessonTitleHe, setLessonTitleHe] = useState('');
  const [lessonTitleEn, setLessonTitleEn] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [lessonWhy, setLessonWhy] = useState('');
  const [lessonVideo, setLessonVideo] = useState('');
  const [lessonSuccess, setLessonSuccess] = useState(false);

  // Auto-fill Dictionary & Pattern Recognizer (AI Simulator)
  const getAutoFilledKnowledge = (conceptName: string) => {
    const termClean = conceptName.trim().toLowerCase();
    
    // 1. Exact dictionary matches for core validation terms
    const dict: { [key: string]: { def: string; defHigh: string; ctx: string } } = {
      stargate: {
        def: 'לוח האם המיוחד במעבדה המאפשר לארח מעבדים נבדקים.',
        defHigh: 'Intel Reference Validation Platform featuring debug connectors, logic sockets, and host interfaces.',
        ctx: 'מארח את ה-SUT במעבדה ומאפשר שליטה ידנית ואוטומטית במתחים.'
      },
      sut: {
        def: 'המערכת הנבדקת במעבדה (המעבד, הלוח והקושחה המותקנים).',
        defHigh: 'System Under Test. The integrated hardware and firmware revision targeted for validation.',
        ctx: 'סיווג ה-SUT קובע את סביבת הבדיקות ואת התוצאות המצופות.'
      },
      bkc: {
        def: 'הגרסאות הכי יציבות של ה-BIOS, דרייברים ומערכת ההפעלה שעובדים יחד.',
        defHigh: 'Best Known Configuration. The approved software and hardware baseline for test reproducibility.',
        ctx: 'לפני הרצת בדיקות, מוודאים שה-SUT תואם ל-BKC הנוכחי.'
      },
      carrella: {
        def: 'מערכת או שבב לניהול תקשורת נתונים מהירה באינטל.',
        defHigh: 'Intel architecture interconnect tile or logic interface managing on-die fabric connectivity.',
        ctx: 'בוולידציה בודקים את יציבות השבב תחת עומסי קריאה מרובים.'
      },
      colster: {
        def: 'רכיב או תוכנה לבדיקות מעבדה ותיאום שעוני מעבד.',
        defHigh: 'Hardware control utility managing clock-gating validation vectors on silicon.',
        ctx: 'משמש לאימות לולאות PLL וזמני התאוששות שעון במעבד.'
      },
      punit: {
        def: 'בקר ניהול כוח ומתחים פנימי של המעבד.',
        defHigh: 'Power Control Unit firmware managing dynamic voltage and frequency scaling (DVFS).',
        ctx: 'בדיקת ה-PUNIT נועדה למנוע קריסות Vdroop במעבר לתדרי טורבו.'
      },
      pmc: {
        def: 'בקר ניהול כוח חיצוני הממוקם בצ\'יפסט.',
        defHigh: 'Power Management Controller in the PCH managing global platform power sequencing.',
        ctx: 'אימות PMC מתמקד במעבר בין מצבי שינה של המחשב (S3-to-S0).'
      },
      caterr: {
        def: 'אות שגיאה חמור המורה על קריסה מוחלטת של המעבד.',
        defHigh: 'Catastrophic Error driven low by SA on fatal IDI bus parity or timeout conditions.',
        ctx: 'בעת קבלת CATERR, נורת הלוח נדלקת באדום והמעבד קופא מיידית.'
      },
      ierr: {
        def: 'אות שגיאה פנימית של ליבת המעבד.',
        defHigh: 'Internal Core Error triggered on unrecoverable logic parity faults inside execution pipelines.',
        ctx: 'עוזר לזהות ליבה ספציפית שקרסה במעבד מרובה ליבות.'
      },
      mce: {
        def: 'מנגנון שגיאה פנימי של המעבד המדווח למערכת ההפעלה על תקלות חומרה.',
        defHigh: 'Machine Check Exception mapping internal hardware faults directly to OS exception handlers.',
        ctx: 'קריאת MCE נעשית דרך סקריפטים של PythonSV המנתחים את ה-MSR registers.'
      },
      svos: {
        def: 'מערכת ההפעלה מבוססת לינוקס הייחודית של אינטל לבדיקות במעבדה.',
        defHigh: 'Silicon Validation OS. Low-level Linux distribution with kernel drivers for register access.',
        ctx: 'משמשת כסביבת הריצה המרכזית לכל בדיקות ה-Post-Silicon.'
      },
      mrc: {
        def: 'קוד ה-BIOS האחראי על איתור, הגדרה ואימון של זיכרון ה-RAM בלוח.',
        defHigh: 'Memory Reference Code calibrating signals and delays between the CPU and DDR.',
        ctx: 'אימון הזיכרון רגיש לטמפרטורה, ונבדק תחת בדיקות Margining במעבדה.'
      },
      straps: {
        def: 'נגדים או פינים פיזיים על הלוח שקובעים את מצב הפעולה של המעבד בזמן ההדלקה.',
        defHigh: 'Physical board configurations sampled by the CPU on Reset to determine clock sources.',
        ctx: 'שינוי Straps משמש להעברת המעבד למצבי בדיקה מיוחדים.'
      },
      fuse: {
        def: 'פיוזים אלקטרוניים זעירים במעבד שנצרבים פיזית במפעל וקובעים את התכונות והמהירות שלו.',
        defHigh: 'On-die non-volatile electronic fuses programmed during manufacturing to set SKU features.',
        ctx: 'בדיקת מעבדי Un-fused מאפשרת לשנות הגדרות פיוזים דינמית במעבדה.'
      },
      'staging process': {
        def: 'תהליך של הכנה ובדיקה הדרגתית של קבצי קושחה ועדכונים לפני הרצתם במעבדה.',
        defHigh: 'Incremental validation delivery pipeline ensuring microcode and BIOS alignment stages.',
        ctx: 'מונע החדרת קושחה פגומה שעלולה להשבית את כל ה-SUTs במעבדה במקביל.'
      },
      'double shooting': {
        def: 'שיטה לבידוד תקלות חומרה במעבדה על ידי הצלבת רכיבים.',
        defHigh: 'Double-fault validation triage method isolating board defects from silicon bugs.',
        ctx: 'מתבצעת על ידי העברת מעבד ללוח תקין, והעברת מעבד תקין ללוח החשוד.'
      }
    };

    if (dict[termClean]) {
      return dict[termClean];
    }

    // 2. Dynamic Pattern Generator based on hardware keyword mapping
    let generatedDef = 'מושג וולידציה מותאם אישית הקשור לפלטפורמה.';
    let generatedDefHigh = 'A customized silicon validation concept managing register states and signal parameters.';
    let generatedCtx = 'בדיקת יציבות ודיבאג ממוקד במעבדת ה-Post-Silicon.';

    if (termClean.includes('bus') || termClean.includes('link') || termClean.includes('interconnect')) {
      generatedDef = `ערוץ או אפיק תקשורת מהיר להעברת נתונים בין רכיבים במעבד.`;
      generatedDefHigh = `High-speed cache-coherent interconnect link routing internal packet signals.`;
      generatedCtx = `ולידציה של האפיק מתמקדת בבדיקות רוחב פס ואימות שלמות האות (Signal Integrity).`;
    } else if (termClean.includes('reset') || termClean.includes('boot') || termClean.includes('power')) {
      generatedDef = `מנגנון או אות האחראי על אתחול, כיבוי או ניהול האנרגיה של המערכת.`;
      generatedDefHigh = `Platform power sequencing state or reset assertion signal managed by PMC/PUNIT.`;
      generatedCtx = `בדיקת המנגנון כוללת אלפי מחזורי אתחול רצופים (Boot Cycling) כדי לוודא זיהוי חומרה מלא.`;
    } else if (termClean.includes('error') || termClean.includes('fail') || termClean.includes('bug') || termClean.includes('caterr')) {
      generatedDef = `אות או קוד שגיאה המציין תקלת חומרה או כשל לוגי במעבד.`;
      generatedDefHigh = `Fatal hardware exception driven by register configuration mismatch or architectural timeout.`;
      generatedCtx = `דיבאג השגיאה מתבצע על ידי התחברות ב-DCI וקריאת בנקי ה-Machine Check.`;
    } else if (termClean.includes('controller') || termClean.includes('manager') || termClean.includes('unit')) {
      generatedDef = `בקר חומרה או מנהל פנימי האחראי על תיאום פעילויות ספציפיות במערכת.`;
      generatedDefHigh = `Dedicated hardware IP controller managing system agent interfaces and fabric state arbitration.`;
      generatedCtx = `אימות הבקר מתבצע על ידי הזרקת עומסי עבודה המאתגרים את קווי השליטה שלו במקביל.`;
    } else if (termClean.includes('memory') || termClean.includes('ram') || termClean.includes('cache') || termClean.includes('mrc')) {
      generatedDef = `רכיב זיכרון או בקר זיכרון המשמש לאחסון ושליפת נתונים מהירה.`;
      generatedDefHigh = `On-die cache allocation array or external memory controller interface supporting coherence protocols.`;
      generatedCtx = `ולידציה של הזיכרון דורשת בדיקות Margining (הסטת מתח ותדר) כדי לבדוק גבולות יציבות.`;
    }

    return { def: generatedDef, defHigh: generatedDefHigh, ctx: generatedCtx };
  };

  const handleAutoFill = () => {
    if (!term) return;
    const { def, defHigh, ctx } = getAutoFilledKnowledge(term);
    setDefinition(def);
    setDefinitionHigh(defHigh);
    setContext(ctx);
  };

  // Submit Concept Handler
  const handleConceptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term || !definition || !context) return;

    const newConcept: Concept = {
      id: `c_custom_${Date.now()}`,
      term: term.trim(),
      lessonId: selectedLessonId,
      definition: definition.trim(),
      definitionHighLevel: definitionHigh.trim() || 'Custom high-level configuration parameters defined by user.',
      context: context.trim(),
      isCustom: true
    };

    onAddConcept(newConcept);
    
    // Clear State
    setTerm('');
    setDefinition('');
    setDefinitionHigh('');
    setContext('');
    setConceptSuccess(true);
    setTimeout(() => setConceptSuccess(false), 3000);
  };

  // Submit Lesson Handler
  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitleHe || !lessonTitleEn || !lessonDesc || !lessonWhy) return;

    const newLesson: Lesson = {
      id: `l_custom_${Date.now()}`,
      title: lessonTitleEn.trim(),
      titleHe: lessonTitleHe.trim(),
      description: lessonDesc.trim(),
      whyItIsHere: lessonWhy.trim(),
      prerequisites: lessons.length > 0 ? [lessons[lessons.length - 3].id] : [], // Locks it logically
      videoUrl: lessonVideo.trim() || 'https://www.youtube.com/embed/gS2D7JvG6m4',
      conceptIds: [],
      quizQuestions: [
        {
          id: `q_custom_${Date.now()}`,
          question: `מהי המטרה של השיעור החדש: ${lessonTitleHe}?`,
          options: [
            lessonDesc.trim(),
            'בדיקת מאווררי לוח האם בלבד.',
            'מנגנון חיצוני ללא קשר למעבד.',
            'פקודה רנדומלית ב-BIOS.'
          ],
          correctIndex: 0,
          explanation: `ההגדרה היא: ${lessonDesc.trim()}`
        }
      ]
    };

    onAddLesson(newLesson);

    // Clear state
    setLessonTitleHe('');
    setLessonTitleEn('');
    setLessonDesc('');
    setLessonWhy('');
    setLessonVideo('');
    setLessonSuccess(true);
    setTimeout(() => setLessonSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Title */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>הוספה והרחבה של פלטפורמת הלימוד</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          הוסף מושגי וולידציה מותאמים אישית או שיעורים שלמים ישירות למסלול הלמידה שלך.
        </p>
      </div>

      {/* 1. Add Concept Form */}
      <section className="glass-card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '16px', color: 'var(--primary)' }}>
          ✨ הוספת מושג חדש (Auto-Fill מובנה)
        </h3>

        {conceptSuccess && (
          <div className="badge badge-success" style={{ width: '100%', padding: '10px', justifyContent: 'center', marginBottom: '12px' }}>
            <Check size={14} />
            <span>המושג נוסף בהצלחה למסלול הלמידה ונוצרה לו שאלת בוחן אוטומטית!</span>
          </div>
        )}

        <form onSubmit={handleConceptSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div className="form-group">
            <label className="form-label">שם המושג (מומלץ באנגלית):</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="form-input"
                placeholder="למשל: Carrella, Staging process, Colster..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onBlur={handleAutoFill}
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={handleAutoFill}
                className="btn btn-secondary"
                style={{ padding: '8px 12px', fontSize: '0.8rem', gap: '4px' }}
                title="אכלס הגדרות אוטומטית"
              >
                <Sparkles size={14} style={{ color: 'var(--primary)' }} />
                <span>אכלס</span>
              </button>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>הקלד שם מושג ולחץ על "אכלס" או עבור שדה כדי להזריק הגדרה מוכנה בשבילו!</span>
          </div>

          <div className="form-group">
            <label className="form-label">שייך לשיעור במסלול:</label>
            <select
              className="form-select"
              value={selectedLessonId}
              onChange={(e) => setSelectedLessonId(e.target.value)}
              required
            >
              {lessons.map((lesson, idx) => (
                <option key={lesson.id} value={lesson.id}>
                  שיעור {idx + 1}: {lesson.titleHe}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">הסבר בסיסי (Low Level):</label>
            <textarea
              className="form-textarea"
              placeholder="כתוב הגדרה פשוטה וברורה למושג..."
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">הסבר ארכיטקטורה (High Level):</label>
            <textarea
              className="form-textarea"
              placeholder="פרט את המבנה הפנימי של הרכיב, רגיסטרים, קווי תקשורת..."
              value={definitionHigh}
              onChange={(e) => setDefinitionHigh(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">שימוש והקשר במעבדה (Lab Context):</label>
            <textarea
              className="form-textarea"
              placeholder="איך מהנדס הולידציה בודק את המושג הזה בפועל במעבדה? (למשל: סקריפטים, מתחים, אוסילוסקופ...)"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>
            <Plus size={16} />
            <span>הוסף מושג למערכת</span>
          </button>
        </form>
      </section>

      {/* 2. Add Lesson Form */}
      <section className="glass-card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '16px', color: 'var(--secondary)' }}>
          📚 יצירת שיעור חדש במסלול
        </h3>

        {lessonSuccess && (
          <div className="badge badge-success" style={{ width: '100%', padding: '10px', justifyContent: 'center', marginBottom: '12px' }}>
            <Check size={14} />
            <span>השיעור נוסף בהצלחה למסלול הלמידה!</span>
          </div>
        )}

        <form onSubmit={handleLessonSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div className="form-group">
            <label className="form-label">כותרת השיעור (בעברית):</label>
            <input
              type="text"
              className="form-input"
              placeholder="למשל: פרוטוקול UPI ואינטגרציית שרתים"
              value={lessonTitleHe}
              onChange={(e) => setLessonTitleHe(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">כותרת השיעור (באנגלית):</label>
            <input
              type="text"
              className="form-input"
              placeholder="למשל: UPI Interconnect & Multi-socket servers"
              value={lessonTitleEn}
              onChange={(e) => setLessonTitleEn(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">תיאור קצר של השיעור:</label>
            <textarea
              className="form-textarea"
              placeholder="כתוב מה נלמד בשיעור זה ובאילו היבטים של וולידציה נתמקד..."
              value={lessonDesc}
              onChange={(e) => setLessonDesc(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">מדוע השיעור ממוקם כאן? (Pedagogical Rationale):</label>
            <textarea
              className="form-textarea"
              placeholder="הסבר ללומד למה השיעור נמצא במיקום הזה ומה הוא צריך לדעת לפני כן..."
              value={lessonWhy}
              onChange={(e) => setLessonWhy(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">קישור לסרטון יוטיוב (Embed URL - אופציונלי):</label>
            <input
              type="text"
              className="form-input"
              placeholder="למשל: https://www.youtube.com/embed/gS2D7JvG6m4"
              value={lessonVideo}
              onChange={(e) => setLessonVideo(e.target.value)}
            />
          </div>

          <div
            style={{
              padding: '12px',
              background: 'rgba(59, 130, 246, 0.05)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(59, 130, 246, 0.1)',
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-start'
            }}
          >
            <AlertCircle size={16} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              בעת יצירת שיעור חדש, המערכת תיצור אוטומטית שאלת בוחן ראשונית המבוססת על תיאור השיעור, כדי לאפשר לך להתקדם במסלול הלמידה. תוכל להוסיף מושגים חדשים לשיעור זה בכל עת!
            </p>
          </div>

          <button type="submit" className="btn btn-secondary" style={{ border: '1px solid var(--secondary)', marginTop: '8px' }}>
            <Plus size={16} style={{ color: 'var(--secondary)' }} />
            <span>צור שיעור חדש</span>
          </button>
        </form>
      </section>

    </div>
  );
};
