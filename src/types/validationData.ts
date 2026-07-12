export interface Concept {
  id: string;
  term: string;
  definition: string;
  definitionHighLevel: string;
  category: string;
  context: string;
}

export interface CheckpointData {
  type: 'drag-drop' | 'bit-mask';
  dragDropData?: {
    items: string[];
    correctOrder: string[];
  };
  bitMaskData?: {
    instruction: string;
    initialRegister: number[]; // e.g. [0, 0, 0, 0, 0, 0, 0, 0]
    targetRegister: number[];  // e.g. [0, 1, 0, 0, 1, 0, 0, 0]
  };
}

export interface LogScenarioData {
  title: string;
  logLines: string[];
  filterKeywords: string[];
  correctLineIndex: number; // Index in filtered view or absolute? Let's use index in absolute logLines for accuracy.
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface Lesson {
  id: string;
  title: string;
  titleHe: string;
  description: string;
  whyItIsHere: string;
  prerequisites: string[];
  conceptIds: string[];
  pathway: 'high' | 'low';
  contentSlides: string[]; // detailed markdown-like HTML descriptions or sections
  hasDiagram?: boolean; // Unit 1.1 has the Chiplet diagram
  checkpoints?: CheckpointData; // Inline checkpoint
  logScenario?: LogScenarioData; // Unit end lab
}

export interface BugMatrixItem {
  category: string;
  description: string;
  debugFlow: string;
}

export interface ExamScenario {
  id: string;
  pathway: 'high' | 'low';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reviewTopicIds: string[]; // References to lessons (e.g. ['l1', 'l2']) to point the user to
}
