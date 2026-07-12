import type { Lesson, Concept, LabError } from '../types/validationData';

export const initialLessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Introduction to Silicon Validation & PLC',
    titleHe: 'מבוא לוולידציה של סיליקון ומחזור חיי מוצר',
    description: 'הבנת היסודות של בדיקת מעבדים פיזיים לאחר שלב הייצור, ההבדל בין סימולציה לוולידציה, ומחזור החיים של השבב.',
    whyItIsHere: 'שיעור זה נמצא בראש המבנה מכיוון שהוא מניח את היסודות המושגיים. לפני שצוללים לחומרה ולסיגנלים, חובה להבין מהי וולידציה (Post-Silicon), מתי היא מתבצעת ומהו המוצר הנבדק.',
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
    conceptIds: ['c_cpu', 'c_post_silicon', 'c_sut', 'c_bkc', 'c_plc', 'c_to', 'c_stepping', 'c_qual', 'c_es_qs', 'c_prq'],
    quizQuestions: [
      {
        id: 'q1_1',
        question: 'מהו ההבדל העקרוני בין Pre-Silicon ל-Post-Silicon Validation?',
        options: [
          'אין הבדל, שני המושגים מתארים בדיקות תוכנה בלבד.',
          'Pre-Silicon מתבצע על מודלים ממוחשבים וסימולציות לפני ייצור השבב, בעוד ש-Post-Silicon מתבצע על שבבים פיזיים אמיתיים במעבדה.',
          'Pre-Silicon מתבצע במעבדה ו-Post-Silicon מתבצע בייצור המוני.',
          'Pre-Silicon מיועד לבדיקות מתח בלבד ו-Post-Silicon לבדיקות מהירות.'
        ],
        correctIndex: 1,
        explanation: 'בדיקות Pre-Silicon מבוצעות על גבי סימולטורים לפני שיש שבב פיזי, כדי למצוא שגיאות תכנון מוקדמות. בדיקות Post-Silicon מבוצעות על חומרה אמיתית (סיליקון) המגיעה מהמפעל.'
      },
      {
        id: 'q1_2',
        question: 'מהי המשמעות של BKC (Best Known Configuration) בתהליך הולידציה?',
        options: [
          'הגרסה המהירה ביותר של המעבד.',
          'הגדרה מקסימלית של מהירות השעון.',
          'שילוב של גרסאות חומרה, קושחה (BIOS/Microcode), מערכת הפעלה ודרייברים שנמצאו כיציבים ביותר ומשמשים כבסיס השוואה לבדיקות.',
          'מפרט הבדיקה שנכתב על ידי הלקוח.'
        ],
        correctIndex: 2,
        explanation: 'BKC היא תצורת הבסיס המוכרת ביותר כיציבה. כל מהנדסי הולידציה משתמשים בה כדי לבודד תקלות - אם בדיקה נכשלת ב-BKC, זו בעיית מוצר אמיתית ולא בעיה של תצורת סביבה לא יציבה.'
      }
    ]
  },
  {
    id: 'l2',
    title: 'System Architecture & Interconnects',
    titleHe: 'ארכיטקטורת מערכת וממשקי קישוריות',
    description: 'לימוד המרכיבים הפיזיים של מערכת המחשב, בקרי המערכת, ערוצי התקשורת הפנימיים (Ring Bus) וממשקי הקישוריות המהירים.',
    whyItIsHere: 'שיעור זה נמצא במקום השני מכיוון שלאחר שהבנו את המושגים הכלליים של הולידציה, עלינו להכיר את המערכת הפיזית שאנו בודקים (ה-SUT) ואת הארכיטקטורה הפנימית שלה, כגון איך רכיבי המעבד מתקשרים ביניהם (Ring Bus) ואיך הוא מתחבר לעולם החיצון (PCIe, M.2).',
    prerequisites: ['l1'],
    videoUrl: 'https://www.youtube.com/embed/rVplV1uFmX0',
    diagram: {
      title: 'ארכיטקטורת תקשורת פנימית וחיצונית במעבד',
      nodes: [
        { id: 'n1', label: 'CPU Cores / LLC (ליבות זיכרון מטמון)', type: 'input' },
        { id: 'n2', label: 'Ring Bus (אפיק תקשורת טבעתי פנימי)', type: 'process' },
        { id: 'n3', label: 'System Agent / Controller (בקר מערכת)', type: 'process' },
        { id: 'n4', label: 'PCI Express Link / M.2', type: 'output' },
        { id: 'n5', label: 'System Element / Chip (צ\'יפסט / רכיבי לוח)', type: 'output' }
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n3', to: 'n5' }
      ]
    },
    conceptIds: ['c_sys_controller', 'c_sys_element', 'c_ring_bus', 'c_subsystem', 'c_chip', 'c_pcie', 'c_m2', 'c_pca', 'c_upi', 'c_uncore_core', 'c_llc'],
    quizQuestions: [
      {
        id: 'q2_1',
        question: 'מה תפקידו של ה-Ring Bus בארכיטקטורת מעבדי אינטל?',
        options: [
          'לחבר את ספק הכוח ללוח האם.',
          'לחבר בין ליבות המעבד, זיכרון המטמון המשותף (LLC), מנוע הגרפיקה וה-System Agent לצורך העברת נתונים מהירה בשהייה נמוכה.',
          'לשלוט על מהירות מאווררי הקירור.',
          'לנהל את כתובות ה-IP ברשת המעבדה.'
        ],
        correctIndex: 1,
        explanation: 'ה-Ring Bus הוא אפיק טבעתי מהיר במיוחד על גבי הפיסה המאפשר תקשורת ישירה, מהירה וברוחב פס גבוה בין הליבות השונות לבין יתר רכיבי ה-System Agent וה-Uncore.'
      },
      {
        id: 'q2_2',
        question: 'כיצד מוגדר System Element בהקשר של אינטגרציית לוח הבדיקה?',
        options: [
          'כל רכיב תוכנה המותקן על ה-SUT.',
          'כל רכיב חומרה פונקציונלי בלוח (כגון בקר מתח, שעון, או שבב ה-PCH) המהווה חלק ממערך הבדיקה הכולל.',
          'מעבד הבדיקה בלבד.',
          'כרטיס רשת חיצוני.'
        ],
        correctIndex: 1,
        explanation: 'מערכת הולידציה מורכבת מ-SUT הכולל מגוון System Elements - שבבים, גשרים ובקרי לוח משלימים העובדים יחד תחת תצורת בדיקה מוגדרת.'
      }
    ]
  },
  {
    id: 'l3',
    title: 'Boot Flow & Platform Initialization',
    titleHe: 'תהליך האתחול ואינטגרציית הפלטפורמה',
    description: 'לימוד סדר האתחול של המחשב מהרגע שהמתח עולה, דרך בדיקות ה-POST של ה-BIOS, אימון הזיכרון (MRC) ותפקיד רכיבי החומרה הפיזיים.',
    whyItIsHere: 'שיעור זה ממוקם שלישי מכיוון שלאחר הכרת הארכיטקטורה הפנימית, עלינו להבין כיצד המערכת קמה לחיים. תהליכי אתחול, הגדרות BIOS, ואימון הזיכרון (MRC) קריטיים להבנת השלבים שבהם הולידציה יכולה להיכשל לפני שהגענו בכלל למערכת ההפעלה.',
    prerequisites: ['l2'],
    videoUrl: 'https://www.youtube.com/embed/5a2gTdiGgK4',
    diagram: {
      title: 'שלבי תהליך אתחול הפלטפורמה (Boot Flow)',
      nodes: [
        { id: 'n1', label: 'Power-On / Reset (עליית מתח)', type: 'input' },
        { id: 'n2', label: 'Straps & Fuses evaluation (קריאת הגדרות פיזיות)', type: 'process' },
        { id: 'n3', label: 'POST / BIOS Execution (הרצת קוד אתחול)', type: 'process' },
        { id: 'n4', label: 'MRC (Memory Reference Code - אימון הזיכרון)', type: 'decision' },
        { id: 'n5', label: 'OS Load / Boot Completed (טעינת מערכת הפעלה)', type: 'output' }
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n4', to: 'n5' }
      ]
    },
    conceptIds: ['c_bios', 'c_boot', 'c_setup_flow', 'c_default_flow', 'c_post', 'c_mrc', 'c_straps', 'c_fuse', 'c_cmos', 'c_reset_vector', 'c_port80', 'c_bootloop'],
    quizQuestions: [
      {
        id: 'q3_1',
        question: 'מהו תפקידו העיקרי של ה-MRC (Memory Reference Code) ב-BIOS?',
        options: [
          'למחוק את נתוני הדיסק הקשיח.',
          'לאמן, לכייל ולאתחל את ערוצי זיכרון ה-DDR מול בקר הזיכרון במעבד כדי לאפשר תקשורת יציבה ואמינה.',
          'לרשום את זמני פעילות המעבד.',
          'לשנות את ערכי הרגיסטרים של כרטיס המסך.'
        ],
        correctIndex: 1,
        explanation: 'ה-MRC הוא קוד קריטי ב-BIOS שמבצע "אימון זיכרון". הוא סורק ומכייל מתחים וזמנים עבור קווי התקשורת של זיכרון ה-DDR כדי להבטיח קריאה וכתיבה תקינים.'
      },
      {
        id: 'q3_2',
        question: 'מה ההבדל בין Straps ל-Fuse במעבד?',
        options: [
          'אין הבדל, שניהם מוגדרים בתוכנה בלבד.',
          'Straps הם פינים פיזיים או נגדים בלוח האם שקובעים תצורות חומרה בזמן עליית המתח, בעוד ש-Fuse הוא רכיב זיכרון פנימי חד-פעמי שנצרב פיזית במפעל לייעוד תכונות השבב.',
          'Straps הם רכיבי תוכנה ו-Fuse הם רכיבי מתח.',
          'Straps מיועדים למערכת ההפעלה בלבד.'
        ],
        correctIndex: 1,
        explanation: 'Straps נקראים על ידי המעבד בזמן ה-Reset, בעוד פיוזים (Fuses) הם צריבות סיליקון פנימיות וקבועות המגדירות את זהות המעבד, מספר הליבות הפעילות, תדרי המקסימום ועוד.'
      }
    ]
  },
  {
    id: 'l4',
    title: 'Microcode & Firmware Execution',
    titleHe: 'מיקרוקוד והרצת קושחה פנימית',
    description: 'הבנת הקוד הפנימי ביותר הרץ במעבד (Microcode), הדרך בה המעבד מתרגם פקודות מורכבות לקוד פנימי, וכיצד מבוצעים תיקוני באגים בשטח.',
    whyItIsHere: 'ממוקם רביעי מכיוון שמיקרוקוד (U-code) וקושחת בקר המתחים (P-code) מופעלים ונטענים בשלבים מוקדמים מאוד של עליית המעבד. הבנת מנגנונים אלו חיונית לפני שנוכל לחקור מערכות לניהול אנרגיה ומתחים (Power Management) בשיעור הבא.',
    prerequisites: ['l3'],
    videoUrl: 'https://www.youtube.com/embed/zH04a434Bbg',
    diagram: {
      title: 'תרגום והרצת פקודות דרך Microcode',
      nodes: [
        { id: 'n1', label: 'x86 Instruction (X86 פקודת)', type: 'input' },
        { id: 'n2', label: 'Decoder (מפענח חומרה)', type: 'process' },
        { id: 'n3', label: 'Microcode Path (נתיב המיקרוקוד)', type: 'decision' },
        { id: 'n4', label: 'Execution Units (יחידות ביצוע פיזיות)', type: 'output' }
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' }
      ]
    },
    conceptIds: ['c_ucode', 'c_pcode', 'c_ucode_path', 'c_ucode_acode', 'c_turnpart', 'c_ct', 'c_csme', 'c_fit'],
    quizQuestions: [
      {
        id: 'q4_1',
        question: 'מהי המטרה של טעינת עדכוני מיקרוקוד (U-code updates) במעבד?',
        options: [
          'להאיץ את מהירות מאוורר המעבד.',
          'לתקן באגים של לוגיקת החומרה, פרצות אבטחה או התנהגויות שגויות של סיליקון ללא צורך בהחלפה פיזית של השבב.',
          'להוסיף זיכרון RAM למחשב באופן וירטואלי.',
          'לשנות את גרסת מערכת ההפעלה.'
        ],
        correctIndex: 1,
        explanation: 'עדכוני מיקרוקוד מאפשרים לטעון תיקוני חומרה אל תוך זיכרון ה-SRAM הייעודי של המעבד בזמן הבוט. זה מונע את הצורך בייצור מחדש של שבב מתוקן (חדש).'
      },
      {
        id: 'q4_2',
        question: 'מהו ה-P-code בהקשר של מעבדי אינטל?',
        options: [
          'הקוד של מעבד הגרפיקה.',
          'קוד קושחה ייעודי הרץ בתוך ה-PUNIT (בקר הכוח) ואחראי על ניהול האלגוריתמים של תדרים, מתחים וניהול תרמי (Power Management).',
          'קוד האבטחה של ה-BIOS.',
          'קוד התקשורת של ממשק ה-PCIe.'
        ],
        correctIndex: 1,
        explanation: 'ה-P-code הוא הקושחה שמנהלת את ה-Power Control Unit (PCU) או ה-PUNIT. הוא מנתח נתוני טמפרטורה וצריכת זרם ומחליט על תדרי טורבו ורמות מתח.'
      }
    ]
  },
  {
    id: 'l5',
    title: 'Power Management & Reset Flows',
    titleHe: 'ניהול צריכת חשמל ומנגנוני אתחול (Reset)',
    description: 'לימוד בקר ניהול האנרגיה (PUNIT), שלבי המעבר בין מצבי צריכת חשמל שונים, ואותות ה-Reset השונים במערכת.',
    whyItIsHere: 'שיעור זה ממוקם חמישי מכיוון שניהול אנרגיה (Power Management) הוא אחד התחומים המורכבים ביותר בוולידציה. הוא משלב חומרה, קוד P-code, וקוד BIOS, ומסתמך על תהליך האתחול היציב שנלמד בשיעור 3.',
    prerequisites: ['l3', 'l4'],
    videoUrl: 'https://www.youtube.com/embed/p1o1S74z5U8',
    diagram: {
      title: 'תהליך מעבר מצב כוח וניהול Reset',
      nodes: [
        { id: 'n1', label: 'PMC (בקר ניהול כוח בפלטפורמה)', type: 'input' },
        { id: 'n2', label: 'PUNIT (בקר כוח במעבד)', type: 'process' },
        { id: 'n3', label: 'PMRESET (אות איפוס כוח)', type: 'decision' },
        { id: 'n4', label: 'Warm Reset (אתחול חם)', type: 'output' },
        { id: 'n5', label: 'SST / SITS / Battery Charge', type: 'output' }
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n3', to: 'n5' }
      ]
    },
    conceptIds: ['c_power_mgmt', 'c_punit', 'c_pmc', 'c_pmreset', 'c_warm_reset', 'c_pim', 'c_bat_charge', 'c_l', 'c_pr', 'c_sst', 'c_sits', 'c_cstates', 'c_pstates', 'c_sstates'],
    quizQuestions: [
      {
        id: 'q5_1',
        question: 'מה תפקידו של ה-PMC (Power Management Controller)?',
        options: [
          'לשלוט על מהירות התקשורת ב-PCIe.',
          'בקר חיצוני למעבד (בדרך כלל בצ\'יפסט) שמנהל את מצבי הכוח של כלל הפלטפורמה (S-states כמו שינה, כיבוי והפעלה) ומתאם אותם מול המעבד.',
          'לספק כוח ישירות לליבות המעבד.',
          'לטעון את ה-BIOS מזיכרון ה-Flash.'
        ],
        correctIndex: 1,
        explanation: 'ה-PMC אחראי על ניהול רמות האנרגיה ברמת הפלטפורמה כולה (מצבי ACPI S-states), והוא מתקשר עם ה-PUNIT של המעבד.'
      },
      {
        id: 'q5_2',
        question: 'מהו Warm Reset (אתחול חם) ובמה הוא שונה מ-Cold Reset?',
        options: [
          'Warm Reset מתבצע רק כאשר המעבד מתחמם יותר מדי.',
          'Warm Reset מאפס את הלוגיקה הפנימית של המעבד ללא ניתוק פיזי של קווי המתח של הלוח, ובכך חוסך זמן אתחול מחדש בהשוואה ל-Cold Reset.',
          'אין הבדל, שניהם מנתקים לחלוטין את החשמל מהספק.',
          'Warm Reset מתבצע רק על ידי מערכת ההפעלה ואינו משפיע על החומרה.'
        ],
        correctIndex: 1,
        explanation: 'במהלך Warm Reset המתחים ללוח ולזיכרון נשארים יציבים ופעילים, ורק קווי ה-Reset הפנימיים מופעלים. ב-Cold Reset כלל ספקי הכוח מנותקים ומופעלים מחדש.'
      }
    ]
  },
  {
    id: 'l6',
    title: 'Silicon Validation Environments & OS',
    titleHe: 'סביבות ולידציה ומערכות הפעלה ייעודיות',
    description: 'הכרת סביבות הבדיקה במעבדה, שימוש במערכת ההפעלה הייעודית SVOS, חיבור מסופים (Terminal) ושימוש בכלי דיבאג מתקדמים.',
    whyItIsHere: 'לאחר הבנת כלל מנגנוני הסיליקון והחומרה, שיעור זה מציג את כלי העבודה המעשיים שבהם משתמשים מהנדסי הולידציה במעבדה כדי להריץ בדיקות, לגשת לרגיסטרים ולתפעל את המערכות.',
    prerequisites: ['l1', 'l2', 'l3'],
    videoUrl: 'https://www.youtube.com/embed/378X1P5_zJg',
    diagram: {
      title: 'מבנה סביבת הבדיקות והאינטגרציה במעבדת הולידציה',
      nodes: [
        { id: 'n1', label: 'Host System / GUI Controller (מחשב מארח)', type: 'input' },
        { id: 'n2', label: 'StarGate Board (לוח מארח / עמדת בדיקה)', type: 'process' },
        { id: 'n3', label: 'SUT (System Under Test / מעבד נבדק)', type: 'decision' },
        { id: 'n4', label: 'SVOS / Terminal (מערכת הפעלה ייעודית לבדיקות)', type: 'process' },
        { id: 'n5', label: 'TKA / PVA / Pass Splitter (כלי דיבאג ומדידה)', type: 'output' }
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n3', to: 'n5' }
      ]
    },
    conceptIds: ['c_stargate', 'c_svos', 'c_pud', 'c_terminal', 'c_to_env', 'c_mode_work', 'c_gui', 'c_config_mgmt', 'c_mtbf', 'c_pass_splitter', 'c_pva', 'c_dci_jtag', 'c_itp'],
    quizQuestions: [
      {
        id: 'q6_1',
        question: 'מהי מערכת ההפעלה SVOS (Silicon Validation Operating System) ומה יתרונה?',
        options: [
          'זוהי מערכת הפעלה גרפית של מיקרוסופט המיועדת למשחקים.',
          'זוהי הפצה מבוססת לינוקס קלת-משקל וקניינית של אינטל, המכילה דרייברים מיוחדים לגישה ישירה לרגיסטרי המעבד (MSRs, PCIe Config) לצורך ביצוע בדיקות מאמץ ודיבאג חומרה ישיר.',
          'תוכנת הדמיה של מעבדים.',
          'מערכת המותקנת בתוך ה-BIOS.'
        ],
        correctIndex: 1,
        explanation: 'SVOS היא מערכת הפעלה ייחודית של אינטל לביצוע בדיקות Post-Silicon. היא מספקת גישה ישירה לחומרה ומאפשרת להפעיל תוכניות בדיקה ייעודיות ללא מגבלות.'
      },
      {
        id: 'q6_2',
        question: 'למה משמש ה-Pass Splitter במעבדת הולידציה?',
        options: [
          'לפיצול זרם החשמל הראשי של המעבדה.',
          'חומרה/תוכנה המפצלת ומנתבת אותות דיבאג מורכבים או בדיקות מקביליות בין ערוצים שונים בלוח הבדיקה.',
          'לחיבור מסכים מרובים.',
          'לאיחוד קבצי קוד.'
        ],
        correctIndex: 1,
        explanation: 'ה-Pass Splitter משמש לניתוב וחלוקה של אותות בדיקה, ומאפשר לנתח תקשורת בין רכיבים במקביל.'
      }
    ]
  },
  {
    id: 'l7',
    title: 'Troubleshooting & Lab Diagnostics',
    titleHe: 'פתרון תקלות (Troubleshooting) ואבחון במעבדה',
    description: 'פיתוח יכולות של זיהוי שגיאות מעבדה מורכבות (כמו CATERR או Machine Check Exception), הבנת בדיקות מאמץ (Burn-in) ודיבאג זיכרון.',
    whyItIsHere: 'שיעור מסכם זה לוקח את כל הידע שנצבר לאורך הקורס ומכשיר את המהנדס להתמודד עם מצבים של כשלים פיזיים במעבדה, ניתוח קודי שגיאה ושימוש במתודולוגיות דיבאג מתקדמות.',
    prerequisites: ['l5', 'l6'],
    videoUrl: 'https://www.youtube.com/embed/n4pneM0_Rk8',
    diagram: {
      title: 'תהליך אבחון תקלה ודיבאג במעבדת הולידציה',
      nodes: [
        { id: 'n1', label: 'System Fail / Crash (כשל במערכת / מסך שחור / CATERR)', type: 'input' },
        { id: 'n2', label: 'Verify BKC (וידוא הגדרות BKC וחומרה)', type: 'process' },
        { id: 'n3', label: 'Read MSRs / Crash log (קריאת רגיסטרי שגיאה)', type: 'decision' },
        { id: 'n4', label: 'Hardware Debug (החלפת חלקים / בדיקת מתחים)', type: 'process' },
        { id: 'n5', label: 'Root Cause Identified (מציאת מקור התקלה)', type: 'output' }
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n4', to: 'n5' }
      ]
    },
    conceptIds: ['c_trouble', 'c_burn_in', 'c_pd', 'c_debuggable', 'c_mem_element', 'c_caterr_code', 'c_ierr_code', 'c_mce_code', 'c_hang_code', 'c_thermal_throttling'],
    quizQuestions: [
      {
        id: 'q7_1',
        question: 'מה פירוש המושג CATERR (Catastrophic Error Signal)?',
        options: [
          'הודעת שגיאה על אי-חיבור כבל הרשת.',
          'אות פיזי במעבד המציין כי התרחש כשל חומרה קטסטרופלי ובלתי הפיך (כגון שגיאת פרוטוקול פנימית או קריסה של ה-Ring Bus), הגורם לעצירה מיידית של פעולת המעבד.',
          'שגיאה הניתנת לתיקון אוטומטי על ידי ה-BIOS.',
          'מצב שבו מאוורר הקירור מפסיק לעבוד.'
        ],
        correctIndex: 1,
        explanation: 'CATERR הוא אינדיקציית החומרה החמורה ביותר של המעבד. כאשר הוא מופעל, המעבד נעצר מיד כדי למנוע השחתת נתונים, והמעבדה צריכה לקרוא את רגיסטרי השגיאות.'
      },
      {
        id: 'q7_2',
        question: 'מה מטרת תהליך ה-Burn-in במעבדה?',
        options: [
          'לצרוב קושחה חדשה על המעבד.',
          'להפעיל את המעבד בטמפרטורות גבוהות ובמתח מוגבר לאורך זמן כדי לזהות כשלי ייצור מוקדמים ולוודא אמינות לאורך זמן.',
          'לנקות את הלוח מאבק.',
          'לבדוק את תקינות חיבורי ה-HDMI.'
        ],
        correctIndex: 1,
        explanation: 'בדיקות מאמץ בטמפרטורה ומתח גבוהים (Burn-in) נועדו לדמות הזדקנות מואצת של הסיליקון במטרה לאתר בעיות יציבות ופגמי ייצור מוסתרים.'
      }
    ]
  },
  {
    id: 'l8',
    title: 'Signal Integrity & Oscilloscope Analysis',
    titleHe: 'שלמות אות (Signal Integrity) ואבחון באוסילוסקופ',
    description: 'לימוד תחום ה-Electrical Validation (EV), ביצוע Margining של מתחים ותדרים, וניתוח איכות הסיגנל החשמלי במעבדה.',
    whyItIsHere: 'לאחר שהבנו את בעיות הלוגיקה והתוכנה, שיעור זה מציג את עולם הולידציה החשמלית (EV). הבנת שלמות אותות, רעשי קווי תקשורת ודיאגרמות עין (Eye Diagrams) חיונית לפתרון באגים פיזיקליים מורכבים במעבדות אינטל.',
    prerequisites: ['l2', 'l7'],
    videoUrl: 'https://www.youtube.com/embed/n4pneM0_Rk8',
    diagram: {
      title: 'תהליך ניתוח איכות סיגנל חשמלי במעבדה',
      nodes: [
        { id: 'n1', label: 'Signal Probe Placement (מיקום פרוב המדידה)', type: 'input' },
        { id: 'n2', label: 'Eye Diagram Generation (יצירת דיאגרמת עין)', type: 'process' },
        { id: 'n3', label: 'Measure Jitter & Cross-talk (מדידת רעש ותזמון)', type: 'decision' },
        { id: 'n4', label: 'Adjust Tx Equalization (כיוונון מקור האות)', type: 'process' },
        { id: 'n5', label: 'Signal Integrity Validated (שלמות אות מאושרת)', type: 'output' }
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n4', to: 'n5' }
      ]
    },
    conceptIds: ['c_ev', 'c_margining', 'c_jitter', 'c_crosstalk', 'c_eye_diagram', 'c_isi', 'c_impedance', 'c_probe_loading', 'c_reflection'],
    quizQuestions: [
      {
        id: 'q8_1',
        question: 'מה מייצגת "דיאגרמת עין" (Eye Diagram) בוולידציה חשמלית?',
        options: [
          'תרשים המציג את תפקוד המעבד תחת עיני מצלמה תרמית.',
          'הצגה חזותית מרובדת של אותות דיגיטליים מהירים המציגה את מרווח הרעש (גובה העין) ומרווח התזמון (רוחב העין) של קווי התקשורת.',
          'תרשים זרימת קוד ה-BIOS.',
          'מערכת לכיול מהירות הדיסק הקשיח.'
        ],
        correctIndex: 1,
        explanation: 'דיאגרמת עין נוצרת על ידי שילוב של אלפי מחזורי אות על גבי מסך אוסילוסקופ מהיר. היא מאפשרת להעריך במבט אחד את יציבות האות ורמות הרעש.'
      },
      {
        id: 'q8_2',
        question: 'מהו Jitter בהקשר של שלמות אותות?',
        options: [
          'תדר השעון המקסימלי של המעבד.',
          'סטייה קצרת טווח ולא רצויה של האות החשמלי מזמני האתחול והמעבר האידיאליים שלו.',
          'הפרש המתחים בין סוללת ה-CMOS ללוח.',
          'מנגנון הגנה מפני חום יתר.'
        ],
        correctIndex: 1,
        explanation: 'Jitter הוא רעש תזמון בציר הזמן (Phase Noise). הוא גורם למעברים של הביטים להתרחש מוקדם או מאוחר מדי, מה שעלול לגרום לשגיאות בקריאת הנתונים.'
      }
    ]
  },
  {
    id: 'l9',
    title: 'Workloads, Stress Testing & Functional Coverage',
    titleHe: 'עומסי עבודה (Workloads), בדיקות מאמץ וכיסוי פונקציונלי',
    description: 'לימוד שיטות ה-Functional Validation (FV), הרצת עומסי עבודה מיוחדים, ומדידת אחוזי הכיסוי הלוגי של הבדיקות.',
    whyItIsHere: 'במקום התשיעי מכיוון שלאחר שהבטחנו שכל הפינים החשמליים יציבים (שיעור 8), אנו עוברים לוולידציה פונקציונלית מלאה (FV). אנו רוצים להפעיל את המעבד בלוגיקה המורכבת ביותר שלו, לאתר באגים בצינורות העיבוד ולהבטיח שכל תכונות הסיליקון נבדקו.',
    prerequisites: ['l1', 'l7', 'l8'],
    videoUrl: 'https://www.youtube.com/embed/378X1P5_zJg',
    diagram: {
      title: 'מחזור הרצת בדיקות פונקציונליות ואיסוף כיסוי',
      nodes: [
        { id: 'n1', label: 'Select Target Workload (בחירת עומס עבודה)', type: 'input' },
        { id: 'n2', label: 'Stress Testing Loop (לולאת בדיקת מאמץ)', type: 'process' },
        { id: 'n3', label: 'Collect Coverage Logs (איסוף נתוני כיסוי)', type: 'process' },
        { id: 'n4', label: 'Identify Corner Cases (איתור מקרי קצה שלא נבדקו)', type: 'decision' },
        { id: 'n5', label: 'Release Regression Pass (אישור הרצת רגרסיה)', type: 'output' }
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n4', to: 'n5' }
      ]
    },
    conceptIds: ['c_fv', 'c_workloads', 'c_stress', 'c_coverage', 'c_assertions', 'c_random_test', 'c_corner_cases', 'c_regressions', 'c_test_suite'],
    quizQuestions: [
      {
        id: 'q9_1',
        question: 'למה משמש ה-Functional Coverage (כיסוי פונקציונלי) בוולידציה?',
        options: [
          'לכיסוי גוף המעבד במפזר חום.',
          'מדד כמותי המראה אילו מצבי מערכת, מעברי רגיסטרים ושילובי פקודות נבדקו בפועל מתוך כל המצבים האפשריים המוגדרים במפרט.',
          'לרישום שעות העבודה של צוות המעבדה.',
          'למדידת אחוזי היעילות של ספק הכוח.'
        ],
        correctIndex: 1,
        explanation: 'כיסוי פונקציונלי מאפשר למהנדסים לדעת אם ישנם תרחישים לוגיים במעבד שעדיין לא נבדקו כלל. ללא מדידת כיסוי, לא ניתן לדעת אם הבדיקות יסודיות מספיק.'
      },
      {
        id: 'q9_2',
        question: 'מה מאפיין בדיקות מאמץ (Stress Testing) פונקציונליות?',
        options: [
          'הרצת תסריטי בדיקה איטיים מאוד בלבד.',
          'יצירת תנאי עומס קיצוניים במקביל (למשל: תעבורת זיכרון כבדה, הרצת קוד מתמטי ומעברי כוח מהירים בו-זמנית) במטרה לאתר באגים לוגיים הנוצרים רק בתרחישים כאלו.',
          'מדידת גובה הלוח במעבדה.',
          'כיבוי ה-SUT לזמן ממושך.'
        ],
        correctIndex: 1,
        explanation: 'בדיקות מאמץ פונקציונליות מנסות "לדחוף" את המעבד לקצה גבול היכולת הלוגי והזמני שלו כדי לעורר באגים שקשורים להתנגשויות משאבים ותקשורת פנימית.'
      }
    ]
  },
  {
    id: 'l10',
    title: 'Triage, NGA & Automation Infrastructure',
    titleHe: 'טריאז\' (Triage), מערכת NGA ואוטומציית בדיקות',
    description: 'לימוד מתודולוגיית סיווג התקלות (Triage), ניתוח לוגים אוטומטי, ושימוש במערכת ה-NGA לניהול הרצות מעבדה בקנה מידה ענק.',
    whyItIsHere: 'בסיום המסלול, אנו מגיעים לשיעור האינטגרציה והאוטומציה הגדול ביותר. מהנדס וולידציה באינטל אינו מריץ רק בדיקות ידניות; עליו לדעת כיצד לנהל אלפי הרצות אוטומטיות ב-NGA, לנתח כשלי לוגים מבוזרים (Triage) ולדווח על Sightings בצורה מקצועית.',
    prerequisites: ['l6', 'l9'],
    videoUrl: 'https://www.youtube.com/embed/rVplV1uFmX0',
    diagram: {
      title: 'מחזור חיים של תקלה במערכת NGA',
      nodes: [
        { id: 'n1', label: 'NGA Run Failure (נפילת בדיקה באוטומציה)', type: 'input' },
        { id: 'n2', label: 'Triage (סיווג ראשוני של לוגים)', type: 'process' },
        { id: 'n3', label: 'Reproduce on BKC (שחזור על גרסה מוכרת)', type: 'decision' },
        { id: 'n4', label: 'File Sighting (פתיחת דיווח באג רשמי)', type: 'process' },
        { id: 'n5', label: 'Fix Verification (אימות ותיקון הבאג)', type: 'output' }
      ],
      edges: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n4', to: 'n5' }
      ]
    },
    conceptIds: ['c_nga', 'c_triage', 'c_fail_rate', 'c_defect', 'c_log_analysis', 'c_automation_script', 'c_runtime', 'c_sighting'],
    quizQuestions: [
      {
        id: 'q10_1',
        question: 'מה תפקידו של ה-Triage (טריאז\') בעבודת מהנדס הוולידציה?',
        options: [
          'לנקות את רכיבי החומרה במעבדה.',
          'תהליך האבחון, המיון והסיווג של כשלי בדיקות במטרה לקבוע אם מדובר בבעיית תוכנה, בעיית חומרת לוח, בעיית הגדרת סביבה או באג אמיתי בסיליקון.',
          'חלוקת המעבדים לפי מהירות ייצור.',
          'טעינת קבצי ה-BIOS מרחוק.'
        ],
        correctIndex: 1,
        explanation: 'טריאז\' הוא תהליך סינון קריטי. מתוך אלפי כישלונות באוטומציה, המהנדס מנתח את הלוגים כדי לבודד את הגורם האמיתי ולשייך את התקלה לצוות הנכון.'
      },
      {
        id: 'q10_2',
        question: 'מהי מערכת NGA (Next Generation Automation) של אינטל?',
        options: [
          'ספריית קוד לגרפיקה.',
          'פלטפורמת אוטומציה מרכזית לניהול, תזמון, הרצה ואיסוף תוצאות של מיליוני בדיקות וולידציה על גבי אלפי לוחות SUT מבוזרים ברחבי המעבדות.',
          'תוכנה לציור תרשימים זורמים.',
          'כלי להתקנת דרייברים על הנייד.'
        ],
        correctIndex: 1,
        explanation: 'NGA היא מערכת האוטומציה המרכזית שמאפשרת לצוותי הולידציה להריץ בדיקות בקנה מידה עצום 24/7 ללא מגע יד אדם, ולרכז את כל תוצאות הבדיקה במאגר נתונים אחד.'
      }
    ]
  }
];

