import type { Lesson, Concept, LabError } from '../types/validationData';

export const initialLessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Introduction to Silicon Validation & PLC',
    titleHe: 'מבוא לוולידציה של סיליקון ומחזור חיי מוצר',
    description: 'הבנת היסודות של בדיקת מעבדים פיזיים לאחר שלב הייצור, ההבדל בין סימולציה לוולידציה, ומחזור החיים של השבב.',
    whyItIsHere: 'שיעור זה מניח את היסודות המושגיים של וולידציית סיליקון וחלוקת העבודה בין Pre-Silicon ל-Post-Silicon.',
    prerequisites: [],
    videoUrl: 'https://www.youtube.com/embed/gS2D7JvG6m4',
    diagram: {
      title: 'מחזור חיי המוצר ושלב ה-Post-Silicon',
      nodes: [
        { id: 'n1', label: 'Pre-Silicon (סימולציות תוכנה)', type: 'input' },
        { id: 'n2', label: 'Tape-Out (TO - שליחה לייצור)', type: 'process' },
        { id: 'n3', label: 'Post-Silicon Validation (ולידציה פיזית)', type: 'decision' },
        { id: 'n4', label: 'BKC Alignment (ייצוב תצורה)', type: 'process' },
        { id: 'n5', label: 'Product Release (ייצור המוני)', type: 'output' }
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n4', to: 'n5' }
      ]
    },
    conceptIds: ['c_pre_silicon', 'c_post_silicon', 'c_design_val', 'c_system_val', 'c_platform_val', 'c_silicon_val', 'c_product_val', 'c_manufacturing_val', 'c_plc', 'c_tapeout'],
    quizQuestions: [
      {
        id: 'q1_1',
        question: 'מהו ההבדל העקרוני בין Pre-Silicon ל-Post-Silicon Validation?',
        options: [
          'אין הבדל, שניהם מבוצעים בתוכנה.',
          'Pre-Silicon מבוצע על מודלים ממוחשבים וסימולציות לפני ייצור השבב, בעוד ש-Post-Silicon מבוצע על שבבי סיליקון פיזיים אמיתיים במעבדה.',
          'Pre-Silicon מבוצע במעבדה ו-Post-Silicon מבוצע בייצור המוני.',
          'Pre-Silicon מיועד לבדיקות מתח בלבד.'
        ],
        correctIndex: 1,
        explanation: 'בדיקות Pre-Silicon מבוצעות על גבי סימולטורים לפני שיש שבב פיזי, כדי למצוא שגיאות תכנון מוקדמות. בדיקות Post-Silicon מבוצעות על חומרה אמיתית (סיליקון) המגיעה מהמפעל.'
      }
    ]
  },
  {
    id: 'l2',
    title: 'Testing Types & Methodology',
    titleHe: 'סוגי בדיקות ומתודולוגיית הולידציה',
    description: 'הבנת ההבדלים בין סוגי בדיקות שונים כמו בדיקות רגרסיה, עומס, יציבות, אבטחה, צריכת חשמל ותרמיות.',
    whyItIsHere: 'שיעור זה מציג את ארגז הכלים המתודולוגי של סוגי הבדיקות שכל מהנדס וולידציה נדרש להכיר ולהריץ במעבדה.',
    prerequisites: ['l1'],
    videoUrl: 'https://www.youtube.com/embed/rVplV1uFmX0',
    conceptIds: ['c_func_test', 'c_regression_test', 'c_smoke_test', 'c_stress_test', 'c_stability_test', 'c_perf_test', 'c_compat_test', 'c_power_test', 'c_thermal_test', 'c_security_test', 'c_reliability_test', 'c_compliance_test', 'c_boot_test', 'c_interrupt_test', 'c_mem_test', 'c_cache_test', 'c_pipeline_test', 'c_io_test'],
    quizQuestions: [
      {
        id: 'q2_1',
        question: 'מה מטרתן של בדיקות רגרסיה (Regression Testing) בוולידציה?',
        options: [
          'לבדוק את ביצועי המעבד בממשקים חדשים בלבד.',
          'לוודא שעדכון קוד או תיקון באג חדש לא שברו או קלקלו פונקציונליות קיימת שכבר עבדה ותפקדה בעבר.',
          'להביא את המעבד לטמפרטורת קריסה.',
          'לאמן את הזיכרון מחדש.'
        ],
        correctIndex: 1,
        explanation: 'בדיקות רגרסיה מריצות מחדש בדיקות קודמות שעברו כדי לוודא שתיקונים ועדכוני מיקרוקוד או BIOS חדשים לא גרמו לנסיגה (רגרסיה) ביציבות של מנגנונים אחרים.'
      }
    ]
  },
  {
    id: 'l3',
    title: 'Design Verification & Simulation',
    titleHe: 'אימות תכנון (Verification) וסימולציה',
    description: 'לימוד השלבים המבוצעים לפני ייצור הסיליקון כדי לוודא תקינות לוגית בעזרת סימולטורים, אמיולטורים ו-FPGA Prototyping.',
    whyItIsHere: 'הכרת שלב ה-Pre-Silicon מכינה אותך להבין את המקור הלוגי של ארכיטקטורת המעבד ומתודולוגיות מבוססות כיסוי ואקראיות.',
    prerequisites: ['l1'],
    videoUrl: 'https://www.youtube.com/embed/5a2gTdiGgK4',
    conceptIds: ['c_verification', 'c_validation', 'c_formal_ver', 'c_dynamic_ver', 'c_static_ver', 'c_simulation', 'c_emulation', 'c_fpga_proto', 'c_abv', 'c_crv', 'c_cdv'],
    quizQuestions: [
      {
        id: 'q3_1',
        question: 'מהו ההבדל בין Simulation ל-Emulation בשלב ה-Pre-Silicon?',
        options: [
          'אין הבדל, שניהם מריצים את השבב הפיזי.',
          'Simulation מריצה קוד תוכנה המדמה את התנהגות הלוגיקה (איטי מאוד), בעוד ש-Emulation משתמשת בחומרת מחשוב ייעודית (כמו מאיצים או מקרני FPGAs) כדי להריץ את הלוגיקה במהירות גבוהה בהרבה.',
          'Simulation בודקת רק מתחים חשמליים.',
          'Emulation היא בדיקה שמבוצעת רק בייצור.'
        ],
        correctIndex: 1,
        explanation: 'אמיולציה משתמשת במכונות חומרה מורכבות המחקות את פעולת השערים הלוגיים של המעבד, ומספקת קצבי ריצה מהירים פי אלפי מונים מסימולציית תוכנה רגילה.'
      }
    ]
  },
  {
    id: 'l4',
    title: 'Coverage Metrics',
    titleHe: 'מדדי כיסוי (Coverage)',
    description: 'הבנה ומדידה של רמת יסודיות הבדיקות באמצעות מדדי כיסוי קוד, כיסוי פונקציונלי ומעברי מצבים (FSM Coverage).',
    whyItIsHere: 'מדדי כיסוי מציגים את התשובה לשאלה הקריטית בוולידציה: "מתי אפשר להפסיק לבדוק?". ללא הבנת כיסוי, לא ניתן לאשר שחרור מוצר.',
    prerequisites: ['l3'],
    videoUrl: 'https://www.youtube.com/embed/zH04a434Bbg',
    conceptIds: ['c_code_cov', 'c_func_cov', 'c_toggle_cov', 'c_branch_cov', 'c_stmt_cov', 'c_path_cov', 'c_cond_cov', 'c_fsm_cov', 'c_cross_cov'],
    quizQuestions: [
      {
        id: 'q4_1',
        question: 'מהו Functional Coverage (כיסוי פונקציונלי)?',
        options: [
          'מדידת אחוז שורות הקוד שנכתבו בתוכנת הבדיקה.',
          'מדד המגדיר אילו מצבים, תרחישים עסקיים, שילובי רגיסטרים ומעברים לוגיים שנכתבו במפרט הבדיקות כוסו בפועל על ידי הריצות במעבדה.',
          'מדד של מהירות מאוורר המעבד.',
          'בדיקת טמפרטורת הסיליקון.'
        ],
        correctIndex: 1,
        explanation: 'כיסוי פונקציונלי נכתב במיוחד על ידי המהנדס כדי להבטיח שכל המצבים המוגדרים בארכיטקטורה נבדקו לפחות פעם אחת תחת תנאים שונים.'
      }
    ]
  },
  {
    id: 'l5',
    title: 'Debug Tools & Lab Telemetry',
    titleHe: 'כלי דיבאג וטלמטריית מעבדה',
    description: 'לימוד ממשקי הדיבאג החומרתיים כמו JTAG, Boundary Scan, שימוש באוסילוסקופ, PCIe Analyzer ומערכות Intel DCI.',
    whyItIsHere: 'העבודה היומיומית במעבדה כוללת חיבור כלי דיבאג וניתוח אותות. שיעור זה מציג את הכלים הפיזיים והדיגיטליים הנדרשים לדיבאג מעבדים.',
    prerequisites: ['l2'],
    videoUrl: 'https://www.youtube.com/embed/p1o1S74z5U8',
    conceptIds: ['c_jtag', 'c_boundary_scan', 'c_trace', 'c_logic_analyzer', 'c_oscilloscope', 'c_debug_port', 'c_intel_dci', 'c_uart_debug', 'c_pcie_analyzer', 'c_etm'],
    quizQuestions: [
      {
        id: 'q5_1',
        question: 'מה תפקידו של חיבור Intel DCI (Direct Connect Interface)?',
        options: [
          'חיבור לחשמל ישירות מהקיר.',
          'ממשק המאפשר להעביר חבילות דיבאג של JTAG/ITP על גבי כבל USB 3.0 רגיל ישירות למעבד הנבדק ללא צורך במחברים ייעודיים יקרים על לוח האם.',
          'להאיץ את מהירות הרשת במעבדה.',
          'לכייל את זכרונות ה-DDR.'
        ],
        correctIndex: 1,
        explanation: 'טכנולוגיית DCI מאפשרת למהנדס להתחבר ל-SUT ולבצע דיבאג חומרה מלא (לעצור את המעבד, לקרוא רגיסטרים פנימיים) דרך יציאת USB 3.0 רגילה הנתמכת בחומרה.'
      }
    ]
  },
  {
    id: 'l6',
    title: 'Hardware Bugs & Crash Analysis',
    titleHe: 'ניתוח תקלות חומרה וקריסות מעבד',
    description: 'הבנת כשלי סיליקון מורכבים כגון Deadlocks, Race Conditions, Silent Data Corruption ושגיאות Machine Check Exception (MCE).',
    whyItIsHere: 'התפקיד העיקרי של מהנדס וולידציה הוא למצוא באגים לוגיים בסיליקון. שיעור זה מנתח את סוגי הבאגים החמורים ביותר ואת דרכי הזיהוי שלהם.',
    prerequisites: ['l5'],
    videoUrl: 'https://www.youtube.com/embed/378X1P5_zJg',
    conceptIds: ['c_func_bug', 'c_timing_bug', 'c_race_condition', 'c_deadlock', 'c_livelock', 'c_data_corruption', 'c_sdc', 'c_cache_coherency_bug', 'c_mem_leak', 'c_hang', 'c_crash', 'c_exception', 'c_mce'],
    quizQuestions: [
      {
        id: 'q6_1',
        question: 'מהי שגיאת Silent Data Corruption (SDC) ומדוע היא מסוכנת?',
        options: [
          'שגיאה שבה המחשב אינו משמיע קול בזמן קריסה.',
          'מצב שבו מתרחש שינוי או השחתה של נתונים בזיכרון או במעבד ללא התרעה של מנגנוני החומרה (ללא זריקת Exception), מה שגורם לחישובים שגויים ללא ידיעת המשתמש.',
          'באג שנגרם רק עקב התחממות.',
          'מחיקת קובצי ה-BIOS.'
        ],
        correctIndex: 1,
        explanation: 'שגיאות SDC הן מהבאגים החמורים ביותר בחומרה. המעבד ממשיך לעבוד כרגיל אך מחזיר תוצאה מתמטית שגויה מבלי לדווח על שגיאה, מה שעלול לגרום לנזקים קשים במערכות קריטיות.'
      }
    ]
  },
  {
    id: 'l7',
    title: 'Performance & Architecture Validation',
    titleHe: 'ולידציה של ביצועים וארכיטקטורה',
    description: 'מדידת מדדי ביצועים כמו IPC, CPI, הבנת צווארי בקבוק (Bottlenecks) ושימוש ב-Performance Monitoring Unit (PMU).',
    whyItIsHere: 'מוודא שהמעבד לא רק עובד נכון, אלא גם עומד ביעדי המהירות, רוחב הפס והביצועים שהובטחו ללקוחות.',
    prerequisites: ['l2'],
    videoUrl: 'https://www.youtube.com/embed/n4pneM0_Rk8',
    conceptIds: ['c_benchmark', 'c_ipc', 'c_cpi', 'c_throughput', 'c_latency', 'c_bottleneck', 'c_profiling', 'c_perf_counter', 'c_pmu'],
    quizQuestions: [
      {
        id: 'q7_1',
        question: 'מהו תפקידו של ה-PMU (Performance Monitoring Unit) במעבד?',
        options: [
          'למדוד את צריכת החשמל של הלוח.',
          'יחידת חומרה פנימית במעבד המכילה מונים מיוחדים (Performance Counters) המאפשרים לרשום אירועים פיזיים כמו החטאות מטמון, פענוח פקודות ודילוגי ענפים בזמן אמת ללא פגיעה בביצועים.',
          'לכייל את שעוני ה-PLL.',
          'לשלוט על מהירות התקשורת בשרת.'
        ],
        correctIndex: 1,
        explanation: 'ה-PMU מאפשר למהנדסים ולמפתחי תוכנה למדוד בדיוק רב כיצד החומרה מתנהגת תחת עומסים שונים ולזהות היכן נוצרים צווארי בקבוק בעיבוד.'
      }
    ]
  },
  {
    id: 'l8',
    title: 'Memory Subsystem & Cache Validation',
    titleHe: 'תת-מערכת הזיכרון ואימות זיכרון מטמון',
    description: 'אימות זיכרונות המטמון (L1, L2, L3), יחידות ה-MMU/TLB, בדיקות קוד תיקון שגיאות (ECC) ושלבי אימון הזיכרון (DRAM Training).',
    whyItIsHere: 'תת-מערכת הזיכרון היא מהרכיבים הרגישים והמורכבים ביותר במעבד. באגים בניהול זיכרון או ב-Cache Coherency יכולים להשבית את כל המערכת.',
    prerequisites: ['l2', 'l6'],
    videoUrl: 'https://www.youtube.com/embed/n4pneM0_Rk8',
    conceptIds: ['c_l1_cache', 'c_l2_cache', 'c_l3_cache', 'c_tlb_val', 'c_mmu_val', 'c_ecc_testing', 'c_mem_controller', 'c_dram_training', 'c_mem_scrubbing'],
    quizQuestions: [
      {
        id: 'q8_1',
        question: 'מהי החשיבות של DRAM Training (אימון זיכרון) בזמן אתחול המחשב?',
        options: [
          'לצרוב קוד על כרטיס הזיכרון.',
          'כיול חשמלי עדין של מתחים וזמנים (Delays) בין בקר הזיכרון במעבד לבין שבבי ה-DRAM בלוח כדי ליצור "עין אות" (Signal Eye) פתוחה ויציבה לתקשורת במהירות גבוהה.',
          'מחיקת קובצי מערכת ההפעלה מה-RAM.',
          'הפחתת כמות החשמל שהמעבד צורך.'
        ],
        correctIndex: 1,
        explanation: 'בשל תדרים גבוהים מאוד בזיכרונות DDR מודרניים, שינויים פיזיים קלים בלוח משפיעים על זמני הגעת האותות. DRAM Training מכייל זמנים אלו בכל הדלקה מחדש.'
      }
    ]
  },
  {
    id: 'l9',
    title: 'Power Management & Thermal Throttling',
    titleHe: 'ניהול צריכת חשמל והגנה תרמית',
    description: 'אימות מנגנוני Power Gating, Clock Gating, מעברי DVFS דינמיים, מצבי שינה של הליבה (C-States) ומצבי ביצועים (P-States).',
    whyItIsHere: 'מעבדים מודרניים דורשים ניהול אנרגיה אגרסיבי. באג בניהול צריכת החשמל עלול לשרוף את המעבד או לגרום לנפילות מתח קשות (Vdroop) שקוטעות את פעילות המערכת.',
    prerequisites: ['l2', 'l6'],
    videoUrl: 'https://www.youtube.com/embed/p1o1S74z5U8',
    conceptIds: ['c_power_gating', 'c_clock_gating', 'c_dvfs', 'c_sleep_states', 'c_cstates', 'c_pstates', 'c_thermal_throttling', 'c_turbo_validation'],
    quizQuestions: [
      {
        id: 'q9_1',
        question: 'מה ההבדל בין Power Gating ל-Clock Gating במעבד?',
        options: [
          'אין הבדל, שניהם מנתקים את אספקת המתח.',
          'Clock Gating מכבה רק את אות השעון לרכיבים שאינם פעילים (חוסך צריכת חשמל דינמית), בעוד ש-Power Gating מנתק לחלוטין את זרם המתח הפיזי לאותו אזור בסיליקון (מבטל זרמי זליגה פסיביים).',
          'Power Gating מבוצע רק במצב שינה עמוק של המחשב כולו.',
          'Clock Gating מיועד רק למאווררי הקירור.'
        ],
        correctIndex: 1,
        explanation: 'Power Gating מציע חיסכון אנרגיה משמעותי בהרבה מכיוון שהוא מונע זרמי זליגה פסיביים (Leakage), אך החיסרון שלו הוא זמן התאוששות (Wakeup latency) ארוך יותר מאשר Clock Gating.'
      }
    ]
  },
  {
    id: 'l10',
    title: 'Intel / AMD Core Interview Topics',
    titleHe: 'נושאי הליבה לראיונות עבודה והסמכה',
    description: 'ריכוז נושאי החומרה והתוכנה המרכזיים בראיונות עבודה ב-Intel ו-AMD: פרוטוקול PCIe, תהליך ה-Boot Flow, עקביות זיכרון מטמון, CDC ומיקרוקוד.',
    whyItIsHere: 'זהו שיעור ההכנה הרשמי שלך לראיונות ולידציה. הוא מרכז את המושגים, הפרוטוקולים והספריות שבהם תשתמש מדי יום כמהנדס וולידציה מקצועי.',
    prerequisites: ['l1', 'l2', 'l8', 'l9'],
    videoUrl: 'https://www.youtube.com/embed/rVplV1uFmX0',
    conceptIds: ['c_pcie', 'c_ddr', 'c_cache_coherency', 'c_interrupts', 'c_boot_flow', 'c_firmware', 'c_ucode', 'c_intel_vtx', 'c_cdc', 'c_sta', 'c_python', 'c_cpp', 'c_assembly'],
    quizQuestions: [
      {
        id: 'q10_1',
        question: 'מהו ה-Clock Domain Crossing (CDC) ומדוע הוא מהווה אתגר חמור בוולידציה?',
        options: [
          'מעבר בין חיבורי חשמל שונים בלוח.',
          'מצב שבו אותות נתונים עוברים בין אזורים לוגיים במעבד הפועלים תחת תדרי שעון שונים ובלתי מסונכרנים, מה שעלול לגרום למטא-סטביליות (Metastability) ואיבוד נתונים ללא מנגנוני סנכרון מתאימים.',
          'טעינת קבצי ה-BIOS.',
          'מעבר ממצב טורבו למצב חיסכון בחשמל.'
        ],
        correctIndex: 1,
        explanation: 'בעיות CDC הן מבאגי החומרה הקשים ביותר לאיתור. הם אקראיים לחלוטין ונובעים מהפרשי פאזה וזמנים זעירים בין שעונים, ולכן דורשים בדיקות לוגיות וחשמליות קפדניות.'
      }
    ]
  }
];

