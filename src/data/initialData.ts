import type { Lesson, Concept, LabError } from '../types/validationData';

export const initialLessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Introduction to Processors',
    titleHe: 'מבוא לעולם המעבדים',
    description: 'מבוא כללי לעולם המעבדים, היסטוריה קצרה, מושגי יסוד וכיצד רכיב סיליקון זעיר מנהל את כל המחשב.',
    whyItIsHere: 'זהו שיעור המבוא הבסיסי ביותר שמניח את היסודות ומסביר מהו מעבד לפני שנכנסים למבנה הפנימי שלו.',
    prerequisites: [],
    videoUrl: 'https://www.youtube.com/embed/gS2D7JvG6m4',
    conceptIds: ['c_cpu'],
    quizQuestions: [
      {
        id: 'q1_1',
        question: 'מהו תפקידו העיקרי של המעבד (CPU) במחשב?',
        options: [
          'לשמור קבצים לצמיתות.',
          'לבצע חישובים, לפענח פקודות ולשלוט על שאר רכיבי המערכת.',
          'לספק כוח חשמלי ללוח האם.',
          'להציג תמונה על המסך בלבד.'
        ],
        correctIndex: 1,
        explanation: 'המעבד הוא "המוח" של המערכת המבצע עיבוד פקודות וחישובים לוגיים.'
      }
    ]
  },
  {
    id: 'l2',
    title: 'CPU Architecture',
    titleHe: 'מבנה המעבד (CPU Architecture)',
    description: 'הבנת המבנה הכללי של המעבד, חלוקה לליבות (Cores), יחידות Uncore ורכיבים פנימיים.',
    whyItIsHere: 'לאחר המבוא, יש להבין את הארכיטקטורה הכללית והחלוקה הפנימית של יחידות הסיליקון.',
    prerequisites: ['l1'],
    videoUrl: '',
    conceptIds: ['c_uncore_core', 'c_chip'],
    quizQuestions: [
      {
        id: 'q2_1',
        question: 'מה מייצג המונח Uncore בארכיטקטורת המעבדים של אינטל?',
        options: [
          'ליבות המעבד בלבד.',
          'כל הרכיבים במעבד שאינם ליבות ביצוע ישירות, כגון בקר הזיכרון, ה-LLC וסוכן המערכת.',
          'רכיבי לוח אם חיצוניים.',
          'סוללת ה-CMOS.'
        ],
        correctIndex: 1,
        explanation: 'ה-Uncore כולל את כל הרכיבים המשותפים מסביב לליבות התומכים בפעולתן.'
      }
    ]
  },
  {
    id: 'l3',
    title: 'Instruction Cycle',
    titleHe: 'מחזור הפקודה (Instruction Cycle)',
    description: 'לימוד השלבים במחזור הפקודה: הבאה (Fetch), פענוח (Decode), ביצוע (Execute) וכתיבה (Writeback).',
    whyItIsHere: 'זהו מנגנון הריצה הבסיסי של המעבד שמתבצע מיליארדי פעמים בשנייה.',
    prerequisites: ['l2'],
    videoUrl: '',
    conceptIds: ['c_ucode_path'],
    quizQuestions: [
      {
        id: 'q3_1',
        question: 'מהו השלב הראשון במחזור הפקודה של המעבד?',
        options: [
          'Decode (פענוח)',
          'Fetch (הבאת פקודה מהזיכרון)',
          'Execute (ביצוע)',
          'Writeback (כתיבה חזרה)'
        ],
        correctIndex: 1,
        explanation: 'מחזור הפקודה מתחיל תמיד בהבאת (Fetch) הפקודה הבאה מהזיכרון לפי הכתובת ב-Instruction Pointer.'
      }
    ]
  },
  {
    id: 'l4',
    title: 'Control Unit',
    titleHe: 'יחידת הבקרה (Control Unit)',
    description: 'תפקידה של יחידת הבקרה בניתוב האותות ופיקוח על ביצוע הפקודות במעבד.',
    whyItIsHere: 'יחידת הבקרה היא המנהלת של מחזור הפקודה ומכוונת את האותות החשמליים ליחידות הנכונות.',
    prerequisites: ['l3'],
    videoUrl: '',
    conceptIds: ['c_sys_controller'],
    quizQuestions: [
      {
        id: 'q4_1',
        question: 'מה תפקידה של יחידת הבקרה (Control Unit) במעבד?',
        options: [
          'לבצע חישובים מתמטיים ישירים.',
          'לפענח את הפקודות ולנתב אותות בקרה מתאימים ליחידות הביצוע והזיכרון.',
          'לשמור את המידע לצמיתות.',
          'לטעון את ה-BIOS.'
        ],
        correctIndex: 1,
        explanation: 'יחידת הבקרה אחראית על ניתוב ותזמון הפקודות בתוך המעבד.'
      }
    ]
  },
  {
    id: 'l5',
    title: 'The ALU',
    titleHe: 'ה-ALU',
    description: 'הבנת היחידה האריתמטית-לוגית (Arithmetic Logic Unit) המבצעת את כל החישובים המתמטיים והלוגיים.',
    whyItIsHere: 'ה-ALU היא המנוע המתמטי שבו מתבצעים החישובים בפועל.',
    prerequisites: ['l3'],
    videoUrl: '',
    conceptIds: ['c_func_bug'],
    quizQuestions: [
      {
        id: 'q5_1',
        question: 'אילו סוגי פעולות מבוצעות בתוך ה-ALU?',
        options: [
          'קריאת דיסק קשיח בלבד.',
          'פעולות מתמטיות (חיבור, חיסור) ופעולות לוגיות (AND, OR, XOR).',
          'טעינת קבצי BIOS.',
          'הדלקת נורות הלוח.'
        ],
        correctIndex: 1,
        explanation: 'ה-ALU מבצעת חישובים אריתמטיים והשוואות לוגיות.'
      }
    ]
  },
  {
    id: 'l6',
    title: 'Registers',
    titleHe: 'האוגרים (Registers)',
    description: 'הבנת תאי הזיכרון המהירים והקטנים ביותר הנמצאים בתוך המעבד עצמו ומשמשים לביצוע מיידי של חישובים.',
    whyItIsHere: 'אוגרים הם הזיכרון המהיר ביותר שאליו פונה ה-ALU במהלך חישובים.',
    prerequisites: ['l3'],
    videoUrl: '',
    conceptIds: ['c_assembly'],
    quizQuestions: [
      {
        id: 'q6_1',
        question: 'מה מאפיין את האוגרים (Registers) לעומת זיכרון ה-RAM?',
        options: [
          'הם גדולים יותר ואיטיים יותר.',
          'הם זכרונות זמניים זעירים במעבד הפועלים במהירות הליבה המלאה (אפס השהייה).',
          'הם אינם צורכים חשמל.',
          'הם ממוקמים מחוץ למעבד.'
        ],
        correctIndex: 1,
        explanation: 'אוגרים הם יחידות אחסון פנימיות בתוך הליבה המאפשרות גישה מיידית לנתונים.'
      }
    ]
  },
  {
    id: 'l7',
    title: 'Pipeline',
    titleHe: 'Pipeline (צינור העיבוד)',
    description: 'חלוקת עיבוד הפקודות לשלבים במקביל כדי להשיג ביצוע יעיל של מספר פקודות בו-זמנית.',
    whyItIsHere: 'צינור העיבוד מאפשר להגדיל את ה-throughput של המעבד בצורה משמעותית.',
    prerequisites: ['l3'],
    videoUrl: '',
    conceptIds: ['c_pipeline_test'],
    quizQuestions: [
      {
        id: 'q7_1',
        question: 'מהו היתרון העיקרי של טכנולוגיית Pipeline במעבדים?',
        options: [
          'הפחתת הטמפרטורה בלבד.',
          'הרצת שלבים שונים של פקודות מרובות במקביל בכל מחזור שעון, מה שמגדיל את ה-throughput הכולל.',
          'מחיקת באגים אוטומטית.',
          'חיבור ישיר לספק הכוח.'
        ],
        correctIndex: 1,
        explanation: 'צינור העיבוד עובד כמו פס ייצור במפעל - פקודה חדשה נכנסת לפני שהקודמת סיימה את כל השלבים שלה.'
      }
    ]
  },
  {
    id: 'l8',
    title: 'Superscalar Processors',
    titleHe: 'Superscalar Processors (מעבדים סופר-סקלריים)',
    description: 'מעבדים המסוגלים להתחיל ביצוע של יותר מפקודה אחת בכל מחזור שעון בודד בעזרת צינורות מרובים.',
    whyItIsHere: 'זוהי האבולוציה של ה-pipeline המאפשרת ביצוע של מספר פקודות במקביל באותו מחזור.',
    prerequisites: ['l7'],
    videoUrl: '',
    conceptIds: ['c_ipc'],
    quizQuestions: [
      {
        id: 'q8_1',
        question: 'כיצד מעבד Superscalar מצליח להשיג IPC (Instructions Per Cycle) גדול מ-1?',
        options: [
          'על ידי העלאת תדר השעון בלבד.',
          'על ידי החזקת מספר יחידות ביצוע במקביל (כמו ALUs מרובים) והזנת פקודות מרובות אליהן באותו מחזור.',
          'על ידי כיבוי זיכרון המטמון.',
          'על ידי הפעלת ה-BIOS.'
        ],
        correctIndex: 1,
        explanation: 'מעבדים סופר-סקלריים משתמשים בחומרה מבוזרת כדי להריץ מספר פקודות עצמאיות במקביל.'
      }
    ]
  },
  {
    id: 'l9',
    title: 'Out-of-Order Execution',
    titleHe: 'Out-of-Order Execution (ביצוע שלא לפי הסדר)',
    description: 'מנגנון המאפשר למעבד לשנות את סדר ביצוע הפקודות כדי לנצל יחידות פנויות בזמן המתנה לזיכרון.',
    whyItIsHere: 'מניעת עיכובים בצינור העיבוד על ידי הרצת פקודות מוכנות שאינן תלויות בתוצאות הקודמות.',
    prerequisites: ['l8'],
    videoUrl: '',
    conceptIds: ['c_race_condition'],
    quizQuestions: [
      {
        id: 'q9_1',
        question: 'מדוע מעבד מבצע פקודות שלא לפי הסדר (Out-of-Order)?',
        options: [
          'כי יש באג בתוכנה.',
          'כדי למנוע תקיעות בצינור העיבוד (Stalls) בזמן המתנה לנתונים איטיים מהזיכרון, על ידי הרצת פקודות אחרות שכל הנתונים שלהן כבר מוכנים.',
          'כדי לחסוך חשמל במצב שינה.',
          'לכייל את כרטיס המסך.'
        ],
        correctIndex: 1,
        explanation: 'מנגנון Out-of-Order מזהה תלות בין פקודות ומריץ קוד מוכן באופן דינמי כדי לשמור על יחידות החישוב עסוקות.'
      }
    ]
  },
  {
    id: 'l10',
    title: 'Branch Prediction',
    titleHe: 'Branch Prediction (חיזוי מסתעפויות)',
    description: 'כיצד המעבד מנחש את כיוון תנאי ה-If הבא כדי להמשיך להזין פקודות לצינור ללא המתנה להחלטה הסופית.',
    whyItIsHere: 'חיזוי נכון מונע את ריקון צינור העיבוד (Pipeline Flush) שגורם להפסד ביצועים קשה.',
    prerequisites: ['l7'],
    videoUrl: '',
    conceptIds: ['c_cdv'],
    quizQuestions: [
      {
        id: 'q10_1',
        question: 'מה קורה כאשר המעבד מבצע חיזוי שגוי של הסתעפות (Branch Misprediction)?',
        options: [
          'המעבד נשרף פיזית.',
          'המערכת נאלצת לרוקן את צינור העיבוד (Pipeline Flush) מכל הפקודות שהוזנו אליו בטעות ולהתחיל להביא פקודות מהנתיב הנכון, מה שפוגע בביצועים.',
          'ה-BIOS מופעל מחדש.',
          'המתח יורד אוטומטית.'
        ],
        correctIndex: 1,
        explanation: 'ריקון הצינור גורר השהיה ופגיעה זמנית ב-IPC של המעבד.'
      }
    ]
  },
  {
    id: 'l11',
    title: 'Speculative Execution',
    titleHe: 'Speculative Execution (ביצוע ספקולטיבי)',
    description: 'מנגנון שבו המעבד מריץ בפועל פקודות על בסיס חיזוי ההסתעפות עוד לפני שהתנאי עצמו חושב רשמית.',
    whyItIsHere: 'המשך ישיר של חיזוי הסתעפויות, המאפשר להתקדם בעיבוד ללא המתנה.',
    prerequisites: ['l10'],
    videoUrl: '',
    conceptIds: ['c_func_bug'],
    quizQuestions: [
      {
        id: 'q11_1',
        question: 'מה מייצג המונח ביצוע ספקולטיבי?',
        options: [
          'חישוב מתחים עתידיים.',
          'הרצה מוקדמת של פקודות בנתיב המשוער של הסתעפות. אם החיזוי נכון - התוצאות נשמרות מיידית. אם שגוי - הן נזרקות.',
          'בדיקת מאמץ במעבדה.',
          'כיבוי הליבות הפנויות.'
        ],
        correctIndex: 1,
        explanation: 'ביצוע ספקולטיבי חוסך זמן יקר על ידי ביצוע מוקדם של חישובים סבירים.'
      }
    ]
  },
  {
    id: 'l12',
    title: 'Hyper-Threading / SMT',
    titleHe: 'Hyper-Threading / SMT (ריבוי נימים)',
    description: 'טכנולוגיה המאפשרת לליבה פיזית אחת להציג למערכת ההפעלה שתי ליבות לוגיות ולחלוק משאבים.',
    whyItIsHere: 'חלוקת משאבי הליבה בין שני תהליכים מנצלת בצורה טובה יותר את יחידות הביצוע שנשארות פנויות.',
    prerequisites: ['l9'],
    videoUrl: '',
    conceptIds: ['c_intel_vtx'],
    quizQuestions: [
      {
        id: 'q12_1',
        question: 'כיצד Hyper-Threading משפר את ביצועי המעבד?',
        options: [
          'הוא מייצר ליבות פיזיות חדשות בסיליקון באופן דינמי.',
          'הוא מאפשר לליבה אחת לנהל שני תהליכים (Threads) במקביל על ידי שכפול האוגרים ויחידות הרישום, ומנצל ALUs פנויים.',
          'הוא מקרר את המעבד.',
          'הוא מוחק את ה-Cache.'
        ],
        correctIndex: 1,
        explanation: 'Hyper-Threading / SMT משפר את יעילות ניצול ליבת המעבד על ידי מילוי חורים פנויים בצינור העיבוד.'
      }
    ]
  },
  {
    id: 'l13',
    title: 'Memory Hierarchy',
    titleHe: 'היררכיית הזיכרון',
    description: 'הבנת מבנה זיכרון המחשב - מהאוגרים המהירים והקטנים ביותר ועד לדיסק הקשיח האיטי והגדול.',
    whyItIsHere: 'הבנת מאזן המהירות, הגודל והמחיר של סוגי הזיכרון במערכת.',
    prerequisites: ['l6'],
    videoUrl: '',
    conceptIds: ['c_l1_cache'],
    quizQuestions: [
      {
        id: 'q13_1',
        question: 'מהו סדר מהירות הגישה לרכיבי זיכרון (מהמהיר ביותר לאיטי ביותר)?',
        options: [
          'RAM &lsaquo; Cache &lsaquo; אוגרים &lsaquo; SSD',
          'אוגרים &lsaquo; Cache (מטמון) &lsaquo; RAM &lsaquo; SSD (דיסק קשיח)',
          'SSD &lsaquo; RAM &lsaquo; Cache &lsaquo; אוגרים',
          'Cache &lsaquo; RAM &lsaquo; SSD &lsaquo; אוגרים'
        ],
        correctIndex: 1,
        explanation: 'אוגרים ממוקמים בתוך הליבה, לאחריהם רמות המטמון השונות, זיכרון ה-RAM החיצוני ולבסוף כונני האחסון.'
      }
    ]
  },
  {
    id: 'l14',
    title: 'Cache (L1, L2, L3)',
    titleHe: 'זיכרון מטמון Cache (L1, L2, L3)',
    description: 'הבנת תפקיד שלוש רמות המטמון במעבד לקיצור זמני הגישה לנתוני זיכרון ה-RAM.',
    whyItIsHere: 'זיכרון המטמון מונע תקיעות מעבד על ידי שמירת העתקים של נתונים מבוקשים קרוב לליבה.',
    prerequisites: ['l13'],
    videoUrl: '',
    conceptIds: ['c_l2_cache', 'c_l3_cache'],
    quizQuestions: [
      {
        id: 'q14_1',
        question: 'מהו ההבדל העיקרי בין זיכרון מטמון L1 ל-L3?',
        options: [
          'L1 איטי יותר מ-L3.',
          'L1 הוא הקטן והמהיר ביותר ומיועד לליבה בודדת, בעוד L3 הוא הגדול ביותר, מעט איטי יותר ומשותף לכל הליבות במעבד.',
          'L1 ממוקם מחוץ למעבד.',
          'L3 משמש רק את כרטיס המסך.'
        ],
        correctIndex: 1,
        explanation: 'מבנה המטמון בנוי בצורת פירמידה - זיכרון קטן ומהיר במיוחד קרוב לליבה (L1), וזיכרון גדול ומשותף בבסיס (L3).'
      }
    ]
  },
  {
    id: 'l15',
    title: 'Cache Coherency',
    titleHe: 'עקביות זיכרון מטמון (Cache Coherency)',
    description: 'כיצד מעבדים מרובי ליבות מוודאים שכל הליבות קוראות את הגרסה המעודכנת ביותר של נתון בזיכרון.',
    whyItIsHere: 'מניעת מצבי עבודה על מידע מיושן או השחתת משתנים משותפים במערכות מרובות ליבות.',
    prerequisites: ['l14'],
    videoUrl: '',
    conceptIds: ['c_cache_coherency', 'c_cache_coherency_bug'],
    quizQuestions: [
      {
        id: 'q15_1',
        question: 'למה משמש פרוטוקול MESI בעקביות זיכרון מטמון?',
        options: [
          'לכיוון מהירות מאוורר המחשב.',
          'לניהול מצבי עותקי הנתונים במטמון (Modified, Exclusive, Shared, Invalid) כדי למנוע קריאת מידע מיושן.',
          'לשינוי מתח הליבה.',
          'לטעינת מערכת ההפעלה.'
        ],
        correctIndex: 1,
        explanation: 'פרוטוקול MESI מוודא שאם ליבה אחת משנה נתון, שאר הליבות שמחזיקות עותק שלו יעבירו אותו למצב Invalid ויקראו את המידע המעודכן.'
      }
    ]
  },
  {
    id: 'l16',
    title: 'RAM',
    titleHe: 'זיכרון ה-RAM',
    description: 'עקרון הפעולה של זיכרון הגישה האקראית הראשי במחשב ותזמוני העבודה שלו.',
    whyItIsHere: 'ה-RAM הוא מאגר העבודה המרכזי של מערכת ההפעלה ותהליכים רצים.',
    prerequisites: ['l13'],
    videoUrl: '',
    conceptIds: ['c_ddr'],
    quizQuestions: [
      {
        id: 'q16_1',
        question: 'מדוע זיכרון ה-RAM נקרא זיכרון נדיף (Volatile Memory)?',
        options: [
          'כי המידע בו נשמר רק בזמן שהמחשב כבוי.',
          'כי הוא מאבד את כל המידע השמור בו ברגע שמנתקים את אספקת החשמל.',
          'כי הוא פועל במהירות האור.',
          'כי הוא נצרב פעם אחת במפעל.'
        ],
        correctIndex: 1,
        explanation: 'זכרונות RAM דינמיים (DRAM) דורשים רענון זרם קבוע כדי לשמור על המטען החשמלי המייצג את הביטים.'
      }
    ]
  },
  {
    id: 'l17',
    title: 'Memory Controller',
    titleHe: 'בקר הזיכרון (Memory Controller)',
    description: 'בקר החומרה המנהל את התקשורת הפיזית והפקודות מול כרטיסי זיכרון ה-RAM.',
    whyItIsHere: 'בקר הזיכרון מתרגם בקשות קריאה/כתיבה של המעבד לאותות פיזיים התואמים את תקן ה-DDR.',
    prerequisites: ['l16'],
    videoUrl: '',
    conceptIds: ['c_mem_controller'],
    quizQuestions: [
      {
        id: 'q17_1',
        question: 'היכן ממוקם בקר הזיכרון במחשבים מודרניים?',
        options: [
          'בתוך כרטיס המסך בלבד.',
          'משולב ישירות בתוך מעבד ה-CPU (Integrated Memory Controller - IMC).',
          'על גבי כונן ה-SSD.',
          'בספק הכוח.'
        ],
        correctIndex: 1,
        explanation: 'שילוב בקר הזיכרון בתוך המעבד (IMC) הפחית משמעותית את זמני השהיית הגישה (Latency) לזיכרון ה-RAM.'
      }
    ]
  },
  {
    id: 'l18',
    title: 'ECC Memory',
    titleHe: 'ECC Memory (זיכרון תיקון שגיאות)',
    description: 'מנגנון לזיהוי ותיקון שגיאות ביט בודד בזיכרון המערכת לשמירה על יציבות שרתים.',
    whyItIsHere: 'הכרחי לשרתים ומערכות עבודה קריטיות כדי למנוע קריסות עקב הפרעות קרינה.',
    prerequisites: ['l16'],
    videoUrl: '',
    conceptIds: ['c_ecc_testing'],
    quizQuestions: [
      {
        id: 'q18_1',
        question: 'מהו היתרון העיקרי של שימוש בזיכרון ECC?',
        options: [
          'הוא מהיר פי שניים מזיכרון רגיל.',
          'הוא מזהה ומקשר תיקון אוטומטי לשגיאות ביט בודד (Single-bit errors) שנגרמות מרעש חשמלי או קרינה קוסמית.',
          'הוא אינו צורך חשמל.',
          'הוא זול בהרבה מ-RAM רגיל.'
        ],
        correctIndex: 1,
        explanation: 'זכרונות ECC מוסיפים ביטים משלימים לכל מילה כדי לאפשר חישוב מתמטי המזהה ומתקן שגיאות קטנות בבוס הנתונים.'
      }
    ]
  },
  {
    id: 'l19',
    title: 'Flash Memory',
    titleHe: 'Flash Memory (זיכרון הבזק)',
    description: 'עקרונות הפעולה של זיכרון לא-נדיף המשמש בכונני SSD וכרטיסי זיכרון.',
    whyItIsHere: 'אחסון קבוע שאינו דורש זרם חשמלי לשמירת הנתונים.',
    prerequisites: ['l13'],
    videoUrl: '',
    conceptIds: ['c_m2'],
    quizQuestions: [
      {
        id: 'q19_1',
        question: 'מהו ההבדל המרכזי בין Flash Memory ל-RAM?',
        options: [
          'Flash מהיר יותר מ-RAM.',
          'Flash שומר על המידע שלו ללא צורך באספקת מתח קבועה (Non-volatile), בעוד ש-RAM מאבד מידע עם כיבוי המערכת.',
          'RAM משמש רק לאחסון קבצים גדולים.',
          'אין הבדל.'
        ],
        correctIndex: 1,
        explanation: 'זיכרון פלאש משתמש בטרנזיסטורים בעלי שער צף (Floating gate) השומרים את המטען החשמלי גם ללא חיבור זרם.'
      }
    ]
  },
  {
    id: 'l20',
    title: 'ROM',
    titleHe: 'זיכרון לקריאה בלבד (ROM)',
    description: 'סוגי זיכרון ROM המשמשים לשמירת קוד האתחול הבסיסי ביותר של המחשב.',
    whyItIsHere: 'הבנת המקום שבו נשמר ה-BIOS עוד לפני שיש גישה לדיסק הקשיח.',
    prerequisites: ['l13'],
    videoUrl: '',
    conceptIds: ['c_fit'],
    quizQuestions: [
      {
        id: 'q20_1',
        question: 'למה משמש זיכרון ה-ROM בלוח האם?',
        options: [
          'להרצת משחקים במהירות.',
          'לשמירת קוד ה-BIOS/UEFI המופעל מיד ברגע הדלקת המחשב.',
          'לשמירת הגדרות כרטיס הרשת בלבד.',
          'סוללת הגיבוי.'
        ],
        correctIndex: 1,
        explanation: 'ה-ROM (כיום לרוב מסוג EEPROM/SPI Flash) מחזיק את קוד הבוט הראשוני של המערכת.'
      }
    ]
  },
  {
    id: 'l21',
    title: 'BIOS & UEFI',
    titleHe: 'BIOS ו-UEFI',
    description: 'הבנת ההבדל בין ממשק ה-BIOS הישן ל-UEFI המודרני ותפקידם באתחול וזיהוי החומרה.',
    whyItIsHere: 'הקוד הראשוני שמדבר ישירות עם המעבד והלוח ומאפשר תקשורת בסיסית.',
    prerequisites: ['l20'],
    videoUrl: '',
    conceptIds: ['c_bios'],
    quizQuestions: [
      {
        id: 'q21_1',
        question: 'מהו היתרון המרכזי של UEFI על פני ה-BIOS המסורתי?',
        options: [
          'הוא אינו דורש מאווררים.',
          'תמיכה בדיסקים גדולים (מעל 2TB), זמני אתחול מהירים יותר, ממשק גרפי מודרני ואבטחה משופרת (Secure Boot).',
          'הוא מחליף את המעבד.',
          'הוא פועל בתוך מערכת ההפעלה בלבד.'
        ],
        correctIndex: 1,
        explanation: 'UEFI הוא מפרט מודרני וגמיש המאפשר הרצת דרייברים מורכבים וטעינה מאובטחת של מערכת ההפעלה.'
      }
    ]
  },
  {
    id: 'l22',
    title: 'Boot Process',
    titleHe: 'תהליך האתחול (Boot Process)',
    description: 'ניתוח שלבי עליית המחשב - מה-Reset Vector ועד מסך הכניסה של מערכת ההפעלה.',
    whyItIsHere: 'הכרת שלבי הבוט מאפשרת לאתר היכן בדיוק נתקעת המערכת בזמן קריסות מעבדה.',
    prerequisites: ['l21'],
    videoUrl: '',
    conceptIds: ['c_boot', 'c_boot_flow'],
    quizQuestions: [
      {
        id: 'q22_1',
        question: 'מהי הכתובת הראשונה אליה פונה המעבד בזמן Reset?',
        options: [
          'ה-Reset Vector (למשל כתובת 0xFFFFFFF0 ב-x86).',
          'כונן ה-SSD הראשי.',
          'כרטיס הזיכרון RAM.',
          'כתובת ה-IP של הרשת.'
        ],
        correctIndex: 0,
        explanation: 'בזמן שחרור ה-Reset, המעבד פונה ישירות לכתובת חומרה קבועה מראש (Reset Vector) שבה מתחיל קוד ה-BIOS.'
      }
    ]
  },
  {
    id: 'l23',
    title: 'Motherboard',
    titleHe: 'לוח האם (Motherboard)',
    description: 'מבנה לוח האם, חיבורי ספקי כוח, קווים ומסלולים חשמליים המקשרים את כל הרכיבים.',
    whyItIsHere: 'הבנת לוח האם שהוא התשתית הפיזית עליה יושב ה-SUT.',
    prerequisites: ['l2'],
    videoUrl: '',
    conceptIds: ['c_stargate'],
    quizQuestions: [
      {
        id: 'q23_1',
        question: 'מה תפקידו המרכזי של לוח האם?',
        options: [
          'לספק כוח בלבד.',
          'לשמש כתשתית חיבורים פיזית וחשמלית המקשרת ומאפשרת תקשורת בין המעבד, הזיכרון, האחסון וכרטיסי ההרחבה.',
          'לבצע את החישובים הלוגיים.',
          'להציג תמונה על מסך המחשב.'
        ],
        correctIndex: 1,
        explanation: 'לוח האם (PCB) מקשר בין כל הרכיבים באמצעות קווי נחושת מורכבים (Traces) וספקי מתח.'
      }
    ]
  },
  {
    id: 'l24',
    title: 'Chipset',
    titleHe: 'הצ\'יפסט (Chipset)',
    description: 'ערכת השבבים בלוח האם (PCH) ותפקידה בניהול התקשורת האיטית וכרטיסי ההרחבה.',
    whyItIsHere: 'הבנת ההפרדה בין המעבד המהיר לערכת השבבים שמטפלת בחיבורים החיצוניים.',
    prerequisites: ['l23'],
    videoUrl: '',
    conceptIds: ['c_pmc'],
    quizQuestions: [
      {
        id: 'q24_1',
        question: 'מה תפקידו של ה-PCH (Platform Controller Hub) במערכת?',
        options: [
          'לבצע חישובי תלת-מימד.',
          'לשלוט על ערוצי התקשורת האיטיים והפריפריאליים (כמו SATA, USB, חלק מערוצי ה-PCIe ופסיקות חומרה).',
          'לשמש כזיכרון מטמון L1.',
          'לטעון את ה-Microcode לליבות.'
        ],
        correctIndex: 1,
        explanation: 'ה-PCH או הצ\'יפסט מרכז את ערוצי התקשורת של הפלטפורמה ומפחית עומס מהמעבד הראשי.'
      }
    ]
  },
  {
    id: 'l25',
    title: 'PCI Express',
    titleHe: 'ממשק PCI Express (PCIe)',
    description: 'פרוטוקול PCIe, מבנה ערוצים (Lanes), מהירויות דורות שונים ושימושו בוולידציה.',
    whyItIsHere: 'אפיק התקשורת המהיר ביותר לחיבור רכיבי חומרה ישירות למעבד.',
    prerequisites: ['l24'],
    videoUrl: '',
    conceptIds: ['c_pcie'],
    quizQuestions: [
      {
        id: 'q25_1',
        question: 'מה מייצג המונח Lane בפרוטוקול PCIe?',
        options: [
          'חיבור לחשמל של מאוורר הלוח.',
          'ערוץ תקשורת טקסטואלי.',
          'חיבור תקשורת טורי מהיר המורכב משני זוגות קווים חשמליים (אחד לשליחה ואחד לקבלה).',
          'נתיב התקנת הדרייברים.'
        ],
        correctIndex: 2,
        explanation: 'ערוצי PCIe (Lanes) משולבים יחד (כמו x4, x8, x16) כדי להגדיל את רוחב הפס הכולל של החיבור.'
      }
    ]
  },
  {
    id: 'l26',
    title: 'USB',
    titleHe: 'ממשק USB',
    description: 'מבנה פרוטוקול USB, מהירויות, דורות וצורת הדיבאג של ה-Host Controller.',
    whyItIsHere: 'אפיק החיבור הנפוץ ביותר בעולם לציוד היקפי ומכשירי קצה.',
    prerequisites: ['l24'],
    videoUrl: '',
    conceptIds: ['c_intel_dci'],
    quizQuestions: [
      {
        id: 'q26_1',
        question: 'אילו מנגנונים מאפשרים לבצע דיבאג חומרה מודרני מעל USB?',
        options: [
          'חיבור כרטיס רשת חיצוני.',
          'טכנולוגיות כמו Intel DCI המשתמשות בערוצי ה-USB 3.0 הפיזיים להעברת פקודות דיבאג של JTAG.',
          'מחיקת הגדרות ה-BIOS.',
          'הפעלת מצב שינה S3.'
        ],
        correctIndex: 1,
        explanation: 'USB 3.0 תומך בערוצי תקשורת פיזיים נפרדים המאפשרים לבקר את המעבד ישירות.'
      }
    ]
  },
  {
    id: 'l27',
    title: 'SATA',
    titleHe: 'ממשק SATA',
    description: 'פרוטוקול SATA לחיבור כונני אחסון, זמני תגובה והשוואה מול פרוטוקולים מודרניים.',
    whyItIsHere: 'אפיק האחסון המסורתי המשמש לחיבור דיסקים קשיחים וכונני SSD בסיסיים.',
    prerequisites: ['l24'],
    videoUrl: '',
    conceptIds: ['c_io_test'],
    quizQuestions: [
      {
        id: 'q27_1',
        question: 'מהי המגבלה העיקרית של פרוטוקול SATA לעומת PCIe/NVMe?',
        options: [
          'הוא צורך יותר מדי חשמל.',
          'רוחב הפס שלו מוגבל ל-6Gbps לכל היותר והוא עושה שימוש בפרוטוקול AHCI הישן בעל השהייה (Latency) גבוהה.',
          'הוא אינו תומך בדיסקים קשיחים.',
          'הוא ממוקם בתוך המעבד.'
        ],
        correctIndex: 1,
        explanation: 'פרוטוקול SATA תוכנן במקור עבור דיסקים מגנטיים איטיים, ולכן מהווה צוואר בקבוק לכונני SSD מודרניים.'
      }
    ]
  },
  {
    id: 'l28',
    title: 'NVMe',
    titleHe: 'כונני NVMe',
    description: 'עבודה ישירה מול ערוצי ה-PCIe, מהירויות כתיבה וקריאה, והשהייה נמוכה.',
    whyItIsHere: 'NVMe מאפשר לכונני SSD לתקשר ישירות עם המעבד ללא צורך במתווכים איטיים.',
    prerequisites: ['l25', 'l27'],
    videoUrl: '',
    conceptIds: ['c_m2'],
    quizQuestions: [
      {
        id: 'q28_1',
        question: 'מדוע NVMe מהיר משמעותית מ-SATA?',
        options: [
          'כי הוא משתמש בחיבורי USB.',
          'הוא מחובר ישירות לערוצי ה-PCIe המהירים של המעבד ומשתמש בתור פקודות ענק המאפשר הרצת פקודות במקביל (Concurrency).',
          'כי הוא פועל ללא BIOS.',
          'כי הוא מוגדר כזיכרון נדיף.'
        ],
        correctIndex: 1,
        explanation: 'פרוטוקול NVMe מנצל את הארכיטקטורה המקבילית של זיכרונות הפלאש וחיבור ה-PCIe המהיר.'
      }
    ]
  },
  {
    id: 'l29',
    title: 'Interrupts',
    titleHe: 'פסיקות (Interrupts)',
    description: 'מנגנון פסיקות החומרה, פסיקות לוגיות, APIC, MSI וMSI-X.',
    whyItIsHere: 'המעבד צריך להגיב לאירועים חיצוניים (כמו לחיצת מקש או הגעת חבילת רשת) מיידית.',
    prerequisites: ['l12'],
    videoUrl: '',
    conceptIds: ['c_interrupts'],
    quizQuestions: [
      {
        id: 'q29_1',
        question: 'מה קורה במעבד ברגע שמתקבל אות פסיקה (Interrupt)?',
        options: [
          'הוא מכבה את עצמו.',
          'הוא מסיים את הפקודה הנוכחית, שומר את מצב האוגרים הנוכחי בזיכרון (Stack), ועובר להריץ פונקציה מיוחדת לטיפול בפסיקה (ISR).',
          'הוא מנקה את ה-BIOS.',
          'הוא מדליק את המאוורר.'
        ],
        correctIndex: 1,
        explanation: 'הפסיקה מאפשרת למעבד לטפל באירועים אסינכרוניים במהירות גבוהה ללא צורך בסריקה קבועה (Polling).'
      }
    ]
  },
  {
    id: 'l30',
    title: 'Exceptions',
    titleHe: 'חריגות (Exceptions)',
    description: 'הבנת ההבדל בין פסיקה לחריגה (Exception), שגיאות לוגיות, Page Fault וקוד הטיפול בהן.',
    whyItIsHere: 'שגיאות ריצה פנימיות בתוך המעבד המאלצות עצירה וטיפול.',
    prerequisites: ['l29'],
    videoUrl: '',
    conceptIds: ['c_exception'],
    quizQuestions: [
      {
        id: 'q30_1',
        question: 'במה שונה חריגה (Exception) מפסיקה (Interrupt)?',
        options: [
          'חריגה נוצרת על ידי רכיב חומרה חיצוני בלבד.',
          'חריגה היא אירוע סינכרוני הנוצר ישירות על ידי המעבד עצמו כתוצאה מהרצת פקודה לא חוקית (כמו חלוקה באפס או גישה לכתובת זיכרון מוגנת).',
          'אין הבדל, שניהם מנוהלים על ידי ספק הכוח.',
          'חריגה קורית רק כשהמעבד כבוי.'
        ],
        correctIndex: 1,
        explanation: 'פסיקות הן אסינכרוניות (חיצוניות), בעוד חריגות הן סינכרוניות (פנימיות ונגרמות כתוצאה מהרצת הקוד הנוכחי).'
      }
    ]
  },
  {
    id: 'l31',
    title: 'DMA',
    titleHe: 'גישה ישירה לזיכרון (DMA)',
    description: 'טכנולוגיית DMA המאפשרת להתקנים להעביר נתונים ישירות ל-RAM ללא מעורבות של ה-CPU.',
    whyItIsHere: 'פינוי זמן עיבוד יקר של המעבד על ידי ביצוע העברות נתונים גדולות באוטומציה חומרתית.',
    prerequisites: ['l17'],
    videoUrl: '',
    conceptIds: ['c_sys_controller'],
    quizQuestions: [
      {
        id: 'q31_1',
        question: 'מהו היתרון המרכזי של שימוש ב-DMA (Direct Memory Access)?',
        options: [
          'הגדלת מהירות הדיסק הקשיח בלבד.',
          'התקנים יכולים להעביר נתונים ישירות לזיכרון ה-RAM וממנו מבלי להעסיק את המעבד בכל העברת ביט, מה שמשאיר אותו פנוי לחישובים.',
          'הפחתת מתח הליבה.',
          'טעינת ucode מהירה יותר.'
        ],
        correctIndex: 1,
        explanation: 'בקר ה-DMA מנהל את בוס הכתובות והנתונים באופן עצמאי ומדווח למעבד רק בסיום ההעברה כולה.'
      }
    ]
  },
  {
    id: 'l32',
    title: 'Clock Signals',
    titleHe: 'שעונים (Clock Signals)',
    description: 'מנגנון ייצור השעון במחשב, תדרים, PLL וכיצד השעון מתאם את פעולת כל שערי הסיליקון.',
    whyItIsHere: 'אות השעון הוא פעימת הלב של המעבד המתאמת את זמני פעולת כל הטרנזיסטורים.',
    prerequisites: ['l2'],
    videoUrl: '',
    conceptIds: ['c_jitter'],
    quizQuestions: [
      {
        id: 'q32_1',
        question: 'מהו תפקידו של ה-PLL (Phase-Locked Loop) במעבד?',
        options: [
          'לספק מתח ללוח.',
          'להכפיל ולייצב את תדר השעון הנמוך שמגיע מהגביש החיצוני (Crystal) לתדרים הגבוהים (GHz) בהם פועל המעבד.',
          'למדוד את הטמפרטורה.',
          'לשנות את ערכי ה-BIOS.'
        ],
        correctIndex: 1,
        explanation: 'ה-PLL מייצר שעונים יציבים ומהירים ומסנכרן את הפאזות שלהם כדי למנוע שגיאות תזמון.'
      }
    ]
  },
  {
    id: 'l33',
    title: 'Clock Gating',
    titleHe: 'מנגנון Clock Gating',
    description: 'כיבוי יזום של אות השעון לאזורים לוגיים לא פעילים בתוך מחזור השעון הבודד.',
    whyItIsHere: 'השיטה המיידית והנפוצה ביותר לחסכון באנרגיה דינמית במעבד.',
    prerequisites: ['l9', 'l32'],
    videoUrl: '',
    conceptIds: ['c_clock_gating'],
    quizQuestions: [
      {
        id: 'q33_1',
        question: 'מהו החיסכון הראשי המושג בעזרת Clock Gating?',
        options: [
          'ביטול זרמי זליגה פסיביים.',
          'הפחתת צריכת האנרגיה הדינמית (Dynamic Power) שנוצרת כתוצאה מטעינה ופריקה של טרנזיסטורים שמחליפים מצבים שלא לצורך.',
          'הורדת טמפרטורת החדר.',
          'מניעת שגיאות ECC.'
        ],
        correctIndex: 1,
        explanation: 'כאשר השעון לרגיסטרי היחידה נעצר, הטרנזיסטורים אינם מחליפים מצבים ואינם צורכים זרם דינמי.'
      }
    ]
  },
  {
    id: 'l34',
    title: 'Power Gating',
    titleHe: 'מנגנון Power Gating',
    description: 'ניתוק פיזי מוחלט של אספקת המתח לאזורים בשבב למניעת זליגה במצב מנוחה.',
    whyItIsHere: 'חיסכון אנרגטי עמוק יותר כאשר רכיב אינו נדרש לאורך זמן רב.',
    prerequisites: ['l33'],
    videoUrl: '',
    conceptIds: ['c_power_gating'],
    quizQuestions: [
      {
        id: 'q34_1',
        question: 'מהו החיסרון העיקרי של Power Gating לעומת Clock Gating?',
        options: [
          'הוא צורך יותר חשמל.',
          'זמן ההתאוששות וההדלקה מחדש (Wakeup Latency) ארוך משמעותית, כיוון שיש להמתין לעליית מתח יציבה בבלוק.',
          'הוא אינו חוסך זרמי זליגה.',
          'הוא מבוצע רק תחת מערכת ההפעלה.'
        ],
        correctIndex: 1,
        explanation: 'ניתוק המתח (Power Gating) דורש מחזורי שעון רבים לצורך טעינה מחדש של קבלי האזור וייצוב האותות.'
      }
    ]
  },
  {
    id: 'l35',
    title: 'C-States & P-States',
    titleHe: 'מצבי C-States ו-P-States',
    description: 'מצבי שינה של הליבה לעומת מצבי עבודה של תדר ומתח דינמיים.',
    whyItIsHere: 'ניהול נכון של צריכת החשמל והביצועים לפי דרישת מערכת ההפעלה.',
    prerequisites: ['l34'],
    videoUrl: '',
    conceptIds: ['c_cstates', 'c_pstates'],
    quizQuestions: [
      {
        id: 'q35_1',
        question: 'מהו ההבדל העקרוני בין P-states ל-C-states?',
        options: [
          'P-states מיועדים למחשב כבוי ו-C-states למחשב דולק.',
          'P-states קובעים את מתח ותדר העבודה של הליבה הפעילה (עבור ביצועים), בעוד C-states מגדירים את עומק השינה והניתוק של הליבה הכבויה (עבור חיסכון).',
          'אין הבדל.',
          'C-states משפיעים רק על כרטיס המסך.'
        ],
        correctIndex: 1,
        explanation: 'P-states משנים את נקודת הפעולה (Performance) בזמן ריצה, ו-C-states (Core Sleep) מכבים רכיבים בעת מנוחה.'
      }
    ]
  },
  {
    id: 'l36',
    title: 'Thermal Management',
    titleHe: 'ניהול תרמי (Thermal Management)',
    description: 'חיישני טמפרטורה פנימיים, אות PROCHOT ומניעת התחממות קריטית.',
    whyItIsHere: 'מניעת הרס של הסיליקון והתכת השערים עקב חום קיצוני.',
    prerequisites: ['l35'],
    videoUrl: '',
    conceptIds: ['c_thermal_throttling'],
    quizQuestions: [
      {
        id: 'q36_1',
        question: 'מה מתרחש כאשר אות החומרה PROCHOT# מופעל?',
        options: [
          'המעבד נכנס למצב שינה S3.',
          'המעבד מוריד באופן מיידי ואגרסיבי את מהירות השעון שלו (Thermal Throttling) כדי להפחית פליטת חום ולמנוע נזק.',
          'המחשב מתחיל לצרוב קוד.',
          'ה-BIOS נמחק.'
        ],
        correctIndex: 1,
        explanation: 'PROCHOT (Processor Hot) הוא אות הגנה חומרתי מהיר במיוחד המופעל ישירות על ידי בקרי החום הפנימיים.'
      }
    ]
  },
  {
    id: 'l37',
    title: 'Voltage Regulation (VRM)',
    titleHe: 'מייצבי מתח (Voltage Regulation)',
    description: 'תפקידו של ה-VRM בלוח האם וכיצד המעבד מתקשר איתו לקבלת מתחים עדינים.',
    whyItIsHere: 'המעבד צורך זרמים עצומים במתחים נמוכים ומדויקים מאוד.',
    prerequisites: ['l36'],
    videoUrl: '',
    conceptIds: ['c_pd'],
    quizQuestions: [
      {
        id: 'q37_1',
        question: 'מהו תפקידו של ה-VRM (Voltage Regulator Module)?',
        options: [
          'למדוד את שעון ה-PLL.',
          'להמיר את מתח ספק הכוח (למשל 12V) למתחים נמוכים ומדויקים במיוחד (למשל 1V) הנדרשים לפעילות ליבות המעבד.',
          'לטעון את מערכת ההפעלה.',
          'לשמש כבקר זיכרון.'
        ],
        correctIndex: 1,
        explanation: 'ה-VRM מייצב את המתחים מול המעבד ומגיב לשינויים מהירים בצריכת הזרם (di/dt).'
      }
    ]
  },
  {
    id: 'l38',
    title: 'Platform Interconnects',
    titleHe: 'תקשורת בין רכיבי המחשב',
    description: 'אפיקי תקשורת מודרניים המקשרים את המעבד לצ\'יפסט, כרטיס המסך והזיכרון.',
    whyItIsHere: 'הכרת הדרכים שבהן המידע זורם בין כל המערכות.',
    prerequisites: ['l2', 'l25'],
    videoUrl: '',
    conceptIds: ['c_ring_bus'],
    quizQuestions: [
      {
        id: 'q38_1',
        question: 'איזה רכיב מקשר בין המעבד לבין כרטיסי הרחבה חיצוניים מהירים?',
        options: [
          'חיבור ה-SATA.',
          'ערוצי ה-PCIe המחוברים ישירות ל-System Agent במעבד.',
          'סוללת ה-CMOS.',
          'בקר ה-UART.'
        ],
        correctIndex: 1,
        explanation: 'קישור PCIe ישיר למעבד מונע שהייה (Latency) ומאפשר ביצועים חשמליים מקסימליים.'
      }
    ]
  },
  {
    id: 'l39',
    title: 'Validation - Introduction',
    titleHe: 'מבוא לעולם ה-Validation',
    description: 'מהי הולידציה, מדוע היא קריטית לפיתוח שבבים ומהו תפקידו של מהנדס הולידציה.',
    whyItIsHere: 'כניסה לעולם הבדיקות ואישור המוצרים לאחר שהבנו את החלקים השונים של המעבד.',
    prerequisites: ['l1', 'l38'],
    videoUrl: '',
    conceptIds: ['c_post_silicon'],
    quizQuestions: [
      {
        id: 'q39_1',
        question: 'מהי המטרה העיקרית של מהנדס הולידציה?',
        options: [
          'לכתוב את קוד ה-RTL של המעבד בלבד.',
          'לאתר באגים ותקלות תכנון בחומרה ובקושחה, ולוודא שהמעבד עומד בכל תנאי האיכות, האמינות והמתח לפני שחרורו.',
          'למכור את המעבדים ללקוחות.',
          'להרכיב מחשבים במעבדה.'
        ],
        correctIndex: 1,
        explanation: 'הולידציה מוודא שהמוצר הסופי תואם את המפרט ותפקודו בטוח ויציב.'
      }
    ]
  },
  {
    id: 'l40',
    title: 'Pre-Silicon Validation Basics',
    titleHe: 'מבוא ל-Pre-Silicon Validation',
    description: 'מתודולוגיות אימות לוגי בשלבי הסימולציה המוקדמים של תכנון השבב.',
    whyItIsHere: 'הבנת העבודה הלוגית שנעשית לפני ייצור הסיליקון.',
    prerequisites: ['l39', 'l3'],
    videoUrl: '',
    conceptIds: ['c_pre_silicon', 'c_verification'],
    quizQuestions: [
      {
        id: 'q40_1',
        question: 'אילו שפות משמשות בעיקר לביצוע Pre-Silicon Verification?',
        options: [
          'HTML ו-CSS.',
          'SystemVerilog וספריות UVM.',
          'C# ו-Java בלבד.',
          'Assembly x86 בלבד.'
        ],
        correctIndex: 1,
        explanation: 'שפת SystemVerilog משלבת הגדרות חומרה יחד עם ספריות בדיקה מורכבות התומכות באקראיות ומדידת כיסוי.'
      }
    ]
  },
  {
    id: 'l41',
    title: 'Post-Silicon Validation Basics',
    titleHe: 'מבוא ל-Post-Silicon Validation',
    description: 'שימוש בחומרה אמיתית במעבדה, בדיקות SUT, סביבות ריצה ואינטגרציה.',
    whyItIsHere: 'הבנת ההבדלים והאתגרים בבדיקת סיליקון פיזי לעומת סימולציות.',
    prerequisites: ['l39', 'l40'],
    videoUrl: '',
    conceptIds: ['c_post_silicon', 'c_sut'],
    quizQuestions: [
      {
        id: 'q41_1',
        question: 'מהו האתגר העיקרי ב-Post-Silicon Validation לעומת Pre-Silicon?',
        options: [
          'הבדיקות איטיות מדי.',
          'חוסר יכולת לראות את כל האותות הפנימיים של המעבד (הסיליקון הוא "קופסה שחורה"), מה שדורש כלי טלמטריה ודיבאג מורכבים.',
          'אין שבב פיזי לבדוק.',
          'אי אפשר להריץ מערכת הפעלה.'
        ],
        correctIndex: 1,
        explanation: 'בסיליקון פיזי, גישה לקווים פנימיים מוגבלת מאוד ומחייבת שימוש במחברים חיצוניים ורגיסטרי דיאגנוסטיקה.'
      }
    ]
  },
  {
    id: 'l42',
    title: 'Functional Validation Basics',
    titleHe: 'מבוא ל-Functional Validation',
    description: 'בדיקות לוגיות פונקציונליות של מנגנוני הליבה והעברת פקודות במעבד.',
    whyItIsHere: 'הבנת הבדיקות המרכזיות שמבצעות אימות של הפעולות האריתמטיות והלוגיות של השבב.',
    prerequisites: ['l41'],
    videoUrl: '',
    conceptIds: ['c_func_val'],
    quizQuestions: [
      {
        id: 'q42_1',
        question: 'מהי המטרה של Functional Validation?',
        options: [
          'למדוד את מתח ספק הכוח.',
          'לוודא שכל יחידה לוגית במעבד מבצעת את פקודותיה ומצביה במדויק בהתאם למפרט הארכיטקטוני.',
          'לנקות את הלוח.',
          'להתקין מערכת הפעלה.'
        ],
        correctIndex: 1,
        explanation: 'הולידציה הפונקציונלית מתמקדת בנכונות הלוגית של פעולת המעבד.'
      }
    ]
  },
  {
    id: 'l43',
    title: 'System Validation Basics',
    titleHe: 'מבוא ל-System Validation',
    description: 'ולידציה של המעבד כחלק ממערכת שלמה תחת עומסי עבודה של לקוח קצה.',
    whyItIsHere: 'מוודא שאין התנגשויות תדרים, מתחים או תקשורת כאשר כל רכיבי הלוח פעילים יחד.',
    prerequisites: ['l41'],
    videoUrl: '',
    conceptIds: ['c_system_val'],
    quizQuestions: [
      {
        id: 'q43_1',
        question: 'אילו עומסים מופעלים ב-System Validation?',
        options: [
          'כיבוי המערכת בלבד.',
          'הרצת יישומים אמיתיים, מערכות הפעלה מסחריות, משחקים ועומסי עבודה מרובי משימות.',
          'מדידת אורך הלוח.',
          'בדיקת מאווררים בלבד.'
        ],
        correctIndex: 1,
        explanation: 'בדיקת המערכת מדמה את התנאים והתוכנות שיפגוש משתמש הקצה אצלו בבית או בשרת.'
      }
    ]
  },
  {
    id: 'l44',
    title: 'Platform Validation Basics',
    titleHe: 'מבוא ל-Platform Validation',
    description: 'אימות אינטגרציית ה-BIOS, דרייברים, לוח אם וקושחת CSE.',
    whyItIsHere: 'המעבד אינו פועל לבד; עליו לעבוד בתיאום מושלם עם קושחת הפלטפורמה.',
    prerequisites: ['l41'],
    videoUrl: '',
    conceptIds: ['c_platform_val'],
    quizQuestions: [
      {
        id: 'q44_1',
        question: 'מה נבדק בשלב ה-Platform Validation?',
        options: [
          'רק המהירות של זיכרון המטמון.',
          'התיאום בין קושחת ה-BIOS/UEFI, בקרי הלוח ומערכת ההפעלה מול המעבד.',
          'צריכת החשמל של המסך.',
          'ההתקנה של הדיסק הקשיח.'
        ],
        correctIndex: 1,
        explanation: 'אימות פלטפורמה מבטיח יציבות וזיהוי חומרה מלא של כלל רכיבי המחשב.'
      }
    ]
  },
  {
    id: 'l45',
    title: 'Stress Testing Basics',
    titleHe: 'מבוא ל-Stress Testing',
    description: 'כתיבה והרצה של בדיקות מאמץ רב-ערוציות לאיתור באגים נדירים.',
    whyItIsHere: 'באגים רבים מתרחשים רק כאשר המעבד פועל תחת לחץ כבד במקביל.',
    prerequisites: ['l42', 'l43'],
    videoUrl: '',
    conceptIds: ['c_stress_test'],
    quizQuestions: [
      {
        id: 'q45_1',
        question: 'מה מאפיין בדיקת Stress מוצלחת?',
        options: [
          'היא מפעילה מעט מאוד יחידות במעבד.',
          'היא מפעילה עומסי חישוב ותקשורת מקביליים (כמו תעבורת זיכרון, IO ומתחים משתנים) כדי לאלץ את הסיליקון להגיע לקצה היכולת.',
          'היא נמשכת שנייה אחת בלבד.',
          'היא מבוצעת רק בסימולטור.'
        ],
        correctIndex: 1,
        explanation: 'בדיקות מאמץ נועדו לעורר באגים שנובעים מבעיות סנכרון ותזמון (Timing and concurrency).'
      }
    ]
  },
  {
    id: 'l46',
    title: 'Thermal Validation Basics',
    titleHe: 'מבוא ל-Thermal Validation',
    description: 'ולידציה תרמית, הגדרות TjMax ובדיקות יציבות בחום וקור.',
    whyItIsHere: 'מבטיח שהמעבד מגן על עצמו מפני שריפה ומתפקד כראוי תחת קירורים שונים.',
    prerequisites: ['l36', 'l41'],
    videoUrl: '',
    conceptIds: ['c_thermal_test'],
    quizQuestions: [
      {
        id: 'q46_1',
        question: 'כיצד מבוצעת ולידציה תרמית במעבדה?',
        options: [
          'על ידי החלפת המעבד בלבד.',
          'הרצת בדיקות מאמץ כאשר ה-SUT מוכנס לתוך תא תרמי מבוקר המדמה תנאי חום וקור קיצוניים.',
          'שימוש בתוכנות גרפיות בלבד.',
          'כיבוי המאווררים ללא הרצת קוד.'
        ],
        correctIndex: 1,
        explanation: 'בדיקה תרמית בוחנת את תפקוד חיישני החום הפנימיים (Digital Thermal Sensors) ומנגנון ה-PROCHOT.'
      }
    ]
  },
  {
    id: 'l47',
    title: 'Power Validation Basics',
    titleHe: 'מבוא ל-Power Validation',
    description: 'בדיקת צריכת החשמל ומעברי ה-Power States של המעבד.',
    whyItIsHere: 'ולידציה המוודאת שהמעבד צורך אנרגיה בהתאם למגבלות ה-TDP שנקבעו לו.',
    prerequisites: ['l35', 'l41'],
    videoUrl: '',
    conceptIds: ['c_power_test'],
    quizQuestions: [
      {
        id: 'q47_1',
        question: 'מה נמדד במהלך Power Validation?',
        options: [
          'מהירות האינטרנט בלבד.',
          'המתח והזרם על גבי מסילות הכוח הראשיות (כמו Vcc, Vnn) במעברים מהירים בין מצבי כוח שונים.',
          'כמות האבק על הלוח.',
          'גודל הדיסק הקשיח.'
        ],
        correctIndex: 1,
        explanation: 'בדיקות אלו מוודאות שהמעבד אינו חורג מצריכת ההספק המקסימלית ומנהל כוח ביעילות.'
      }
    ]
  },
  {
    id: 'l48',
    title: 'Memory Validation Basics',
    titleHe: 'מבוא ל-Memory Validation',
    description: 'אימות יציבות ממשק הזיכרון, בדיקת מהירויות DDR ותאימות.',
    whyItIsHere: 'ממשק הזיכרון חייב להיות נקי משגיאות ביט כדי למנוע קריסות מערכת.',
    prerequisites: ['l17', 'l41'],
    videoUrl: '',
    conceptIds: ['c_mem_test', 'c_dram_training'],
    quizQuestions: [
      {
        id: 'q48_1',
        question: 'אילו בדיקות מבוצעות במסגרת Memory Validation?',
        options: [
          'בדיקות של דיסקים קשיחים בלבד.',
          'בדיקת שלמות האותות החשמליים, אימון ה-DDR, תאימות עם יצרני זיכרון שונים ובדיקת יציבות תחת תדרים שונים.',
          'טעינת קבצי BIOS בלבד.',
          'מחיקת קובצי ה-Cache.'
        ],
        correctIndex: 1,
        explanation: 'אימות זיכרון כולל בדיקות Margining לזמני ומתחי ערוצי ה-DRAM.'
      }
    ]
  },
  {
    id: 'l49',
    title: 'Cache Validation Basics',
    titleHe: 'מבוא ל-Cache Validation',
    description: 'ולידציה של זיכרונות המטמון הפנימיים ומניעת שגיאות שלמות נתונים.',
    whyItIsHere: 'סריקה מתמדת של זיכרונות המטמון כדי לאתר באגים לוגיים בניהול העותקים.',
    prerequisites: ['l15', 'l41'],
    videoUrl: '',
    conceptIds: ['c_cache_test'],
    quizQuestions: [
      {
        id: 'q49_1',
        question: 'מדוע בדיקת זיכרונות המטמון (Cache Validation) מורכבת במעבדים מרובי ליבות?',
        options: [
          'כי הם קטנים מדי.',
          'בשל הצורך לעקוב אחרי פרוטוקול עקביות המטמון (Cache Coherency) כאשר מספר ליבות מנסות לכתוב ולקרוא מאותו נתון במקביל.',
          'כי ה-Cache נמחק עם הדלקת המערכת.',
          'כי הוא פועל רק תחת Windows.'
        ],
        correctIndex: 1,
        explanation: 'בדיקת ה-Cache דורשת יצירת עומסים שמאתגרים את מנגנוני ה-Snoop וה-Eviction של המעבד.'
      }
    ]
  },
  {
    id: 'l50',
    title: 'PCIe Validation Basics',
    titleHe: 'מבוא ל-PCIe Validation',
    description: 'בדיקת יציבות ממשקי PCIe, מעברים בין מצבי קישור ומדידת מהירות.',
    whyItIsHere: 'מניעת נפילות של כרטיסי הרחבה ודיסק קשיח תחת עומס.',
    prerequisites: ['l25', 'l41'],
    videoUrl: '',
    conceptIds: ['c_pcie_analyzer'],
    quizQuestions: [
      {
        id: 'q50_1',
        question: 'מה נבדק במהלך PCIe Validation?',
        options: [
          'רק את החיבור החשמלי הפיזי.',
          'עמידה בתקני הפרוטוקול, מעבר חלק ויציב בין מצבי כוח (L0, L1, L2) ויכולת שחזור משגיאות קישור (Recovery).',
          'כמות הזרם במאוורר הלוח.',
          'אתחול ה-BIOS בלבד.'
        ],
        correctIndex: 1,
        explanation: 'אימות ה-PCIe בוחן הן את איכות הסיגנל (PHY) והן את נכונות העברת חבילות הפרוטוקול (Transaction Layer).'
      }
    ]
  },
  {
    id: 'l51',
    title: 'Boot Validation Basics',
    titleHe: 'מבוא ל-Boot Validation',
    description: 'בדיקות יציבות שלבי הבוט, POST וזיהוי מלא של רכיבי הפלטפורמה.',
    whyItIsHere: 'לוודא שהמעבד והלוח עולים תמיד בהצלחה ללא תקיעות אקראיות.',
    prerequisites: ['l22', 'l44'],
    videoUrl: '',
    conceptIds: ['c_boot_test'],
    quizQuestions: [
      {
        id: 'q51_1',
        question: 'מהי בדיקת Boot Cycling הנפוצה בבוט וולידציה?',
        options: [
          'ניקוי הלוח מאבק.',
          'ביצוע מאות ואלפי מחזורי הדלקה, כיבוי ואתחול רצופים כדי לוודא שאין תקלות זיהוי חומרה אקראיות בזמן הבוט.',
          'טעינת קבצי ה-uCode מהרשת.',
          'בדיקת מהירות ה-RAM בלבד.'
        ],
        correctIndex: 1,
        explanation: 'בדיקת Boot Cycling מזהה בעיות תזמון אקראיות של רכיבי הלוח בזמן הדלקה ראשונית.'
      }
    ]
  },
  {
    id: 'l52',
    title: 'Signal Integrity (SI)',
    titleHe: 'שלמות אות (Signal Integrity - SI)',
    description: 'ניתוח רעשים בקווי תקשורת, עכבות, החזרים ועיוותי אותות חשמליים.',
    whyItIsHere: 'בממשקים מהירים, הפרעות חשמליות קלות יכולות להשחית את הנתונים.',
    prerequisites: ['l32', 'l41'],
    videoUrl: '',
    conceptIds: ['c_crosstalk', 'c_reflection', 'c_impedance'],
    quizQuestions: [
      {
        id: 'q52_1',
        question: 'מה מייצג המונח שלמות אות (Signal Integrity)?',
        options: [
          'האינטגריטי והיושר של צוות הוולידציה.',
          'איכות האות החשמלי העובר בקו, ומידת עמידתו בעיוותים, רעשים והחזרי מתח שעלולים לגרום לשגיאות ביט.',
          'מהירות המעבד בלבד.',
          'אתחול ה-BIOS.'
        ],
        correctIndex: 1,
        explanation: 'שמירה על שלמות האות מונעת שגיאות תקשורת בממשקים מהירים כמו PCIe ו-DDR.'
      }
    ]
  },
  {
    id: 'l53',
    title: 'Power Integrity (PI)',
    titleHe: 'שלמות מתח (Power Integrity - PI)',
    description: 'בדיקת יציבות רשת אספקת החשמל, רעשי מתח (Ripple) ומניעת נפילות מתח.',
    whyItIsHere: 'מבטיח שרכיבי המעבד מקבלים מתח יציב ללא רעשים חשמליים שיגרמו לשגיאות לוגיות.',
    prerequisites: ['l37', 'l52'],
    videoUrl: '',
    conceptIds: ['c_pd'],
    quizQuestions: [
      {
        id: 'q53_1',
        question: 'מהי המטרה של בדיקות Power Integrity?',
        options: [
          'למדוד את צריכת החשמל הכוללת של המחשב מהקיר בלבד.',
          'לוודא שרשת אספקת המתח (PDN) מספקת מתח נקי, יציב וללא רעשים חשמליים (Ripple) לליבות המעבד גם בזמן שינויי עומס מהירים.',
          'לכייל את זכרונות ה-DRAM.',
          'לבדוק את תקינות המאווררים.'
        ],
        correctIndex: 1,
        explanation: 'שלמות המתח מבטיחה שרמות הרעש על קווי החשמל של המעבד נשארות בטווח המותר.'
      }
    ]
  },
  {
    id: 'l54',
    title: 'Timing Analysis',
    titleHe: 'ניתוח תזמונים (Timing Analysis)',
    description: 'ולידציה של זמני Setup ו-Hold בשערי הסיליקון ומניעת שגיאות מטא-סטביליות.',
    whyItIsHere: 'אותות חייבים להגיע בזמן המדויק לכל שער לוגי כדי להימנע משגיאות חישוב.',
    prerequisites: ['l32', 'l40'],
    videoUrl: '',
    conceptIds: ['c_sta'],
    quizQuestions: [
      {
        id: 'q54_1',
        question: 'מהי שגיאת Setup Time בתזמוני חומרה?',
        options: [
          'כאשר תהליך הגדרת ה-BIOS לוקח זמן רב מדי.',
          'כאשר אות הנתונים אינו מספיק להתייצב במבוא של רגיסטרי המטרה לפני הגעת דופק השעון, מה שגורם לקריאת ערך שגוי.',
          'כאשר המעבד מתחמם יתר על המידה.',
          'תקלה בזיהוי דיסק NVMe.'
        ],
        correctIndex: 1,
        explanation: 'שגיאות Setup ו-Hold נמנעות על ידי תכנון נתיבים נכון ואימותם בכלי STA.'
      }
    ]
  },
  {
    id: 'l55',
    title: 'Clock Domain Crossing Validation',
    titleHe: 'אימות Clock Domain Crossing (CDC)',
    description: 'בדיקות וולידציה של ממשקי שעונים שונים בתוך השבב.',
    whyItIsHere: 'אימות שהסנכרנים בין אזורי השעון מונעים שגיאות אקראיות.',
    prerequisites: ['l32', 'l54'],
    videoUrl: '',
    conceptIds: ['c_cdc'],
    quizQuestions: [
      {
        id: 'q55_1',
        question: 'כיצד מונעים שגיאות CDC בחומרה?',
        options: [
          'על ידי הגברת המתח בלבד.',
          'על ידי שימוש במסנכרנים (Synchronizers, כגון שרשרת כפולה של Flip-Flops) או תורי FIFO אסינכרוניים בקצוות המעבר.',
          'על ידי מחיקת זיכרון ה-Cache.',
          'על ידי כיוון ה-PROCHOT.'
        ],
        correctIndex: 1,
        explanation: 'המסנכרנים מייצבים את האות באזור השעון החדש ומונעים ממנו להיכנס למצב לא מוגדר (Metastability).'
      }
    ]
  },
  {
    id: 'l56',
    title: 'Hardware Debug Basics',
    titleHe: 'מבוא ל-Debug בחומרה',
    description: 'עקרונות הדיבאג הפיזי, שימוש בכבלי דיבאג וכרטיסי בקרה.',
    whyItIsHere: 'דיבאג חומרה הוא הדרך לאתר את מקור התקלה כאשר המערכת קופאת לחלוטין.',
    prerequisites: ['l5', 'l41'],
    videoUrl: '',
    conceptIds: ['c_jtag', 'c_debug_port'],
    quizQuestions: [
      {
        id: 'q56_1',
        question: 'מהו הצעד הראשון בדיבאג חומרה של מערכת תקועה (Hang)?',
        options: [
          'לכבות את החשמל מיידית.',
          'להתחבר למעבד דרך ממשק JTAG/DCI, לעצור את השעונים (Halt CPU), ולקרוא את האוגרים וזיכרון השגיאות (Crash log).',
          'להחליף את ה-BIOS.',
          'להתקין דרייברים חדשים.'
        ],
        correctIndex: 1,
        explanation: 'עצירת המעבד מונעת דריסת לוגים ומאפשרת לקרוא את הסטטוס המדויק של מחזור השעון האחרון.'
      }
    ]
  },
  {
    id: 'l57',
    title: 'JTAG Basics',
    titleHe: 'מבוא ל-JTAG',
    description: 'מבנה ערוץ ה-JTAG, פינים ראשיים (TMS, TCK, TDI, TDO, TRST) ושימושו המעשי.',
    whyItIsHere: 'הכלי הבסיסי ביותר לקריאת רגיסטרים פנימיים ועריכת בדיקות Boundary Scan.',
    prerequisites: ['l56'],
    videoUrl: '',
    conceptIds: ['c_jtag', 'c_boundary_scan'],
    quizQuestions: [
      {
        id: 'q57_1',
        question: 'איזה פין JTAG אחראי על הזנת נתוני הבדיקה לתוך השבב?',
        options: [
          'TDO (Test Data Output)',
          'TDI (Test Data Input)',
          'TCK (Test Clock)',
          'TMS (Test Mode Select)'
        ],
        correctIndex: 1,
        explanation: 'פין TDI (Test Data Input) מזרים את ביטי הבדיקה לתוך שרשרת ה-Boundary Scan.'
      }
    ]
  },
  {
    id: 'l58',
    title: 'Logic Analyzer Basics',
    titleHe: 'מבוא ל-Logic Analyzer',
    description: 'חיבור הלוגיק אנלייזר, הגדרת Triggers ופענוח פרוטוקולים דיגיטליים.',
    whyItIsHere: 'ניתוח סימולטני של אותות רבים כדי לגלות בעיות בפרוטוקול התקשורת.',
    prerequisites: ['l56'],
    videoUrl: '',
    conceptIds: ['c_logic_analyzer'],
    quizQuestions: [
      {
        id: 'q58_1',
        question: 'מהו ה-Trigger בלוגיק אנלייזר?',
        options: [
          'המתח החשמלי הראשי של המכשיר.',
          'הגדרה של תנאי לוגי (למשל: מעבר ביט מסוים מ-0 ל-1) הגורם למכשיר להתחיל להקליט ולשמור את האותות החשמליים.',
          'הכפתור שמכבה את המעבד.',
          'הדרייבר של המכשיר.'
        ],
        correctIndex: 1,
        explanation: 'הטריגר מאפשר ללכוד במדויק את חלון הזמנים שבו מתרחש הכשל החשוד.'
      }
    ]
  },
  {
    id: 'l59',
    title: 'Oscilloscope Basics',
    titleHe: 'מבוא ל-Oscilloscope',
    description: 'כיצד להשתמש באוסילוסקופ, מדידת תדרים, רעשי מתח וכיול פרובים.',
    whyItIsHere: 'הכלי הפיזיקלי החשוב ביותר למדידות אנלוגיות ושלמות אותות במעבדה.',
    prerequisites: ['l56'],
    videoUrl: '',
    conceptIds: ['c_oscilloscope', 'c_probe_loading'],
    quizQuestions: [
      {
        id: 'q59_1',
        question: 'באיזה מקרה נשתמש באוסילוסקופ במעבדה במקום בלוגיק אנלייזר?',
        options: [
          'כשאנו רוצים לבדוק קוד תוכנה.',
          'כאשר אנו צריכים לראות את הצורה החשמלית האנלוגית המדויקת של האות (למדוד רעש, מתח יתר או עיוותי גל) ולא רק ערכי 0 ו-1 לוגיים.',
          'כשהמעבד אינו צורך חשמל.',
          'לכתיבת sightings.'
        ],
        correctIndex: 1,
        explanation: 'אוסילוסקופ מציג את הממד האנלוגי הפיזיקלי של האותות, בעוד לוגיק אנלייזר מציג את הממד הדיגיטלי הלוגי.'
      }
    ]
  },
  {
    id: 'l60',
    title: 'The Lab Engineer Routine',
    titleHe: 'כיצד מהנדס ולידציה עובד בפועל במעבדה',
    description: 'סקירה מקיפה של שגרת העבודה של מהנדס וולידציה באינטל/AMD: הגעת ה-Silicon למעבדה, בדיקות Bring-up, אינטגרציית BKC, הרצות אוטומטיות ב-NGA, ניתוח קריסות (Triage) ופתיחת Sightings.',
    whyItIsHere: 'שיעור מסכם זה מכין אותך במדויק לשאלות התנהגותיות ומקצועיות בראיונות עבודה. הוא מחבר את כל הידע שרכשת בקורס ומציג את התמונה המלאה של סביבת העבודה שלך.',
    prerequisites: ['l22', 'l39', 'l56'],
    videoUrl: '',
    conceptIds: ['c_post_silicon', 'c_bkc', 'c_triage', 'c_sighting', 'c_nga', 'c_python'],
    quizQuestions: [
      {
        id: 'q60_1',
        question: 'מהו סדר הפעולות הנכון של מהנדס וולידציה כאשר בדיקה אוטומטית נכשלת ב-NGA בלילה?',
        options: [
          'פתיחת sighting מיידית ללא בדיקה נוספת.',
          'ביצוע Triage (ניתוח לוגים) &lsaquo; שחזור התקלה באופן ידני במעבדה &lsaquo; וידוא יציבות ה-SUT ב-BKC &lsaquo; בידוד הגורם (חומרה/תוכנה/סיליקון) &lsaquo; ופתיחת sighting מפורט עם צעדי שחזור ברורים.',
          'אתחול המערכת מחדש והתעלמות מהכשל.',
          'החלפת המעבד בלבד.'
        ],
        correctIndex: 1,
        explanation: 'תהליך ה-Triage המתודי חוסך זמן יקר ומונע פתיחת sightings כפולים או sighting שנובע מתקלת סביבה לא יציבה.'
      }
    ]
  }
];

