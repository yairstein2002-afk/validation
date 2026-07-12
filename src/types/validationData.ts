export interface Concept {
  id: string;
  term: string;
  lessonId: string;
  definition: string;       // Low-Level / Standard Definition
  definitionHighLevel: string; // High-Level Architecture Definition
  context: string;          // Lab / Debug context
  isCustom?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SlideDiagram {
  title: string;
  nodes: { id: string; label: string; type?: 'input' | 'process' | 'output' | 'decision' }[];
  edges: { from: string; to: string; label?: string }[];
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

export interface LabError {
  name: string;
  code: string;
  description: string;
  standardExplanation: string; // Low-Level
  highLevelExplanation: string; // High-Level
  symptoms: string[];
  debugFlow: string[];
}