export const initialConcepts: Concept[] = [
  // Lesson 1
  {
    id: 'c_cpu',
    term: 'CPU',
    lessonId: 'l1',
    definition: 'יחידת העיבוד המרכזית (הלב) של המחשב, שמבצעת חישובים ופקודות.',
    definitionHighLevel: 'רכיב לוגי מורכב (SoC) המבצע פענוח וביצוע של סט פקודות (ISA) כגון x86. הוא מורכב מליבות ביצוע (Cores) ויחידות Uncore המשלבות בקרי תקשורת, זיכרון ו-IO.',
    context: 'בוולידציה אנו מוודאים שהמעבד מתפקד בצורה מושלמת בכל רמות המתח, הטמפרטורה והתדרים שנקבעו לו.'
  },
  {
    id: 'c_post_silicon',
    term: 'Post-Silicon Validation',
    lessonId: 'l1',
    definition: 'בדיקת המעבד הפיזי במעבדה לאחר הייצור שלו במפעל, כדי למצוא באגים שלא התגלו בסימולציות.',
    definitionHighLevel: 'ולידציה פיזית של הסיליקון המיוצר הפועל במהירות השעון המלאה שלו בסביבת מערכת מלאה, במטרה לאתר בעיות לוגיות, חשמליות ותרמיות שלא ניתן לסמלץ ב-Pre-Silicon.',
    context: 'בשלב זה מריצים בדיקות מאמץ רבות תחת מערכות הפעלה מיוחדות כמו SVOS כדי לזהות באגים נדירים (Corner Cases).'
  },
  {
    id: 'c_sut',
    term: 'SUT (System Under Test)',
    lessonId: 'l1',
    definition: 'לוח הבדיקה והמעבד המותקן עליו שעליהם מריצים כעת את הניסויים והבדיקות במעבדה.',
    definitionHighLevel: 'מערך החומרה הכולל את מעבד המטרה, לוח הפיתוח המארח (Reference Validation Board), רכיבי קושחה (BIOS/Firmware) מוגדרים ורכיבי גישה חיצוניים.',
    context: 'הגדרת ה-SUT קובעת בדיוק אילו גרסאות מותקנות כדי לוודא שתוצאות הבדיקה ניתנות לשחזור.'
  },
  {
    id: 'c_bkc',
    term: 'BKC (Best Known Configuration)',
    lessonId: 'l1',
    definition: 'גרסאות החומרה, ה-BIOS, מערכת ההפעלה והדרייברים הכי יציבים שנמצאו יחד, המשמשים כבסיס עבודה קבוע.',
    definitionHighLevel: 'מטריצה מתועדת ומאושרת של רכיבי פלטפורמה (BIOS, Microcode, P-code, OS Kernel) אשר עברו בדיקות אינטגרציה קפדניות ומשמשים כבסיס השוואה.',
    context: 'כאשר מתגלה שגיאה במעבדה, מריצים אותה שוב על תצורת ה-BKC כדי לוודא שזו שגיאת מעבד ולא בעיה של סביבה לא יציבה.'
  },
  {
    id: 'c_plc',
    term: 'Product Life Cycle (PLC)',
    lessonId: 'l1',
    definition: 'מחזור חיי המוצר - מששלב התכנון, דרך הייצור, הבדיקות במעבדה ועד המכירה בשוק.',
    definitionHighLevel: 'שלבי התקדמות הפיתוח של המעבד: Pre-Silicon, Tape-Out (TO), בדיקות סיליקון מוקדם (A0 Stepping), הסמכה (Qualification) וייצור המוני (PRQ).',
    context: 'לכל שלב ב-PLC יש יעדי איכות וקומפילציה שונים (לדוגמה, ייצוב הבוט בשלב ES1 מול בדיקות מאמץ מלאות בשלב QS).'
  },
  {
    id: 'c_to',
    term: 'Tape-Out (TO)',
    lessonId: 'l1',
    definition: 'השלב שבו מסיימים לתכנן את המעבד במחשב ושולחים את השרטוטים לייצור פיזי במפעל.',
    definitionHighLevel: 'השלב הסופי של תכנון השבב שבו קובץ השרטוט הלוגי (GDSII) נשלח למפעל הייצור ליצירת מסכות הסיליקון הפיזיות.',
    context: 'זהו המועד שבו מסתיים שלב ה-Pre-Silicon ומתחילה ההיערכות לקראת הגעת הסיליקון הפיזי למעבדות (Post-Silicon).'
  },
  {
    id: 'c_stepping',
    term: 'Stepping (גרסת סיליקון)',
    lessonId: 'l1',
    definition: 'גרסת הייצור הפיזית של שבב הסיליקון (כמו A0, A1, B0) המציינת תיקוני חומרה שבוצעו במפעל.',
    definitionHighLevel: 'גרסת תכנון פיזית של שבב הסיליקון. גרסאות ראשיות (כמו A ל-B) כוללות שינוי מסכות בסיס, וגרסאות משניות (כמו A0 ל-A1) כוללות שינויי מסכות מתכת בלבד.',
    context: 'בוולידציה בודקים אילו באגים תוקנו ב-Stepping החדש ואילו דרכי מעקף (Workarounds) כבר אינם נחוצים.'
  },
  {
    id: 'c_qual',
    term: 'Qualification',
    lessonId: 'l1',
    definition: 'סדרת בדיקות איכות קפדניות שנועדו לוודא שהמעבד אמין מספיק כדי להימכר ללקוחות.',
    definitionHighLevel: 'שלב אימות רשמי שבו המעבד נדרש לעמוד בכל מדדי האמינות, התקינות והעומס החשמלי/לוגי שנקבעו לו.',
    context: 'מעבר בהצלחה של שלב ה-Qual מאפשר להנהלה לאשר את המעבר לייצור המוני.'
  },
  {
    id: 'c_es_qs',
    term: 'ES & QS',
    lessonId: 'l1',
    definition: 'דגימות מעבדים מוקדמות (ES - הנדסי, QS - הסמכה) המשמשות את המהנדסים לבדיקות לפני תחילת השיווק.',
    definitionHighLevel: 'Engineering Samples (ES) are early physical silicon versions. Qualification Samples (QS) are final silicon versions configured with identical behavior to the production model.',
    context: 'במעבדת הולידציה אנו עובדים בעיקר עם מעבדי ES לפיתוח ודיבאג, ועם מעבדי QS לאישור סופי.'
  },
  {
    id: 'c_prq',
    term: 'PRQ',
    lessonId: 'l1',
    definition: 'האישור הסופי המאשר שהמעבד מוכן למכירה המונית בחנויות.',
    definitionHighLevel: 'The final quality gate indicating that the silicon, microcode patches and software stack comply with shipping criteria.',
    context: 'לאחר קבלת PRQ מופסק פיתוח גרסאות החומרה והמעבד מתחיל להימכר מסחרית.'
  },

  // Lesson 2
  {
    id: 'c_sys_controller',
    term: 'System Controller',
    lessonId: 'l2',
    definition: 'בקר חומרה האחראי על ניהול התקשורת והעברת האותות בין רכיבי הלוח למעבד.',
    definitionHighLevel: 'רכיב לוגי המנהל את קווי הבקרה, השעונים, פסיקות המערכת (Interrupts) ותיאום הערוצים בין המעבד ל-PCH.',
    context: 'אנו בודקים את היציבות של בקר המערכת כדי למנוע התנגשויות נתונים ומצבי קיפאון (Deadlocks) בחומרה.'
  },
  {
    id: 'c_sys_element',
    term: 'System Element',
    lessonId: 'l2',
    definition: 'כל רכיב חומרה פונקציונלי בלוח (כמו בקר מתח, כרטיס רשת או צ\'יפסט).',
    definitionHighLevel: 'מודול לוגי מוגדר בפלטפורמה (IP block) בעל ממשק תקשורת סטנדרטי המהווה חלק ממערך הבדיקה.',
    context: 'בוולידציה אנו ממפים את כל ה-System Elements של הפלטפורמה כדי לוודא שתוכנות הבדיקה מכסות את כולם.'
  },
  {
    id: 'c_ring_bus',
    term: 'Ring Bus',
    lessonId: 'l2',
    definition: 'ערוץ מהיר וטבעתי בתוך המעבד המקשר בין הליבות, זיכרון המטמון (Cache) ובקר הזיכרון.',
    definitionHighLevel: 'On-die high-speed interconnect bus connecting cores, LLC slices, and system agent using independent data, request, snoop, and acknowledge rings.',
    context: 'אנו מריצים בדיקות מאמץ של מעבר נתונים ב-Ring Bus כדי למנוע בעיות תזמון (Timing violations) תחת תדרים מקסימליים.'
  },
  {
    id: 'c_subsystem',
    term: 'Subsystem',
    lessonId: 'l2',
    definition: 'תת-מערכת בתוך המעבד המבצעת תפקיד ספציפי (כמו תת-מערכת הגרפיקה או הזיכרון).',
    definitionHighLevel: 'A cohesive block of IP modules operating under a dedicated controller (e.g. Graphics Subsystem) connected via internal fabric.',
    context: 'בוולידציה בודקים את התפקוד של כל תת-מערכת בנפרד ואת האינטגרציה שלה מול הליבות הראשיות.'
  },
  {
    id: 'c_chip',
    term: 'Chip',
    lessonId: 'l2',
    definition: 'פיסת הסיליקון הפיזית (הג\'וק) המכילה את כל המעגלים האלקטרוניים.',
    definitionHighLevel: 'The physical silicon die after dicing and mounting on the substrate (package), consisting of monolithic or tile-based architecture.',
    context: 'אנו מוודאים שהחיבורים החשמליים של ה-Chip מול התושבת (Socket) תקינים ויציבים.'
  },
  {
    id: 'c_pcie',
    term: 'PCI Express (PCIe)',
    lessonId: 'l2',
    definition: 'ממשק תקשורת מהיר לחיבור כרטיסים חיצוניים כמו כרטיסי מסך וכונני SSD.',
    definitionHighLevel: 'High-speed serial point-to-point interconnect operating with differential signaling lanes supporting multiple generation speeds (Gen 4/5/6).',
    context: 'אנו בודקים את יציבות קישור ה-PCIe במעבר בין מצבי חיסכון בחשמל (L0, L1, L2) ללא קריסות.'
  },
  {
    id: 'c_m2',
    term: 'M.2',
    lessonId: 'l2',
    definition: 'חיבור מהיר וקטן המשמש בעיקר עבור כונני SSD מהירים ומקלט Wi-Fi.',
    definitionHighLevel: 'A compact physical expansion card specification (formerly NGFF) routing PCIe lanes, SATA and USB lines via key configurations.',
    context: 'ולידציה בודקת שכונני M.2 מזוהים כראוי ואינם סובלים מבעיות תזמון בזמן אתחול.'
  },
  {
    id: 'c_pca',
    term: 'PCA',
    lessonId: 'l2',
    definition: 'כרטיס מתאם אלקטרוני המאפשר למחשב החיצוני לשלוט בלוח ה-SUT במעבדה.',
    definitionHighLevel: 'Platform Control Adapter. A hardware board interfacing the SUT with the host system, allowing automated power cycling and strap overrides.',
    context: 'בעזרת ה-PCA אנו מבצעים איפוס חומרה (Hard Reset) אוטומטי כאשר המעבד קופא לחלוטין.'
  },
  {
    id: 'c_upi',
    term: 'UPI',
    lessonId: 'l2',
    definition: 'ערוץ תקשורת מהיר המקשר בין מעבדים שונים בלוחות אם מרובי מעבדים (בשרתים).',
    definitionHighLevel: 'Intel Ultra Path Interconnect. A cache-coherent processor interconnect allowing physical sockets to synchronize cache memory structures directly.',
    context: 'ולידציה של שרתים דורשת הרצת בדיקות עקביות (Cache Coherency) על קווי ה-UPI.'
  },
  {
    id: 'c_uncore_core',
    term: 'Core vs Uncore',
    lessonId: 'l2',
    definition: 'החלוקה הפנימית במעבד: הליבות (Core) המבצעות חישובים, והשאר (Uncore) המנהל את הזיכרון והתקשורת.',
    definitionHighLevel: 'Core handles execution units, pipelines and L1/L2 caches. Uncore represents the system agent, LLC, memory controller, and ring bus.',
    context: 'אנו מריצים מבחנים ממוקדים כדי לבודד בעיות בליבות לעומת בעיות ברשת התקשורת של ה-Uncore.'
  },
  {
    id: 'c_llc',
    term: 'LLC',
    lessonId: 'l2',
    definition: 'זיכרון המטמון המשותף והגדול ביותר במעבד (L3 Cache) המשפר את מהירות הגישה לנתונים.',
    definitionHighLevel: 'The largest on-die cache layer shared among all cores on the ring bus, partitioned into associative slices.',
    context: 'בוולידציה מריצים תבניות ביטים רועשות כדי לגלות באגים ובעיות שלמות נתונים ב-LLC.'
  },

  // Lesson 3
  {
    id: 'c_bios',
    term: 'BIOS / UEFI',
    lessonId: 'l3',
    definition: 'הקוד הראשוני שרץ עם הפעלת המחשב ואחראי לאתחל את רכיבי הלוח ולהעלות את מערכת ההפעלה.',
    definitionHighLevel: 'The primary boot firmware initialized on release of cpu reset vector, executing PEI and DXE phases under UEFI specifications.',
    context: 'אנו בודקים תאימות והגדרות BIOS שונות (NVRAM config) כדי לוודא שחומרת המעבד מוגדרת נכון.'
  },
  {
    id: 'c_boot',
    term: 'Boot',
    lessonId: 'l3',
    definition: 'תהליך העלייה של המערכת מרגע קבלת החשמל ועד לעליית מערכת ההפעלה.',
    definitionHighLevel: 'The complete execution flow beginning from power-on, reset signal deassertion, flash reading, and OS bootloader handoff.',
    context: 'אנו מבצעים אלפי מחזורי בוט רצופים (Boot Cycling) כדי לוודא שהפלטפורמה עולה תמיד ללא תקלות אקראיות.'
  },
  {
    id: 'c_setup_flow',
    term: 'Setup Flow',
    lessonId: 'l3',
    definition: 'תהליך הכנת המערכת והגדרת הלוח לפני הרצת בדיקות (כמו טעינת הגדרות BIOS מותאמות).',
    definitionHighLevel: 'The automated configuration procedure setting target variables in BIOS and register values before test execution.',
    context: 'כל בדיקה מתחילה ב-Setup Flow מוגדר כדי למנוע רעש והגדרות לא עקביות בלוחות.'
  },
  {
    id: 'c_default_flow',
    term: 'Default Flow',
    lessonId: 'l3',
    definition: 'הדלקה רגילה של המערכת עם הגדרות ברירת מחדל ללא שינויים מיוחדים.',
    definitionHighLevel: 'The standard platform boot sequence utilizing base configuration values without overrides or debug modes active.',
    context: 'השוואה ל-Default Flow עוזרת לנו להבין אם תקלה נובעת מפרמטר בדיקה מיוחד שהגדרנו או שהיא קיימת תמיד.'
  },
  {
    id: 'c_post',
    term: 'POST (Power-On Self-Test)',
    lessonId: 'l3',
    definition: 'בדיקה עצמית ראשונית שהלוח מבצע כדי לוודא שכל הרכיבים הבסיסיים (כמו זיכרון ומעבד) קיימים ותקינים.',
    definitionHighLevel: 'Early hardware diagnostics executed by the BIOS PEI stage, reporting status updates via hex values written to I/O Port 80h.',
    context: 'במקרה של קריסה בזמן בוט, מהנדס הולידציה בודק את קוד ה-POST האחרון כדי לדעת איזה רכיב נכשל.'
  },
  {
    id: 'c_mrc',
    term: 'MRC',
    lessonId: 'l3',
    definition: 'קוד ה-BIOS האחראי על איתור, הגדרה ואימון של זיכרון ה-DDR בלוח.',
    definitionHighLevel: 'A firmware library initializing the DDR interfaces, optimizing electrical eyes, signal alignment, and delays.',
    context: 'אימון הזיכרון רגיש לשינויי טמפרטורה. אנו בודקים את ה-MRC תחת תנאי סביבה קיצוניים כדי למנוע קריסות.'
  },
  {
    id: 'c_straps',
    term: 'Straps',
    lessonId: 'l3',
    definition: 'נגדים או פינים פיזיים על הלוח שקובעים את מצב הפעולה של המעבד בזמן ההדלקה.',
    definitionHighLevel: 'Physical board configurations sampled by the CPU on the release of Reset, determining boot clock sources and debug modes.',
    context: 'בעזרת שינוי straps אנו יכולים להכניס את המעבד למצב דיבאג מיוחד או להגדיר תדר בסיס שונה.'
  },
  {
    id: 'c_fuse',
    term: 'Fuse',
    lessonId: 'l3',
    definition: 'פיוזים אלקטרוניים זעירים במעבד שנצרבים פיזית במפעל וקובעים לצמיתות את התכונות והמהירות שלו.',
    definitionHighLevel: 'On-die non-volatile electronic fuses (eFuses) programmed during manufacturing to set SKU, core configuration, and security keys.',
    context: 'בוולידציה בודקים את המעבד תחת קונפיגורציות פיוזים שונות (מעבדי בדיקה מגיעים לרוב עם פיוזים פתוחים).'
  },
  {
    id: 'c_cmos',
    term: 'CMOS / NVRAM',
    lessonId: 'l3',
    definition: 'זיכרון קטן בלוח האם שומר את הגדרות ה-BIOS שלך בעזרת סוללת גיבוי.',
    definitionHighLevel: 'A battery-backed memory structure storing current BIOS parameters and system real-time clock data.',
    context: 'אם המערכת נתקעת בבוט עקב הגדרת BIOS שגויה, אנו מבצעים Clear CMOS כדי להחזיר אותה למצב בטוח.'
  },
  {
    id: 'c_reset_vector',
    term: 'Reset Vector',
    lessonId: 'l3',
    definition: 'הכתובת הראשונה בזיכרון שאליה פונה המעבד עם הדלקתו כדי להתחיל לקרוא את קוד ה-BIOS.',
    definitionHighLevel: 'The initial memory address (0xFFFFFFF0 in x86) fetched by the processor core upon deassertion of the reset pin.',
    context: 'בוולידציה מוודאים כי המעבד מצליח לקרוא את ה-Reset Vector ללא שגיאות תקשורת מול ה-SPI Flash.'
  },
  {
    id: 'c_port80',
    term: 'Port 80h',
    lessonId: 'l3',
    definition: 'מסך דיאגנוסטיקה קטן בלוח האם המציג קודי תקלות (POST Codes) בזמן הדלקת המחשב.',
    definitionHighLevel: 'An I/O port address mapping progress codes written by BIOS during execution steps to allow external debugging.',
    context: 'זהו הכלי הראשון שבודקים במעבדה כאשר ה-SUT אינו מעלה מסך או נתקע בזמן הבוט.'
  },
  {
    id: 'c_bootloop',
    term: 'Bootloop',
    lessonId: 'l3',
    definition: 'קריסה חוזרת של המחשב במהלך הדלקתו הגורמת לו להתחיל מחדש שוב ושוב.',
    definitionHighLevel: 'A cyclic restart scenario occurring when early boot stages trigger hardware errors or watchdogs before reaching OS.',
    context: 'כדי לדבג Bootloop אנו מחברים טרמינל סריאלי ורושמים את הפלט המלא של ה-BIOS עד לרגע הקריסה.'
  },

  // Lesson 4
  {
    id: 'c_ucode',
    term: 'Microcode (U-code)',
    lessonId: 'l4',
    definition: 'קוד פנימי במעבד המתרגם פקודות תוכנה מורכבות לרצף פעולות פשוטות ישירות בחומרה, ומאפשר לתקן באגים באמצעות עדכוני תוכנה.',
    definitionHighLevel: 'Internal processor firmware stored in Control ROM and RAM, translating macro-instructions into execution micro-operations.',
    context: 'עדכוני מיקרוקוד נטענים בבוט כדי לתקן באגים פיזיים בסיליקון מבלי להחליף את המעבד.'
  },
  {
    id: 'c_pcode',
    term: 'P-code',
    lessonId: 'l4',
    definition: 'הקוד הרץ בבקר האנרגיה הפנימי של המעבד (PUNIT) ומנהל מתחים, תדרים וטמפרטורה.',
    definitionHighLevel: 'Power Control Unit firmware executing DVFS algorithms based on thermal, load, and current sensors.',
    context: 'אנו בודקים באגים ב-P-code הקשורים לטורבו ולמעברים בין מצבי כוח כדי למנוע קריסות מתח (Vdroop).'
  },
  {
    id: 'c_ucode_path',
    term: 'Microcode Path',
    lessonId: 'l4',
    definition: 'הקשר הפנימי בתוך מפענח המעבד המפנה פקודות מורכבות אל יחידת המיקרוקוד ROM.',
    definitionHighLevel: 'The decoding pathway routing complex instructions to the microcode ROM sequencer instead of direct hardware decoding.',
    context: 'בדיקות וולידציה מריצות פקודות מורכבות במיוחד כדי לוודא שאין חריגות תזמון בנתיב המיקרוקוד.'
  },
  {
    id: 'c_ucode_acode',
    term: 'Microcode A-code',
    lessonId: 'l4',
    definition: 'שלב בקרה או מודול קוד ייעודי בתוך ארכיטקטורת המיקרוקוד האחראי על תהליכי אינטגרציה מוקדמים של החומרה.',
    definitionHighLevel: 'A specialized early-stage control logic component loaded prior to the main microcode module to manage core setup steps and configure low-level structures.',
    context: 'בדיקת קוד זה מתבצעת בסביבות דיבאג בעלות יכולת קריאה של רגיסטרים פנימיים מאוד (כמו JTAG).'
  },
  {
    id: 'c_turnpart',
    term: 'Turn Part',
    lessonId: 'l4',
    definition: 'תהליך של שליחת חלקים או תצורות חדשות לריצות בדיקה במעבדה באופן מחזורי.',
    definitionHighLevel: 'A cycle-based validation process where hardware parts are tested, rotated, or configured dynamically to isolate silicon wear-out from design errors.',
    context: 'משמש לשמירה על עדכניות הלוחות במעבדה ומניעת מצבים בהם SUT יחיד שנשחק משבש את תוצאות הבדיקה הכלליות.'
  },
  {
    id: 'c_ct',
    term: 'CT (Cycle Time)',
    lessonId: 'l4',
    definition: 'זמן המחזור הנדרש להרצת סבב בדיקות מלא על המעבד, או תהליך של בדיקות מתמשכות.',
    definitionHighLevel: 'A key parameter in automated validation loops, measuring duration from microcode patch distribution to test result reporting across the validation cluster.',
    context: 'אופטימיזציה של ה-CT מאפשרת לצוות הולידציה לשחרר BKC מהר יותר ולזהות רגרסיות תוך שעות ספורות מרגע הזנת קוד חדש.'
  },
  {
    id: 'c_csme',
    term: 'CSME',
    lessonId: 'l4',
    definition: 'מנוע האבטחה הפנימי של המעבד (מיקרו-מעבד עצמאי) שאחראי על הצפנה ותפקודים מאובטחים.',
    definitionHighLevel: 'Converged Security and Manageability Engine. An independent microcontroller managing platform security and remote system state monitoring.',
    context: 'בוולידציה בודקים שה-CSME מאתחל ומצליח לטעון מפתחות אבטחה ללא תקלות.'
  },
  {
    id: 'c_fit',
    term: 'FIT',
    lessonId: 'l4',
    definition: 'טבלה ב-BIOS המכילה את כל הכתובות של רכיבי הקושחה המוקדמים שהמעבד צריך לקרוא בזמן האתחול.',
    definitionHighLevel: 'Firmware Interface Table. A static directory structured at a fixed flash offset, pointing to microcode updates and ACM security binaries.',
    context: 'טבלה לא תקינה ב-FIT תמנע את טעינת המיקרוקוד בבוט ותגרום למערכת לא לעלות.'
  },

  // Lesson 5
  {
    id: 'c_power_mgmt',
    term: 'Power Management',
    lessonId: 'l5',
    definition: 'ניהול צריכת החשמל של המעבד (המעברים בין ביצועים גבוהים לחיסכון בחשמל).',
    definitionHighLevel: 'ACPI power state management coordinating core sleep configurations (C-states), operating frequencies (P-states), and platform states (S-states).',
    context: 'אנו בודקים מעברים מהירים במיוחד (Transient states) בין מצב פעיל למצבי שינה עמוקים.'
  },
  {
    id: 'c_punit',
    term: 'PUNIT',
    lessonId: 'l5',
    definition: 'מיקרו-בקר פנימי בתוך המעבד המנהל בפועל את אספקת המתח, תדרי השעון והטמפרטורה.',
    definitionHighLevel: 'A specialized microcontroller in the uncore managing power control unit (PCU) configurations, telemetry monitoring, and voltage regulator commands.',
    context: 'כאשר המעבד מתחמם יתר על המידה, ה-PUNIT מפעיל מנגנון הגנה של הפחתת תדר (Thermal Throttling) כדי למנוע נזק פיזי לשבב.'
  },
  {
    id: 'c_pmc',
    term: 'PMC',
    lessonId: 'l5',
    definition: 'בקר ניהול הכוח החיצוני למעבד (בצ\'יפסט) המתאם את מצבי האנרגיה של המערכת כולה.',
    definitionHighLevel: 'Power Management Controller. A hardware block in PCH managing global platform power sequencing and reset operations.',
    context: 'בוולידציה מוודאים כי ה-PMC מתאם כראוי עם ה-PUNIT של המעבד את הכניסה והיציאה ממצבי שינה עמוקים.'
  },
  {
    id: 'c_pmreset',
    term: 'PMRESET',
    lessonId: 'l5',
    definition: 'אות איפוס ייעודי הקשור למערכת ניהול האנרגיה, המשמש לאיפוס רכיבי בקרה ללא איבוד כוח ראשי.',
    definitionHighLevel: 'A physical hardware status line generated by the PMC or system agent during state changes to clear registers on sub-nodes without dropping core phase voltages.',
    context: 'ניטור אות ה-PMRESET באמצעות אוסילוסקופ מסייע לאבחן מדוע מערכת נתקעה במהלך מעבר למצב שינה.'
  },
  {
    id: 'c_warm_reset',
    term: 'Warm Reset',
    lessonId: 'l5',
    definition: 'אתחול מחדש מהיר ללא הפסקת מתח לחלקים כמו הזיכרון, החוסך זמן אימון זיכרון.',
    definitionHighLevel: 'A logical CPU reset which bypasses full DDR retraining, retaining memory controller electrical setups.',
    context: 'אנו מריצים בדיקות Warm Reset חוזרות תחת מאמץ כדי לוודא שרכיבי ה-PCIe מתאפסים למצב תקין.'
  },
  {
    id: 'c_pim',
    term: 'PIM',
    lessonId: 'l5',
    definition: 'רכיב או מודול תוכנה/חומרה המשלב את הגדרות האנרגיה וערכי המתח של המערכת.',
    definitionHighLevel: 'An integrated power distribution board interface allowing fine telemetry controls, voltage rail offsets, and current limit tuning.',
    context: 'משמש לכוונון עדין של טבלאות המתחים במהלך בדיקות Margining במעבדה.'
  },
  {
    id: 'c_bat_charge',
    term: 'Battery Charge State',
    lessonId: 'l5',
    definition: 'מצב טעינת הסוללה וניהול אספקת הכוח החיצונית במחשבים ניידים.',
    definitionHighLevel: 'Evaluating Power Delivery (PD) profile negotiated between Host Type-C port and SUT PMIC/EC controllers.',
    context: 'ולידציה של מחשבים ניידים דורשת בדיקה שהסוללה נטענת כראוי תחת עומס מעבד מרבי.'
  },
  {
    id: 'c_l',
    term: 'L State',
    lessonId: 'l5',
    definition: 'מצבי צריכת החשמל של ערוץ ה-PCI Express (כמו L0 לפעולה מלאה, ו-L1 לחיסכון בחשמל).',
    definitionHighLevel: 'PCIe link power states defining active communication (L0) and low-power states (L0s, L1, L2).',
    context: 'מעברים מהירים בין L0 ל-L1 נבדקים תדיר עקב נטייה לשגיאות תזמון.'
  },
  {
    id: 'c_pr',
    term: 'PR (Power Reduction)',
    lessonId: 'l5',
    definition: 'מצב מיוחד של הפחתת צריכת האנרגיה של השבב בתנאי קיצון.',
    definitionHighLevel: 'A physical hardware protection mechanism which reduces core frequencies in single clock cycles when current limits are exceeded.',
    context: 'משמש להגנה על מייצבי המתח שעל הלוח מפני פיצוץ או שריפה בעת הרצת אספקת כוח מאמץ קיצונית.'
  },
  {
    id: 'c_sst',
    term: 'SST',
    lessonId: 'l5',
    definition: 'טכנולוגיית תקשורת בעלת חוט בודד המשמש להעברת מידע על חיישנים, טמפרטורה ומצבי מערכת.',
    definitionHighLevel: 'A single-wire proprietary bus interface allowing out-of-band monitoring of thermal, diagnostic and core telemetry metrics on SUT.',
    context: 'בעזרת ה-SST המערכת המארחת יכולה לדעת אם ה-SUT סובל מבעיה תרמית עוד לפני שמערכת ההפעלה עלתה.'
  },
  {
    id: 'c_sits',
    term: 'SITS',
    lessonId: 'l5',
    definition: 'חבילת בדיקות אינטגרציה מקיפה המשמשת לבדיקת יציבות המערכת במצבי כוח ומצבים משולבים.',
    definitionHighLevel: 'A comprehensive integration testing environment simulating concurrent stress on CPU states, memory training, power state changes and PCIe link transitions.',
    context: 'הרצת SITS היא תנאי הכרחי לשחרור גרסת BKC חדשה לצוותי הבדיקות הרחבים.'
  },
  {
    id: 'c_cstates',
    term: 'C-States',
    lessonId: 'l5',
    definition: 'מצבי שינה של הליבה כאשר היא אינה פעילה (C0 = עובד, C10 = שינה עמוקה מאוד).',
    definitionHighLevel: 'ACPI core power savings states that progressively clock-gate and power-gate core structures to minimize leakage current.',
    context: 'אנו בודקים את זמני המעבר ממצבי שינה עמוקים כדי למנוע קפיאות מערכת.'
  },
  {
    id: 'c_pstates',
    term: 'P-States',
    lessonId: 'l5',
    definition: 'מצבי תדר ומתח בזמן שהליבה פעילה (כמו תדר טורבו מול תדר חיסכון).',
    definitionHighLevel: 'Coordinated frequency and voltage operating points managed dynamically under DVFS logic.',
    context: 'אנו מוודאים כי מייצבי המתח (VR) יציבים במעברים מהירים בין תדרים שונים.'
  },
  {
    id: 'c_sstates',
    term: 'S-States',
    lessonId: 'l5',
    definition: 'מצבי שינה של המחשב כולו (S0 = עובד, S3 = שינה ל-RAM, S4 = שינה לדיסק, S5 = כבוי).',
    definitionHighLevel: 'System sleep configurations defined by ACPI that coordinate board power rail behavior.',
    context: 'אנו מריצים אלפי מחזורי כניסה ויציאה משינה (S3-to-S0) כדי לגלות בעיות זיהוי חומרה.'
  },

  // Lesson 6
  {
    id: 'c_stargate',
    term: 'StarGate Board',
    lessonId: 'l6',
    definition: 'לוח האם המיוחד במעבדה המשמש לארח את המעבדים הנבדקים ומאפשר גישה נוחה למתחים ופינים.',
    definitionHighLevel: 'A reference validation host board designed with open sockets, breakout points for scopes, and interface chips.',
    context: 'ה-StarGate מהווה את התשתית הפיזית שעליה מותקן המעבד הנבדק ומאפשר שליטה מלאה בפרמטרים החשמליים שלו.'
  },
  {
    id: 'c_svos',
    term: 'SVOS',
    lessonId: 'l6',
    definition: 'מערכת הפעלה מיוחדת של אינטל מבוססת לינוקס המאפשרת גישה ישירה לרגיסטרי המעבד והרצת תוכניות בדיקה.',
    definitionHighLevel: 'Silicon Validation OS. A Ring 0 Linux distribution equipped with custom drivers for direct MSR and register manipulations.',
    context: 'כמעט כל בדיקות ה-Post-Silicon מתבצעות תחת SVOS. מהנדס הולידציה מתחבר ל-SUT ומריץ תסריטי Python/C המנצלים את הכלים המובנים במערכת הפעלה זו.'
  },
  {
    id: 'c_pud',
    term: 'PUD',
    lessonId: 'l6',
    definition: 'הגדרה למערכת בדיקות שנמצאת במצב אבחון וניתוח תקלות פעיל.',
    definitionHighLevel: 'Platform Under Debug. A system state marked for diagnostic analysis. The CPU clocks are stopped, allowing internal microarchitectural states to be dumped via debug interfaces.',
    context: 'כאשר בדיקה נכשלת באוטומציה, המערכת מסווגת כ-PUD ומועברת לטיפול ידני של מהנדס דיבאג.'
  },
  {
    id: 'c_terminal',
    term: 'Terminal Connection',
    lessonId: 'l6',
    definition: 'חיבור תקשורת טקסטואלי (כמו חיבור סריאלי) המאפשר לשלוט ב-SUT ולראות את פלט האתחול והבדיקה שלו בזמן אמת.',
    definitionHighLevel: 'ערוץ תקשורת מבוסס UART או USB-TTY המקשר בין ה-SUT לבין מחשב הבקרה. מאפשר תקשורת פקודות בסיסית גם כאשר ה-SUT אינו מסוגל להציג תמונה על מסך.',
    context: 'חיבור הטרמינל הוא הכלי החשוב ביותר לדיבאג שלבי ה-POST המוקדמים.'
  },
  {
    id: 'c_to_env',
    term: 'TO',
    lessonId: 'l6',
    definition: 'המהנדס האחראי על הרצת הבדיקות הספציפיות, או ממשק הבקרה של עמדת הטרמינל.',
    definitionHighLevel: 'The active user session or automation process managing the console I/O stream of a SUT during validation operations.',
    context: 'במערכות אוטומטיות, ה-Terminal Operator הוא רכיב תוכנה המנתח את זרם הטקסט של הבוט ומחפש מילות מפתח המעידות על שגיאות.'
  },
  {
    id: 'c_mode_work',
    term: 'Mode of Work',
    lessonId: 'l6',
    definition: 'מצב הפעולה המוגדר של מערכת הבדיקות (למשל: מצב בדיקת ביצועים, מצב דיבאג, מצב חיסכון בחשמל).',
    definitionHighLevel: 'The designated execution environment setting, toggling low-level configuration registers and strap pins (e.g. Debug Mode, Production Mode).',
    context: 'הגדרת ה-Mode of Work הנכון מבטיחה כי הבדיקה מתבצעת תחת התנאים הרלוונטיים.'
  },
  {
    id: 'c_gui',
    term: 'GUI',
    lessonId: 'l6',
    definition: 'ממשק המשתמש הגרפי המאפשר למהנדס לשלוט במערכות הבדיקה בצורה ויזואלית נוחה.',
    definitionHighLevel: 'Front-end applications (such as Intel System Studio) representing internal architecture configuration controls visually.',
    context: 'למרות שרוב העבודה היא טקסטואלית, שימוש ב-GUI נוח להצגת תרשימים גרפיים של מתחים בזמן אמת.'
  },
  {
    id: 'c_config_mgmt',
    term: 'Configuration Management',
    lessonId: 'l6',
    definition: 'ניהול ובקרת התצורות של ה-SUTs במעבדה, כולל גרסאות ה-BIOS, המיקרוקוד והחומרה של כל מערכת.',
    definitionHighLevel: 'Systematic tracking of firmware, silicon stepping, board versions, and software stacks to ensure reproducibility in tests.',
    context: 'ניהול תצורה קפדני מונע מצב שבו מהנדס מריץ בדיקות על גרסה לא נכונה ומבזבז ימי עבודה.'
  },
  {
    id: 'c_mtbf',
    term: 'MTBF',
    lessonId: 'l6',
    definition: 'הזמן הממוצע שחולף בין תקלה לתקלה במערכת - מדד מרכזי ליציבות ואמינות של המעבד.',
    definitionHighLevel: 'Mean Time Between Failures. A statistical calculation of total cumulated runtime hours divided by the total number of hardware or firmware faults observed.',
    context: 'בדיקות יציבות נועדו לוודא שה-MTBF של המעבד במשימות שונות עומד בדרישות הלקוח.'
  },
  {
    id: 'c_pass_splitter',
    term: 'Pass Splitter',
    lessonId: 'l6',
    definition: 'כלי חומרה או תוכנה במעבדה המאפשר לפצל ולנתב אותות דיבאג מורכבים מבלי להפריע לפעולת המערכת.',
    definitionHighLevel: 'A physical signal divider card allowing diagnostic equipment to sniff bus lines (e.g. SMBus, I3C, PCIe) inline without introducing trace distortions.',
    context: 'ה-Pass Splitter מאפשר לנטר את תעבורת הנתונים ב-PCIe בזמן אמת ולגלות שגיאות פרוטוקול.'
  },
  {
    id: 'c_pva',
    term: 'PVA',
    lessonId: 'l6',
    definition: 'ארכיטקטורה ומתודולוגיה מוגדרת המגדירה כיצד לבצע את בדיקות הולידציה בצורה שיטתית ועקבית.',
    definitionHighLevel: 'The proprietary Intel framework defining the guidelines, workloads, and scripts for systematic platform and silicon verification.',
    context: 'עבודה לפי ה-PVA מבטיחה כי תוצאות בדיקה של מעבד מדור מסוים ניתנות להשוואה ישירה מול מעבד מדור קודם.'
  },
  {
    id: 'c_dci_jtag',
    term: 'JTAG & DCI',
    lessonId: 'l6',
    definition: 'ממשקי חומרה לדיבאג עמוק, המאפשרים לעצור את המעבד ולקרוא רגיסטרים פנימיים דרך חיבור USB 3.0.',
    definitionHighLevel: 'Debug interfaces for hardware testing. DCI enables JTAG packet transfer over USB cables, bypassing target probes.',
    context: 'כאשר המעבד נתקע קשיח, חיבור ה-DCI מאפשר לקרוא את תוכן זיכרון השגיאות (Crash log).'
  },
  {
    id: 'c_itp',
    term: 'ITP',
    lessonId: 'l6',
    definition: 'מכשיר חומרה ייעודי המתחבר ללוח הבדיקה ומקשר בין ממשק הדיבאג של המעבד לשרת הדיבאג במחשב.',
    definitionHighLevel: 'Intel In-Target Probe. The hardware connection device translating host debugger packets into JTAG interface signals.',
    context: 'בדיעבד אנו מריצים פקודות PythonSV דרך ה-ITP כדי לשלוט במחזור השעון של ה-SUT.'
  },

  // Lesson 7
  {
    id: 'c_trouble',
    term: 'Troubleshooting',
    lessonId: 'l7',
    definition: 'מתודולוגיה לזיהוי, ניתוח ופתרון תקלות של לוחות, תוכנה או סיליקון במעבדה.',
    definitionHighLevel: 'The diagnostic methodology of isolating failing factors, checking voltage rails, and capturing register states.',
    context: 'יכולת Troubleshooting מעולה מאפשרת לגלות במהירות האם הבעיה היא בלוח הבדיקה או באג מעבד אמיתי.'
  },
  {
    id: 'c_burn_in',
    term: 'Burn-in',
    lessonId: 'l7',
    definition: 'בדיקת מאמץ ממושכת תחת תנאי חום ומתח גבוהים כדי לגלות פגמי ייצור מוקדמים.',
    definitionHighLevel: 'Stress testing designed to accelerate silicon aging using thermal and voltage stress factors to trigger early failure rates.',
    context: 'אנו מריצים בדיקות Burn-in כדי לוודא שהמעבד עמיד לאורך שנים ולא יקרוס אצל הלקוח.'
  },
  {
    id: 'c_pd',
    term: 'PD (Power Delivery)',
    lessonId: 'l7',
    definition: 'רשת אספקת החשמל והמתח למעבד, כולל מייצבי המתח (VRMs) והקבלים.',
    definitionHighLevel: 'Power Delivery Network (PDN) design managing power planes, routing impedances, and decoupling capacitors.',
    context: 'אנו בודקים שה-PD יציב ואינו סובל מרעשים (Ripple) במעברים חדים של תדרים.'
  },
  {
    id: 'c_debuggable',
    term: 'Debuggable',
    lessonId: 'l7',
    definition: 'מערכת המתוכננת כך שיש אליה גישה נוחה לכלי דיבאג חיצוניים המאפשרים לראות את המצב הפנימי של המעבד.',
    definitionHighLevel: 'Architectural feature enabling CPU register dump, hardware state tracing, and step execution controls.',
    context: 'מעבדי הולידציה נבחרים להיות Debuggable כדי שנוכל לחקור קריסות בקלות.'
  },
  {
    id: 'c_mem_element',
    term: 'Type of memory element',
    lessonId: 'l7',
    definition: 'סוגי רכיבי הזיכרון השונים במעבד וסביבתו והדרכים לבדוק את תקינותם.',
    definitionHighLevel: 'Classification of on-die storage structures: registers, SRAM arrays, and external dynamic DRAM architectures.',
    context: 'אנו מריצים בדיקות ייעודיות לכל סוג זיכרון (כמו בדיקות ECC ל-SRAM הפנימי).'
  },
  {
    id: 'c_caterr_code',
    term: 'CATERR',
    lessonId: 'l7',
    definition: 'אות שגיאה חמור המורה על קריסה מוחלטת של המעבד ללא יכולת התאוששות עצמית.',
    definitionHighLevel: 'Catastrophic Error. A physical active-low pin assertion triggered by SA on fatal IDI bus parity or timeout conditions.',
    context: 'כאשר נורת CATERR נדלקת במעבדה, ה-SUT נעצר ומחכים לחיבור הדיבאגר לקריאת ה-Crash log.'
  },
  {
    id: 'c_ierr_code',
    term: 'IERR',
    lessonId: 'l7',
    definition: 'אות המופעל במעבד המציין כי התרחשה שגיאה לוגית פנימית חמורה בליבה.',
    definitionHighLevel: 'Internal Error. Core parity fault or pipeline lockup driving an hardware error signal to indicate fatal exception.',
    context: 'שגיאות IERR עוזרות לנו למקד את הבאג לליבה ספציפית במעבד.'
  },
  {
    id: 'c_mce_code',
    term: 'MCE (Machine Check Exception)',
    lessonId: 'l7',
    definition: 'מנגנון שגיאה פנימי של המעבד המדווח למערכת ההפעלה על תקלות חומרה פנימיות או חיצוניות שזוהו.',
    definitionHighLevel: 'Architectural CPU interrupt reporting hardware errors logged inside Machine Check MSR banks.',
    context: 'בעזרת סקריפטים של PythonSV אנו קוראים את ה-MSR registers של בנקי ה-Machine Check (MC0-MC24) כדי למצוא את מקור התקלה.'
  },
  {
    id: 'c_hang_code',
    term: 'Hang / Lockup',
    lessonId: 'l7',
    definition: 'מצב שבו המעבד מפסיק לבצע פקודות והמערכת הופכת ללא מגיבה.',
    definitionHighLevel: 'Microarchitectural deadlock occurring in internal fabrics (e.g. Ring and PCIe interface conflicts).',
    context: 'בעת Hang אנו שולחים פקודת JTAG לקבלת ה-Instruction Pointer (IP) כדי לראות היכן הקוד נעצר.'
  },
  {
    id: 'c_thermal_throttling',
    term: 'Thermal Throttling',
    lessonId: 'l7',
    definition: 'מנגנון בטיחות המוריד את מהירות המעבד כשהוא מתחמם מדי כדי למנוע נזק.',
    definitionHighLevel: 'PROCHOT# signal assert driving duty cycle scaling controlled by PCU to drop TDP during hot junction limits.',
    context: 'אנו מוודאים שהמעבד מפעיל את מנגנון ה-Throttling בטמפרטורה הנכונה ואינו קורס עקב שינויי מתח מהירים.'
  },

  // Lesson 8
  {
    id: 'c_ev',
    term: 'Electrical Validation (EV)',
    lessonId: 'l8',
    definition: 'בדיקת המאפיינים החשמליים הפיזיים של המעבד (מתחים, זמנים ושלמות האות) כדי לוודא עמידה בתקני חומרה.',
    definitionHighLevel: 'The verification of physical layer analog characteristics including voltage tolerances, transition times, and signal integrity constraints.',
    context: 'במעבדת EV משתמשים באוסילוסקופים מהירים של GHz כדי למדוד סיגנלים ישירות מקווי הלוח.'
  },
  {
    id: 'c_margining',
    term: 'Margining',
    lessonId: 'l8',
    definition: 'בדיקת גבולות היציבות של המעבד על ידי שינוי יזום של מתח העבודה ותדר השעון עד שמתקבלות שגיאות.',
    definitionHighLevel: 'The methodical process of sweeping voltage and frequency coordinates to determine the safe operational boundary (V-F curve) of silicon logic.',
    context: 'מריצים בדיקות Margining אוטומטיות כדי לוודא שיש מרווח בטיחות (Guardband) מספיק בין תדר העבודה לנקודת הכשל.'
  },
  {
    id: 'c_jitter',
    term: 'Jitter',
    lessonId: 'l8',
    definition: 'סטייה קצרת טווח בזמנים של האות החשמלי, שעלולה לגרום לשגיאות בקריאת נתונים מהירה.',
    definitionHighLevel: 'The short-term variations of a signal\'s significant instants from their ideal positions in time (deterministic and random jitter components).',
    context: 'מדידת Jitter מבוצעת על קווי תקשורת מהירים כמו PCIe ו-DDR כדי להבטיח מרווח זמן (Setup/Hold) תקין.'
  },
  {
    id: 'c_crosstalk',
    term: 'Cross-talk',
    lessonId: 'l8',
    definition: 'הפרעה אלקטרומגנטית שנגרמת עקב מעבר אות בקו תקשורת שכן, המשבשת את האות בקו המטרה.',
    definitionHighLevel: 'The undesired electromagnetic coupling between parallel PCB traces or silicon interconnect metal lines (victim and aggressor lines).',
    context: 'מזעור Cross-talk נעשה על ידי תכנון נכון של מרווחי הולכה בלוח (PCB design) ובדיקה שלו על ידי שליחת פטרנים רועשים במיוחד.'
  },
  {
    id: 'c_eye_diagram',
    term: 'Eye Diagram',
    lessonId: 'l8',
    definition: 'תרשים ויזואלי באוסילוסקופ המציג את איכות האות הדיגיטלי המהיר בצורה של עין פתוחה.',
    definitionHighLevel: 'An oscilloscope display representation created by overlapping repetitive sweeps of a high-speed data stream to visualize timing and voltage noise margins.',
    context: 'עין פתוחה ונקייה מעידה על שלמות אותות מעולה, בעוד עין סגורה מעידה על רעשים ושגיאות ביט (Bit Errors).'
  },
  {
    id: 'c_isi',
    term: 'Inter-Symbol Interference (ISI)',
    lessonId: 'l8',
    definition: 'הפרעה שבה ביטים קודמים שנשלחו בקו משפיעים על המתח של הביט הנוכחי ומשבשים אותו.',
    definitionHighLevel: 'A distortion of a signal in which one symbol (bit) interferes with subsequent symbols due to channel dispersion and reflection characteristics.',
    context: 'שימוש במנגנוני Equalization (כמו CTLE או DFE) מיושם בבקר המעבד כדי לפצות על השפעות ה-ISI.'
  },
  {
    id: 'c_impedance',
    term: 'Impedance Matching',
    lessonId: 'l8',
    definition: 'התאמת ההתנגדות החשמלית של קווי ההולכה כדי למנוע החזרות אותות ורעשים בממשקים מהירים.',
    definitionHighLevel: 'The practice of designing transmission line characteristic impedance to match source and load termination values (typically 50 or 85 ohms).',
    context: 'חוסר התאמת עכבות גורם להחזרי אותות (Reflections) שיוצרים עיוותים ורעש קשה בדיאגרמת העין.'
  },
  {
    id: 'c_probe_loading',
    term: 'Probe Loading',
    lessonId: 'l8',
    definition: 'השפעה חשמלית שלילית שפרוב המדידה של האוסילוסקופ יוצר על קו התקשורת בזמן הבדיקה.',
    definitionHighLevel: 'The distortion introduced to a circuit under test by the capacitive, resistive and inductive parameters of the measuring scope probe.',
    context: 'בעבודה עם ממשקים מהירים מאוד, משתמשים בפרובים אקטיביים עם התנגדות כניסה גבוהה במיוחד כדי למנוע Probe Loading שיכול להשבית את התקשורת.'
  },
  {
    id: 'c_reflection',
    term: 'Signal Reflection',
    lessonId: 'l8',
    definition: 'החזרה של האות החשמלי לאחור כאשר הוא נתקל בשינוי התנגדות בקו, בדומה להד של קול.',
    definitionHighLevel: 'The fraction of an electromagnetic wave reflected back to the source due to impedance discontinuities along the transmission path.',
    context: 'החזרים גורמים להפרעות קשות בשלמות האות ומאובחנים על ידי זיהוי עיוותים (Overshoot/Undershoot) בסיגנל.'
  },

  // Lesson 9
  {
    id: 'c_fv',
    term: 'Functional Validation (FV)',
    lessonId: 'l9',
    definition: 'בדיקת תקינות הלוגיקה והמנגנונים הלוגיים של המעבד כדי לוודא שהוא מבצע את פקודותיו בצורה נכונה לחלוטין.',
    definitionHighLevel: 'The process of verifying that the logical design of the SoC operates in strict compliance with the architectural specification.',
    context: 'בדיקות FV מתמקדות במציאת באגים של קוד, רגיסטרים ותסריטי שימוש מורכבים במעבד.'
  },
  {
    id: 'c_workloads',
    term: 'Workloads',
    lessonId: 'l9',
    definition: 'תוכניות ועומסי עבודה מוגדרים שמריצים על המעבד כדי לבדוק את התפקוד והביצועים שלו.',
    definitionHighLevel: 'The designated software programs, scripts or instruction streams executed on SUT to exercise specific processor subunits.',
    context: 'אנו מריצים מגוון Workloads משרתים אמיתיים ומחקי משחקים כדי לבחון את יציבות הסיליקון.'
  },
  {
    id: 'c_stress',
    term: 'Stress Testing',
    lessonId: 'l9',
    definition: 'בדיקות מאמץ המפעילות לחץ כבד על כל יחידות המעבד במקביל כדי לעורר באגים שמתרחשים רק בעומס גבוה.',
    definitionHighLevel: 'The validation technique of concurrently exercising multiple hardware blocks at maximum throughput limits to reveal synchronization failures.',
    context: 'הרצת בדיקות Stress לאורך ימים (24/7) עוזרת לאתר באגים שקשורים להתנגשויות תקשורת פנימית.'
  },
  {
    id: 'c_coverage',
    term: 'Functional Coverage',
    lessonId: 'l9',
    definition: 'מדד המציג כמה אחוזים מתוך מגוון התרחישים הלוגיים האפשריים של המעבד נבדקו בפועל.',
    definitionHighLevel: 'A quantitative metric measuring the percentage of architectural states and transition vectors exercised during execution.',
    context: 'איסוף נתוני כיסוי מסייע לנו לכוון את הבדיקות הבאות אל עבר אזורים לוגיים שלא נבדקו כלל.'
  },
  {
    id: 'c_assertions',
    term: 'Hardware Assertions',
    lessonId: 'l9',
    definition: 'מנגנוני בקרה פנימיים בחומרת המעבד שמתריעים מיידית כאשר מתרחש מצב לוגי לא חוקי.',
    definitionHighLevel: 'Declarative statements embedded inside logic designs verifying that specific structural properties hold true during execution cycles.',
    context: 'כאשר Assertion מופעל, הוא מסייע למהנדסי הדיבאג לאתר את המיקום המדויק של הכשל מיד ברגע התרחשותו.'
  },
  {
    id: 'c_random_test',
    term: 'Constrained Random Testing',
    lessonId: 'l9',
    definition: 'שיטת בדיקה שבה מייצרים פקודות ותרחישים אקראיים תחת מגבלות לוגיות כדי למצוא באגים לא צפויים.',
    definitionHighLevel: 'Generating pseudo-random instruction streams constrained within legal architecture boundaries to discover unpredicted bug states.',
    context: 'זוהי השיטה היעילה ביותר למציאת באגים של שילובי פקודות נדירים שמהנדס אנושי לא היה חושב לכתוב באופן ידני.'
  },
  {
    id: 'c_corner_cases',
    term: 'Corner Cases',
    lessonId: 'l9',
    definition: 'מצבי כשל נדירים המתרחשים רק כאשר מספר פרמטרים קיצוניים מתקיימים במקביל (מתח נמוך, חום גבוה ועומס ספציפי).',
    definitionHighLevel: 'Anomalous bugs manifested only at intersection points of multiple independent environmental and architectural parameters.',
    context: 'איתור Corner Cases הוא היעד המרכזי של Post-Silicon Validation, שכן אלו באגים שסימולציות Pre-Silicon לרוב מפספסות.'
  },
  {
    id: 'c_regressions',
    term: 'Regression Testing',
    lessonId: 'l9',
    definition: 'הרצה מחדש של בדיקות קודמות כדי לוודא שתיקון באג מסוים לא קלקל או שבר רכיבים אחרים במעבד.',
    definitionHighLevel: 'The validation phase of executing previously passed test suites to ensure new microcode or BIOS builds do not introduce functional regressions.',
    context: 'בכל פעם שמקבלים גרסת מיקרוקוד (U-code patch) חדשה, מריצים Regression Suite מלא של כל בדיקות הבסיס.'
  },
  {
    id: 'c_test_suite',
    term: 'Test Suite',
    lessonId: 'l9',
    definition: 'חבילת בדיקות המרכזת קבוצה של תסריטי בדיקה ממוקדים עבור רכיב או תרחיש מוגדר.',
    definitionHighLevel: 'A collection of test cases configured to verify a specific hardware IP block or platform configuration.',
    context: 'לכל מהנדס הולידציה יש Test Suite המותאם לרכיב שהוא אחראי עליו (למשל: PCIe Test Suite).'
  },

  // Lesson 10
  {
    id: 'c_nga',
    term: 'NGA (Next Generation Automation)',
    lessonId: 'l10',
    definition: 'מערכת האוטומציה המרכזית באינטל המנהלת ומריצה בדיקות וולידציה על אלפי מעבדים במקביל.',
    definitionHighLevel: 'Intel proprietary distributed automation platform scheduling, executing, and logging test runs across global validation hardware targets.',
    context: 'באמצעות ה-NGA, המהנדס יכול לשלוח הרצה של 500 בדיקות לביצוע על 20 SUTs שונים במעבדה בו-זמנית.'
  },
  {
    id: 'c_triage',
    term: 'Triage',
    lessonId: 'l10',
    definition: 'תהליך ניתוח הלוגים וסיווג כשלים במעבדה כדי לקבוע מה גרם לתקלה ומי הצוות שצריך לטפל בה.',
    definitionHighLevel: 'The diagnostic categorization flow isolating execution logs to pinpoint whether a failure is host-related, code-related or silicon-related.',
    context: 'הטריאז\' הוא השלב הראשון לאחר זיהוי נפילת בדיקה ב-NGA; הוא מונע בזבוז זמן על בדיקת בעיות שאינן באג אמיתי.'
  },
  {
    id: 'c_fail_rate',
    term: 'Fail Rate',
    lessonId: 'l10',
    definition: 'שיעור או אחוז הכישלונות של בדיקה מסוימת מתוך סך ההרצות שלה.',
    definitionHighLevel: 'The statistical ratio of failed test runs compared to the total number of attempts on a specific silicon stepping and build configuration.',
    context: 'בדיקה עם Fail Rate נמוך (למשל 1 ל-1000) מעידה על באג נדיר הדורש ניתוח מעמיק JTAG כדי לשחזר אותו.'
  },
  {
    id: 'c_defect',
    term: 'Defect Tracking',
    lessonId: 'l10',
    definition: 'מערכת לניהול, רישום ומעקב אחר באגים וליקויים שהתגלו בחומרה או בתוכנה.',
    definitionHighLevel: 'The database system (such as Intel HSD-ES) documenting defect life cycles from discovery to root-cause and official fix closure.',
    context: 'כאשר מהנדס הולידציה מוודא באג חומרה חדש, הוא פותח כרטיס באג במערכת ה-Defect Tracking ומצרף את כל ה-Crash logs.'
  },
  {
    id: 'c_log_analysis',
    term: 'Log Analysis',
    lessonId: 'l10',
    definition: 'ניתוח קבצי הטקסט והנתונים שהמערכת רושמת בזמן הבוט והריצה כדי לאבחן את סיבת הקריסה.',
    definitionHighLevel: 'The analytical parse of serial console output, crash data registers, and OS kernel logs to reconstruct the failure event timeline.',
    context: 'ניתוח לוגים אוטומטי בעזרת סקריפטים של Python מסייע לסנן רעשים ולזהות קודי שגיאה חבויים.'
  },
  {
    id: 'c_automation_script',
    term: 'Automation Scripting',
    lessonId: 'l10',
    definition: 'כתיבת קוד (לרוב ב-Python או Bash) המריץ בדיקות, משנה הגדרות ומנתח תוצאות ללא מגע יד אדם.',
    definitionHighLevel: 'Developing executable program configurations orchestrating test loops, telemetry acquisition, and result uploading to central databases.',
    context: 'כתיבת סקריפטים חוסכת שעות עבודה רבות ומאפשרת להריץ בדיקות רגרסיה מורכבות בלילה.'
  },
  {
    id: 'c_runtime',
    term: 'Run-time Environment',
    lessonId: 'l10',
    definition: 'סביבת התוכנה והחומרה שבה הבדיקה רצה בפועל (גרסת הלינוקס של SVOS, דרייברים וספריות תוכנה).',
    definitionHighLevel: 'The execution framework containing compilers, interpreters, libraries, and kernel drivers defining the execution space on the target device.',
    context: 'אי התאמה בסביבת הריצה (למשל ספרייה לא מעודכנת) יכולה לגרום לבדיקה להיכשל סתם; לכן שומרים על אחידותה.'
  },
  {
    id: 'c_sighting',
    term: 'Sighting',
    lessonId: 'l10',
    definition: 'המונח הרשמי באינטל לדיווח על באג חומרה או תוכנה חדש שנמצא בתהליך חקירה.',
    definitionHighLevel: 'Intel term for a documented product issue or anomaly submitted into HSD-ES for official engineering board review and resolution tracking.',
    context: 'דיווח Sighting איכותי חייב להכיל צעדי שחזור ברורים, גרסת BKC מדויקת, קבצי לוג וסקריפטים המדגימים את הכשל.'
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
      'השתמש באוסילוסקופ מהיר עם פרובים אקטיביים כדי למדוד את המתח בנקודות הקרובות ביותר למעבד (Vcc sensing points).',
      'שנה את הגדרות ה-Loadline Calibration (LLC) ב-BIOS כדי לפצות על נפילות המתח.',
      'עדכן את קובץ ה-P-code לגרסה המכילה אלגוריתמי פיצוי מתח משופרים.',
      'בדוק את קבצי הגדרות ה-Margining החשמליות ב-SUT.'
    ]
  }
];
