import { QuestionDTO, QuestionType } from "@/api/Survey";
import { SurveyQuestionLikertItem } from "./SurveyQuestionLikertItem";
import { SurveyQuestionSingleSelectItem } from "./SurveyQuestionSingleSelectItem";
import { SurveyQuestionSliderItem } from "./SurveyQuestionSliderItem";

type SurveyQuestionItemProps = {
  item: QuestionDTO;
};

export const SurveyQuestionItem = ({ item }: SurveyQuestionItemProps) => {
  if (item?.type == QuestionType.Likert) {
    return <SurveyQuestionLikertItem item={item} />;
  }

  if (item?.type == QuestionType.SingleSelect) {
    return <SurveyQuestionSingleSelectItem item={item} />;
  }

  if (item?.type == QuestionType.Slider) {
    return <SurveyQuestionSliderItem item={item} />;
  }
};
