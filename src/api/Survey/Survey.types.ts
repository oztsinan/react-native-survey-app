export type SurveyDTO = {
  id: string;
  name: string;
  duration: number;
  questions: QuestionDTO[];
  answers?: Record<string, { value: number | string; completionTime: number }>;
  completedDate?: string;
  isTimeout?: boolean;
  isStarted?: boolean;
};

export type QuestionDTO = {
  id: string;
  text: string;
  options: OptionDTO[] | null;
  type: QuestionType;
  maxValue?: number;
  minValue?: number;
  step?: number;
};

export type OptionDTO = {
  id: string;
  text: string;
};

export enum QuestionType {
  Likert = "Likert",
  SingleSelect = "SingleSelect",
  Slider = "Slider",
}
