import { Surveys } from "@/constants/Surveys";
import { SurveyDTO } from "./Survey.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // Tamamlanmamış anketleri getir
  async getAvailableSurveys(): Promise<SurveyDTO[]> {
    return getFilteredSurveys({ isCompleted: false, isTimeout: false });
  }

  // Tamamlanmış anketleri getir
  async getCompletedSurveys(): Promise<SurveyDTO[]> {
    return getFilteredSurveys({ isCompleted: true });
  }

  // Timeout (zaman aşımına uğramış) anketleri getir
  async getTimeoutSurveys(): Promise<SurveyDTO[]> {
    return getFilteredSurveys({ isCompleted: false, isTimeout: true });
  }
}

// Filtreleme koşullarını JSON üzerinden alan bir yardımcı fonksiyon
async function getFilteredSurveys(filters: {
  isCompleted?: boolean;
  isTimeout?: boolean;
}): Promise<SurveyDTO[]> {
  const keys = await AsyncStorage.getAllKeys();

  // "survey-store-" ile başlayan anahtarları filtrele
  const surveyKeys = keys.filter((key) => key.startsWith("survey-store-"));

  // Bu anahtarlar için değerleri al
  const result = await AsyncStorage.multiGet(surveyKeys);

  // Gönderilen filtrelere göre anketleri filtrele
  const filteredSurveys = result.filter(([key, value]) => {
    const parsedValue = JSON.parse(value as any);

    let matches = true;

    // isCompleted kontrolü
    if (filters.isCompleted !== undefined) {
      matches =
        matches && parsedValue.state.isCompleted === filters.isCompleted;
    }

    // isTimeout kontrolü
    if (filters.isTimeout !== undefined) {
      const isTimeout =
        parsedValue.state.remainingTime !== undefined &&
        parsedValue.state.remainingTime === 0;
      matches = matches && isTimeout === filters.isTimeout;
    }

    return matches;
  });

  // "survey-store-" kısmını silerek sadece ID'leri al
  const filteredSurveyIds = filteredSurveys.map(([key, value]) => {
    const id = key.replace("survey-store-", ""); // "survey-store-" kısmını çıkar
    return id;
  });

  // Surveys listesinden filteredSurveyIds'de olanları filtrele ve döndür
  return Surveys.filter((survey) => filteredSurveyIds.includes(survey.id));
}

const SurveyServiceApi = new SurveyService();
export default SurveyServiceApi;
