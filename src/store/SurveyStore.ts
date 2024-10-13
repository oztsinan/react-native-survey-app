import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSurveyByIdQueryConfig, SurveyDTO } from "@/api/Survey";
import { queryClient } from "@/providers/QueryProvider";
import { FlatList } from "react-native";
import { createRef } from "react";

interface SurveyStore {
  survey: SurveyDTO | undefined; // anketi tutmak için
  activeQuestionIndex: number; // aktif soruyu tutmak için
  remainingTime: number; // geri sayımı tutmak için
  intervalId: NodeJS.Timeout | null; // geri sayımı tutmak için
  completedDate: string | undefined; // anketin tamamlanıp tamamlanmadığını tutmak için
  setSurvey: (id: string) => Promise<void>; // anketi setlemek için
  start: () => void; // geri sayımı başlat
  stop: () => void; // geri sayımı durdur
  restartSurvey: () => void; // anketi yeniden başlatmak için

  //Question states
  questionsListRef: React.RefObject<FlatList>; // soruları tutmak için referans
  onPrevQuestion: () => void; // bir önceki soruya geçmek için
  onNextQuestion: () => void; // bir sonraki soruya geçmek için

  //Question Answer states
  answers: Record<string, { value: number | string; completionTime: number }>; // Her soru için value ve süre
  setAnswer: (questionId: string, answer: number | string) => void; // cevapları setlemek için fonksiyon
}

export const useSurveyStore = create<SurveyStore>()(
  persist(
    (set, get) => ({
      survey: undefined, // başlangıçta anket yok
      activeQuestionIndex: 0, // başlangıçta ilk soru
      remainingTime: undefined as any, // başlangıçta süre yok
      intervalId: null, // başlangıçta interval yok
      completedDate: undefined, // başlangıçta anket tamamlanmamış
      setSurvey: async (id: string) => {
        const survey = await queryClient.fetchQuery(getSurveyByIdQueryConfig(id));
        const remainingTime = survey?.duration || 0;

        set(() => ({
          survey,
          remainingTime: get().remainingTime ?? remainingTime,
        }));
      }, // anketi setle
      start: () => {
        const { completedDate } = get();

        if (completedDate) {
          return;
        }

        const intervalId = setInterval(() => {
          const currentRemainingTime = get().remainingTime;

          if (currentRemainingTime > 0) {
            set({ remainingTime: currentRemainingTime - 1 });
          } else {
            get().stop(); // zaman dolunca interval'ı temizle
          }
        }, 1000); // her saniye çalışır

        set({ intervalId });
      }, // geri sayımı başlat
      stop: () => {
        const intervalId = get().intervalId;
        if (intervalId) {
          clearInterval(intervalId);
          set({ intervalId: null });
        }
      }, // geri sayımı durdur
      restartSurvey: async () => {
        const surveyId = get().survey?.id!;
        await AsyncStorage.removeItem(`survey-store-${surveyId}`);
        set({
          survey: undefined,
          activeQuestionIndex: 0,
          remainingTime: undefined,
          intervalId: null,
          completedDate: undefined,
          answers: {},
        });
        get().setSurvey(surveyId);
        get().start();
      },

      // Question states
      questionsListRef: createRef<FlatList>(), // başlangıçta referans yok
      onPrevQuestion: () => {
        const { activeQuestionIndex } = get();
        const prevIndex = activeQuestionIndex - 1;

        if (prevIndex >= 0) {
          set((state) => {
            state.questionsListRef.current?.scrollToIndex({
              index: prevIndex,
              animated: true,
            });

            return { activeQuestionIndex: prevIndex };
          });
        }
      }, // bir önceki soruya geç
      onNextQuestion: () => {
        const { activeQuestionIndex, survey, answers, remainingTime } = get();
        const currentQuestionId = survey?.questions[activeQuestionIndex]?.id;
        const nextIndex = activeQuestionIndex + 1;
        const isLastQuestion = nextIndex === survey?.questions.length;

        if (currentQuestionId) {
          // 1. toplam geçen süreyi hesapla
          const totalElapsedTime = survey.duration - remainingTime;

          // 2. önceki soruların tamamlanma sürelerinin toplamını hesapla
          const previousCompletionTimes = Object.values(answers).reduce((total, answer) => {
            return total + (answer.completionTime || 0);
          }, 0);

          // 3. mevcut sorunun 'completionTime' değerini hesapla
          const completionTime = totalElapsedTime - previousCompletionTimes;

          set((state) => ({
            answers: {
              ...state.answers,
              [currentQuestionId]: {
                ...state.answers[currentQuestionId],
                completionTime,
              },
            },
          }));
        }

        if (!isLastQuestion) {
          set({ activeQuestionIndex: nextIndex });
          get().questionsListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        } else {
          // Anket tamamlandı
          set({ completedDate: new Date().toISOString() });
          get().stop();
        }
      },

      // bir sonraki soruya geç

      // Question Answer states
      answers: {}, // başlangıçta cevap yok
      setAnswer: (questionId: string, answer: number | string) => {
        set((state) => ({
          answers: {
            ...state.answers,
            [questionId]: {
              value: answer,
              completionTime: undefined as any,
            },
          },
        }));
      },
    }),
    {
      name: "survey-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        activeQuestionIndex: state.activeQuestionIndex, // aktif soruyu persist et
        completedDate: state.completedDate, // anketin tamamlanıp tamamlanmadığını persist et
        answers: state.answers, // cevapları persist et
        remainingTime: state.remainingTime, // geri sayımı persist et
      }),
    },
  ),
);

// persist middleware ile store'u kalıcı hale getirerek, kullanıcı uygulamadan çıktığında verilerin kaybolmasını engelliyoruz..