export const initialConcepts: Concept[] = [
  // 1. שלבי הולידציה
  {
    id: 'c_pre_silicon',
    term: 'Pre-Silicon Validation',
    lessonId: 'l1',
    category: 'שלבי הולידציה',
    definition: 'אימות תכנון המעבד באמצעות מודלים ממוחשבים וסימולציות לפני ייצורו הפיזי במפעל.',
    definitionHighLevel: 'Logic verification of CPU designs using RTL simulation, emulation platforms (Veloce/Palladium) and FPGA virtual boards to locate architectural bugs.',
    context: 'בוולידציה זו מריצים תסריטי בדיקה מוקדמים על מודלי Verilog/SystemVerilog.'
  },
  {
    id: 'c_post_silicon',
    term: 'Post-Silicon Validation',
    lessonId: 'l1',
    category: 'שלבי הולידציה',
    definition: 'בדיקת שבבי הסיליקון הפיזיים האמיתיים המגיעים מהמפעל בתוך מעבדות הבדיקה.',
    definitionHighLevel: 'Physical testing of manufactured silicon working under full operating clock speeds and physical electrical conditions in validation system environments.',
    context: 'בדיקת מעבדי ES ו-QS במעבדה על גבי לוחות StarGate תחת מערכות הפעלה מיוחדות כמו SVOS.'
  },
  {
    id: 'c_func_val',
    term: 'Functional Validation',
    lessonId: 'l1',
    category: 'שלבי הולידציה',
    definition: 'בדיקת נכונות הלוגיקה של המעבד כדי לוודא שכל הפקודות והמנגנונים הלוגיים מבוצעים בדיוק לפי המפרט.',
    definitionHighLevel: 'Verification that the processor executes the complete instruction set architecture (ISA) and internal state transitions without functional bugs.',
    context: 'מריצים בדיקות Stress לוגיות ו-workloads מורכבים במעבדה כדי למצוא באגים לוגיים ב-pipeline.'
  },
  {
    id: 'c_design_val',
    term: 'Design Validation',
    lessonId: 'l1',
    category: 'שלבי הולידציה',
    definition: 'אימות שהתכנון הפיזי והמבני של השבב עונה על דרישות התכן ואינו מכיל באגים מבניים.',
    definitionHighLevel: 'Verifying that the structural implementation of the SoC matches architectural specifications and logic designs.',
    context: 'בדיקת קונפיגורציית הרכיבים, חיבורי אפיקי התקשורת ורגיסטרי הבקרה במוצר.'
  },
  {
    id: 'c_system_val',
    term: 'System Validation',
    lessonId: 'l1',
    category: 'שלבי הולידציה',
    definition: 'בדיקת המעבד כחלק ממערכת מחשב מלאה הכוללת זיכרון, דיסק קשיח, ספק כוח וכרטיס מסך.',
    definitionHighLevel: 'Evaluating the processor interaction within a fully configured system under concurrent Workloads and varying environmental conditions.',
    context: 'ולידציה המוודאת שאין התנגשויות או בעיות תאימות בין המעבד לשאר חלקי המערכת תחת עומס.'
  },
  {
    id: 'c_platform_val',
    term: 'Platform Validation',
    lessonId: 'l1',
    category: 'שלבי הולידציה',
    definition: 'בדיקת האינטגרציה בין המעבד ללוח האם הספציפי, ה-BIOS, הקושחה ומערכת ההפעלה.',
    definitionHighLevel: 'Validation of the complete motherboard ecosystem (VRMs, PCH, BIOS/UEFI, CSME firmware) aligning with the silicon stepping configurations.',
    context: 'אימות גרסאות ה-BKC השונות לוודא שהלוח, ה-BIOS והקושחות עובדים יחד בצורה הרמונית ויציבה.'
  },
  {
    id: 'c_silicon_val',
    term: 'Silicon Validation',
    lessonId: 'l1',
    category: 'שלבי הולידציה',
    definition: 'בדיקת שבב הסיליקון הפיזי עצמו כדי לאתר ליקויי ייצור או בעיות פיזיקליות של המוליכים למחצה.',
    definitionHighLevel: 'Direct verification of physical silicon characteristics including transitor leakage, thermal properties, and path delays.',
    context: 'בדיקות המבוצעות בשלבים ראשוניים של קבלת הסיליקון מהמפעל (A0 Stepping) כדי לאשר את תקינותו הבסיסית.'
  },
  {
    id: 'c_product_val',
    term: 'Product Validation',
    lessonId: 'l1',
    category: 'שלבי הולידציה',
    definition: 'אימות סופי של המעבד מול הגדרות המוצר המיועד ללקוח הקצה (שימושיות, ביצועים ואמינות).',
    definitionHighLevel: 'Validating the final product configuration against target user profiles, software application workloads and customer specifications.',
    context: 'הרצת בנצ\'מרקים ויישומים מסחריים נפוצים כדי להבטיח חווית שימוש מושלמת ללקוח ללא קריסות.'
  },
  {
    id: 'c_manufacturing_val',
    term: 'Manufacturing Validation',
    lessonId: 'l1',
    category: 'שלבי הולידציה',
    definition: 'בדיקות מהירות המבוצעות במפעל הייצור על כל שבב ושבב כדי לוודא שלא נוצרו בו פגמים פיזיים במהלך הייצור.',
    definitionHighLevel: 'High-throughput hardware screening tests (Structural Test, Sort, Class) executed at the wafer and package levels to filter defective parts.',
    context: 'הרצת בדיקות BIST וקודים מיוחדים על קווי הייצור כדי לגלות שבבים פגומים לפני אריזתם.'
  },

  // 2. סוגי בדיקות
  {
    id: 'c_func_test',
    term: 'Functional Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'הרצת בדיקות שנועדו לבדוק אם מנגנונים ספציפיים במעבד מבצעים את פעולתם הלוגית כנדרש.',
    definitionHighLevel: 'Direct validation of architectural feature correctness by injecting planned stimuli and checking output values against expected behaviors.',
    context: 'הרצת קודים קצרים הבודקים פעולת רגיסטרים, פקודות חשבון לוגיות ומעברי מצבים.'
  },
  {
    id: 'c_regression_test',
    term: 'Regression Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'הרצה חוזרת של סדרת בדיקות קודמות שעברו בהצלחה כדי לוודא שעדכון חומרה או תוכנה חדש לא קלקל דבר.',
    definitionHighLevel: 'Executing established test suites on new microcode/BIOS iterations to detect and prevent regressions in functional logic.',
    context: 'הרצת ה-Regression Suite המרכזי בכל פעם שמקבלים גרסת BKC או uCode חדשה למעבדה.'
  },
  {
    id: 'c_smoke_test',
    term: 'Smoke Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'בדיקות בסיסיות ומהירות מאוד המבוצעות על גרסה חדשה כדי לוודא שהיא יציבה מספיק בשביל להתחיל בדיקות עמוקות.',
    definitionHighLevel: 'A preliminary set of basic tests executed to confirm the build/platform is functional enough for general validation execution.',
    context: 'בדיקה שהמערכת מצליחה לעשות בוט פשוט ולהעלות את מערכת ההפעלה SVOS ללא קריסה מיידית.'
  },
  {
    id: 'c_stress_test',
    term: 'Stress Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'בדיקות מאמץ קיצוניות המפעילות עומס מרבי על רכיבי המעבד במקביל כדי לאתר בעיות התנגשות משאבים.',
    definitionHighLevel: 'Subjecting the processor to maximum transaction throughput and concurrency of workloads to trigger corner-case logic crashes.',
    context: 'הרצת בדיקות מאמץ רציפות 24/7 באוטומציה של NGA.'
  },
  {
    id: 'c_stability_test',
    term: 'Stability Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'בדיקת יציבות המערכת לאורך זמן רב כדי להבטיח שהיא אינה סובלת מקריסות אקראיות או שחיקה מהירה.',
    definitionHighLevel: 'Long-duration tests executing continuous validation scenarios to verify mean time between failures (MTBF) criteria.',
    context: 'בדיקת יציבות הנמשכת מספר ימים רצופים כדי לגלות באגים אקראיים ונדירים.'
  },
  {
    id: 'c_perf_test',
    term: 'Performance Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'מדידת מהירות העבודה, רוחב הפס וזמני התגובה של המעבד תחת עומסי עבודה מוגדרים.',
    definitionHighLevel: 'Measuring execution speeds, data bandwidth, and latency to confirm they match design targets and competitive benchmarks.',
    context: 'הרצת בנצ\'מרקים מסחריים ומדידת IPC באמצעות כלי Profiling מיוחדים במעבדה.'
  },
  {
    id: 'c_compat_test',
    term: 'Compatibility Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'בדיקת תאימות המעבד מול מגוון רחב של רכיבי חומרה חיצוניים, כרטיסי מסך, זכרונות ומערכות הפעלה בשוק.',
    definitionHighLevel: 'Verifying seamless hardware and software interoperability with third-party components and older legacy devices.',
    context: 'בדיקה שכרטיסי מסך שונים של יצרניות שונות מזוהים ועובדים בצורה מושלמת על ערוצי ה-PCIe.'
  },
  {
    id: 'c_power_test',
    term: 'Power Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'מדידת צריכת האנרגיה של המעבד במצבי פעולה ומצבי שינה שונים ואימות מנגנוני החיסכון בחשמל.',
    definitionHighLevel: 'Evaluating electrical power consumption across various operating states and transient power transitions.',
    context: 'ניטור צריכת הזרם (Current) והמתח (Voltage) על קווי אספקת הכוח של המעבד במעבדה.'
  },
  {
    id: 'c_thermal_test',
    term: 'Thermal Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'בדיקת התנהגות המעבד תחת טמפרטורות קיצוניות ואימות תפקוד מנגנון ההגנה מפני חום יתר.',
    definitionHighLevel: 'Validation of thermal sensors, fan speed controller triggers, and clock throttling protection loops at junction temperature limits.',
    context: 'שימוש בתנורים תרמיים (Thermal Chambers) כדי להביא את ה-SUT לטמפרטורות סביבה של מתחת ל-0 או מעל ל-100 מעלות.'
  },
  {
    id: 'c_security_test',
    term: 'Security Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'בדיקות שנועדו לאתר פרצות אבטחה, ערוצי דליפת מידע חבויים וכשלי הגנה במעבד.',
    definitionHighLevel: 'Penetration testing of hardware security boundaries, side-channel attack mitigations, and secure boot cryptography.',
    context: 'ניסיונות פריצה מבוקרים לתאי האבטחה (Secure Enclaves) של המעבד במעבדת הדיבאג.'
  },
  {
    id: 'c_reliability_test',
    term: 'Reliability Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'בדיקות המדמות הזדקנות מהירה ושחיקה של השבב כדי לוודא שהוא יעבוד בצורה אמינה לאורך שנים רבות.',
    definitionHighLevel: 'Silicon stress validation utilizing elevated voltage and heat conditions to accelerate physical wearout mechanisms.',
    context: 'בדיקות Burn-In הנמשכות שעות רבות במתח וטמפרטורה גבוהים מהרגיל.'
  },
  {
    id: 'c_compliance_test',
    term: 'Compliance Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'בדיקה שהמעבד עומד בצורה מדויקת בתקנים בינלאומיים רשמיים (כמו תקני PCIe, USB, ACPI וכו\').',
    definitionHighLevel: 'Official protocol testing ensuring the target design complies with interface standards defined by industry bodies (e.g. PCI-SIG).',
    context: 'הרצת חבילות בדיקה רשמיות של ארגוני התקינה לקבלת הסמכת מוצר רשמית.'
  },
  {
    id: 'c_boot_test',
    term: 'Boot Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'אימות שכל שלבי הדלקת המערכת והבוט מתבצעים בהצלחה ללא שגיאות או תקיעות.',
    definitionHighLevel: 'Testing platform reset vector release, firmware reading, POST progression, and OS loading consistency.',
    context: 'הרצת אלפי מחזורי אתחול (Boot cycles) רצופים כדי לגלות בעיות אקראיות בשלבי ה-BIOS.'
  },
  {
    id: 'c_interrupt_test',
    term: 'Interrupt Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'בדיקת מנגנון פסיקות המערכת (Interrupts) המאפשר למכשירים חיצוניים לעצור את פעולת המעבד כדי לטפל באירועים דחופים.',
    definitionHighLevel: 'Verifying APIC, MSI-X, and legacy interrupts behavior under heavy workload transitions.',
    context: 'הזרקת אלפי פסיקות חומרה במקביל כדי לוודא שהמעבד מנהל את סדרי העדיפויות ביניהן ללא קריסות.'
  },
  {
    id: 'c_mem_test',
    term: 'Memory Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'בדיקת יציבות, מהירות ואמינות קריאה וכתיבה מול זיכרון ה-RAM במצבים שונים.',
    definitionHighLevel: 'Testing data bus signal integrity, training parameters, and memory access patterns over DDR channels.',
    context: 'הרצת כלי MemTest במעבדה תחת תדרי זיכרון מקסימליים ומתחים נמוכים.'
  },
  {
    id: 'c_cache_test',
    term: 'Cache Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'אימות פעולת זיכרונות המטמון הפנימיים במעבד וסנכרון הנתונים ביניהם (Cache Coherency).',
    definitionHighLevel: 'Validation of cache hits, misses, evictions, and coherency states (MESI) across multiple core layers.',
    context: 'בדיקת קווי התקשורת ומהירות הגישה ל-L1, L2 ו-LLC.'
  },
  {
    id: 'c_pipeline_test',
    term: 'Pipeline Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'אימות שצינור העיבוד (Pipeline) של המעבד מפענח ומריץ פקודות בצורה תקינה ללא שגיאות תזמון.',
    definitionHighLevel: 'Verifying execution pipeline hazards, stalls, register forwarding, and recovery steps on branch mispredictions.',
    context: 'הרצת רצפי פקודות מורכבים המאתגרים את מנגנון ה-Out-of-Order של הצינור.'
  },
  {
    id: 'c_io_test',
    term: 'I/O Testing',
    lessonId: 'l2',
    category: 'סוגי בדיקות',
    definition: 'בדיקת קווי הקלט והפלט (I/O) של המעבד מול בקרי הלוח והתקנים חיצוניים.',
    definitionHighLevel: 'Validation of peripheral buses, system interfaces, and legacy I/O mappings to verify correct signal levels.',
    context: 'בדיקות יציבות של קווי USB, SATA, ורשת מול המעבד.'
  },

  // 3. אימות תכנון (Verification)
  {
    id: 'c_verification',
    term: 'Verification',
    lessonId: 'l3',
    category: 'אימות תכנון (Verification)',
    definition: 'אימות שהלוגיקה של השבב נבנתה בדיוק לפי השרטוט והמפרט הלוגי שתוכנן במחשב.',
    definitionHighLevel: 'Ensuring the design implementation complies with the logical specifications (RTL verification).',
    context: 'מבוצע בעיקר בשלב ה-Pre-Silicon באמצעות סימולטורים של SystemVerilog.'
  },
  {
    id: 'c_validation',
    term: 'Validation',
    lessonId: 'l3',
    category: 'אימות תכנון (Verification)',
    definition: 'אימות שהשבב הפיזי עונה על צרכי המשתמש ותפקודו בפועל במערכת אמיתית תקין ויציב.',
    definitionHighLevel: 'Confirming that the physical silicon executes software applications correctly and meets product goals in real-world scenarios.',
    context: 'ולידציה מבוצעת בשלב ה-Post-Silicon על גבי חומרה אמיתית במעבדה.'
  },
  {
    id: 'c_formal_ver',
    term: 'Formal Verification',
    lessonId: 'l3',
    category: 'אימות תכנון (Verification)',
    definition: 'הוכחה מתמטית מוחלטת שהלוגיקה של המעבד תקינה ואינה מכילה שגיאות, ללא צורך בהרצת בדיקות.',
    definitionHighLevel: 'Mathematical proof of design correctness against formal properties using model checking algorithms.',
    context: 'שימוש בכלים מתמטיים מיוחדים לאימות מנגנונים קריטיים כמו בקרי פסיקות ופרוטוקולי אפיק תקשורת.'
  },
  {
    id: 'c_dynamic_ver',
    term: 'Dynamic Verification',
    lessonId: 'l3',
    category: 'אימות תכנון (Verification)',
    definition: 'אימות הלוגיקה באמצעות הרצת בדיקות והזרקת אותות משתנים לאורך זמן בסימולציה.',
    definitionHighLevel: 'Design verification executed by running test scenarios and checking dynamic signal behaviors over simulation clock cycles.',
    context: 'הרצת קודים ובדיקות על מודל ה-RTL כדי לראות את האותות החשמליים משתנים בסימולטור.'
  },
  {
    id: 'c_static_ver',
    term: 'Static Verification',
    lessonId: 'l3',
    category: 'אימות תכנון (Verification)',
    definition: 'ניתוח קוד הלוגיקה של המעבד ללא הרצה שלו, כדי לזהות שגיאות תחביר וחוקי תכנון.',
    definitionHighLevel: 'Analyzing the code syntax, clock domain constraints, and structure rule compliance without simulating clock cycles.',
    context: 'שימוש בכלי ל linting (כמו Leda/SpyGlass) כדי לאתר בעיות בקוד ה-RTL.'
  },
  {
    id: 'c_simulation',
    term: 'Simulation',
    lessonId: 'l3',
    category: 'אימות תכנון (Verification)',
    definition: 'הדמיית התנהגות המעבד באמצעות תוכנת מחשב (איטית מאוד אך מדויקת ברמת השער הלוגי).',
    definitionHighLevel: 'Software execution of the RTL design mapping transistor and gate actions cycle-by-cycle.',
    context: 'הרצת סימולטורים של חברות כמו Synopsys או Cadence לאימות קוד RTL מוקדם.'
  },
  {
    id: 'c_emulation',
    term: 'Emulation',
    lessonId: 'l3',
    category: 'אימות תכנון (Verification)',
    definition: 'חיקוי פעולת המעבד באמצעות מכונות חומרה מורכבות המאיצות את מהירות הבדיקה פי אלפים מסימולטור.',
    definitionHighLevel: 'Executing logic designs on specialized hardware accelerators simulating hardware gates at megahertz speeds.',
    context: 'הרצת מודל המעבד על גבי מערכות אמיולציה (כגון Intel Veloce) כדי להריץ קטעי BIOS מוקדמים.'
  },
  {
    id: 'c_fpga_proto',
    term: 'FPGA Prototyping',
    lessonId: 'l3',
    category: 'אימות תכנון (Verification)',
    definition: 'צריבה והרצה של קוד המעבד על גבי שבבים ניתנים לתכנות (FPGA) כדי לדמות חומרה מהירה במעבדה.',
    definitionHighLevel: 'Synthesizing RTL designs into arrays of physical FPGAs to achieve near-real hardware operating speeds for early validation testing.',
    context: 'שימוש בלוחות FPGA לפיתוח דרייברים ואימות קושחה מוקדם לפני הגעת הסיליקון מהמפעל.'
  },
  {
    id: 'c_abv',
    term: 'Assertion-Based Verification (ABV)',
    lessonId: 'l3',
    category: 'אימות תכנון (Verification)',
    definition: 'שימוש בהצהרות בקרה פנימיות בקוד (Assertions) שמתריעות מיידית על מצב לוגי לא חוקי בזמן הריצה.',
    definitionHighLevel: 'Integrating check properties inside RTL structures that monitor structural rules and instantly flag failures during tests.',
    context: 'כתיבת Assertions ב-SystemVerilog לוודא שפרוטוקול האפיק אינו מופר.'
  },
  {
    id: 'c_crv',
    term: 'Constrained Random Verification (CRV)',
    lessonId: 'l3',
    category: 'אימות תכנון (Verification)',
    definition: 'הזרקת אותות ופקודות אקראיות תחת מגבלות מוגדרות כדי למצוא באגים בלתי צפויים.',
    definitionHighLevel: 'Generating random stimulus inputs bounded by dynamic constraints to explore unanticipated design paths.',
    context: 'שימוש במחולל בדיקות אקראי ליצירת שילובי פקודות נדירים שקשה לחשוב עליהם ידנית.'
  },
  {
    id: 'c_cdv',
    term: 'Coverage-Driven Verification (CDV)',
    lessonId: 'l3',
    category: 'אימות תכנון (Verification)',
    definition: 'שיטת עבודה שבה כותבים ומריצים בדיקות במטרה מוצהרת להעלות את אחוזי הכיסוי הלוגי של השבב.',
    definitionHighLevel: 'Feedback loop testing where simulation runs are directed dynamically to hit unreached coverage metrics.',
    context: 'ניתוח דוחות הכיסוי וכתיבת בדיקות ממוקדות לאזורים שלוגיקת הבדיקות טרם הגיעה אליהם.'
  },

  // 4. כיסוי (Coverage)
  {
    id: 'c_code_cov',
    term: 'Code Coverage',
    lessonId: 'l4',
    category: 'כיסוי (Coverage)',
    definition: 'מדד המראה כמה אחוזים משורות הקוד שנכתבו עבור המעבד נבחנו בפועל על ידי הבדיקות.',
    definitionHighLevel: 'A metric indicating the percentage of written HDL code lines evaluated during simulation execution.',
    context: 'שימוש בכלי סימולציה להפקת דוח המציג אילו שורות קוד RTL נשארו ללא בדיקה.'
  },
  {
    id: 'c_func_cov',
    term: 'Functional Coverage',
    lessonId: 'l4',
    category: 'כיסוי (Coverage)',
    definition: 'מדד המציג אילו מצבים, תרחישים ושילובי פקודות מוגדרים נבדקו בפועל מתוך כלל המפרט.',
    definitionHighLevel: 'Quantifying targeted test points, register values, and state changes configured by engineers to map requirements compliance.',
    context: 'הגדרת Covergroups ב-SystemVerilog לאיסוף סטטיסטיקות על מעבר פקודות ב-pipeline.'
  },
  {
    id: 'c_toggle_cov',
    term: 'Toggle Coverage',
    lessonId: 'l4',
    category: 'כיסוי (Coverage)',
    definition: 'בדיקה שכל פין או קו לוגי במעבד עבר בהצלחה ממצב של \'0\' ל-\'1\' ובחזרה במהלך הבדיקות.',
    definitionHighLevel: 'Measuring whether net signals inside the design toggled between low and high states during test execution.',
    context: 'מניעת קווים לוגיים תקועים בחומרה על ידי מעבר של כל קו בין מצבי 0 ו-1.'
  },
  {
    id: 'c_branch_cov',
    term: 'Branch Coverage',
    lessonId: 'l4',
    category: 'כיסוי (Coverage)',
    definition: 'בדיקה שכל החלטת תנאי (כמו If/Else) נבחנה גם במצב חיובי וגם במצב שלילי.',
    definitionHighLevel: 'Ensuring both true and false paths of decision points in RTL code are evaluated by tests.',
    context: 'ולידציה של החלטות לוגיות כדי לוודא ששני נתיבי ההחלטה תקינים לחלוטין.'
  },
  {
    id: 'c_stmt_cov',
    term: 'Statement Coverage',
    lessonId: 'l4',
    category: 'כיסוי (Coverage)',
    definition: 'מדד הבודק שכל שורת פקודה בודדת בקוד הופעלה לפחות פעם אחת.',
    definitionHighLevel: 'Tracking individual statement block executions to confirm all branches of code were active.',
    context: 'זהו מדד הכיסוי הבסיסי ביותר שמפיקים מכלי הסימולציה.'
  },
  {
    id: 'c_path_cov',
    term: 'Path Coverage',
    lessonId: 'l4',
    category: 'כיסוי (Coverage)',
    definition: 'בדיקה של כל נתיבי זרימת הקוד האפשריים מתחילת התוכנית ועד סופה.',
    definitionHighLevel: 'Verifying all execution sequence paths from entry to exit points within structural loops.',
    context: 'נחשב למדד קשה מאוד להשגה (100% כיסוי) בשל שילובים כמעט אינסופיים של נתיבים.'
  },
  {
    id: 'c_cond_cov',
    term: 'Condition Coverage',
    lessonId: 'l4',
    category: 'כיסוי (Coverage)',
    definition: 'בדיקה שכל תנאי קטן בתוך ביטוי תנאי מורכב קיבל את כל השילובים האפשריים.',
    definitionHighLevel: 'Validating each sub-expression factor within boolean logical checks during tests.',
    context: 'מיועד להבטיח שאין חולשות לוגיות חבויות בתוך פקודות תנאי מורכבות.'
  },
  {
    id: 'c_fsm_cov',
    term: 'FSM Coverage',
    lessonId: 'l4',
    category: 'כיסוי (Coverage)',
    definition: 'בדיקה שמכונת המצבים הפנימית במעבד (FSM) עברה בכל המצבים שלה ובכל מעברי המצבים האפשריים.',
    definitionHighLevel: 'Ensuring all states and legal state transitions of Finite State Machines are covered during validation.',
    context: 'חשוב במיוחד לאימות פרוטוקולי תקשורת ומנגנוני בקרה המנוהלים על ידי מכונות מצבים.'
  },
  {
    id: 'c_cross_cov',
    term: 'Cross Coverage',
    lessonId: 'l4',
    category: 'כיסוי (Coverage)',
    definition: 'מדידת שילובים סימולטניים של משתנים שונים (למשל: סוג פקודה במקביל לרמת מתח ספציפית).',
    definitionHighLevel: 'Evaluating cross-products of multiple coverpoints occurring at the exact same execution cycle.',
    context: 'עוזר לזהות אם נבדקו מצבים משולבים (כמו עומס PCIe מלא יחד עם מעבר למצב שינה C6).'
  },

  // 5. כלי Debug
  {
    id: 'c_jtag',
    term: 'JTAG',
    lessonId: 'l5',
    category: 'כלי Debug',
    definition: 'ממשק חומרה וסטנדרט בינלאומי לביצוע דיבאג חומרתי ישיר, בדיקות לוח ועצירת פעולת המעבד.',
    definitionHighLevel: 'IEEE 1149.1 standard for board and system testing, boundary scans, and in-target probe (ITP) debugging operations.',
    context: 'חיבור הדיבאגר של אינטל ללוח דרך פיני JTAG מאפשר לעצור את ריצת המעבד בשורת קוד מסוימת.'
  },
  {
    id: 'c_boundary_scan',
    term: 'Boundary Scan',
    lessonId: 'l5',
    category: 'כלי Debug',
    definition: 'בדיקה חשמלית המאפשרת לבחון את חיבורי הפינים של המעבד ללוח ללא צורך במגע פיזי עליהם.',
    definitionHighLevel: 'Utilizing boundary scan cells on signal pins via JTAG interface to test board connectivity and pin-to-pad physical contacts.',
    context: 'בדיקת קווים מנותקים או קצרים חשמליים בלוחות אם מורכבים במעבדה.'
  },
  {
    id: 'c_trace',
    term: 'Trace',
    lessonId: 'l5',
    category: 'כלי Debug',
    definition: 'הקלטה רציפה של פעולות המעבד והוראות הקוד שהוא מריץ בזמן אמת, לצורך ניתוח קריסות בדיעבד.',
    definitionHighLevel: 'Continuous execution capture stream recording instruction flows, branch results, and register updates.',
    context: 'שימוש ב-Trace Buffer כדי להבין בדיוק מה עשה המעבד במחזורי השעון האחרונים לפני שקפא.'
  },
  {
    id: 'c_logic_analyzer',
    term: 'Logic Analyzer',
    lessonId: 'l5',
    category: 'כלי Debug',
    definition: 'מכשיר מדידה אלקטרוני המציג ומנתח מאות אותות דיגיטליים במקביל בלוח האם.',
    definitionHighLevel: 'Test equipment capturing high-channel-count digital states to trace complex bus timing behaviors.',
    context: 'חיבור לוגיק אנלייזר לקווי אפיק התקשורת של המעבד כדי לאתר בעיות סינכרון.'
  },
  {
    id: 'c_oscilloscope',
    term: 'Oscilloscope',
    lessonId: 'l5',
    category: 'כלי Debug',
    definition: 'מכשיר מדידה המציג את האות החשמלי האנלוגי המשתנה בזמן (מתח, רעש, גליות).',
    definitionHighLevel: 'Analog measurement instrument capturing voltage waveforms over time to analyze signal integrity.',
    context: 'מדידת רעשי Vdroop או איכות סיגנלים חשמליים מהירים במעבדת הולידציה החשמלית (EV).'
  },
  {
    id: 'c_debug_port',
    term: 'Debug Port',
    lessonId: 'l5',
    category: 'כלי Debug',
    definition: 'חיבור פיזי ייעודי בלוח האם המיועד לחיבור כלי אבחון ודיבאג חיצוניים.',
    definitionHighLevel: 'Dedicated physical header (e.g. XDP) routing internal CPU debug signals out of the board for debugger interfaces.',
    context: 'חיבור מתאמי XDP או ITP ללוח הבדיקות כדי לתקשר עם המעבד.'
  },
  {
    id: 'c_intel_dci',
    term: 'Intel DCI',
    lessonId: 'l5',
    category: 'כלי Debug',
    definition: 'טכנולוגיית דיבאג של אינטל המאפשרת גישה לחומרת הדיבאג הפנימית של המעבד באמצעות כבל USB 3.0 פשוט.',
    definitionHighLevel: 'Direct Connect Interface routing JTAG and trace signals directly through external USB 3.0 ports on SUT.',
    context: 'מאפשר ביצוע דיבאג חומרה מלא גם על מערכות סגורות שאין בהן מחברי דיבאג ייעודיים על הלוח.'
  },
  {
    id: 'c_uart_debug',
    term: 'UART Debug',
    lessonId: 'l5',
    category: 'כלי Debug',
    definition: 'חיבור תקשורת טקסטואלי סריאלי פשוט לקבלת פלטי אבחון והקלדת פקודות (מסוף UART).',
    definitionHighLevel: 'Universal Asynchronous Receiver-Transmitter serial console connection displaying firmware boot messages.',
    context: 'חיבור כבל סריאלי ל-SUT כדי לראות את פלט ה-BIOS וה-Kernel בזמן הבוט.'
  },
  {
    id: 'c_pcie_analyzer',
    term: 'PCIe Analyzer',
    lessonId: 'l5',
    category: 'כלי Debug',
    definition: 'מכשיר ייעודי המקליט ומנתח את חבילות המידע העוברות בערוץ ה-PCI Express.',
    definitionHighLevel: 'Protocol analyzer capturing physical, link, and transaction layer packets traversing the PCIe interface.',
    context: 'ניתוח חבילות LTSSM ונתונים במקרה של ניתוקי כרטיסי הרחבה או האטה בביצועים.'
  },
  {
    id: 'c_etm',
    term: 'ETM (Embedded Trace Macrocell)',
    lessonId: 'l5',
    category: 'כלי Debug',
    definition: 'רכיב חומרה פנימי במעבד המאפשר להקליט את פעולות המעבד ללא האטה שלו.',
    definitionHighLevel: 'On-die trace module generating compressed instruction and data stream records for hardware-assisted debugging.',
    context: 'משמש את המהנדסים לקבלת תמונת מצב מדויקת של ריצת הקוד ברמת מחזור השעון הבודד.'
  },

  // 6. תקלות (Bugs)
  {
    id: 'c_func_bug',
    term: 'Functional Bug',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'שגיאה שבה המעבד אינו מחזיר את התוצאה הלוגית הנכונה או אינו מבצע את הפעולה שהתבקש.',
    definitionHighLevel: 'A defect in logic design violating functional specs, resulting in incorrect calculations or behaviors.',
    context: 'מציאת שגיאה שבה פקודת חישוב מסוימת מחזירה ערך שגוי תחת תנאים מסוימים.'
  },
  {
    id: 'c_timing_bug',
    term: 'Timing Bug',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'באג שקורה רק בתדרי שעון מסוימים או עקב עיכובים זעירים בהגעת האותות החשמליים בשבב.',
    definitionHighLevel: 'A physical silicon failure manifesting under specific frequencies, voltage levels or signal delay margins.',
    context: 'באגים המתרחשים לרוב רק בטמפרטורות גבוהות או במתחים נמוכים במיוחד.'
  },
  {
    id: 'c_race_condition',
    term: 'Race Condition',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'באג שבו שתי פעולות מתחרות על אותו משאב והתוצאה הסופית תלויה באקראי במי שהגיעה קודם.',
    definitionHighLevel: 'An unsynchronized concurrent access conflict leading to unpredictable logical results.',
    context: 'תקלה המתרחשת כאשר שתי ליבות מעבד מנסות לכתוב לאותה כתובת זיכרון במקביל ללא נעילה.'
  },
  {
    id: 'c_deadlock',
    term: 'Deadlock',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'מצב קיפאון שבו שתי יחידות במעבד מחכות זו לזו שישחררו משאב מסוים, ושניהם נעצרים לנצח.',
    definitionHighLevel: 'Mutual exclusion deadlock where multiple processes hold resources while waiting for other held resources.',
    context: 'קריסת מעבד (Hang) הנגרמת עקב חסימה הדדית בין בקרי הזיכרון ל-Ring Bus.'
  },
  {
    id: 'c_livelock',
    term: 'Livelock',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'מצב שבו שתי יחידות במעבד משנות את מצבן ללא הרף בתגובה זו לזו, אך אינן מתקדמות בביצוע המשימה.',
    definitionHighLevel: 'Active execution loop where components continuously switch states in response to each other without making progress.',
    context: 'זיהוי מעבד שצורך 100% אנרגיה אך אינו מריץ קוד בפועל עקב לולאת תגובה פנימית.'
  },
  {
    id: 'c_data_corruption',
    term: 'Data Corruption',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'השחתה או שינוי לא רצוי של מידע השמור בזיכרון או במעבד.',
    definitionHighLevel: 'Unintended alterations in data structures driven by hardware defects, signal noise or logic bugs.',
    context: 'מצב שבו נתונים שנקראים מהדיסק הקשיח או הזיכרון מגיעים משובשים למעבד.'
  },
  {
    id: 'c_sdc',
    term: 'Silent Data Corruption (SDC)',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'השחתת נתונים שקטה ללא התרעה מהחומרה, שהיא התקלה המסוכנת ביותר.',
    definitionHighLevel: 'Data corruption occurring without any hardware warnings or system exception flags driven by logic faults.',
    context: 'בדיקת חישובים מתמטיים מול מודל התייחסות כדי לוודא שאין SDC בצינורות העיבוד.'
  },
  {
    id: 'c_cache_coherency_bug',
    term: 'Cache Coherency Bug',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'שגיאה שבה ליבה אחת במעבד קוראת גרסה לא מעודכנת של נתון הנמצא בזיכרון המטמון של ליבה אחרת.',
    definitionHighLevel: 'Failure in coherency protocol (MESI/MOESI) transitions, leading to stale memory views across CPU cores.',
    context: 'דיבאג של תקלות תקשורת UPI/Ring Bus שיוצרות אי עקביות בנתוני זיכרון המטמון.'
  },
  {
    id: 'c_mem_leak',
    term: 'Memory Leak',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'זליגת זיכרון - אי-שחרור של תאי זיכרון שאינם בשימוש עוד, הגורמת לאתר להאט או לקרוס מחוסר מקום.',
    definitionHighLevel: 'Failure to deallocate dynamically allocated memory blocks, leading to resource depletion over runtime.',
    context: 'בוולידציה בודקים שהתוכנות וסקריפטי האוטומציה אינם סובלים מזליגת זיכרון שמכשילה את המערכות בלילה.'
  },
  {
    id: 'c_hang',
    term: 'Hang',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'תקיעה מוחלטת של המעבד, שבה המערכת מפסיקה להגיב לחלוטין.',
    definitionHighLevel: 'System lockup where execution clocks freeze or instructions stop retiring due to internal deadlocks.',
    context: 'שימוש ב-DCI כדי לעצור את המערכת התקועה ולמצוא היכן נגרם הקיפאון.'
  },
  {
    id: 'c_crash',
    term: 'Crash',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'קריסה מוחלטת של מערכת ההפעלה או תוכנת הבדיקה עקב שגיאת חומרה חמורה.',
    definitionHighLevel: 'Sudden termination of execution driven by unrecoverable hardware exceptions or kernel panic states.',
    context: 'ניתוח קבצי Core Dump לאחר קריסת ה-SUT במעבדה.'
  },
  {
    id: 'c_exception',
    term: 'Exception',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'הפרעה למהלך הריצה הרגיל של התוכנית בעקבות אירוע מיוחד (כמו חלוקה באפס או שגיאת גישת זיכרון).',
    definitionHighLevel: 'Architectural state redirection triggered by error conditions (e.g. Page Fault, General Protection Fault).',
    context: 'אימות שפסיקות החומרה והשגיאות מטופלות נכון על ידי מערכת ההפעלה.'
  },
  {
    id: 'c_mce',
    term: 'Machine Check Exception (MCE)',
    lessonId: 'l6',
    category: 'תקלות (Bugs)',
    definition: 'מנגנון של המעבד המדווח למערכת ההפעלה על תקלות חומרה פנימיות שזוהו.',
    definitionHighLevel: 'Hardware error reporting architecture driving core exceptions on internal parity, ecc, or bus faults.',
    context: 'קריאת בנקי ה-MSR registers של ה-MCE לאבחון מקור התקלה שגרמה למסך כחול.'
  },

  // 7. ביצועים
  {
    id: 'c_benchmark',
    term: 'Benchmark',
    lessonId: 'l7',
    category: 'ביצועים',
    definition: 'תוכנת בדיקה סטנדרטית המשמשת למדידה והשוואה של ביצועי מעבדים ומחשבים שונים.',
    definitionHighLevel: 'Standardized workload suites (e.g. SPEC CPU, Cinebench) executing defined math vectors to measure speed and efficiency.',
    context: 'הרצת SPEC CPU במעבדה כדי לוודא שביצועי ה-ES תואמים להערכות הסימולציה.'
  },
  {
    id: 'c_ipc',
    term: 'IPC (Instructions Per Cycle)',
    lessonId: 'l7',
    category: 'ביצועים',
    definition: 'מספר הפקודות הממוצע שהמעבד מסיים לבצע בכל מחזור שעון (מדד ליעילות ארכיטקטונית).',
    definitionHighLevel: 'Instructions Per Cycle. The average number of micro-operations completed (retired) per clock frequency tick.',
    context: 'בוולידציה שואפים ל-IPC גבוה ככל הניתן; ירידה ב-IPC מעידה על צוואר בקבוק במפענח או בעיכוב זיכרון.'
  },
  {
    id: 'c_cpi',
    term: 'CPI (Cycles Per Instruction)',
    lessonId: 'l7',
    category: 'ביצועים',
    definition: 'כמה מחזורי שעון נדרשים בממוצע כדי לבצע פקודה בודדת (ההופכי של IPC).',
    definitionHighLevel: 'Cycles Per Instruction. The execution clock cycle count required to complete a single instruction.',
    context: 'מדידת CPI של פקודות מורכבות כדי לזהות יעילות של יחידות חישוב.'
  },
  {
    id: 'c_throughput',
    term: 'Throughput',
    lessonId: 'l7',
    category: 'ביצועים',
    definition: 'קצב העבודה הכולל - כמות הנתונים או הבדיקות המבוצעות ביחידת זמן.',
    definitionHighLevel: 'The rate of successful data delivery over communication channels or execution units.',
    context: 'מדידת רוחב הפס המרבי של ממשקי PCIe או הזיכרון.'
  },
  {
    id: 'c_latency',
    term: 'Latency',
    lessonId: 'l7',
    category: 'ביצועים',
    definition: 'זמן השהייה - הזמן שחולף מרגע שליחת הבקשה ועד לקבלת התגובה הראשונית.',
    definitionHighLevel: 'The time duration between stimulus input initiation and response detection.',
    context: 'מדידת זמן גישה לזיכרון ה-RAM (נמדד בננו-שניות).'
  },
  {
    id: 'c_bottleneck',
    term: 'Bottleneck',
    lessonId: 'l7',
    category: 'ביצועים',
    definition: 'צוואר בקבוק - הרכיב הכי איטי במערכת שמגביל ומאט את מהירותה הכוללת.',
    definitionHighLevel: 'The performance-limiting factor within execution pipelines, data paths or peripheral connections.',
    context: 'איתור צווארי בקבוק בחומרת המעבד באמצעות מונים פנימיים (PMU counters).'
  },
  {
    id: 'c_profiling',
    term: 'Profiling',
    lessonId: 'l7',
    category: 'ביצועים',
    definition: 'ניתוח ומדידת זמני ריצה של תוכנית כדי לדעת אילו חלקים צורכים הכי הרבה משאבי עיבוד.',
    definitionHighLevel: 'Dynamic program analysis mapping cycle consumption and memory overhead to source code segments.',
    context: 'שימוש בכלי Profiling (כמו Intel VTune) לזיהוי "אזורים חמים" בבדיקות.'
  },
  {
    id: 'c_perf_counter',
    term: 'Performance Counter',
    lessonId: 'l7',
    category: 'ביצועים',
    definition: 'מוני חומרה פנימיים הרושמים אירועי מעבד ללא הפרעה לריצה.',
    definitionHighLevel: 'On-die hardware counters logging execution events (e.g. Cache Misses, Branch Mispredictions).',
    context: 'קריאת מונים אלו לאפיון הביצועים של ה-SUT.'
  },
  {
    id: 'c_pmu',
    term: 'PMU (Performance Monitoring Unit)',
    lessonId: 'l7',
    category: 'ביצועים',
    definition: 'יחידת החומרה במעבד המרכזת את המונים ובדיקות הביצועים.',
    definitionHighLevel: 'A microarchitectural hardware block managing configuration and reading of performance event counters.',
    context: 'שימוש ב-PMU לאימות קצבי העיבוד של השבב.'
  },

  // 8. זיכרון
  {
    id: 'c_l1_cache',
    term: 'L1 Cache',
    lessonId: 'l8',
    category: 'זיכרון',
    definition: 'זיכרון המטמון המהיר והקטן ביותר, הממוקם ישירות בתוך ליבת המעבד (L1 Cache).',
    definitionHighLevel: 'Primary cache array closest to core pipeline execution units, split into Instruction and Data arrays.',
    context: 'בדיקת מהירות הגישה המרבית ל-L1 (זמן השהייה של מספר מחזורי שעון בודדים).'
  },
  {
    id: 'c_l2_cache',
    term: 'L2 Cache',
    lessonId: 'l8',
    category: 'זיכרון',
    definition: 'זיכרון מטמון משני בליבת המעבד (L2 Cache), מעט גדול ואיטי יותר מ-L1.',
    definitionHighLevel: 'Secondary cache layer tightly coupled to each core, acting as buffer between L1 and shared cache.',
    context: 'אימות מנגנוני ה-Eviction של נתונים מ-L1 ל-L2.'
  },
  {
    id: 'c_l3_cache',
    term: 'L3 Cache (LLC)',
    lessonId: 'l8',
    category: 'זיכרון',
    definition: 'זיכרון המטמון המשותף והגדול ביותר במעבד (L3 Cache), המקשר בין כל הליבות לזיכרון ה-RAM.',
    definitionHighLevel: 'Last Level Cache shared among core agents, partitioned into ring/mesh bus slices.',
    context: 'בדיקות יציבות ושלמות נתונים ב-LLC תחת עומסי קריאה מרובים מכל הליבות במקביל.'
  },
  {
    id: 'c_tlb_val',
    term: 'TLB Validation',
    lessonId: 'l8',
    category: 'זיכרון',
    definition: 'אימות תקינות זיכרון המטמון לתרגום כתובות (TLB), השומר תרגומי כתובות זיכרון וירטואליות לפיזיות.',
    definitionHighLevel: 'Verification of Translation Lookaside Buffer hit, miss, invalidate (TLB shootdown) logic.',
    context: 'מניעת קריסות או השחתת זיכרון במעבר בין תהליכים שונים במערכת ההפעלה.'
  },
  {
    id: 'c_mmu_val',
    term: 'MMU Validation',
    lessonId: 'l8',
    category: 'זיכרון',
    definition: 'בדיקת יחידת ניהול הזיכרון (MMU) האחראית על תרגום כתובות והגנת זיכרון.',
    definitionHighLevel: 'Validation of Memory Management Unit page table walks, page faults, and access permissions.',
    context: 'בדיקה שתוכנה אינה מורשית לגשת לזיכרון השייך לתוכנה אחרת.'
  },
  {
    id: 'c_ecc_testing',
    term: 'ECC Testing',
    lessonId: 'l8',
    category: 'זיכרון',
    definition: 'בדיקת מנגנון קוד תיקון שגיאות (ECC) המסוגל לגלות ולתקן שגיאות זיכרון אקראיות.',
    definitionHighLevel: 'Injecting single-bit and double-bit error states into memory arrays to verify correction and reporting triggers.',
    context: 'שימוש במזרקי שגיאות (Error Injectors) כדי לבדוק שהחומרה מתקנת שגיאות ביט בודד (Single-bit correction) ומדווחת על שגיאות חמורות יותר.'
  },
  {
    id: 'c_mem_controller',
    term: 'Memory Controller Validation',
    lessonId: 'l8',
    category: 'זיכרון',
    definition: 'ולידציה של בקר הזיכרון האחראי על תזמון וניתוב זרם הנתונים בין המעבד ל-RAM.',
    definitionHighLevel: 'Verifying DDR protocol timings, command queues scheduling and power-saving refresh sequences.',
    context: 'אימות עמידה בחוקי התזמון הקפדניים של ממשקי DDR4/DDR5.'
  },
  {
    id: 'c_dram_training',
    term: 'DRAM Training',
    lessonId: 'l8',
    category: 'זיכרון',
    definition: 'תהליך כיול האותות והזמנים מול ה-DDR המבוצע בכל הדלקה.',
    definitionHighLevel: 'Early initialization sequencing aligning command, clock and data strobes via register sweep calibrations.',
    context: 'בוולידציה בודקים שה-DRAM Training מצליח לעבור גם תחת תנאי חום וקור קשים במעבדה.'
  },
  {
    id: 'c_mem_scrubbing',
    term: 'Memory Scrubbing',
    lessonId: 'l8',
    category: 'זיכרון',
    definition: 'מנגנון רקע שסורק את הזיכרון באופן קבוע ומציב תיקון אוטומטי לשגיאות ביט שקטות.',
    definitionHighLevel: 'Systematic memory array scanning reading rows and rewriting corrected ECC values to prevent error accumulation.',
    context: 'מוודא שזכרונות שרתים נשארים נקיים מרעשי קרינה קוסמית ושגיאות קטנות לאורך חודשי פעילות.'
  },

  // 9. צריכת חשמל
  {
    id: 'c_power_gating',
    term: 'Power Gating',
    lessonId: 'l9',
    category: 'צריכת חשמל',
    definition: 'ניתוק פיזי מוחלט של אספקת המתח לאזורים במעבד שאינם בשימוש כדי למנוע זליגת זרם.',
    definitionHighLevel: 'Utilizing power transistors to physically disconnect unused silicon blocks, reducing static leakage current to near-zero.',
    context: 'בדיקת יציבות המעבד בזמן שהוא מכבה ומדליק ליבות שלמות תוך כדי עבודה.'
  },
  {
    id: 'c_clock_gating',
    term: 'Clock Gating',
    lessonId: 'l9',
    category: 'צריכת חשמל',
    definition: 'עצירת אות השעון לרכיבים לוגיים שאינם פעילים כרגע כדי לחסוך בצריכת חשמל דינמית.',
    definitionHighLevel: 'Disabling clock signals to registers that do not need updating in the current cycle to save dynamic switching power.',
    context: 'זהו המנגנון המיידי ביותר לחסכון באנרגיה במעבד ומבוצע באופן אוטומטי בחומרה.'
  },
  {
    id: 'c_dvfs',
    term: 'DVFS',
    lessonId: 'l9',
    category: 'צריכת חשמל',
    definition: 'שינוי דינמי של מתח ותדר המעבד בזמן אמת לפי רמת העומס הנדרשת.',
    definitionHighLevel: 'Dynamic Voltage and Frequency Scaling. Adjusting voltage rails and PLL clocks to match target workload performance demand.',
    context: 'בדיקת יציבות מייצבי המתח (VR) במעברים מהירים במיוחד בין רמות מתח שונות.'
  },
  {
    id: 'c_sleep_states',
    term: 'Sleep States (S-States)',
    lessonId: 'l9',
    category: 'צריכת חשמל',
    definition: 'מצבי השינה והכיבוי של המערכת כולה (כמו מצבי ACPI S3, S4, S5).',
    definitionHighLevel: 'ACPI defined platform sleep configurations coordinating global power rail terminations.',
    context: 'בדיקת זיהוי חומרה מלא לאחר שה-SUT יוצא ממצב שינה עמוק.'
  },
  {
    id: 'c_cstates',
    term: 'C-States',
    lessonId: 'l9',
    category: 'צריכת חשמל',
    definition: 'מצבי שינה פנימיים של ליבות המעבד (C0 לפעולה, C10 לשינה עמוקה ביותר).',
    definitionHighLevel: 'ACPI core power savings states regulating core clock gating and power gating depth.',
    context: 'מדידת זמני ההתעוררות (Wakeup Latency) של ליבות ממצב C10.'
  },
  {
    id: 'c_pstates',
    term: 'P-States',
    lessonId: 'l9',
    category: 'צריכת חשמל',
    definition: 'מצבי ביצועים של המעבד הפעיל (שילובים שונים של תדר ומתח עבודה).',
    definitionHighLevel: 'ACPI power-performance states configuring frequency targets under active execution cycles.',
    context: 'אימות שהמעבד משתמש ב-P-states הנמוכים בזמן מנוחה כדי למנוע צריכת זרם מיותרת.'
  },
  {
    id: 'c_thermal_throttling',
    term: 'Thermal Throttling',
    lessonId: 'l9',
    category: 'צריכת חשמל',
    definition: 'מנגנון בטיחות המוריד את מהירות המעבד כשהוא מתחמם יתר על המידה כדי למנוע נזק פיזי.',
    definitionHighLevel: 'Triggering clock duty cycle scaling or frequency drops when internal junction sensors report temperature limits.',
    context: 'בדיקה שהמעבד מוריד תדר בהצלחה ברגע שהוא מגיע ל-TjMax.'
  },
  {
    id: 'c_turbo_validation',
    term: 'Turbo Boost Validation',
    lessonId: 'l9',
    category: 'צריכת חשמל',
    definition: 'אימות מנגנון המאיץ את תדר הליבות מעבר לתדר הבסיס כאשר יש מרווח טמפרטורה והספק פנוי.',
    definitionHighLevel: 'Verifying dynamic frequency boosting algorithm based on target budget telemetry parameters.',
    context: 'מדידת יציבות המעבד במהירויות שיא תחת עומסי עבודה קצרים.'
  },

  // 10. תזמונים (Core Interview Topics)
  {
    id: 'c_cdc',
    term: 'Clock Domain Crossing (CDC)',
    lessonId: 'l10',
    category: 'תזמונים',
    definition: 'מעבר של אות נתונים בין שני אזורים במעבד הפועלים תחת תדרי שעון שונים ובלתי מסונכרנים.',
    definitionHighLevel: 'Signals routing between logic registers driven by unsynchronized clock trees, creating metastability risks.',
    context: 'בדיקת קיומם של מסנכרנים (Synchronizers) בקצוות האזורים כדי למנוע איבוד ביטים.'
  },
  {
    id: 'c_sta',
    term: 'Static Timing Analysis (STA)',
    lessonId: 'l10',
    category: 'תזמונים',
    definition: 'ניתוח תיאורטי של זמני הגעת האותות החשמליים בשבב כדי לוודא שאין שגיאות תזמון.',
    definitionHighLevel: 'Verification of design paths delays without simulation, confirming setup and hold requirements are met.',
    context: 'מבוצע בשלב ה-Pre-Silicon כדי להבטיח סגירת תזמונים (Timing Closure) במהירות השעון המיועדת.'
  },

  // 11. ארכיטקטורה
  {
    id: 'c_pcie',
    term: 'PCI Express (PCIe)',
    lessonId: 'l10',
    category: 'ארכיטקטורה',
    definition: 'פרוטוקול תקשורת מהיר לחיבור כרטיסים חיצוניים (כמו כרטיסי מסך) ישירות למעבד.',
    definitionHighLevel: 'High-speed serial computer expansion bus standard featuring point-to-point packet communication.',
    context: 'זהו ממשק החיבור החיצוני המרכזי של מעבדי אינטל; ולידציה שלו דורשת ניתוח חשמלי ולוגי מעמיק.'
  },
  {
    id: 'c_ddr',
    term: 'DDR Memory',
    lessonId: 'l10',
    category: 'ארכיטקטורה',
    definition: 'זיכרון הגישה האקראית (RAM) הראשי של המערכת המקושר למעבד.',
    definitionHighLevel: 'Double Data Rate synchronous dynamic random-access memory interface specification.',
    context: 'בדיקת בקרי הזיכרון במעבד מול מודולי זיכרון DDR4 ו-DDR5.'
  },
  {
    id: 'c_cache_coherency',
    term: 'Cache Coherency',
    lessonId: 'l10',
    category: 'ארכיטקטורה',
    definition: 'מנגנון השומר על עקביות ועדכניות הנתונים בכל זיכרונות המטמון של הליבות השונות.',
    definitionHighLevel: 'Ensuring consistent data views across distributed cache memories on multi-core systems via hardware protocols.',
    context: 'זהו אחד מנושאי הראיונות החשובים ביותר (MESI protocol) מכיוון שהוא מונע השחתת נתונים ביישומים מרובי תהליכים.'
  },
  {
    id: 'c_interrupts',
    term: 'Interrupts',
    lessonId: 'l10',
    category: 'ארכיטקטורה',
    definition: 'אותות חומרה או תוכנה המודיעים למעבד שעליו להפסיק זמנית את התוכנית הנוכחית כדי לטפל באירוע דחוף.',
    definitionHighLevel: 'Asynchronous signals asserting core vector redirections to execute Interrupt Service Routines (ISRs).',
    context: 'בוולידציה בודקים את מנגנוני ה-APIC וה-MSI-X של המעבד.'
  },
  {
    id: 'c_boot_flow',
    term: 'Boot Flow',
    lessonId: 'l10',
    category: 'ארכיטקטורה',
    definition: 'רצף השלבים שהמערכת עוברת מהרגע שהחשמל נדלק ועד שמערכת ההפעלה עולה במלואה.',
    definitionHighLevel: 'The structured hardware reset evaluation and initialization sequence leading to operating system boot.',
    context: 'הבנת ה-Boot Flow היא קריטית לביצוע דיאגנוסטיקה ראשונית של בעיות SUT במעבדה.'
  },
  {
    id: 'c_firmware',
    term: 'Firmware',
    lessonId: 'l10',
    category: 'ארכיטקטורה',
    definition: 'קוד התוכנה הבסיסי ביותר המוטמע בתוך רכיבי חומרה ומאפשר להם לפעול (כמו BIOS או CSME).',
    definitionHighLevel: 'Low-level device software stored in non-volatile flash memory managing physical component configurations.',
    context: 'ולידציה בודקת שהקושחות השונות מתקשרות נכון מול המעבד.'
  },
  {
    id: 'c_ucode',
    term: 'Microcode',
    lessonId: 'l10',
    category: 'ארכיטקטורה',
    definition: 'קוד פנימי בתוך המעבד המתרגם את פקודות ה-x86 המורכבות לרצף פעולות חומרה פשוטות.',
    definitionHighLevel: 'Internal processor sequencer micro-operations decoding macro-instructions inside execution cores.',
    context: 'שימוש בעדכוני מיקרוקוד לביצוע תיקוני חומרה מהירים במעבדה ללא החלפת השבב.'
  },
  {
    id: 'c_intel_vtx',
    term: 'Intel VT-x',
    lessonId: 'l10',
    category: 'ארכיטקטורה',
    definition: 'טכנולוגיית הוירטואליזציה של אינטל המאפשרת להריץ מספר מערכות הפעלה מבודדות במקביל על אותו מעבד.',
    definitionHighLevel: 'Hardware-assisted virtualization technology introducing VMX transitions and nested paging controls.',
    context: 'ולידציה של רגיסטרי ה-VMCS ופקודות ה-VMX בראיונות עבודה ובדיקות מעבדה.'
  },

  // 12. סקריפטים ושפות (Interview Tools)
  {
    id: 'c_python',
    term: 'Python',
    lessonId: 'l10',
    category: 'אוטומציה',
    definition: 'שפת התכנות הנפוצה ביותר בכתיבת סקריפטים של אוטומציה ודיבאג חומרה באינטל (ספריית PythonSV).',
    definitionHighLevel: 'The primary scripting language utilized in post-silicon validation for test execution, register parsing, and JTAG debugger control.',
    context: 'שימוש יומיומי ב-PythonSV כדי לתשאל רגיסטרים ולקרוא קבצי קריסה.'
  },
  {
    id: 'c_cpp',
    term: 'C/C++',
    lessonId: 'l10',
    category: 'אוטומציה',
    definition: 'שפות פיתוח המשמשות לכתיבת קוד ה-BIOS והקושחות הפנימיות הרצות במעבדים.',
    definitionHighLevel: 'Low-level language stack for BIOS driver structures, microcode development and bare-metal performance test suites.',
    context: 'קריאה וכתיבה של קודי BIOS בשלבי פיתוח מוקדמים.'
  },
  {
    id: 'c_assembly',
    term: 'Assembly (x86)',
    lessonId: 'l10',
    category: 'אוטומציה',
    definition: 'שפת המכונה הבסיסית ביותר של המעבד, המשמשת לכתיבת קטעי קוד קריטיים בזמן הדלקה ראשונית ובדיקות לוגיות של הליבות.',
    definitionHighLevel: 'x86 assembly language targeting direct machine instructions execution on CPU pipelines bypassing high-level compilers.',
    context: 'כתיבת פטרנים של בדיקות לוגיות ממוקדות ב-x86 Assembly.'
  }
];

export const initialLabErrors: LabError[] = [
  {
    name: 'CATERR (Catastrophic Error)',
    code: '0x00000001',
    description: 'כשל חומרה חמור ביותר הגורם למעבד לעצור את כל הפעילות באופן מיידי כדי למנוע השחתת נתונים.',
    standardExplanation: 'אות חומרה פיזי בלוח האם המציין שהמעבד נתקל בשגיאה שאינו יכול להתאושש ממנה בכוחות עצמו. המערכת בדרך כלל קופאת לחלוטין ודורשת כיבוי והדלקה מחדש.',
    highLevelExplanation: 'אות פעיל-נמוך (Active-low signal) המופעל על ידי ה-System Agent כאשר מתרחש כשל לוגי בלתי הפיך, כגון שגיאת פרוטוקול פנימית (IDI protocol violation), כשל ב-Ring Bus או שגיאת זיכרון בלתי ניתנת לתיקון (Uncorrectable ECC Error).',
    symptoms: [
      'המערכת קופאת לחלוטין (Freeze).',
      'נורת ה-CATERR בלוח ה-StarGate נדלקת בצבע אדום.',
      'חיבור הטרמינל מפסיק להגיב ואין פלט חדש.'
    ],
    debugFlow: [
      'התחבר למערכת באמצעות כלי דיבאג (JTAG / DCI).',
      'קרא את רגיסטרי ה-Machine Check (MC Bank Registers) כדי לזהות את הבנק שרשם את השגיאה.',
      'בדוק אם התרחשה שגיאת ECC בזיכרון המטמון או פקודת קריאה/כתיבה שלא קיבלה מענה (Timeout).',
      'בצע הצלבה (Cross-test) WITH מעבד אחר כדי לשלול כשל פיזי בשבב הנוכחי.'
    ]
  },
  {
    name: 'MRC Memory Training Failure (DDR training error)',
    code: 'POST Code 0x55 / 0xB7',
    description: 'כשל בשלב זיהוי וכיול זיכרון ה-DDR בזמן ה-BIOS.',
    standardExplanation: 'ה-BIOS אינו מצליח לתקשר עם זיכרון ה-RAM בצורה יציבה, והבוט נעצר לפני טעינת מערכת ההפעלה.',
    highLevelExplanation: 'ה-Memory Reference Code (MRC) נכשל באחד משלבי הכיול (כגון Rx/Tx Centering, Write Leveling או Vref calibration). האותות החוזרים מהזיכרון אינם עומדים במפרט ה-Eyes (דיאגרמת עין) הנדרש ליציבות חשמלית.',
    symptoms: [
      'הבוט נתקע בשלב מוקדם מאוד.',
      'כרטיס ה-POST מציג קוד 55 או B7 קבוע.',
      'המערכת נכנסת ללולאת אתחול אינסופית (Boot Loop).'
    ],
    debugFlow: [
      'נקה את הגדרות ה-BIOS על ידי Clear CMOS.',
      'בדוק את מתחי זיכרון ה-RAM (VDD, VDDQ, VPP) על הלוח בעזרת מולטימטר.',
      'הפחת את מהירות הזיכרון ב-BIOS באופן ידני ובדוק אם המערכת עולה.',
      'החלף את כרטיסי ה-RAM או נקה את מגעי ה-DIMM עם ספריי מגעים.'
    ]
  },
  {
    name: 'PCIe Link Training Timeout (Link Drop / Recovery Loop)',
    code: '0x000000D3',
    description: 'ערוץ ה-PCI Express אינו מצליח להגיע למהירות הנדרשת או מתנתק באופן אקראי.',
    standardExplanation: 'כרטיס המסך או כונן ה-SSD המחוברים למעבד דרך ממשק ה-PCIe אינם מזוהים או יורדים למהירות איטית מאוד עקב בעיות תקשורת.',
    highLevelExplanation: 'בקר ה-PCIe (PHY) של המעבד נכנס למצב Recovery בלולאת ה-LTSSM (Link Training and Status State Machine) ואינו מצליח לייצב את הקישור במהירות Gen 4 או Gen 5 עקב רעש חשמלי או בעיות תזמון.',
    symptoms: [
      'התקן ה-PCIe אינו מזוהה במערכת ההפעלה.',
      'שגיאות Bit Error Rate (BER) גבוהות בלוגים של ה-PCIe.',
      'ירידה פתאומית בביצועי הכתיבה/קריאה של כונן ה-SSD.'
    ],
    debugFlow: [
      'בדוק את הגדרות ה-ASPM ב-BIOS ונסה לבטל אותן (Disable L0s/L1).',
      'השתמש בכרטיס Pass Splitter כדי לנטר את קווי הקישור בעזרת PCIe Protocol Analyzer.',
      'בצע Margining חשמלי לקווי ה-PCIe כדי לבדוק את רוחב העין (Eye width) והגובה של האות.',
      'ודא שאין בעיות של שלמות אות (Signal integrity) עקב מגעים רופפים או לכלוך בתושבת.'
    ]
  },
  {
    name: 'PUNIT Voltage Droop Hang (Vdroop)',
    code: '0x0000002F',
    description: 'נפילת מתח רגעית במעבד הגורמת לקריסה לוגית או קיפאון של אחת הליבות.',
    standardExplanation: 'כאשר המעבד מתחיל לעבוד קשה בפתאומיות, ספק הכוח אינו מספיק להעלות את המתח בזמן, והמעבד קופא עקב חוסר בחשמל.',
    highLevelExplanation: 'נפילה מהירה במתח העבודה (Vcc) המתרחשת בעת מעבר חד של צריכת זרם (di/dt transient). ה-PUNIT וקושחת ה-P-code אינם מספיקים להגיב דרך קווי ה-SVID, מה שגורם לנפילת מתח מתחת ל-Vmin של הטרנזיסטורים.',
    symptoms: [
      'קריסה (Hang/Crash) המתרחשת בדיוק ברגע תחילת בדיקת מאמץ.',
      'הופעת שגיאות Machine Check מסוג "Internal Timer Timeout" (בנק MC4 או MC5).',
      'חוסר יציבות בעבודה בתדרי טורבו גבוהים.'
    ],
    debugFlow: [
      'השתמש באוסילוסקופ מהיר עם פרובים אקטיביים כדי למדוד את המתח בנקות הקרובות ביותר למעבד (Vcc sensing points).',
      'שנה את הגדרות ה-Loadline Calibration (LLC) ב-BIOS כדי לפצות על נפילות המתח.',
      'עדכן את קובץ ה-P-code לגרסה המכילה אלגוריתמי פיצוי מתח משופרים.',
      'בדוק את קבצי הגדרות ה-Margining החשמליות ב-SUT.'
    ]
  }
];
