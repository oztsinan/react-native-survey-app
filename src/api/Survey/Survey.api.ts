import { Surveys } from "@/constants/Surveys";
import { SurveyDTO } from "./Survey.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

class SurveyService {
  async getAll(): Promise<SurveyDTO[]> {
    return Surveys;
  }

  async getById(id: string): Promise<SurveyDTO> {
    const survey = Surveys.find((survey) => survey.id === id);
    const surveyPersist = await AsyncStorage.getItem(`survey-store-${id}`);

    if (surveyPersist) {
      const parsedSurveyPersist = JSON.parse(surveyPersist);

      const isTimeout = parsedSurveyPersist?.state?.remainingTime !== undefined && parsedSurveyPersist?.state?.remainingTime === 0;

      return {
        ...survey,
        answers: parsedSurveyPersist?.state?.answers!,
        completedDate: parsedSurveyPersist?.state?.completedDate!,
        isTimeout: isTimeout,
      } as SurveyDTO;
    }

    if (!survey) {
      throw new Error("Survey not found");
    }

    return survey;
  }

  // tamamlanmamış anketleri getir (AsyncStorage'de persist edilmeyenler de gösterilecek)
  async getAvailableSurveys(): Promise<SurveyDTO[]> {
    const keys = await AsyncStorage.getAllKeys();
    const surveyKeys = keys.filter((key) => key.startsWith("survey-store-"));

    const result = await AsyncStorage.multiGet(surveyKeys);

    const filteredSurveyIds = result
      .filter(([key, value]) => {
        const parsedValue = JSON.parse(value as any);
        // tamamlanmamış ve timeout olmayan anketleri filtrele
        const isTimeout = parsedValue.state.remainingTime !== undefined && parsedValue.state.remainingTime === 0;

        return !parsedValue.state.completedDate || !isTimeout;
      })
      .map(([key]) => key.replace("survey-store-", ""));

    const unpersistedSurveyIds = Surveys.filter((survey) => !filteredSurveyIds.includes(survey.id)).map((survey) => survey.id);

    // persist edilmemişleri varsayılan değerlerle ekle
    const unpersistedSurveys = Surveys.filter((survey) => unpersistedSurveyIds.includes(survey.id)).map((survey) => ({
      ...survey,
      completedDate: undefined,
      isTimeout: false,
    }));

    return unpersistedSurveys;
  }

  // başlatılan ama bitirilmeyen anketleri getir (sadece persist edilmişlerden)
  async getStartedSurveys(): Promise<SurveyDTO[]> {
    const keys = await AsyncStorage.getAllKeys();
    const surveyKeys = keys.filter((key) => key.startsWith("survey-store-"));
    const result = await AsyncStorage.multiGet(surveyKeys);

    const filteredSurveys = result
      .filter(([key, value]) => {
        const parsedValue = JSON.parse(value as any);
        // anketin başlatılmış ama tamamlanmamış olduğunu kontrol et (completedDate boş olmalı)
        // aynı zamanda timeout olmamış olmalı
        const isTimeout = parsedValue.state.remainingTime !== undefined && parsedValue.state.remainingTime === 0;
        return !!parsedValue.state.answers && !parsedValue.state.completedDate && !isTimeout;
      })
      .map(([key, value]) => {
        const id = key.replace("survey-store-", "");
        const survey = Surveys.find((survey) => survey.id === id);
        const parsedValue = JSON.parse(value as any);
        return {
          ...survey,
          answers: parsedValue.state.answers,
          completedDate: parsedValue.state.completedDate,
          isTimeout: false, // Başlatıldığı ama tamamlanmadığı için isTimeout false olacak
          isStarted: true,
        } as SurveyDTO;
      });

    return filteredSurveys;
  }

  // tamamlanmış anketleri getir (sadece persist edilmişlerden)
  async getCompletedSurveys(): Promise<SurveyDTO[]> {
    const keys = await AsyncStorage.getAllKeys();
    const surveyKeys = keys.filter((key) => key.startsWith("survey-store-"));
    const result = await AsyncStorage.multiGet(surveyKeys);

    const filteredSurveys = result
      .filter(([key, value]) => {
        const parsedValue = JSON.parse(value as any);
        // sadece completedDate dolu olanları döndür
        return !!parsedValue.state.completedDate;
      })
      .map(([key, value]) => {
        const id = key.replace("survey-store-", "");
        const survey = Surveys.find((survey) => survey.id === id);
        const parsedValue = JSON.parse(value as any);

        const isTimeout = parsedValue.state.remainingTime !== undefined && parsedValue.state.remainingTime === 0;

        return {
          ...survey,
          completedDate: parsedValue.state.completedDate,
          isTimeout: isTimeout,
        } as SurveyDTO;
      });

    return filteredSurveys;
  }

  // timeout (zaman aşımına uğramış) anketleri getir (sadece persist edilmişlerden)
  async getTimeoutSurveys(): Promise<SurveyDTO[]> {
    const keys = await AsyncStorage.getAllKeys();
    const surveyKeys = keys.filter((key) => key.startsWith("survey-store-"));

    const result = await AsyncStorage.multiGet(surveyKeys);

    const filteredSurveys = result
      .filter(([key, value]) => {
        const parsedValue = JSON.parse(value as any);
        // sadece timeout olmuş anketleri döndür
        const isTimeout = parsedValue.state.remainingTime !== undefined && parsedValue.state.remainingTime === 0;
        return isTimeout;
      })
      .map(([key, value]) => {
        const id = key.replace("survey-store-", "");
        const survey = Surveys.find((survey) => survey.id === id);
        const parsedValue = JSON.parse(value as any);
        return {
          ...survey,
          completedDate: parsedValue.state.completedDate,
          isTimeout: true, // timeout olduğu için burda isTimeout true olarak işaretliyoruz
        } as SurveyDTO;
      });

    return filteredSurveys;
  }
}

const SurveyServiceApi = new SurveyService();
export default SurveyServiceApi;
