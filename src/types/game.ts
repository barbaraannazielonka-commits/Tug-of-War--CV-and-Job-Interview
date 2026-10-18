export type QuestionType = 'mc' | 'open';

export type QuestionCategory = 
  | 'CV Structure'
  | 'CV Writing'
  | 'STAR Method'
  | 'Interview Strategy'
  | 'First Impressions'
  | 'Professionalism'
  | 'References & Follow-up';

export interface BaseQuestion {
  id: number | string;
  category: QuestionCategory | string;
  question: string;
  explanation: string;
  careerTip?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'mc';
  options: string[];
  correct: number;
}

export interface OpenEndedQuestion extends BaseQuestion {
  type: 'open';
  rubric: string;
}

export type Question = MultipleChoiceQuestion | OpenEndedQuestion;

export type TeamSide = 'red' | 'blue';

export interface TeamConfig {
  name: string;
  mascot: string;
  color: string;
  score: number;
  streak: number;
}

export interface GameSettings {
  winThreshold: number; // knots to win (e.g. 4)
  stepDistance: number; // knots pulled per correct answer
  streakBonusEnabled: boolean; // if true, streak of 2+ adds 1 extra bonus micro-pull
  turnTimerSeconds: number; // 0 = off, 30, 45, 60
  soundMuted: boolean;
  categoryFilter: string; // 'All' or specific category
}

export interface MatchHistoryEntry {
  questionId: number | string;
  team: TeamSide;
  awarded: boolean;
  ropePositionBefore: number;
  ropePositionAfter: number;
  timestamp: string;
}
