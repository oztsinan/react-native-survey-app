import { Surveys } from "@/constants/Surveys";
import { SurveyDTO } from "./Survey.types";

class SurveyService {
  async getAll(): Promise<SurveyDTO[]> {
    return Surveys;
  }

  async getById(id: string): Promise<SurveyDTO> {
    const survey = Surveys.find((survey) => survey.id === id);
    if (!survey) {
      throw new Error("Survey not found");
    }
    return survey;
  }
}

const SurveyServiceApi = new SurveyService();
export default SurveyServiceApi;
