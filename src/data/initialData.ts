import type { Lesson, Concept, BugMatrixItem, ExamScenario } from '../types/validationData';

export const initialLessons: Lesson[] = [
  // --- HIGH LEVEL PATHWAY ---
  {
    id: 'l1_1',
    title: 'CPU Structure & Uncore Architecture',
    titleHe: 'יחידה 1.1: מבנה ה-CPU וה-Uncore',
    description: 'הבנת ההפרדה בין הליבות המחשבות לבין רכיבי המעטפת המנהלים את זרימת המידע במעבד, וחלוקת העבודה בתוך ה-SoC.',
    whyItIsHere: 'יחידה זו היא הבסיס לכל מהנדס וולידציה המעוניין להבין כיצד המעבד מתפקד כיחידה שלמה ולא רק כליבה בודדת.',
    prerequisites: [],
    conceptIds: ['c_core', 'c_uncore', 'c_compute_die', 'c_io_die', 'c_exec_units', 'c_pipeline', 'c_ht'],
    pathway: 'high',
    hasDiagram: true,
    contentSlides: [
      '### מבנה הליבה לעומת ה-Uncore במעבדי אינטל\n\nמעבד מודרני מורכב משני אזורים עיקריים:\n1. **Core (הליבה)**: יחידת העיבוד המרכזית המבצעת את פקודות המשתמש (מפענח, אוגרים, ALU, FPU).\n2. **Uncore (מעטפת המעבד)**: כל האזורים שאינם חלק ישיר מליבות החישוב אך הכרחיים לפעולתן. ה-Uncore כולל את זיכרון המטמון המשותף (L3 / Last Level Cache), בקר הזיכרון (Memory Controller), ובקר ה-System Agent שמנהל את כניסות ה-PCIe והתקשורת ללוח.',
      '### ארכיטקטורת Chiplets (Multi-Chiplet Architecture)\n\nמעבדים מודרניים כבר אינם מיוצרים כפיסת סיליקון אחת גדולה (Monolithic). במקום זאת, הם מורכבים מכמה פיסות סיליקון קטנות המחוברות ביניהן:\n* **Compute Die**: מכיל את ליבות הביצוע וה-Caches המהירים.\n* **I/O Die**: מיוצר בתהליך ייצור זול יותר ומכיל את בקרי החיבור החיצוניים (PCIe, USB, Memory Interfaces).\nחלוקה זו משפרת את אחוז היבול (Yield) במפעל ומאפשרת שימוש בטכנולוגיות ייצור שונות לכל חלק.'
    ],
    checkpoints: {
      type: 'bit-mask',
      bitMaskData: {
        instruction: 'הפעל את ה-Hyper-Threading על ידי הדלקת ביטים 2 ו-5 ברגיסטרי הגדרות הליבה (Core Thread Control).',
        initialRegister: [0, 0, 0, 0, 0, 0, 0, 0],
        targetRegister: [0, 0, 1, 0, 0, 1, 0, 0] // Bit 2 and Bit 5 set to 1 (counting 0-indexed from right: Bit 0 is far right)
      }
    },
    logScenario: {
      title: 'מעבדת דיבאג 1.1: קריסת Uncore Ring Bus Timeout',
      logLines: [
        '[00:00:01.002] INFO: System booting, resetting Core 0 vector',
        '[00:00:01.120] INFO: Core 0 is executing ucode patch version 0x14',
        '[00:00:02.400] INFO: Multi-Socket Interconnect (UPI) Link up',
        '[00:00:03.115] DEBUG: Core 1 requested L3 Cache line at address 0x3FFF8A',
        '[00:00:03.120] WARNING: Ring Bus arbiter packet collision detected in Segment 3',
        '[00:00:03.125] ERROR: Uncore ring controller timed out waiting for acknowledgment from Memory Agent',
        '[00:00:03.130] FATAL: SUT triggered CATERR# due to Ring Bus Timeout',
        '[00:00:03.135] INFO: System status halted.'
      ],
      filterKeywords: ['COLLISION', 'ERROR', 'FATAL', 'TIMEOUT'],
      correctLineIndex: 6, // Line with FATAL: SUT triggered CATERR# due to Ring Bus Timeout
      questions: [
        {
          question: 'מהי סיבת השורש (Root Cause) לקריסת ה-SUT לפי הלוג?',
          options: [
            'שגיאת תוכנה במערכת ההפעלה.',
            'חוסר תגובה (Timeout) ב-Ring Bus של ה-Uncore שבעקבותיו הופעל פין ה-CATERR# הקטסטרופלי.',
            'התחממות יתר של המעבד.',
            'כיול מתחים שגוי בזיכרון ה-DDR.'
          ],
          correctIndex: 1,
          explanation: 'הלוג מראה בבירור הודעת FATAL שנגרמה כתוצאה מ-Ring Bus Timeout שהפעיל את סיגנל ה-CATERR# במערכת.'
        }
      ]
    }
  },
  {
    id: 'l1_2',
    title: 'Memory Hierarchy & Cache Coherency',
    titleHe: 'יחידה 1.2: מדרג זיכרון ופרוטוקולי עקביות (Cache Coherency)',
    description: 'הבנת הארכיטקטורה של מדרג הזיכרון וכיצד המעבד מונע סתירות בנתונים כאשר מספר ליבות מעדכנות את אותו תא זיכרון במקביל.',
    whyItIsHere: 'שמירה על עקביות זיכרון המטמון היא מהאתגרים החמורים ביותר בוולידציה לוגית עקב אופי העבודה המקבילי של מעבדים.',
    prerequisites: ['l1_1'],
    conceptIds: ['c_l1_cache', 'c_l2_cache', 'c_l3_cache', 'c_cache_line', 'c_mesi', 'c_false_sharing'],
    pathway: 'high',
    contentSlides: [
      '### מדרג הזיכרון (Memory Hierarchy)\n\nעל מנת לגשר על פער המהירויות שבין הליבות המהירות לבין ה-DRAM האיטי, מעבדים משתמשים במערך זיכרונות מטמון (Caches) היררכי:\n* **L1 Cache**: זיכרון קטן ומהיר ביותר הממוקם בתוך הליבה עצמה (זמן גישה של 4-5 מחזורי שעון).\n* **L2 Cache**: גדול יותר, מוקצה לכל ליבה (12-14 מחזורי שעון).\n* **L3 Cache (LLC)**: משותף לכל הליבות במעבד, שומר על עקביות המידע (40-60 מחזורי שעון).\n* **DRAM (RAM)**: הזיכרון הראשי החיצוני למעבד (מאות מחזורי שעון).',
      '### פרוטוקול MESI לשמירת עקביות\n\nפרוטוקול **MESI** מגדיר 4 מצבים לכל שורה בזיכרון המטמון (Cache Line):\n1. **M (Modified)**: השורה שונתה ב-Cache הנוכחי ואינה מעודכנת בזיכרון הראשי.\n2. **E (Exclusive)**: השורה נמצאת רק ב-Cache הנוכחי והיא זהה לזיכרון הראשי.\n3. **S (Shared)**: השורה נמצאת במספר Caches במקביל והיא זהה לזיכרון הראשי.\n4. **I (Invalid)**: השורה אינה תקפה ויש לקרוא אותה מחדש.'
    ],
    checkpoints: {
      type: 'drag-drop',
      dragDropData: {
        items: ['L2 Cache', 'Registers (אוגרים)', 'DRAM (RAM)', 'L1 Cache', 'L3 Cache (LLC)'],
        correctOrder: ['Registers (אוגרים)', 'L1 Cache', 'L2 Cache', 'L3 Cache (LLC)', 'DRAM (RAM)'] // fastest to slowest
      }
    },
    logScenario: {
      title: 'מעבדת דיבאג 1.2: כשל בפרוטוקול MESI (Cache Coherency Failure)',
      logLines: [
        '[10:22:45.100] Core 0 state: CacheLine 0xAA990 is in SHARED state',
        '[10:22:45.105] Core 1 writes to CacheLine 0xAA990 -> transition to MODIFIED',
        '[10:22:45.110] Core 1 sends INVALIDATE signal via interconnect fabric',
        '[10:22:45.115] ERROR: Core 0 failed to toggle status of CacheLine 0xAA990 to INVALID (state stuck at SHARED)',
        '[10:22:45.120] Core 0 reads stale data from local CacheLine 0xAA990 instead of system memory',
        '[10:22:45.125] FATAL: Cache incoherency detected, Core 0 read value 0xFF instead of 0x00',
        '[10:22:45.130] SUT triggered system crash dump.'
      ],
      filterKeywords: ['ERROR', 'INVALID', 'FATAL', 'INCOHERENCY'],
      correctLineIndex: 5, // FATAL: Cache incoherency detected...
      questions: [
        {
          question: 'איזה כשל התרחש בפרוטוקול ה-MESI לפי לוג הדיבאג?',
          options: [
            'ליבה 0 לא קיבלה את אות ה-Invalidate ולכן קראה מידע מיושן ולא מעודכן (Stale Data).',
            'מייצב המתח קרס.',
            'ערוץ ה-PCIe התנתק.',
            'ה-RAM לא עבר אימון.'
          ],
          correctIndex: 0,
          explanation: 'הלוג מציג שליבה 0 נשארה במצב SHARED במקום לעבור ל-INVALID, מה שהוביל לקריאת נתון ישן (Stale) ולקריסת המערכת.'
        }
      ]
    }
  },
  {
    id: 'l1_3',
    title: 'High-Speed Interconnects (PCIe & CXL)',
    titleHe: 'יחידה 1.3: ממשקי תקשורת מהירים (Interconnects)',
    description: 'אפיון פרוטוקולי התקשורת המשמשים להעברת נתונים בין המעבד לרכיבים חיצוניים מהירים (כרטיסי מסך, זיכרונות ושרתים).',
    whyItIsHere: 'ולידציה של אפיקים מהירים דורשת הבנה של השלבים החשמליים (PHY) והפרוטוקוליים (Protocol) במעבר המידע.',
    prerequisites: ['l1_2'],
    conceptIds: ['c_pcie_bus', 'c_lanes', 'c_link_training', 'c_cxl_bus', 'c_upi_bus', 'c_phys_layer'],
    pathway: 'high',
    contentSlides: [
      '### ממשקי PCIe ורוחב פס\n\nממשק ה-**PCI Express (PCIe)** משמש לחיבור חומרות קצה למעבד בשיטת חיבור טורי מהיר (Point-to-Point Serial Link). המפרט מחולק לדורות (Gen 1 עד Gen 6), כאשר כל דור מכפיל את קצב העברת הנתונים.\n* **Lanes**: הקישור מורכב מערוצים פיזיים בודדים (x1, x4, x8, x16).\n* **Link Training**: תהליך החלפת אותות ראשוני בין המעבד לרכיב הקצה לקביעת מהירות יציבה ורוחב אפיק.',
      '### פרוטוקול CXL (Compute Express Link)\n\nפרוטוקול תקשורת חדיש הבנוי מעל השכבה הפיזית של PCIe. ה-**CXL** מאפשר לשתף מרחבי זיכרון בין המעבד לבין מאיצי AI וכרטיסי הרחבה ללא השהיות כפולות, תוך שמירה על עקביות זיכרון מלאה (Coherency).'
    ],
    checkpoints: {
      type: 'drag-drop',
      dragDropData: {
        items: ['PCIe Gen 3 x4', 'PCIe Gen 5 x16', 'PCIe Gen 4 x4', 'PCIe Gen 5 x4'],
        correctOrder: ['PCIe Gen 5 x16', 'PCIe Gen 5 x4', 'PCIe Gen 4 x4', 'PCIe Gen 3 x4'] // fastest to slowest
      }
    },
    logScenario: {
      title: 'מעבדת דיבאג 1.3: כשל אימון אפיק PCIe (LTSSM Stuck)',
      logLines: [
        '[02:11:00.120] INFO: PCIe controller initialization started',
        '[02:11:00.145] DEBUG: LTSSM transitions to DETECT state',
        '[02:11:00.220] DEBUG: LTSSM transitions to POLLING state',
        '[02:11:00.340] DEBUG: LTSSM transitions to CONFIG state',
        '[02:11:00.410] WARNING: Rx margins low on Lanes 4, 5, and 6',
        '[02:11:00.415] ERROR: LTSSM loopback training timed out, fallback to RECOVERY state',
        '[02:11:00.520] ERROR: PCIe Link training failed to establish Gen 5. Stuck in RECOVERY loop.',
        '[02:11:00.525] FATAL: Root port PCIe device not detected.'
      ],
      filterKeywords: ['ERROR', 'WARNING', 'STUCK', 'RECOVERY'],
      correctLineIndex: 6, // PCIe Link training failed...
      questions: [
        {
          question: 'באיזה שלב של מכונת המצבים (LTSSM) נתקע קישור ה-PCIe?',
          options: [
            'בשלב ה-Detect הראשוני.',
            'במצב לולאת ה-RECOVERY עקב שגיאות חשמליות ובעיות בשלמות האות.',
            'בשלב העברת המידע הראשי.',
            'הקישור הצליח ועובד כראוי.'
          ],
          correctIndex: 1,
          explanation: 'הלוג מראה בבירור כי מכונת המצבים (LTSSM) נכנסה ללולאת RECOVERY חוזרת בשל בעיות בקווי הנתונים (Rx margins low).'
        }
      ]
    }
  },
  {
    id: 'l1_4',
    title: 'Power & Thermal Management (C-States & P-States)',
    titleHe: 'יחידה 1.4: ניהול הספק ותרמי (Power Management)',
    description: 'הבנת מנגנוני הבקרה החשמליים והתרמיים המאזנים בין ביצועי שיא לבין יעילות אנרגטית ושמירה על יציבות המערכת.',
    whyItIsHere: 'ניהול הספק שגוי יכול לגרום לעיוות חשמלי (Droops) ולתקיעות מעבד או לשריפת הסיליקון בפועל.',
    prerequisites: ['l1_3'],
    conceptIds: ['c_pstates', 'c_cstates', 'c_throttling', 'c_turbo', 'c_vr', 'c_dvfs'],
    pathway: 'high',
    contentSlides: [
      '### ניהול מתח ותדר דינמי (DVFS)\n\nמנגנון ה-**DVFS** מאפשר למעבד לשנות את תדר העבודה ומתח ההזנה שלו בזמן אמת בהתאם לעומס המחשוב:\n* **P-States**: הגדרת ביצועי המעבד במצב פעיל. ככל שהעומס עולה, ה-P-State עולה והמעבד מקבל תדר ומתח גבוהים יותר.\n* **C-States**: מצבי חיסכון בחשמל כאשר הליבות אינן פעילות (C0 פעיל, C6 כיבוי שעון ומתח הליבה).\n* **VR (Voltage Regulator)**: מייצב המתח על לוח האם המקבל פקודות מהמעבד ומזרים זרם מתאים.'
    ],
    checkpoints: {
      type: 'bit-mask',
      bitMaskData: {
        instruction: 'הגדר את המעבד לעבור למצב חיסכון באנרגיה עמוק (Deep Sleep Core Power Down) על ידי הדלקת ביטים 0 ו-1 ברגיסטרי ה-PUNIT.',
        initialRegister: [0, 0, 0, 0, 0, 0, 0, 0],
        targetRegister: [0, 0, 0, 0, 0, 0, 1, 1] // Bit 0 and Bit 1 set to 1
      }
    },
    logScenario: {
      title: 'מעבדת דיבאג 1.4: קריסת מעבד עקב נפילת מתח מהירה (Vdroop Event)',
      logLines: [
        '[08:44:11.010] PUNIT telemetry: Core 0-7 running workload AVX-512',
        '[08:44:11.015] INFO: VR requested to deliver 150 Amps at 1.25V',
        '[08:44:11.020] WARNING: High transient current demand detected (high di/dt)',
        '[08:44:11.022] ERROR: VR output voltage dropped to 0.98V (Critical Vdroop below Vmin)',
        '[08:44:11.025] FATAL: Core 3 register file latching failed, instruction pointer lost',
        '[08:44:11.030] INFO: System status: Halted due to Core Hang'
      ],
      filterKeywords: ['DROPPED', 'WARNING', 'ERROR', 'FATAL'],
      correctLineIndex: 3, // ERROR: VR output voltage dropped to 0.98V...
      questions: [
        {
          question: 'מה גרם לתקיעת המעבד על פי פלט הדיאגנוסטיקה?',
          options: [
            'חוסר זיכרון RAM במחשב.',
            'אירוע Vdroop קריטי שבו מתח המעבד ירד מתחת לסף היציבות המינימלי (Vmin) עקב מעבר זרם מהיר.',
            'התחממות יתר של כרטיס המסך.',
            'העלאת דרייבר לא תקין של ה-USB.'
          ],
          correctIndex: 1,
          explanation: 'הלוג מפרט שמתח מייצב המתח (VR) ירד ל-0.98V (מתחת למתח המינימלי Vmin) בעקבות שינוי זרם חד (high di/dt), מה שגרם לקפיאת ליבה 3.'
        }
      ]
    }
  },

  // --- LOW LEVEL PATHWAY ---
  {
    id: 'l2_1',
    title: 'Microarchitecture & Out-of-Order Execution',
    titleHe: 'יחידה 2.1: מיקרו-ארכיטקטורה וביצוע פקודות מתקדם',
    description: 'חקר תרגום פקודות תוכנה (ISA) לתתי-פקודות חומרתיות (uOps) וכיצד המעבד מייעל את סדר הרצת הפקודות בליבה.',
    whyItIsHere: 'בוולידציה ברמת הלוגיקה, המהנדס בוחן את יחידות הפענוח, את ה-Reorder Buffer ומעקב אחר פקודות ספקולטיביות.',
    prerequisites: ['l1_4'],
    conceptIds: ['c_uops', 'c_decode', 'c_ooo', 'c_rename', 'c_rob', 'c_branch_pred', 'c_speculative'],
    pathway: 'low',
    contentSlides: [
      '### פענוח פקודות ותרגום ל-Micro-operations (uOps)\n\nמעבדי x86 מריצים סט פקודות מורכב (CISC). בפועל, החומרה הפנימית של המעבד מבצעת פקודות פשוטות וקטנות הרבה יותר הנקראות **uOps (Micro-operations)**. מפענח הפקודות (Instruction Decoder) מקבל את פקודות האסמבלי ומפרק אותן ל-uOps.\n\n### מנגנוני ביצוע מחוץ לסדר (Out-of-Order Execution)\n\nכדי לנצל את יחידות הביצוע במקסימום, המעבד אינו מחכה שכל פקודה תסתיים לפי סדר התוכנה המקורי. במקום זאת:\n* **ROB (Reorder Buffer)**: אוגר מיוחד שעוקב אחר כל ה-uOps שנמצאים בשלבי ביצוע שונים ומבטיח שהתוצאות ייכתבו חזרה בסדר הנכון (Retirement).\n* **Register Renaming**: מניעת תלויות מדומה בין פקודות על ידי מיפוי אוגרים לוגיים לאוגרים פיזיים מרובים.'
    ],
    checkpoints: {
      type: 'drag-drop',
      dragDropData: {
        items: ['uOps Execution (ביצוע)', 'Decode (פענוח פקודה)', 'ROB Retirement (רישום סופי)', 'Fetch (הבאת פקודה)', 'Rename & Schedule (מיפוי ותזמון)'],
        correctOrder: ['Fetch (הבאת פקודה)', 'Decode (פענוח פקודה)', 'Rename & Schedule (מיפוי ותזמון)', 'uOps Execution (ביצוע)', 'ROB Retirement (רישום סופי)'] // logical flow
      }
    },
    logScenario: {
      title: 'מעבדת דיבאג 2.1: קריסת לולאת ביצוע עקב ROB Block (Functional Deadlock)',
      logLines: [
        '[12:00:00.500] CPU ucode: Fetching instruction block at 0x8FF900',
        '[12:00:00.505] uOps dispatched: 4 read ops, 1 write op',
        '[12:00:00.510] ROB: Entry 45 allocated for instruction pointer 0x8FF902',
        '[12:00:00.515] DEBUG: Speculative Branch Prediction path taken (Predicted TAKEN)',
        '[12:00:00.520] ERROR: Branch resolution indicates prediction MISSED',
        '[12:00:00.525] ERROR: ROB Entry 45 stuck waiting for Memory Write ack. ROB buffer full.',
        '[12:00:00.530] FATAL: Functional Deadlock. Cores halted because ROB cannot retire instructions.',
        '[12:00:00.535] Core Dump: MC1_STATUS = 0xBE00000000000000'
      ],
      filterKeywords: ['ERROR', 'DEADLOCK', 'FATAL', 'STUCK'],
      correctLineIndex: 6, // FATAL: Functional Deadlock...
      questions: [
        {
          question: 'מדוע המעבד נתקע במצב של Functional Deadlock לפי הלוג?',
          options: [
            'עקב התחממות השבב.',
            'מנגנון ה-ROB התמלא ונחסם כי כתיבה אחת לזיכרון נתקעה, מה שמנע מהמעבד לשחרר (Retire) פקודות.',
            'נרשמה שגיאת תוכנה ב-Windows.',
            'אפיק ה-PCIe סגר את החיבור החשמלי.'
          ],
          correctIndex: 1,
          explanation: 'הלוג מציין ש-ROB Entry 45 נתקע בהמתנה לכתובת זיכרון, המאגר התמלא וגרם לקיפאון (Functional Deadlock).'
        }
      ]
    }
  },
  {
    id: 'l2_2',
    title: 'Digital Logic & Clock Timing (CDC)',
    titleHe: 'יחידה 2.2: לוגיקה דיגיטלית ותזמוני שעון (Clock & Timing)',
    description: 'הבנת המרכיבים הפיזיים של המעגל הדיגיטלי, חשיבות הסנכרון של אות השעון והסכנות הטמונות בחריגות זמן וCDC.',
    whyItIsHere: 'בוולידציה חשמלית ולוגית של תדרים גבוהים, הבנת Setup/Hold time ומניעת Metastability הן קריטיות ליציבות הטרנזיסטורים.',
    prerequisites: ['l2_1'],
    conceptIds: ['c_ff', 'c_clock_tree', 'c_setup_time', 'c_hold_time', 'c_timing_violation', 'c_cdc', 'c_metastability', 'c_jitter'],
    pathway: 'low',
    contentSlides: [
      '### שעונים וזמני הגעה (Setup & Hold Time)\n\nבמעגלים דיגיטליים מסונכרנים, רכיבי ה-**Flip-Flops (FF)** שומרים ערכים לוגיים בכל פעימת שעון. על מנת שהערך הלוגי ייקרא בצורה אמינה:\n* **Setup Time**: הזמן המינימלי שבו אות הנתונים חייב להישאר יציב *לפני* הגעת פעימת השעון.\n* **Hold Time**: הזמן המינימלי שבו אות הנתונים חייב להישאר יציב *אחרי* הגעת פעימת השעון.\nאם האות משתנה בתוך חלונות אלו, הרכיב נכנס למצב לא יציב הנקרא **Metastability**, והערך הלוגי עלול להתהפך (Timing Violation).',
      '### Clock Domain Crossing (CDC)\n\nמעבדים מודרניים פועלים עם מספר מתנדים (Clock Trees) בתדרים שונים. מעבר נתונים בין שני אזורים בעלי שעונים לא מסונכרנים נקרא **CDC**. ללא שימוש במסנכרנים (Synchronizers), ייווצרו שגיאות מידע קשות.'
    ],
    checkpoints: {
      type: 'bit-mask',
      bitMaskData: {
        instruction: 'כייל את מערכת הפיצוי (Synchronizer Delay Line) כדי למנוע מטא-סטביליות על ידי הפעלת ביטים 6 ו-7 באוגר תזמון שעון ה-CDC.',
        initialRegister: [0, 0, 0, 0, 0, 0, 0, 0],
        targetRegister: [1, 1, 0, 0, 0, 0, 0, 0] // Bit 6 and Bit 7 set to 1
      }
    },
    logScenario: {
      title: 'מעבדת דיבאג 2.2: כשל מטא-סטביליות במעבר CDC (Clock Domain Crossing)',
      logLines: [
        '[03:10:55.200] CLK_A: Frequency stable at 3.2 GHz',
        '[03:10:55.205] CLK_B: Frequency stable at 800 MHz (Unsynchronized to CLK_A)',
        '[03:10:55.210] DATA_FLOW: Signal routed from Domain CLK_A to Domain CLK_B',
        '[03:10:55.215] WARNING: Setup/Hold time window violated on receiver FF_reg_12',
        '[03:10:55.220] ERROR: Receiver register entered metastable state (output oscillates between 0 and 1)',
        '[03:10:55.225] FATAL: Stale data captured in Domain CLK_B. Timing Violation detected.',
        '[03:10:55.230] SUT output: Logic state corrupted.'
      ],
      filterKeywords: ['VIOLATION', 'WARNING', 'ERROR', 'METASTABLE'],
      correctLineIndex: 4, // ERROR: Receiver register entered metastable state...
      questions: [
        {
          question: 'מה גרם לכשל החומרה במעבר אות הנתונים בין תחומי השעון?',
          options: [
            'ספק הכוח הראשי נכבה.',
            'חריגת תזמון (Timing Violation) שגרמה למקלט להיכנס למצב מטא-סטבילי (Metastability) ולעוות את המידע.',
            'ה-BIOS לא תומך במעבד.',
            'הרצת תוכנת בדיקה לא מתאימה.'
          ],
          correctIndex: 1,
          explanation: 'הלוג מראה שאי-סנכרון תחומי השעון גרם לחריגה מחלון ה-Setup/Hold, מה שהוביל למטא-סטביליות ברגיסטר המקלט.'
        }
      ]
    }
  },
  {
    id: 'l2_3',
    title: 'Pre-Silicon Verification & Simulation',
    titleHe: 'יחידה 2.3: ולידציית תוכנה וסימולציה (Pre-Silicon)',
    description: 'כיצד בוחנים ומאמתים את לוגיקת המעבד באמצעות תוכנות סימולציה ומודלים מתמטיים מורכבים עוד לפני ייצור השבב.',
    whyItIsHere: 'מציאת באגים בשלב ה-Pre-Silicon מונעת הפסדי עתק של תכנון מחדש של מסיכות הייצור (Tape-out delay).',
    prerequisites: ['l2_2'],
    conceptIds: ['c_rtl', 'c_sv', 'c_uvm', 'c_testbench', 'c_bfm', 'c_emulation', 'c_coverage'],
    pathway: 'low',
    contentSlides: [
      '### מודל הלוגיקה (RTL) והסימולטור\n\nבשלב ה-Pre-Silicon, המעבד קיים רק כקוד תוכנה המתאר שערים לוגיים, לרוב בשפת **SystemVerilog** או VHDL. קוד זה נקרא **RTL (Register Transfer Level)**. המהנדסים מריצים את ה-RTL בתוך סימולטור ממוחשב המדמה מחזור אחר מחזור של שעון המעבד.\n\n### סביבת הבדיקות UVM (Universal Verification Methodology)\n\nכדי לייצר בדיקות אוטומטיות, משתמשים במתודולוגיית **UVM**:\n* **Testbench**: קוד חיצוני העוטף את ה-RTL ומייצר פקודות ובדיקות אקראיות (Constrained Random Verification).\n* **BFM (Bus Functional Model)**: מודל שמדמה התקנים חיצוניים כמו PCIe או זיכרון.',
      '### אמיולציה (Emulation)\n\nסימולציה ממוחשבת של מעבד היא איטית מאוד (כמה הרצים בודדים). כדי לרוץ מהר יותר, מתכנתי הוולידציה טוענים את ה-RTL למכשירי על המבוססים על אלפי רכיבי FPGA (מערכות כמו Palladium או Zebu של Synopsys/Cadence), המאפשרות להריץ את קוד המעבד במהירות של מגה-הרצים בודדים.'
    ],
    checkpoints: {
      type: 'drag-drop',
      dragDropData: {
        items: ['Toggle Coverage (כיסוי שינוי ביטים)', 'Statement Coverage (כיסוי שורות קוד)', 'Functional Coverage (כיסוי דרישות לוגיות)', 'Branch Coverage (כיסוי תנאים/ענפים)'],
        correctOrder: ['Functional Coverage (כיסוי דרישות לוגיות)', 'Branch Coverage (כיסוי תנאים/ענפים)', 'Statement Coverage (כיסוי שורות קוד)', 'Toggle Coverage (כיסוי שינוי ביטים)'] // importance level for validation logic
      }
    },
    logScenario: {
      title: 'מעבדת דיבאג 2.3: כשל באסרציה בסביבת UVM Testbench',
      logLines: [
        '[UVM_INFO] @ 2334000: reporter [TEST] Starting stimulus sequence on BFM PCIe',
        '[UVM_DEBUG] @ 2334050: driver sending transaction packet write_addr=0xDE00',
        '[UVM_DEBUG] @ 2334060: monitor observed write cycle assertion on DUT bus',
        '[UVM_WARNING] @ 2334070: DUT wait_states count exceeded limit (64 cycles)',
        '[UVM_ERROR] @ 2334080: AssertFail_PCIE_AckTimeout: Duty cycle protocol error. Device failed to assert ACK on transaction.',
        '[UVM_FATAL] @ 2334090: Simulation halted due to verification testbench error.',
        '[UVM_INFO] @ 2334100: --- Verification Summary: 1 Errors, 1 Warnings ---'
      ],
      filterKeywords: ['ERROR', 'FATAL', 'WARNING', 'FAIL'],
      correctLineIndex: 4, // UVM_ERROR: AssertFail_PCIE_AckTimeout...
      questions: [
        {
          question: 'איזו אסרציה (Assertion) נכשלה בסימולציה על פי הלוג?',
          options: [
            'כשל בקריאת קושחת המיקרוקוד.',
            'התקן ה-PCIe המדומה (DUT) חרג מזמן ההמתנה המותר (AckTimeout) ולא שלח אות ACK.',
            'המעבד התחמם בסימולציה.',
            'שגיאת כתיבה על הדיסק הקשיח של שרת האמיולציה.'
          ],
          correctIndex: 1,
          explanation: 'הלוג מראה הודעת UVM_ERROR על כשל באסרציית PCIE_AckTimeout כיוון שההתקן חרג מ-64 מחזורי המתנה ללא שליחת ACK.'
        }
      ]
    }
  },
  {
    id: 'l2_4',
    title: 'Post-Silicon Electrical & Physical Validation',
    titleHe: 'יחידה 2.4: ולידציה חשמלית ופיזית (Post-Silicon)',
    description: 'עבודה מעשית על השבב הפיזי במעבדה. בדיקת אותות, רעשים חשמליים, עמידות בתנאי קיצה ואימות תדרי שיא.',
    whyItIsHere: 'זוהי העבודה הפיזית האמיתית במעבדת הולידציה שמבטיחה שהסיליקון עובד יציב בייצור המוני בתנאים משתנים.',
    prerequisites: ['l2_3'],
    conceptIds: ['c_si', 'c_oscilloscope', 'c_eye_diagram', 'c_crosstalk', 'c_voltage_guard', 'c_pvt'],
    pathway: 'low',
    contentSlides: [
      '### ולידציה חשמלית ושלמות אותות (Signal Integrity)\n\nלאחר ייצור השבב במפעל, מהנדסי ה-Post-Silicon צריכים לבדוק שהמעגלים החשמליים יציבים תחת מגוון תנאים קיצוניים (PVT Corners: Process, Voltage, Temperature).\n* **Oscilloscope (אוסילוסקופ)**: מכשיר למדידת מתח חשמלי מהיר מאוד המציג שינויי מתח בפיקו-שניות.\n* **Eye Diagram (דיאגרמת עין)**: שיטה להערכת איכות האות החשמלי על ידי סופר-פוזיציה של כל מחזורי השידור. עין פתוחה מסמלת אות נקי מרעשים.\n* **Voltage Guardbanding**: מציאת המתח המינימלי היציב (Vmin) והוספת מרווח בטיחות (Guardband) כדי לפצות על פגמים בייצור.'
    ],
    checkpoints: {
      type: 'bit-mask',
      bitMaskData: {
        instruction: 'הגדר את ה-Voltage Guardband (מרווח הביטחון החשמלי) של המעבד ל-50 מיליוולט על ידי הדלקת ביטים 3, 4 ו-5 ברגיסטרי הדיבאג החשמליים של ה-VR.',
        initialRegister: [0, 0, 0, 0, 0, 0, 0, 0],
        targetRegister: [0, 0, 1, 1, 1, 0, 0, 0] // Bit 3, 4, 5 set to 1
      }
    },
    logScenario: {
      title: 'מעבדת דיבאג 2.4: כשל חשמלי עקב עין סגורה בקו PCIe Gen 5 (Eye Diagram Failure)',
      logLines: [
        '[15:10:00.010] Scope connected to TX differential pairs PCIe Slot 0',
        '[15:10:00.120] Telemetry: Running test pattern PRBS31 at 32 GT/s',
        '[15:10:00.220] Eye Height measured: 15mV (Target minimum: 45mV) - CRITICAL WARNING',
        '[15:10:00.230] WARNING: Channel crosstalk measured at -22dB (exceeds threshold)',
        '[15:10:00.235] ERROR: High jitter on PCIe clock path prevents receiver CDR lock',
        '[15:10:00.240] FATAL: Physical layer degradation detected. Eye diagram closed.',
        '[15:10:00.245] Info: Signal Margining failure logged.'
      ],
      filterKeywords: ['HEIGHT', 'ERROR', 'FATAL', 'JITTER'],
      correctLineIndex: 5, // FATAL: Physical layer degradation...
      questions: [
        {
          question: 'מהי סיבת השורש החשמלית לכשל בקריאת הנתונים?',
          options: [
            'מתח גבוה מדי בספק הכוח.',
            'רעש הדדי (Crosstalk) וג\'יטר גבוה שגרמו לדיאגרמת עין סגורה (הגובה נמדד כ-15mV במקום 45mV) המונעת מהמקלט לקרוא נתונים בצורה אמינה.',
            'גרסת BIOS מיושנת.',
            'המחשב נכבה בגלל טמפרטורה.'
          ],
          correctIndex: 1,
          explanation: 'הלוג מראה שדיאגרמת העין סגורה לחלוטין (גובה של 15mV לעומת דרישת מינימום של 45mV) עקב רעשים וג\'יטר בנתיב האות החשמלי.'
        }
      ]
    }
  }
];

