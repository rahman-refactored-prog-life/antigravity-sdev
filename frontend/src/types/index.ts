export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type QuestionType = 'PRACTICE' | 'QUIZ' | 'INTERVIEW';

export interface PracticeQuestion {
    id: number;
    title: string;
    description: string;
    difficulty: DifficultyLevel;
    type: QuestionType;
    topicId: number;
    solution?: string;
    hints?: string;
    testCases?: string; // JSON string
    orderIndex: number;
}
