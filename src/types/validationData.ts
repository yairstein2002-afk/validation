export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SlideDiagram {
  title: string;
  nodes: Array<{
    id: string;
    label: string;
    type: 'input' | 'process' | 'decision' | 'output';
  }>;
  edges: Array<{
    from: string;
    to: string;
  }>;
}

export interface Lesson {
  id: string;
  title: string;
  titleHe: string;
  description: string;
  whyItIsHere: string;
  prerequisites: string[];
  videoUrl: string;
  diagram?: SlideDiagram;
  conceptIds: string[];
  quizQuestions: QuizQuestion[];
  isPlanned?: boolean;
}

export interface Concept {
  id: string;
  term: string;
  lessonId: string;
  definition: string;
  definitionHighLevel: string;
  context: string;
  isCustom?: boolean;
  category?: string; // Newly added to categorize all 100+ concepts
}

export interface LabError {
  name: string;
  code: string;
  description: string;
  standardExplanation: string;
  highLevelExplanation: string;
  symptoms: string[];
  debugFlow: string[];
}