export const initialConcepts: Concept[] = [
  // core & uncore
  {
    id: 'c_core',
    term: 'CPU Core',
    definition: 'ליבת המעבד - האזור האחראי על ביצוע פקודות והרצת חישובים לוגיים ומתמטיים.',
    definitionHighLevel: 'The primary processing unit containing decoding logic, registers, ALU, and local L1/L2 caches.',
    category: 'מבנה המעבד (Uncore)',
    context: 'בוולידציה לוגית בודקים את הליבה מול פקודות אסמבלי.'
  },
  {
    id: 'c_uncore',
    term: 'Uncore',
    definition: 'מעטפת המעבד - רכיבי השבב שאינם ליבות חישוב, כולל בקרי הזיכרון, Caches משותפים ו-System Agent.',
    definitionHighLevel: 'Intel term for components of a CPU not in the core, such as memory controllers, LLC, and ring interconnects.',
    category: 'מבנה המעבד (Uncore)',
    context: 'בדיקות ה-Uncore מתרכזות בעיקר בנתיבי הנתונים ובבקרי ה-I/O.'
  },
  {
    id: 'c_compute_die',
    term: 'Compute Die',
    definition: 'פיסת סיליקון (Chiplet) המיועדת רק לליבות הביצוע וזיכרונות המטמון המהירים.',
    definitionHighLevel: 'Silicon die dedicated solely to core pipelines and caches, optimized for performance process nodes.',
    category: 'מבנה המעבד (Uncore)',
    context: 'אינטל משתמשת בתהליך ייצור מתקדם במיוחד עבור ה-Compute Die.'
  },
  {
    id: 'c_io_die',
    term: 'I/O Die',
    definition: 'פיסת סיליקון המנהלת את התקשורת של המעבד עם שאר המערכת (DDR, PCIe).',
    definitionHighLevel: 'A specialized chiplet managing global system interfaces, memory controllers, and interconnect fabrics.',
    category: 'מבנה המעבד (Uncore)',
    context: 'הפרדת ה-I/O Die מה-Compute Die מאפשרת גמישות וחיסכון בעלויות הייצור.'
  },
  {
    id: 'c_exec_units',
    term: 'Execution Units',
    definition: 'רכיבי החומרה בתוך הליבה שמבצעים את הפעולות עצמן (כמו ALU, FPU).',
    definitionHighLevel: 'Hardware components inside CPU core designed to perform calculations or actions requested by instructions.',
    category: 'מבנה המעבד (Uncore)',
    context: 'בדיקת יחידות הביצוע נעשית באמצעות הרצת עומסי AVX/AMX.'
  },
  {
    id: 'c_pipeline',
    term: 'Execution Pipeline',
    definition: 'צינור העיבוד המאפשר להריץ מספר פקודות בשלבים שונים במקביל.',
    definitionHighLevel: 'Technique where hardware overlaps instruction execution steps (Fetch, Decode, Execute, Writeback).',
    category: 'מבנה המעבד (Uncore)',
    context: 'תקיעה ב-Pipeline גורמת לירידה משמעותית בביצועי המעבד.'
  },
  {
    id: 'c_ht',
    term: 'Hyper-Threading (HT)',
    definition: 'טכנולוגיה המאפשרת לליבה פיזית אחת להריץ שני תהליכים (Threads) במקביל.',
    definitionHighLevel: 'Intel implementation of Simultaneous Multithreading (SMT) exposing one physical core as two logical cores to the OS.',
    category: 'מבנה המעבד (Uncore)',
    context: 'אימות Hyper-Threading דורש בדיקת שיתוף משאבים לוגיים בתוך הליבה.'
  },

  // cache & coherency
  {
    id: 'c_l1_cache',
    term: 'L1 Cache',
    definition: 'זיכרון המטמון הקטן והמהיר ביותר הממוקם ישירות בתוך כל ליבה.',
    definitionHighLevel: 'Level 1 cache, highly optimized memory closest to the execution units with single-cycle latency.',
    category: 'מדרג זיכרון',
    context: 'מדידת מהירות הגישה ל-L1 היא חלק קבוע מבדיקות הביצועים.'
  },
  {
    id: 'c_l2_cache',
    term: 'L2 Cache',
    definition: 'זיכרון מטמון בינוני המוקצה לכל ליבה בנפרד.',
    definitionHighLevel: 'Level 2 cache, larger than L1 with slightly higher latency, serving as a secondary buffer.',
    category: 'מדרג זיכרון',
    context: 'בדיקת L2 Margining מסייעת במציאת תדר העבודה היציב של ה-Cache.'
  },
  {
    id: 'c_l3_cache',
    term: 'L3 Cache (LLC)',
    definition: 'זיכרון המטמון המשותף לכל הליבות במעבד, המכונה גם Last Level Cache.',
    definitionHighLevel: 'Level 3 or Last Level Cache shared across all cores to reduce accesses to the slow DRAM.',
    category: 'מדרג זיכרון',
    context: 'שגיאות עקביות רבות נובעות מתזמוני גישה שגויים ל-L3 Cache.'
  },
  {
    id: 'c_cache_line',
    term: 'Cache Line',
    definition: 'יחידת המידע הבסיסית המועברת בין זיכרון ה-RAM ל-Caches (לרוב ברוחב 64 בתים).',
    definitionHighLevel: 'The standard block unit for cache transactions, typically 64 bytes of data aligned in memory.',
    category: 'מדרג זיכרון',
    context: 'מנגנון ה-Coherency עוקב אחר מצבו של כל Cache Line בנפרד.'
  },
  {
    id: 'c_mesi',
    term: 'MESI Protocol',
    definition: 'פרוטוקול עקביות זיכרון המטמון המגדיר 4 מצבים (Modified, Exclusive, Shared, Invalid).',
    definitionHighLevel: 'Standard hardware protocol for maintaining cache consistency across multiple CPU cores.',
    category: 'מדרג זיכרון',
    context: 'ולידציה של MESI מתמקדת בבדיקה שכל הליבות רואות תמיד את הערך המעודכן ביותר.'
  },
  {
    id: 'c_false_sharing',
    term: 'False Sharing',
    definition: 'פגיעה בביצועים כאשר שתי ליבות מעדכנות משתנים שונים הנמצאים באותו Cache Line.',
    definitionHighLevel: 'Performance degradation when multiple cores modify independent variables residing on the same cache line.',
    category: 'מדרג זיכרון',
    context: 'דיבאג של False Sharing דורש הפרדת משתנים בתוכנה לקווי זיכרון נפרדים.'
  },

  // interconnects
  {
    id: 'c_pcie_bus',
    term: 'PCI Express (PCIe)',
    definition: 'אפיק תקשורת מהיר לחיבור כרטיסי הרחבה, כרטיסי מסך וכונני אחסון.',
    definitionHighLevel: 'High-speed computer expansion bus standard featuring point-to-point packet communication.',
    category: 'ממשקי תקשורת מהירים (Interconnects)',
    context: 'בדיקת PCIe Gen 5/6 דורשת ניתוח מתחים ואנליזת גל חשמלי.'
  },
  {
    id: 'c_lanes',
    term: 'Lanes',
    definition: 'ערוצי תקשורת פיזיים טוריים המרכיבים את חיבור ה-PCIe.',
    definitionHighLevel: 'Physical transmit and receive differential pairs forming a single link pathway.',
    category: 'ממשקי תקשורת מהירים (Interconnects)',
    context: 'קישור PCIe x16 כולל 16 ערוצי (Lanes) נתונים פיזיים.'
  },
  {
    id: 'c_link_training',
    term: 'Link Training (LTSSM)',
    definition: 'תהליך כיול חשמלי ופרוטוקולי לחיבור יציב של אפיק ה-PCIe.',
    definitionHighLevel: 'Hardware protocol sequence configuring speed, lane width, and signal quality of a serial link.',
    category: 'ממשקי תקשורת מהירים (Interconnects)',
    context: 'תקיעה במצב RECOVERY מצביעה לרוב על בעיית שלמות אות חשמלית בלוח.'
  },
  {
    id: 'c_cxl_bus',
    term: 'Compute Express Link (CXL)',
    definition: 'פרוטוקול מעל PCIe לשיתוף זיכרון ועקביות נתונים מול מאיצים חיצוניים.',
    definitionHighLevel: 'Industry standard interface enabling memory pooling and high-speed coherent expansion cards.',
    category: 'ממשקי תקשורת מהירים (Interconnects)',
    context: 'אימות CXL דורש בדיקת תרחישי גישה לזיכרון משותף.'
  },
  {
    id: 'c_upi_bus',
    term: 'UPI (Ultra Path Interconnect)',
    definition: 'אפיק תקשורת מהיר של אינטל לקישור בין מעבדים פיזיים שונים בלוחות אם מרובי תושבות.',
    definitionHighLevel: 'Intel point-to-point processor interconnect for multi-socket server platforms.',
    category: 'ממשקי תקשורת מהירים (Interconnects)',
    context: 'בוולידציית שרתים בודקים את העברת המידע ותיאום המצבים בין המעבדים דרך ה-UPI.'
  },
  {
    id: 'c_phys_layer',
    term: 'Physical vs Protocol Layer',
    definition: 'ההבדל בין השכבה החשמלית הפיזית לבין שכבת ניהול הנתונים והפרוטוקול.',
    definitionHighLevel: 'The distinction between physical signal transmission (PHY) and packet processing (Protocol).',
    category: 'ממשקי תקשורת מהירים (Interconnects)',
    context: 'בעיות פיזיות נבדקות באוסילוסקופ, בעוד בעיות פרוטוקול נחקרות בעזרת PCIe Logic Analyzer.'
  },

  // power
  {
    id: 'c_pstates',
    term: 'P-States',
    definition: 'מצבי ביצועים של המעבד הפעיל (שילובים שונים של תדר ומתח עבודה).',
    definitionHighLevel: 'ACPI performance states configuring target core frequency and voltage during active cycles.',
    category: 'ניהול הספק ותרמי (Power)',
    context: 'בדיקת P-states נועדה לוודא מעבר יציב בין מהירויות ללא תקלות חשמליות.'
  },
  {
    id: 'c_cstates',
    term: 'C-States',
    definition: 'מצבי חיסכון בחשמל של ליבות המעבד בזמן מנוחה (שינה).',
    definitionHighLevel: 'ACPI sleep states defining power savings levels when cores are idle (e.g. clock gating, power gating).',
    category: 'ניהול הספק ותרמי (Power)',
    context: 'כניסה למצב C6 דורשת ניתוק מתח הליבה פיזית על ידי ה-PUNIT.'
  },
  {
    id: 'c_throttling',
    term: 'Thermal Throttling',
    definition: 'מנגנון בטיחות המוריד את תדר המעבד כשהוא מתחמם יתר על המידה.',
    definitionHighLevel: 'Dynamic performance scaling triggered by temperature sensors to keep die junctions below TjMax.',
    category: 'ניהול הספק ותרמי (Power)',
    context: 'אימות Thermal Throttling מבוצע על ידי חימום יזום של ה-SUT במעבדה.'
  },
  {
    id: 'c_turbo',
    term: 'Turbo Boost',
    definition: 'מנגנון המאיץ את תדר הליבות מעבר לתדר הבסיס בהתאם לטמפרטורה ולתקציב ההספק הפנוי.',
    definitionHighLevel: 'Dynamic frequency overclocking within safe power and temperature margins.',
    category: 'ניהול הספק ותרמי (Power)',
    context: 'בדיקות Turbo בודקות את מהירות התגובה החשמלית של מייצב המתח (VR).'
  },
  {
    id: 'c_vr',
    term: 'Voltage Regulator (VR)',
    definition: 'מייצב המתח בלוח האם המספק את החשמל הנדרש למעבד.',
    definitionHighLevel: 'On-board voltage regulator delivering target current and voltage configurations dynamically.',
    category: 'ניהול הספק ותרמי (Power)',
    context: 'רעשים במוצא ה-VR יכולים להשפיע על יציבות המעבד בתדרים גבוהים.'
  },
  {
    id: 'c_dvfs',
    term: 'DVFS',
    definition: 'שינוי דינמי של מתח ותדר העבודה במטרה לחסוך באנרגיה.',
    definitionHighLevel: 'Dynamic Voltage and Frequency Scaling optimizing active power draw based on computational demand.',
    category: 'ניהול הספק ותרמי (Power)',
    context: 'מכונת ה-PUNIT במעבד מנהלת את ה-DVFS באמצעות פקודות SVID.'
  },

  // micro-arch
  {
    id: 'c_uops',
    term: 'Micro-operations (uOps)',
    definition: 'תתי-פקודות חומרתיות פשוטות אליהן מפורקות פקודות ה-x86 המורכבות.',
    definitionHighLevel: 'Internal hardware instructions decoded from complex ISA machine instructions.',
    category: 'מיקרו-ארכיטקטורה',
    context: 'מפענח המעבד מעביר את ה-uOps אל תור הביצוע (ROB).'
  },
  {
    id: 'c_decode',
    term: 'Instruction Decode',
    definition: 'שלב בצינור העיבוד המתרגם את פקודות התוכנה לפעולות חומרה.',
    definitionHighLevel: 'The stage of the pipeline translating binary macro-instructions into internal micro-operations.',
    category: 'מיקרו-ארכיטקטורה',
    context: 'בולידציה בודקים את תקינות המפענח במצבי קצה שונים של קוד.'
  },
  {
    id: 'c_ooo',
    term: 'Out-of-Order Execution (OoO)',
    definition: 'שיטת ביצוע שבה המעבד מריץ פקודות מוכנות מראש ללא קשר לסדרן המקורי בתוכנה.',
    definitionHighLevel: 'Instruction processing methodology executing instructions as resources become available rather than sequentially.',
    category: 'מיקרו-ארכיטקטורה',
    context: 'ביצוע מחוץ לסדר דורש מנגנון מורכב למניעת שגיאות לוגיות.'
  },
  {
    id: 'c_rename',
    term: 'Register Renaming',
    definition: 'מיפוי אוגרים לוגיים לאוגרים פיזיים מרובים למניעת תלויות שווא.',
    definitionHighLevel: 'Mapping logic architectural registers to a larger physical register file to avoid data dependency hazards.',
    category: 'מיקרו-ארכיטקטורה',
    context: 'איתור באגים ברגיסטרי ה-Rename נעשה באמצעות מעקב אחר השתקפות אוגרים.'
  },
  {
    id: 'c_rob',
    term: 'Reorder Buffer (ROB)',
    definition: 'האוגר הפנימי המפקח על ביצוע ה-uOps ומבטיח כתיבה מסודרת (Retirement) לזיכרון.',
    definitionHighLevel: 'Hardware buffer track of executing instructions, enabling out-of-order execution and in-order retirement.',
    category: 'מיקרו-ארכיטקטורה',
    context: 'תקיעה ב-ROB גורמת ל-Deadlock במעבד.'
  },
  {
    id: 'c_branch_pred',
    term: 'Branch Prediction',
    definition: 'חיזוי נתיב הריצה של תנאי בקוד (כמו if/else) עוד לפני פתרונו.',
    definitionHighLevel: 'Architectural engine guessing the outcome of conditional instructions to prevent execution stalls.',
    category: 'מיקרו-ארכיטקטורה',
    context: 'בדיקת המנגנון מתבצעת על ידי הרצת תבניות קוד בעלות אופי אקראי.'
  },
  {
    id: 'c_speculative',
    term: 'Speculative Execution',
    definition: 'ביצוע פקודות בהתבסס על החיזוי. אם החיזוי שגוי, התוצאות נזרקות.',
    definitionHighLevel: 'Core pipeline executing instruction branches speculatively before confirming their logical path requirement.',
    category: 'מיקרו-ארכיטקטורה',
    context: 'ולידציית אבטחה של ביצוע ספקולטיבי נועדה למנוע פרצות מסוג Spectre/Meltdown.'
  },

  // clock & timing
  {
    id: 'c_ff',
    term: 'Flip-Flops',
    definition: 'רכיבי זיכרון בסיסיים השומרים ערך בינארי (0 או 1) ומסתנכרנים עם אות השעון.',
    definitionHighLevel: 'Bistable multivibrator circuits storing 1 bit of logic state synchronized to clock edge transitions.',
    category: 'תזמוני שעון (Clock & Timing)',
    context: 'בוולידציה לוגית עוקבים אחר השערים של ה-Flip-Flops.'
  },
  {
    id: 'c_clock_tree',
    term: 'Clock Tree',
    definition: 'רשת המוליכים המעבירה את אות השעון באופן שווה לכל חלקי שבב הסיליקון.',
    definitionHighLevel: 'Distribution network delivering clock signals synchronously to all sequential register components.',
    category: 'תזמוני שעון (Clock & Timing)',
    context: 'תכנון לקוי של ה-Clock Tree מוביל להפרשי זמני הגעת השעון (Clock Skew).'
  },
  {
    id: 'c_setup_time',
    term: 'Setup Time',
    definition: 'הזמן שבו אות הנתונים חייב להיות יציב לפני הגעת השעון.',
    definitionHighLevel: 'The minimum duration that data input must remain stable before the clock trigger transition edge.',
    category: 'תזמוני שעון (Clock & Timing)',
    context: 'חריגה מחלון ה-Setup גורמת לקריאת ערך שגוי.'
  },
  {
    id: 'c_hold_time',
    term: 'Hold Time',
    definition: 'הזמן שבו אות הנתונים חייב להישאר יציב לאחר הגעת השעון.',
    definitionHighLevel: 'The minimum duration that data input must remain stable after the clock trigger transition edge.',
    category: 'תזמוני שעון (Clock & Timing)',
    context: 'שגיאות Hold נפתרות לעיתים על ידי הוספת השהיות (Delays) במסלול האות.'
  },
  {
    id: 'c_timing_violation',
    term: 'Timing Violation',
    definition: 'כשל שבו אות נתונים משתנה בתוך חלון ה-Setup/Hold של ה-Flip-Flop.',
    definitionHighLevel: 'Failure in meeting setup or hold timing parameters, producing unstable data state calculations.',
    category: 'תזמוני שעון (Clock & Timing)',
    context: 'שגיאות תזמון נחקרות בעזרת כלי סימולציה סטטיים (STA).'
  },
  {
    id: 'c_cdc',
    term: 'Clock Domain Crossing (CDC)',
    definition: 'מעבר של אות בין שני אזורים במעבד הפועלים תחת תדרי שעון שונים ובלתי מסונכרנים.',
    definitionHighLevel: 'Signals routing between logic gates driven by separate, asynchronous clock domains.',
    category: 'תזמוני שעון (Clock & Timing)',
    context: 'בדיקת CDC היא קריטית למניעת מטא-סטביליות.'
  },
  {
    id: 'c_metastability',
    term: 'Metastability',
    definition: 'מצב לא יציב שבו מוצא ה-Flip-Flop אינו מוגדר כ-0 או כ-1 עקב שגיאות תזמון.',
    definitionHighLevel: 'Unstable electronic state where digital circuit outputs oscillate between 0 and 1 before settling.',
    category: 'תזמוני שעון (Clock & Timing)',
    context: 'מטא-סטביליות יכולה להשחית את המידע העובר במעבד.'
  },
  {
    id: 'c_jitter',
    term: 'Jitter',
    definition: 'סטיות קטנות בתדר או בזמני הגעת פעימות השעון.',
    definitionHighLevel: 'Short-term variations of clock signal edges from their ideal positions in time.',
    category: 'תזמוני שעון (Clock & Timing)',
    context: 'רמת Jitter גבוהה פוגעת בביצועים החשמליים של האפיקים.'
  },

  // pre-silicon
  {
    id: 'c_rtl',
    term: 'RTL (Register Transfer Level)',
    definition: 'ייצוג תכנוני של המעבד המתאר את מעבר המידע בין אוגרים ושערים לוגיים.',
    definitionHighLevel: 'Hardware design abstraction representing digital signals flow between hardware registers.',
    category: 'ולידציית Pre-Silicon',
    context: 'RTL נכתב בשפת SystemVerilog ומסומלץ במחשב.'
  },
  {
    id: 'c_sv',
    term: 'SystemVerilog',
    definition: 'שפת תיאור חומרה (HDL) המשמשת לתכנון וולידציה של שבבים.',
    definitionHighLevel: 'Hardware description and verification language widely used to design and test digital circuits.',
    category: 'ולידציית Pre-Silicon',
    context: 'SystemVerilog כוללת תכונות של תכנות מונחה עצמים התומכות ב-UVM.'
  },
  {
    id: 'c_uvm',
    term: 'UVM',
    definition: 'מתודולוגיה סטנדרטית לכתיבת סביבות בדיקה אוטומטיות (Testbenches).',
    definitionHighLevel: 'Universal Verification Methodology, a standardized framework for constructing reusable testbenches.',
    category: 'ולידציית Pre-Silicon',
    context: 'שימוש ב-UVM מייעל את יצירת הבדיקות ומאפשר שימוש חוזר בקוד.'
  },
  {
    id: 'c_testbench',
    term: 'Testbench',
    definition: 'סביבת תוכנה העוטפת את ה-RTL ומייצרת גירויים ובדיקות לאימות השבב.',
    definitionHighLevel: 'Verification environment wrapper injecting stimulus and checking outputs against behavioral golden models.',
    category: 'ולידציית Pre-Silicon',
    context: 'ה-Testbench מייצר תרחישים ומודד את אחוז הכיסוי הלוגי.'
  },
  {
    id: 'c_bfm',
    term: 'BFM (Bus Functional Model)',
    definition: 'מודל המדמה פעילות של ממשק תקשורת (כמו PCIe) כדי לבחון את המעבד בסימולציה.',
    definitionHighLevel: 'Simulation model mimicking physical interface protocols to interact with target design buses.',
    category: 'ולידציית Pre-Silicon',
    context: 'ה-BFM מדמה שליחה וקבלה של חבילות נתונים בסימולציה.'
  },
  {
    id: 'c_emulation',
    term: 'Emulation',
    definition: 'טעינת ה-RTL של המעבד למחשב-על מבוסס FPGA כדי להריץ את הבדיקות במהירות גבוהה.',
    definitionHighLevel: 'Running hardware models on massive array programmable FPGAs to accelerate test cycles.',
    category: 'ולידציית Pre-Silicon',
    context: 'מערכות אמיולציה פועלות במהירות של מגה-הרצים בודדים ומאפשרות להריץ מערכות הפעלה.'
  },
  {
    id: 'c_coverage',
    term: 'Code/Functional Coverage',
    definition: 'מדד המציין איזה אחוז משורות הקוד או מהמצבים הלוגיים נבדק בפועל.',
    definitionHighLevel: 'Metrics evaluating test completeness, showing statement, branch, or functional logic hit ratios.',
    category: 'ולידציית Pre-Silicon',
    context: 'אישור Tape-out דורש הגעה ל-100% כיסוי פונקציונלי מוגדר.'
  },

  // post-silicon
  {
    id: 'c_si',
    term: 'Signal Integrity',
    definition: 'איכות והתנהגות האותות החשמליים העוברים במוליכי הנחושת בלוח.',
    definitionHighLevel: 'The measure of electrical signal quality transmitted through package interconnect lanes.',
    category: 'ולידציית Post-Silicon',
    context: 'בעיות Signal Integrity מובילות לעיוות מידע באפיקים המהירים.'
  },
  {
    id: 'c_oscilloscope',
    term: 'Oscilloscope',
    definition: 'מכשיר מדידה המציג גרפית את שינויי המתח החשמלי בקווי התקשורת בזמן אמת.',
    definitionHighLevel: 'Laboratory instrument capturing high-speed electrical signals to display voltage over time.',
    category: 'ולידציית Post-Silicon',
    context: 'האוסילוסקופ מאפשר לבדוק את איכות השעון החשמלי במעבדה.'
  },
  {
    id: 'c_eye_diagram',
    term: 'Eye Diagram',
    definition: 'דיאגרמת גל הנוצרת מסופר-פוזיציה של כל מחזורי השידור, המציגה את איכות האות.',
    definitionHighLevel: 'Oscilloscope waveform display overlays multiple signal traces showing noise margins and timing jitter.',
    category: 'ולידציית Post-Silicon',
    context: 'עין פתוחה מעידה על אות נקי מרעשים ויציב לקריאה.'
  },
  {
    id: 'c_crosstalk',
    term: 'Crosstalk',
    definition: 'רעש חשמלי הנגרם מהשראה הדדית בין קווי הולכה סמוכים.',
    definitionHighLevel: 'Electromagnetic interference caused by signal coupling between adjacent board interconnect traces.',
    category: 'ולידציית Post-Silicon',
    context: 'צפיפות הקווים בלוח האם מגבירה את הסיכון ל-Crosstalk.'
  },
  {
    id: 'c_voltage_guard',
    term: 'Voltage Guardbanding',
    definition: 'מרווח בטחון במתח העבודה המפצה על שונות בייצור ושינויי טמפרטורה.',
    definitionHighLevel: 'Adding safe voltage offsets over the core Vmin limit to secure execution under environmental variances.',
    category: 'ולידציית Post-Silicon',
    context: 'קביעת ה-Guardband היא קריטית למניעת קריסות של לקוחות קצה.'
  },
  {
    id: 'c_pvt',
    term: 'PVT Corner',
    definition: 'נקודת בדיקה המשלבת תהליך ייצור (Process), מתח (Voltage) וטמפרטורה (Temperature).',
    definitionHighLevel: 'Extreme operational boundaries pairing process silicon speed variations with voltage and temperature limits.',
    category: 'ולידציית Post-Silicon',
    context: 'ולידציה פיזית בודקת את ה-SUT בפינות ה-PVT הקיצוניות ביותר.'
  }
];