export const initialConcepts: Concept[] = [
  // 1. שלבי הולידציה
  {
    id: 'c_pre_silicon',
    term: 'Pre-Silicon Validation',
    lessonId: 'l40',
    category: 'שלבי הולידציה',
    definition: 'אימות תכנון המעבד באמצעות מודלים ממוחשבים וסימולציות לפני ייצורו הפיזי במפעל.',
    definitionHighLevel: 'Logic verification of CPU designs using RTL simulation, emulation platforms (Veloce/Palladium) and FPGA virtual boards to locate architectural bugs.',
    context: 'בוולידציה זו מריצים תסריטי בדיקה מוקדמים על מודלי Verilog/SystemVerilog.'
  },
  {
    id: 'c_post_silicon',
    term: 'Post-Silicon Validation',
    lessonId: 'l41',
    category: 'שלבי הולידציה',
    definition: 'בדיקת שבבי הסיליקון הפיזיים האמיתיים המגיעים מהמפעל בתוך מעבדות הבדיקה.',
    definitionHighLevel: 'Physical testing of manufactured silicon working under full operating clock speeds and physical electrical conditions in validation system environments.',
    context: 'בדיקת מעבדי ES ו-QS במעבדה על גבי לוחות StarGate תחת מערכות הפעלה מיוחדות כמו SVOS.'
  },
  {
    id: 'c_func_val',
    term: 'Functional Validation',
    lessonId: 'l42',
    category: 'שלבי הולידציה',
    definition: 'בדיקת נכונות הלוגיקה של המעבד כדי לוודא שכל הפקודות והמנגנונים הלוגיים מבוצעים בדיוק לפי המפרט.',
    definitionHighLevel: 'Verification that the processor executes the complete instruction set architecture (ISA) and internal state transitions without functional bugs.',
    context: 'מריצים בדיקות Stress לוגיות ו-workloads מורכבים במעבדה כדי למצוא באגים לוגיים ב-pipeline.'
  },
  {
    id: 'c_design_val',
    term: 'Design Validation',
    lessonId: 'l40',
    category: 'שלבי הולידציה',
    definition: 'אימות שהתכנון הפיזי והמבני של השבב עונה על דרישות התכן ואינו מכיל באגים מבניים.',
    definitionHighLevel: 'Verifying that the structural implementation of the SoC matches architectural specifications and logic designs.',
    context: 'בדיקת קונפיגורציית הרכיבים, חיבורי אפיקי התקשורת ורגיסטרי הבקרה במוצר.'
  },
  {
    id: 'c_system_val',
    term: 'System Validation',
    lessonId: 'l43',
    category: 'שלבי הולידציה',
    definition: 'בדיקת המעבד כחלק ממערכת מחשב מלאה הכוללת זיכרון, דיסק קשיח, ספק כוח וכרטיס מסך.',
    definitionHighLevel: 'Evaluating the processor interaction within a fully configured system under concurrent Workloads and varying environmental conditions.',
    context: 'ולידציה המוודאת שאין התנגשויות או בעיות תאימות בין המעבד לשאר חלקי המערכת תחת עומס.'
  },
  {
    id: 'c_platform_val',
    term: 'Platform Validation',
    lessonId: 'l44',
    category: 'שלבי הולידציה',
    definition: 'בדיקת האינטגרציה בין המעבד ללוח האם הספציפי, ה-BIOS, הקושחה ומערכת ההפעלה.',
    definitionHighLevel: 'Validation of the complete motherboard ecosystem (VRMs, PCH, BIOS/UEFI, CSME firmware) aligning with the silicon stepping configurations.',
    context: 'אימות גרסאות ה-BKC השונות לוודא שהלוח, ה-BIOS והקושחות עובדים יחד בצורה הרמונית ויציבה.'
  },
  {
    id: 'c_silicon_val',
    term: 'Silicon Validation',
    lessonId: 'l41',
    category: 'שלבי הולידציה',
    definition: 'בדיקת שבב הסיליקון הפיזי עצמו כדי לאתר ליקויי ייצור או בעיות פיזיקליות של המוליכים למחצה.',
    definitionHighLevel: 'Direct verification of physical silicon characteristics including transitor leakage, thermal properties, and path delays.',
    context: 'בדיקות המבוצעות בשלבים ראשוניים של קבלת הסיליקון מהמפעל (A0 Stepping) כדי לאשר את תקינותו הבסיסית.'
  },
  {
    id: 'c_product_val',
    term: 'Product Validation',
    lessonId: 'l39',
    category: 'שלבי הולידציה',
    definition: 'אימות סופי של המעבד מול הגדרות המוצר המיועד ללקוח הקצה (שימושיות, ביצועים ואמינות).',
    definitionHighLevel: 'Validating the final product configuration against target user profiles, software application workloads and customer specifications.',
    context: 'הרצת בנצ\'מרקים ויישומים מסחריים נפוצים כדי להבטיח חווית שימוש מושלמת ללקוח ללא קריסות.'
  },
  {
    id: 'c_manufacturing_val',
    term: 'Manufacturing Validation',
    lessonId: 'l39',
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
    lessonId: 'l45',
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
    lessonId: 'l47',
    category: 'סוגי בדיקות',
    definition: 'מדידת צריכת האנרגיה של המעבד במצבי פעולה ומצבי שינה שונים ואימות מנגנוני החיסכון בחשמל.',
    definitionHighLevel: 'Evaluating electrical power consumption across various operating states and transient power transitions.',
    context: 'ניטור צריכת הזרם (Current) והמתח (Voltage) על קווי אספקת הכוח של המעבד במעבדה.'
  },
  {
    id: 'c_thermal_test',
    term: 'Thermal Testing',
    lessonId: 'l46',
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
    lessonId: 'l51',
    category: 'סוגי בדיקות',
    definition: 'אימות שכל שלבי הדלקת המערכת והבוט מתבצעים בהצלחה ללא שגיאות או תקיעות.',
    definitionHighLevel: 'Testing platform reset vector release, firmware reading, POST progression, and OS loading consistency.',
    context: 'הרצת אלפי מחזורי אתחול (Boot cycles) רצופים כדי לגלות בעיות אקראיות בשלבי ה-BIOS.'
  },
  {
    id: 'c_interrupt_test',
    term: 'Interrupt Testing',
    lessonId: 'l29',
    category: 'סוגי בדיקות',
    definition: 'בדיקת מנגנון פסיקות המערכת (Interrupts) המאפשר למכשירים חיצוניים לעצור את פעולת המעבד כדי לטפל באירועים דחופים.',
    definitionHighLevel: 'Verifying APIC, MSI-X, and legacy interrupts behavior under heavy workload transitions.',
    context: 'הזרקת אלפי פסיקות חומרה במקביל כדי לוודא שהמעבד מנהל את סדרי העדיפויות ביניהן ללא קריסות.'
  },
  {
    id: 'c_mem_test',
    term: 'Memory Testing',
    lessonId: 'l48',
    category: 'סוגי בדיקות',
    definition: 'בדיקת יציבות, מהירות ואמינות קריאה וכתיבה מול זיכרון ה-RAM במצבים שונים.',
    definitionHighLevel: 'Testing data bus signal integrity, training parameters, and memory access patterns over DDR channels.',
    context: 'הרצת כלי MemTest במעבדה תחת תדרי זיכרון מקסימליים ומתחים נמוכים.'
  },
  {
    id: 'c_cache_test',
    term: 'Cache Testing',
    lessonId: 'l49',
    category: 'סוגי בדיקות',
    definition: 'אימות פעולת זיכרונות המטמון הפנימיים במעבד וסנכרון הנתונים ביניהם (Cache Coherency).',
    definitionHighLevel: 'Validation of cache hits, misses, evictions, and coherency states (MESI) across multiple core layers.',
    context: 'בדיקת קווי התקשורת ומהירות הגישה ל-L1, L2 ו-LLC.'
  },
  {
    id: 'c_pipeline_test',
    term: 'Pipeline Testing',
    lessonId: 'l7',
    category: 'סוגי בדיקות',
    definition: 'אימות שצינור העיבוד (Pipeline) של המעבד מפענח ומריץ פקודות בצורה תקינה ללא שגיאות תזמון.',
    definitionHighLevel: 'Verifying execution pipeline hazards, stalls, register forwarding, and recovery steps on branch mispredictions.',
    context: 'הרצת רצפי פקודות מורכבים המאתגרים את מנגנון ה-Out-of-Order של הצינור.'
  },
  {
    id: 'c_io_test',
    term: 'I/O Testing',
    lessonId: 'l27',
    category: 'סוגי בדיקות',
    definition: 'בדיקת קווי הקלט והפלט (I/O) של המעבד מול בקרי הלוח והתקנים חיצוניים.',
    definitionHighLevel: 'Validation of peripheral buses, system interfaces, and legacy I/O mappings to verify correct signal levels.',
    context: 'בדיקות יציבות של קווי USB, SATA, ורשת מול המעבד.'
  },

  // 3. אימות תכנון (Verification)
  {
    id: 'c_verification',
    term: 'Verification',
    lessonId: 'l40',
    category: 'אימות תכנון (Verification)',
    definition: 'אימות שהלוגיקה של השבב נבנתה בדיוק לפי השרטוט והמפרט הלוגי שתוכנן במחשב.',
    definitionHighLevel: 'Ensuring the design implementation complies with the logical specifications (RTL verification).',
    context: 'מבוצע בעיקר בשלב ה-Pre-Silicon באמצעות סימולטורים של SystemVerilog.'
  },
  {
    id: 'c_validation',
    term: 'Validation',
    lessonId: 'l39',
    category: 'אימות תכנון (Verification)',
    definition: 'אימות שהשבב הפיזי עונה על צרכי המשתמש ותפקודו בפועל במערכת אמיתית תקין ויציב.',
    definitionHighLevel: 'Confirming that the physical silicon executes software applications correctly and meets product goals in real-world scenarios.',
    context: 'ולידציה מבוצעת בשלב ה-Post-Silicon על גבי חומרה אמיתית במעבדה.'
  },
  {
    id: 'c_formal_ver',
    term: 'Formal Verification',
    lessonId: 'l40',
    category: 'אימות תכנון (Verification)',
    definition: 'הוכחה מתמטית מוחלטת שהלוגיקה של המעבד תקינה ואינה מכילה שגיאות, ללא צורך בהרצת בדיקות.',
    definitionHighLevel: 'Mathematical proof of design correctness against formal properties using model checking algorithms.',
    context: 'שימוש בכלים מתמטיים מיוחדים לאימות מנגנונים קריטיים כמו בקרי פסיקות ופרוטוקולי אפיק תקשורת.'
  },
  {
    id: 'c_dynamic_ver',
    term: 'Dynamic Verification',
    lessonId: 'l40',
    category: 'אימות תכנון (Verification)',
    definition: 'אימות הלוגיקה באמצעות הרצת בדיקות והזרקת אותות משתנים לאורך זמן בסימולציה.',
    definitionHighLevel: 'Design verification executed by running test scenarios and checking dynamic signal behaviors over simulation clock cycles.',
    context: 'הרצת קודים ובדיקות על מודל ה-RTL כדי לראות את האותות החשמליים משתנים בסימולטור.'
  },
  {
    id: 'c_static_ver',
    term: 'Static Verification',
    lessonId: 'l40',
    category: 'אימות תכנון (Verification)',
    definition: 'ניתוח קוד הלוגיקה של המעבד ללא הרצה שלו, כדי לזהות שגיאות תחביר וחוקי תכנון.',
    definitionHighLevel: 'Analyzing the code syntax, clock domain constraints, and structure rule compliance without simulating clock cycles.',
    context: 'שימוש בכלי ל linting (כמו Leda/SpyGlass) כדי לאתר בעיות בקוד ה-RTL.'
  },
  {
    id: 'c_simulation',
    term: 'Simulation',
    lessonId: 'l40',
    category: 'אימות תכנון (Verification)',
    definition: 'הדמיית התנהגות המעבד באמצעות תוכנת מחשב (איטית מאוד אך מדויקת ברמת השער הלוגי).',
    definitionHighLevel: 'Software execution of the RTL design mapping transistor and gate actions cycle-by-cycle.',
    context: 'הרצת סימולטורים של חברות כמו Synopsys או Cadence לאימות קוד RTL מוקדם.'
  },
  {
    id: 'c_emulation',
    term: 'Emulation',
    lessonId: 'l40',
    category: 'אימות תכנון (Verification)',
    definition: 'חיקוי פעולת המעבד באמצעות מכונות חומרה מורכבות המאיצות את מהירות הבדיקה פי אלפים מסימולטור.',
    definitionHighLevel: 'Executing logic designs on specialized hardware accelerators simulating hardware gates at megahertz speeds.',
    context: 'הרצת מודל המעבד על גבי מערכות אמיולציה (כגון Intel Veloce) כדי להריץ קטעי BIOS מוקדמים.'
  },
  {
    id: 'c_fpga_proto',
    term: 'FPGA Prototyping',
    lessonId: 'l40',
    category: 'אימות תכנון (Verification)',
    definition: 'צריבה והרצה של קוד המעבד על גבי שבבים ניתנים לתכנות (FPGA) כדי דמות חומרה מהירה במעבדה.',
    definitionHighLevel: 'Synthesizing RTL designs into arrays of physical FPGAs to achieve near-real hardware operating speeds for early validation testing.',
    context: 'שימוש בלוחות FPGA לפיתוח דרייברים ואימות קושחה מוקדם לפני הגעת הסיליקון מהמפעל.'
  },
  {
    id: 'c_abv',
    term: 'Assertion-Based Verification (ABV)',
    lessonId: 'l40',
    category: 'אימות תכנון (Verification)',
    definition: 'שימוש בהצהרות בקרה פנימיות בקוד (Assertions) שמתריעות מיידית על מצב לוגי לא חוקי בזמן הריצה.',
    definitionHighLevel: 'Integrating check properties inside RTL structures that monitor structural rules and instantly flag failures during tests.',
    context: 'כתיבת Assertions ב-SystemVerilog לוודא שפרוטוקול האפיק אינו מופר.'
  },
  {
    id: 'c_crv',
    term: 'Constrained Random Verification (CRV)',
    lessonId: 'l40',
    category: 'אימות תכנון (Verification)',
    definition: 'הזרקת אותות ופקודות אקראיות תחת מגבלות מוגדרות כדי למצוא באגים בלתי צפויים.',
    definitionHighLevel: 'Generating random stimulus inputs bounded by dynamic constraints to explore unanticipated design paths.',
    context: 'שימוש במחולל בדיקות אקראי ליצירת שילובי פקודות נדירים שקשה לחשוב עליהם ידנית.'
  },
  {
    id: 'c_cdv',
    term: 'Coverage-Driven Verification (CDV)',
    lessonId: 'l10',
    category: 'אימות תכנון (Verification)',
    definition: 'שיטת עבודה שבה כותבים ומריצים בדיקות במטרה מוצהרת להעלות את אחוזי הכיסוי הלוגי של השבב.',
    definitionHighLevel: 'Feedback loop testing where simulation runs are directed dynamically to hit unreached coverage metrics.',
    context: 'ניתוח דוחות הכיסוי וכתיבת בדיקות ממוקדות לאזורים שלוגיקת הבדיקות טרם הגיעה אליהם.'
  },

  // 4. כיסוי (Coverage)
  {
    id: 'c_code_cov',
    term: 'Code Coverage',
    lessonId: 'l40',
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
    lessonId: 'l10',
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
    lessonId: 'l57',
    category: 'כלי Debug',
    definition: 'ממשק חומרה וסטנדרט בינלאומי לביצוע דיבאג חומרתי ישיר, בדיקות לוח ועצירת פעולת המעבד.',
    definitionHighLevel: 'IEEE 1149.1 standard for board and system testing, boundary scans, and in-target probe (ITP) debugging operations.',
    context: 'חיבור הדיבאגר של אינטל ללוח דרך פיני JTAG מאפשר לעצור את ריצת המעבד בשורת קוד מסוימת.'
  },
  {
    id: 'c_boundary_scan',
    term: 'Boundary Scan',
    lessonId: 'l57',
    category: 'כלי Debug',
    definition: 'בדיקה חשמלית המאפשרת לבחון את חיבורי הפינים של המעבד ללוח ללא צורך במגע פיזי עליהם.',
    definitionHighLevel: 'Utilizing boundary scan cells on signal pins via JTAG interface to test board connectivity and pin-to-pad physical contacts.',
    context: 'בדיקת קווים מנותקים או קצרים חשמליים בלוחות אם מורכבים במעבדה.'
  },
  {
    id: 'c_trace',
    term: 'Trace',
    lessonId: 'l56',
    category: 'כלי Debug',
    definition: 'הקלטה רציפה של פעולות המעבד והוראות הקוד שהוא מריץ בזמן אמת, לצורך ניתוח קריסות בדיעבד.',
    definitionHighLevel: 'Continuous execution capture stream recording instruction flows, branch results, and register updates.',
    context: 'שימוש ב-Trace Buffer כדי להבין בדיוק מה עשה המעבד במחזורי השעון האחרונים לפני שקפא.'
  },
  {
    id: 'c_logic_analyzer',
    term: 'Logic Analyzer',
    lessonId: 'l58',
    category: 'כלי Debug',
    definition: 'מכשיר מדידה אלקטרוני המציג ומנתח מאות אותות דיגיטליים במקביל בלוח האם.',
    definitionHighLevel: 'Test equipment capturing high-channel-count digital states to trace complex bus timing behaviors.',
    context: 'חיבור לוגיק אנלייזר לקווי אפיק התקשורת של המעבד כדי לאתר בעיות סינכרון.'
  },
  {
    id: 'c_oscilloscope',
    term: 'Oscilloscope',
    lessonId: 'l59',
    category: 'כלי Debug',
    definition: 'מכשיר מדידה המציג את האות החשמלי האנלוגי המשתנה בזמן (מתח, רעש, גליות).',
    definitionHighLevel: 'Analog measurement instrument capturing voltage waveforms over time to analyze signal integrity.',
    context: 'מדידת רעשי Vdroop או איכות סיגנלים חשמליים מהירים במעבדת הולידציה החשמלית (EV).'
  },
  {
    id: 'c_debug_port',
    term: 'Debug Port',
    lessonId: 'l56',
    category: 'כלי Debug',
    definition: 'חיבור פיזי ייעודי בלוח האם המיועד לחיבור כלי אבחון ודיבאג חיצוניים.',
    definitionHighLevel: 'Dedicated physical header (e.g. XDP) routing internal CPU debug signals out of the board for debugger interfaces.',
    context: 'חיבור מתאמי XDP או ITP ללוח הבדיקות כדי לתקשר עם המעבד.'
  },
  {
    id: 'c_intel_dci',
    term: 'Intel DCI',
    lessonId: 'l26',
    category: 'כלי Debug',
    definition: 'טכנולוגיית דיבאג של אינטל המאפשרת גישה לחומרת הדיבאג הפנימית של המעבד באמצעות כבל USB 3.0 פשוט.',
    definitionHighLevel: 'Direct Connect Interface routing JTAG and trace signals directly through external USB 3.0 ports on SUT.',
    context: 'מאפשר ביצוע דיבאג חומרה מלא גם על מערכות סגורות שאין בהן מחברי דיבאג ייעודיים על הלוח.'
  },
  {
    id: 'c_uart_debug',
    term: 'UART Debug',
    lessonId: 'l56',
    category: 'כלי Debug',
    definition: 'חיבור תקשורת טקסטואלי סריאלי פשוט לקבלת פלטי אבחון והקלדת פקודות (מסוף UART).',
    definitionHighLevel: 'Universal Asynchronous Receiver-Transmitter serial console connection displaying firmware boot messages.',
    context: 'חיבור כבל סריאלי ל-SUT כדי לראות את פלט ה-BIOS וה-Kernel בזמן הבוט.'
  },
  {
    id: 'c_pcie_analyzer',
    term: 'PCIe Analyzer',
    lessonId: 'l50',
    category: 'כלי Debug',
    definition: 'מכשיר ייעודי המקליט ומנתח את חבילות המידע העוברות בערוץ ה-PCI Express.',
    definitionHighLevel: 'Protocol analyzer capturing physical, link, and transaction layer packets traversing the PCIe interface.',
    context: 'ניתוח חבילות LTSSM ונתונים במקרה של ניתוקי כרטיסי הרחבה או האטה בביצועים.'
  },
  {
    id: 'c_etm',
    term: 'ETM (Embedded Trace Macrocell)',
    lessonId: 'l56',
    category: 'כלי Debug',
    definition: 'רכיב חומרה פנימי במעבד המאפשר להקליט את פעולות המעבד ללא האטה שלו.',
    definitionHighLevel: 'On-die trace module generating compressed instruction and data stream records for hardware-assisted debugging.',
    context: 'משמש את המהנדסים לקבלת תמונת מצב מדויקת של ריצת הקוד ברמת מחזור השעון הבודד.'
  },

  // 6. תקלות (Bugs)
  {
    id: 'c_func_bug',
    term: 'Functional Bug',
    lessonId: 'l5',
    category: 'תקלות (Bugs)',
    definition: 'שגיאה שבה המעבד אינו מחזיר את התוצאה הלוגית הנכונה או אינו מבצע את הפעולה שהתבקש.',
    definitionHighLevel: 'A defect in logic design violating functional specs, resulting in incorrect calculations or behaviors.',
    context: 'מציאת שגיאה שבה פקודת חישוב מסוימת מחזירה ערך שגוי תחת תנאים מסוימים.'
  },
  {
    id: 'c_timing_bug',
    term: 'Timing Bug',
    lessonId: 'l54',
    category: 'תקלות (Bugs)',
    definition: 'באג שקורה רק בתדרי שעון מסוימים או עקב עיכובים זעירים בהגעת האותות החשמליים בשבב.',
    definitionHighLevel: 'A physical silicon failure manifesting under specific frequencies, voltage levels or signal delay margins.',
    context: 'באגים המתרחשים לרוב רק בטמפרטורות גבוהות או במתחים נמוכים במיוחד.'
  },
  {
    id: 'c_race_condition',
    term: 'Race Condition',
    lessonId: 'l9',
    category: 'תקלות (Bugs)',
    definition: 'באג שבו שתי פעולות מתחרות על אותו משאב והתוצאה הסופית תלויה באקראי במי שהגיעה קודם.',
    definitionHighLevel: 'An unsynchronized concurrent access conflict leading to unpredictable logical results.',
    context: 'תקלה המתרחשת כאשר שתי ליבות מעבד מנסות לכתוב לאותה כתובת זיכרון במקביל ללא נעילה.'
  },
  {
    id: 'c_deadlock',
    term: 'Deadlock',
    lessonId: 'l9',
    category: 'תקלות (Bugs)',
    definition: 'מצב קיפאון שבו שתי יחידות במעבד מחכות זו לזו שישחררו משאב מסוים, ושניהם נעצרים לנצח.',
    definitionHighLevel: 'Mutual exclusion deadlock where multiple processes hold resources while waiting for other held resources.',
    context: 'קריסת מעבד (Hang) הנגרמת עקב חסימה הדדית בין בקרי הזיכרון ל-Ring Bus.'
  },
  {
    id: 'c_livelock',
    term: 'Livelock',
    lessonId: 'l9',
    category: 'תקלות (Bugs)',
    definition: 'מצב שבו שתי יחידות במעבד משנות את מצבן ללא הרף בתגובה זו לזו, אך אינן מתקדמות בביצוע המשימה.',
    definitionHighLevel: 'Active execution loop where components continuously switch states in response to each other without making progress.',
    context: 'זיהוי מעבד שצורך 100% אנרגיה אך אינו מריץ קוד בפועל עקב לולאת תגובה פנימית.'
  },
  {
    id: 'c_data_corruption',
    term: 'Data Corruption',
    lessonId: 'l60',
    category: 'תקלות (Bugs)',
    definition: 'השחתה או שינוי לא רצוי של מידע השמור בזיכרון או במעבד.',
    definitionHighLevel: 'Unintended alterations in data structures driven by hardware defects, signal noise or logic bugs.',
    context: 'מצב שבו נתונים שנקראים מהדיסק הקשיח או הזיכרון מגיעים משובשים למעבד.'
  },
  {
    id: 'c_sdc',
    term: 'Silent Data Corruption (SDC)',
    lessonId: 'l60',
    category: 'תקלות (Bugs)',
    definition: 'השחתת נתונים שקטה ללא התרעה מהחומרה, שהיא התקלה המסוכנת ביותר.',
    definitionHighLevel: 'Data corruption occurring without any hardware warnings or system exception flags driven by logic faults.',
    context: 'בדיקת חישובים מתמטיים מול מודל התייחסות כדי לוודא שאין SDC בצינורות העיבוד.'
  },
  {
    id: 'c_cache_coherency_bug',
    term: 'Cache Coherency Bug',
    lessonId: 'l15',
    category: 'תקלות (Bugs)',
    definition: 'שגיאה שבה ליבה אחת במעבד קוראת גרסה לא מעודכנת של נתון הנמצא בזיכרון המטמון של ליבה אחרת.',
    definitionHighLevel: 'Failure in coherency protocol (MESI/MOESI) transitions, leading to stale memory views across CPU cores.',
    context: 'דיבאג של תקלות תקשורת UPI/Ring Bus שיוצרות אי עקביות בנתוני זיכרון המטמון.'
  },
  {
    id: 'c_mem_leak',
    term: 'Memory Leak',
    lessonId: 'l60',
    category: 'תקלות (Bugs)',
    definition: 'זליגת זיכרון - אי-שחרור של תאי זיכרון שאינם בשימוש עוד, הגורמת לאתר להאט או לקרוס מחוסר מקום.',
    definitionHighLevel: 'Failure to deallocate dynamically allocated memory blocks, leading to resource depletion over runtime.',
    context: 'בוולידציה בודקים שהתוכנות וסקריפטי האוטומציה אינם סובלים מזליגת זיכרון שמכשילה את המערכות בלילה.'
  },
  {
    id: 'c_hang',
    term: 'Hang',
    lessonId: 'l56',
    category: 'תקלות (Bugs)',
    definition: 'תקיעה מוחלטת של המעבד, שבה המערכת מפסיקה להגיב לחלוטין.',
    definitionHighLevel: 'System lockup where execution clocks freeze or instructions stop retiring due to internal deadlocks.',
    context: 'שימוש ב-DCI כדי לעצור את המערכת התקועה ולמצוא היכן נגרם הקיפאון.'
  },
  {
    id: 'c_crash',
    term: 'Crash',
    lessonId: 'l56',
    category: 'תקלות (Bugs)',
    definition: 'קריסה מוחלטת של מערכת ההפעלה או תוכנת הבדיקה עקב שגיאת חומרה חמורה.',
    definitionHighLevel: 'Sudden termination of execution driven by unrecoverable hardware exceptions or kernel panic states.',
    context: 'ניתוח קבצי Core Dump לאחר קריסת ה-SUT במעבדה.'
  },
  {
    id: 'c_exception',
    term: 'Exception',
    lessonId: 'l30',
    category: 'תקלות (Bugs)',
    definition: 'הפרעה למהלך הריצה הרגיל של התוכנית בעקבות אירוע מיוחד (כמו חלוקה באפס או שגיאת גישת זיכרון).',
    definitionHighLevel: 'Architectural state redirection triggered by error conditions (e.g. Page Fault, General Protection Fault).',
    context: 'אימות שפסיקות החומרה והשגיאות מטופלות נכון על ידי מערכת ההפעלה.'
  },
  {
    id: 'c_mce',
    term: 'Machine Check Exception (MCE)',
    lessonId: 'l30',
    category: 'תקלות (Bugs)',
    definition: 'מנגנון של המעבד המדווח למערכת ההפעלה על תקלות חומרה פנימיות שזוהו.',
    definitionHighLevel: 'Hardware error reporting architecture driving core exceptions on internal parity, ecc, or bus faults.',
    context: 'קריאת בנקי ה-MSR registers של ה-MCE לאבחון מקור התקלה שגרמה למסך כחול.'
  },

  // 7. ביצועים
  {
    id: 'c_benchmark',
    term: 'Benchmark',
    lessonId: 'l8',
    category: 'ביצועים',
    definition: 'תוכנת בדיקה סטנדרטית המשמשת למדידה והשוואה של ביצועי מעבדים ומחשבים שונים.',
    definitionHighLevel: 'Standardized workload suites (e.g. SPEC CPU, Cinebench) executing defined math vectors to measure speed and efficiency.',
    context: 'הרצת SPEC CPU במעבדה כדי לוודא שביצועי ה-ES תואמים להערכות הסימולציה.'
  },
  {
    id: 'c_ipc',
    term: 'IPC (Instructions Per Cycle)',
    lessonId: 'l8',
    category: 'ביצועים',
    definition: 'מספר הפקודות הממוצע שהמעבד מסיים לבצע בכל מחזור שעון (מדד ליעילות ארכיטקטונית).',
    definitionHighLevel: 'Instructions Per Cycle. The average number of micro-operations completed (retired) per clock frequency tick.',
    context: 'בוולידציה שואפים ל-IPC גבוה ככל הניתן; ירידה ב-IPC מעידה על צוואר בקבוק במפענח או בעיכוב זיכרון.'
  },
  {
    id: 'c_cpi',
    term: 'CPI (Cycles Per Instruction)',
    lessonId: 'l8',
    category: 'ביצועים',
    definition: 'כמה מחזורי שעון נדרשים בממוצע כדי לבצע פקודה בודדת (ההופכי של IPC).',
    definitionHighLevel: 'Cycles Per Instruction. The execution clock cycle count required to complete a single instruction.',
    context: 'מדידת CPI של פקודות מורכבות כדי לזהות יעילות של יחידות חישוב.'
  },
  {
    id: 'c_throughput',
    term: 'Throughput',
    lessonId: 'l8',
    category: 'ביצועים',
    definition: 'קצב העבודה הכולל - כמות הנתונים או הבדיקות המבוצעות ביחידת זמן.',
    definitionHighLevel: 'The rate of successful data delivery over communication channels or execution units.',
    context: 'מדידת רוחב הפס המרבי של ממשקי PCIe או הזיכרון.'
  },
  {
    id: 'c_latency',
    term: 'Latency',
    lessonId: 'l8',
    category: 'ביצועים',
    definition: 'זמן השהייה - הזמן שחולף מרגע שליחת הבקשה ועד לקבלת התגובה הראשונית.',
    definitionHighLevel: 'The time duration between stimulus input initiation and response detection.',
    context: 'מדידת זמן גישה לזיכרון ה-RAM (נמדד בננו-שניות).'
  },
  {
    id: 'c_bottleneck',
    term: 'Bottleneck',
    lessonId: 'l8',
    category: 'ביצועים',
    definition: 'צוואר בקבוק - הרכיב הכי איטי במערכת שמגביל ומאט את מהירותה הכוללת.',
    definitionHighLevel: 'The performance-limiting factor within execution pipelines, data paths or peripheral connections.',
    context: 'איתור צווארי בקבוק בחומרת המעבד באמצעות מונים פנימיים (PMU counters).'
  },
  {
    id: 'c_profiling',
    term: 'Profiling',
    lessonId: 'l8',
    category: 'ביצועים',
    definition: 'ניתוח ומדידת זמני ריצה של תוכנית כדי לדעת אילו חלקים צורכים הכי הרבה משאבי עיבוד.',
    definitionHighLevel: 'Dynamic program analysis mapping cycle consumption and memory overhead to source code segments.',
    context: 'שימוש בכלי Profiling (כמו Intel VTune) לזיהוי "אזורים חמים" בבדיקות.'
  },
  {
    id: 'c_perf_counter',
    term: 'Performance Counter',
    lessonId: 'l8',
    category: 'ביצועים',
    definition: 'מוני חומרה פנימיים הרושמים אירועי מעבד ללא הפרעה לריצה.',
    definitionHighLevel: 'On-die hardware counters logging execution events (e.g. Cache Misses, Branch Mispredictions).',
    context: 'קריאת מונים אלו לאפיון הביצועים של ה-SUT.'
  },
  {
    id: 'c_pmu',
    term: 'PMU (Performance Monitoring Unit)',
    lessonId: 'l8',
    category: 'ביצועים',
    definition: 'יחידת החומרה במעבד המרכזת את המונים ובדיקות הביצועים.',
    definitionHighLevel: 'A microarchitectural hardware block managing configuration and reading of performance event counters.',
    context: 'שימוש ב-PMU לאימות קצבי העיבוד של השבב.'
  },

  // 8. זיכרון
  {
    id: 'c_l1_cache',
    term: 'L1 Cache',
    lessonId: 'l14',
    category: 'זיכרון',
    definition: 'זיכרון המטמון המהיר והקטן ביותר, הממוקם ישירות בתוך ליבת המעבד (L1 Cache).',
    definitionHighLevel: 'Primary cache array closest to core pipeline execution units, split into Instruction and Data arrays.',
    context: 'בדיקת מהירות הגישה המרבית ל-L1 (זמן השהייה של מספר מחזורי שעון בודדים).'
  },
  {
    id: 'c_l2_cache',
    term: 'L2 Cache',
    lessonId: 'l14',
    category: 'זיכרון',
    definition: 'זיכרון מטמון משני בליבת המעבד (L2 Cache), מעט גדול ואיטי יותר מ-L1.',
    definitionHighLevel: 'Secondary cache layer tightly coupled to each core, acting as buffer between L1 and shared cache.',
    context: 'אימות מנגנוני ה-Eviction של נתונים מ-L1 ל-L2.'
  },
  {
    id: 'c_l3_cache',
    term: 'L3 Cache (LLC)',
    lessonId: 'l14',
    category: 'זיכרון',
    definition: 'זיכרון המטמון המשותף והגדול ביותר במעבד (L3 Cache), המקשר בין כל הליבות לזיכרון ה-RAM.',
    definitionHighLevel: 'Last Level Cache shared among core agents, partitioned into ring/mesh bus slices.',
    context: 'בדיקות יציבות ושלמות נתונים ב-LLC תחת עומסי קריאה מרובים מכל הליבות במקביל.'
  },
  {
    id: 'c_tlb_val',
    term: 'TLB Validation',
    lessonId: 'l49',
    category: 'זיכרון',
    definition: 'אימות תקינות זיכרון המטמון לתרגום כתובות (TLB), השומר תרגומי כתובות זיכרון וירטואליות לפיזיות.',
    definitionHighLevel: 'Verification of Translation Lookaside Buffer hit, miss, invalidate (TLB shootdown) logic.',
    context: 'מניעת קריסות או השחתת זיכרון במעבר בין תהליכים שונים במערכת ההפעלה.'
  },
  {
    id: 'c_mmu_val',
    term: 'MMU Validation',
    lessonId: 'l49',
    category: 'זיכרון',
    definition: 'בדיקת יחידת ניהול הזיכרון (MMU) האחראית על תרגום כתובות והגנת זיכרון.',
    definitionHighLevel: 'Validation of Memory Management Unit page table walks, page faults, and access permissions.',
    context: 'בדיקה שתוכנה אינה מורשית לגשת לזיכרון השייך לתוכנה אחרת.'
  },
  {
    id: 'c_ecc_testing',
    term: 'ECC Testing',
    lessonId: 'l18',
    category: 'זיכרון',
    definition: 'בדיקת מנגנון קוד תיקון שגיאות (ECC) המסוגל לגלות ולתקן שגיאות זיכרון אקראיות.',
    definitionHighLevel: 'Injecting single-bit and double-bit error states into memory arrays to verify correction and reporting triggers.',
    context: 'שימוש במזרקי שגיאות (Error Injectors) כדי לבדוק שהחומרה מתקנת שגיאות ביט בודד (Single-bit correction) ומדווחת על שגיאות חמורות יותר.'
  },
  {
    id: 'c_mem_controller',
    term: 'Memory Controller Validation',
    lessonId: 'l17',
    category: 'זיכרון',
    definition: 'ולידציה של בקר הזיכרון האחראי על תזמון וניתוב זרם הנתונים בין המעבד ל-RAM.',
    definitionHighLevel: 'Verifying DDR protocol timings, command queues scheduling and power-saving refresh sequences.',
    context: 'אימות עמידה בחוקי התזמון הקפדניים של ממשקי DDR4/DDR5.'
  },
  {
    id: 'c_dram_training',
    term: 'DRAM Training',
    lessonId: 'l16',
    category: 'זיכרון',
    definition: 'תהליך כיול האותות והזמנים מול ה-DDR המבוצע בכל הדלקה.',
    definitionHighLevel: 'Early initialization sequencing aligning command, clock and data strobes via register sweep calibrations.',
    context: 'בוולידציה בודקים שה-DRAM Training מצליח לעבור גם תחת תנאי חום וקור קשים במעבדה.'
  },
  {
    id: 'c_mem_scrubbing',
    term: 'Memory Scrubbing',
    lessonId: 'l48',
    category: 'זיכרון',
    definition: 'מנגנון רקע שסורק את הזיכרון באופן קבוע ומציב תיקון אוטומטי לשגיאות ביט שקטות.',
    definitionHighLevel: 'Systematic memory array scanning reading rows and rewriting corrected ECC values to prevent error accumulation.',
    context: 'מוודא שזכרונות שרתים נשארים נקיים מרעשי קרינה קוסמית ושגיאות קטנות לאורך חודשי פעילות.'
  },

  // 9. צריכת חשמל
  {
    id: 'c_power_gating',
    term: 'Power Gating',
    lessonId: 'l34',
    category: 'צריכת חשמל',
    definition: 'ניתוק פיזי מוחלט של אספקת המתח לאזורים במעבד שאינם בשימוש כדי למנוע זליגת זרם.',
    definitionHighLevel: 'Utilizing power transistors to physically disconnect unused silicon blocks, reducing static leakage current to near-zero.',
    context: 'בדיקת יציבות המעבד בזמן שהוא מכבה ומדליק ליבות שלמות תוך כדי עבודה.'
  },
  {
    id: 'c_clock_gating',
    term: 'Clock Gating',
    lessonId: 'l33',
    category: 'צריכת חשמל',
    definition: 'עצירת אות השעון לרכיבים לוגיים שאינם פעילים כרגע כדי לחסוך בצריכת חשמל דינמית.',
    definitionHighLevel: 'Disabling clock signals to registers that do not need updating in the current cycle to save dynamic switching power.',
    context: 'זהו המנגנון המיידי ביותר לחסכון באנרגיה במעבד ומבוצע באופן אוטומטי בחומרה.'
  },
  {
    id: 'c_dvfs',
    term: 'DVFS',
    lessonId: 'l35',
    category: 'צריכת חשמל',
    definition: 'שינוי דינמי של מתח ותדר המעבד בזמן אמת לפי רמת העומס הנדרשת.',
    definitionHighLevel: 'Dynamic Voltage and Frequency Scaling. Adjusting voltage rails and PLL clocks to match target workload performance demand.',
    context: 'בדיקת יציבות מייצבי המתח (VR) במעברים מהירים במיוחד בין רמות מתח שונות.'
  },
  {
    id: 'c_sleep_states',
    term: 'Sleep States (S-States)',
    lessonId: 'l35',
    category: 'צריכת חשמל',
    definition: 'מצבי שינה והכיבוי של המערכת כולה (כמו מצבי ACPI S3, S4, S5).',
    definitionHighLevel: 'ACPI defined platform sleep configurations coordinating global power rail terminations.',
    context: 'בדיקת זיהוי חומרה מלא לאחר שה-SUT יוצא ממצב שינה עמוק.'
  },
  {
    id: 'c_cstates',
    term: 'C-States',
    lessonId: 'l35',
    category: 'צריכת חשמל',
    definition: 'מצבי שינה פנימיים של ליבות המעבד (C0 לפעולה, C10 לשינה עמוקה ביותר).',
    definitionHighLevel: 'ACPI core power savings states regulating core clock gating and power gating depth.',
    context: 'מדידת זמני ההתעוררות (Wakeup Latency) של ליבות ממצב C10.'
  },
  {
    id: 'c_pstates',
    term: 'P-States',
    lessonId: 'l35',
    category: 'צריכת חשמל',
    definition: 'מצבי ביצועים של המעבד הפעיל (שילובים שונים של תדר ומתח עבודה).',
    definitionHighLevel: 'ACPI power-performance states configuring frequency targets under active execution cycles.',
    context: 'אימות שהמעבד משתמש ב-P-states הנמוכים בזמן מנוחה כדי למנוע צריכת זרם מיותרת.'
  },
  {
    id: 'c_thermal_throttling',
    term: 'Thermal Throttling',
    lessonId: 'l36',
    category: 'צריכת חשמל',
    definition: 'מנגנון בטיחות המוריד את מהירות המעבד כשהוא מתחמם יתר על המידה כדי למנוע נזק פיזי.',
    definitionHighLevel: 'Triggering clock duty cycle scaling or frequency drops when internal junction sensors report temperature limits.',
    context: 'בדיקה שהמעבד מוריד תדר בהצלחה ברגע שהוא מגיע ל-TjMax.'
  },
  {
    id: 'c_turbo_validation',
    term: 'Turbo Boost Validation',
    lessonId: 'l35',
    category: 'צריכת חשמל',
    definition: 'אימות מנגנון המאיץ את תדר הליבות מעבר לתדר הבסיס כאשר יש מרווח טמפרטורה והספק פנוי.',
    definitionHighLevel: 'Verifying dynamic frequency boosting algorithm based on target budget telemetry parameters.',
    context: 'מדידת יציבות המעבד במהירויות שיא תחת עומסי עבודה קצרים.'
  },

  // 10. תזמונים (Core Interview Topics)
  {
    id: 'c_cdc',
    term: 'Clock Domain Crossing (CDC)',
    lessonId: 'l55',
    category: 'תזמונים',
    definition: 'מעבר של אות נתונים בין שני אזורים במעבד הפועלים תחת תדרי שעון שונים ובלתי מסונכרנים.',
    definitionHighLevel: 'Signals routing between logic registers driven by unsynchronized clock trees, creating metastability risks.',
    context: 'בדיקת קיומם של מסנכרנים (Synchronizers) בקצוות האזורים כדי למנוע איבוד ביטים.'
  },
  {
    id: 'c_sta',
    term: 'Static Timing Analysis (STA)',
    lessonId: 'l54',
    category: 'תזמונים',
    definition: 'ניתוח תיאורטי של זמני הגעת האותות החשמליים בשבב כדי לוודא שאין שגיאות תזמון.',
    definitionHighLevel: 'Verification of design paths delays without simulation, confirming setup and hold requirements are met.',
    context: 'מבוצע בששלב ה-Pre-Silicon כדי להבטיח סגירת תזמונים (Timing Closure) במהירות השעון המיועדת.'
  },

  // 11. ארכיטקטורה
  {
    id: 'c_pcie',
    term: 'PCI Express (PCIe)',
    lessonId: 'l25',
    category: 'ארכיטקטורה',
    definition: 'פרוטוקול תקשורת מהיר לחיבור כרטיסים חיצוניים (כמו כרטיסי מסך) ישירות למעבד.',
    definitionHighLevel: 'High-speed serial computer expansion bus standard featuring point-to-point packet communication.',
    context: 'זהו ממשק החיבור החיצוני המרכזי של מעבדי אינטל; ולידציה שלו דורשת ניתוח חשמלי ולוגי מעמיק.'
  },
  {
    id: 'c_ddr',
    term: 'DDR Memory',
    lessonId: 'l16',
    category: 'ארכיטקטורה',
    definition: 'זיכרון הגישה האקראית (RAM) הראשי של המערכת המקושר למעבד.',
    definitionHighLevel: 'Double Data Rate synchronous dynamic random-access memory interface specification.',
    context: 'בדיקת בקרי הזיכרון במעבד מול מודולי זיכרון DDR4 ו-DDR5.'
  },
  {
    id: 'c_cache_coherency',
    term: 'Cache Coherency',
    lessonId: 'l15',
    category: 'ארכיטקטורה',
    definition: 'מנגנון השומר על עקביות ועדכניות הנתונים בכל זיכרונות המטמון של הליבות השונות.',
    definitionHighLevel: 'Ensuring consistent data views across distributed cache memories on multi-core systems via hardware protocols.',
    context: 'זהו אחד מנושאי הראיונות החשובים ביותר (MESI protocol) מכיוון שהוא מונע השחתת נתונים ביישומים מרובי תהליכים.'
  },
  {
    id: 'c_interrupts',
    term: 'Interrupts',
    lessonId: 'l29',
    category: 'ארכיטקטורה',
    definition: 'אותות חומרה או תוכנה המודיעים למעבד שעליו להפסיק זמנית את התוכנית הנוכחית כדי לטפל באירוע דחוף.',
    definitionHighLevel: 'Asynchronous signals asserting core vector redirections to execute Interrupt Service Routines (ISRs).',
    context: 'בוולידציה בודקים את מנגנוני ה-APIC וה-MSI-X של המעבד.'
  },
  {
    id: 'c_boot_flow',
    term: 'Boot Flow',
    lessonId: 'l22',
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
    lessonId: 'l6',
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
      'נורת ה-CATERR בלוח ה-StarGate נדלק בצבע אדום.',
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
export const categories = [
  'שלבי הולידציה',
  'סוגי בדיקות',
  'אימות תכנון (Verification)',
  'כיסוי (Coverage)',
  'כלי Debug',
  'תקלות (Bugs)',
  'ביצועים',
  'זיכרון',
  'צריכת חשמל',
  'תזמונים',
  'ארכיטקטורה',
  'אבטחה',
  'ציוד מעבדה',
  'אוטומציה',
  'מסמכים'
];
