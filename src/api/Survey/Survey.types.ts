export type SurveyDTO = {
  id: string;
  name: string;
  duration: number;
  questions: QuestionDTO[];
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
  value: number;
};

export enum QuestionType {
  Likert = "Likert",
  SingleSelect = "SingleSelect",
  Slider = "Slider",
}