export const bugMatrixItems: BugMatrixItem[] = [
  {
    category: 'Functional Deadlock',
    description: 'שתי ליבות או יותר נתקעות במצב המתנה הדדית למשאב (למשל תא ב-Cache), מה שגורם לקפיאה מוחלטת של המעבד.',
    debugFlow: 'ניתוח ה-Reorder Buffer (ROB) באמצעות PythonSV/JTAG, זיהוי ה-uOps התלויים ואיתור הפקודה שלא שוחררה.'
  },
  {
    category: 'Silent Data Corruption (SDC)',
    description: 'השגיאה המסוכנת ביותר: המעבד מבצע חישוב שגוי אך לא קורס, ופולט נתון פגום מבלי שהמערכת מודעת לכך.',
    debugFlow: 'הרצת בדיקות השוואה מתמטיות (Formal Verification) מול מודל התנהגותי מושלם (Golden Model) לאיתור שערים לוגיים דולפים.'
  },
  {
    category: 'Timing/Setup Violation',
    description: 'אות השעון מגיע מהר או לאט מדי לרכיב ה-Flip-Flop, וכתוצאה מכך נקרא ערך לוגי הפוך (0 במקום 1 או להפך).',
    debugFlow: 'ניתוח דיאגרמות תזמון (Waveform Analysis), ביצוע Margining למתח ותדר העבודה וקביעת ה-Guardband הנדרש.'
  },
  {
    category: 'Cache Incoherency',
    description: 'ליבה א\' מעדכנת נתון ב-L1 Cache שלה, אך ליבה ב\' קוראת נתון ישן מה-L3 Cache מכיוון שפרוטוקול הסנכרון MESI נכשל.',
    debugFlow: 'מעקב אחר הסטטוסים של פרוטוקול MESI באמצעות קבצי לוג של ה-Interconnect וזיהוי שורות ה-Cache התקועות.'
  },
  {
    category: 'Link Training Failure',
    description: 'פרוטוקול PCIe לא מצליח לבצע סנכרון ראשוני (Handshake) מול רכיב חומרה חיצוני, והרוחב הנתונים קטן או נתקע.',
    debugFlow: 'ניתוח הודעות ה-LTSSM (Link Training and Status State Machine) בלוג של הבקר וניטור רוחב עין האות (Eye Diagram).'
  }
];

export const examScenarios: ExamScenario[] = [
  {
    id: 'e1',
    pathway: 'high',
    question: 'במהלך בדיקת עומסים על מעבד שרתים, התקבל כשל מסוג Thermal Trip (כיבוי הגנתי בשל חום). הנתונים מראים שמייצב המתח (VR) תקין. עיין בנתוני ה-C-States המצורפים וקבע איזה מנגנון פגע בניהול האנרגיה הדינמי.',
    options: [
      'מנגנון ה-Hyper-Threading לא כובה.',
      'מנגנון ה-Thermal Throttling נכשל או בוטל ב-BIOS, ולכן המעבד לא הוריד תדר ומתח (DVFS) כשהגיע לטמפרטורת TjMax.',
      'בקר ה-PCIe סירב לעבור למצב L1.',
      'בוצע ניקוי CMOS בזמן הריצה.'
    ],
    correctIndex: 1,
    explanation: 'ה-Thermal Throttling הוא מנגנון הבטיחות הדינמי האחרון שאמור להגן על המעבד על ידי הורדת תדר ומתח. אם המעבד עבר Thermal Trip ישיר למרות שה-VR תקין, סימן שמנגנון ה-Throttling נכשל.',
    reviewTopicIds: ['l1_4']
  },
  {
    id: 'e2',
    pathway: 'high',
    question: 'מהו הצעד הראשון המומלץ לדיבאג של כשל מסוג Cache Incoherency שבו ליבה אחת קוראת מידע שגוי (Stale Data)?',
    options: [
      'ביצוע מרווח בטחון חשמלי (Guardband).',
      'קריאת רגיסטרי הסטטוס של פרוטוקול MESI לזיהוי שורת ה-Cache שתקועה במצב Shared במקום לעבור ל-Invalid.',
      'החלפת כרטיסי ה-RAM DIMM בלוח.',
      'החלפת ה-I/O Die ב-Compute Die.'
    ],
    correctIndex: 1,
    explanation: 'עקביות זיכרון מנוהלת על ידי פרוטוקול MESI. כאשר ליבה קוראת מידע לא מעודכן, סימן שקו ה-Cache שלה לא סומן כראוי כ-Invalid.',
    reviewTopicIds: ['l1_2']
  },
  {
    id: 'e3',
    pathway: 'low',
    question: 'כאשר מתקבלת שגיאת Setup Timing Violation על רכיב Flip-Flop מסוים בתדר עבודה גבוה, מהי הפעולה הפיזית שיכולה לפתור את הכשל מבלי לשנות את תכנון הסיליקון?',
    options: [
      'החלפת בקר ה-PCIe.',
      'הפחתת תדר השעון או העלאה מבוקרת של מתח העבודה (שמאיצה את התפשטות האות ומקדימה את הגעתו).',
      'מעבר למצב שינה C6.',
      'ביטול ה-Out-of-Order במעבד.'
    ],
    correctIndex: 1,
    explanation: ' Setup Violation נובע מכך שאות הנתונים הגיע מאוחר מדי. הפחתת תדר השעון (הארכת המחזור) או העלאת מתח (האצת האות) נותנות לאות זמן להגיע לחלון ה-Setup.',
    reviewTopicIds: ['l2_2', 'l2_4']
  },
  {
    id: 'e4',
    pathway: 'low',
    question: 'בבדיקות Pre-Silicon, מה מייצג המונח Functional Coverage בניגוד ל-Code Coverage?',
    options: [
      'זהו אחוז שורות הקוד שנכתב ב-C++.',
      'כיסוי פונקציונלי בודק האם תרחישי קצה, שילובי מצבים והגדרות ארכיטקטוניות הוגדרו ונבדקו בפועל, ללא קשר לאחוז שורות הקוד שנשפטו בסימולציה.',
      'הוא בודק את שלמות האות החשמלי.',
      'אחוז תדרי הטורבו היציבים.'
    ],
    correctIndex: 1,
    explanation: 'Code Coverage בודק רק אילו שורות קוד ה-RTL הופעלו, בעוד ש-Functional Coverage הוא מדד שנכתב ידנית על ידי המהנדס כדי לוודא שדרישות לוגיות ותרחישים ספציפיים אכן התקיימו.',
    reviewTopicIds: ['l2_3']
  }
];

export const categories: string[] = [
  'כללי',
  'מבנה המעבד (Uncore)',
  'מדרג זיכרון',
  'ממשקי תקשורת מהירים (Interconnects)',
  'ניהול הספק ותרמי (Power)',
  'מיקרו-ארכיטקטורה',
  'תזמוני שעון (Clock & Timing)',
  'ולידציית Pre-Silicon',
  'ולידציית Post-Silicon'
];
