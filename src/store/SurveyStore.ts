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
  isCompleted: boolean; // anketin tamamlanıp tamamlanmadığını tutmak için
  setIsCompleted: (isCompleted: boolean) => void; // anketin tamamlanıp tamamlanmadığını setlemek için
  setSurvey: (id: string) => Promise<void>; // anketi setlemek için
  start: () => void; // geri sayımı başlat
  stop: () => void; // geri sayımı durdur

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
      isCompleted: false, // başlangıçta anket tamamlanmamış
      setIsCompleted: (isCompleted: boolean) => {
        if (isCompleted) {
          set({ isCompleted });
          get().stop();
        } else {
          set({ isCompleted });
        }
      },
      setSurvey: async (id: string) => {
        const survey = await queryClient.fetchQuery(
          getSurveyByIdQueryConfig(id)
        );

        const remainingTime = survey?.duration || 0;
        set(() => ({
          survey,
          remainingTime: get().remainingTime ?? remainingTime,
        }));
      }, // anketi setle
      start: () => {
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
        const { activeQuestionIndex, survey } = get();
        const nextIndex = activeQuestionIndex + 1;

        if (survey && nextIndex < survey.questions.length) {
          set((state) => {
            state.questionsListRef.current?.scrollToIndex({
              index: nextIndex,
              animated: true,
            });

            return { activeQuestionIndex: nextIndex };
          });
        }
      }, // bir sonraki soruya geç

      // Question Answer states
      answers: {}, // başlangıçta cevap yok
      setAnswer: (questionId: string, answer: number | string) => {
        const { survey, remainingTime, activeQuestionIndex, answers } = get();

        if (!survey || activeQuestionIndex === 0) {
          // İlk sorudayken tamamlanma süresi, toplam süreden kalan süreyi çıkarmaktır
          const completionTime = survey?.duration! - remainingTime;
          set((state) => ({
            answers: {
              ...state.answers,
              [questionId]: {
                value: answer,
                completionTime,
              },
            },
          }));
        } else {
          // önceki sorunun tamamlandığı süreyi hesapla
          const prevQuestionId = survey.questions[activeQuestionIndex - 1].id;
          const previousCompletionTime =
            answers[prevQuestionId]?.completionTime || 0;

          // yeni sorunun tamamlanma süresini önceki sorudan kalan süreyi çıkar
          const completionTime =
            survey.duration - remainingTime - previousCompletionTime;

          set((state) => ({
            answers: {
              ...state.answers,
              [questionId]: {
                value: answer,
                completionTime,
              },
            },
          }));
        }
      },
    }),
    {
      name: "survey-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        activeQuestionIndex: state.activeQuestionIndex, // aktif soruyu persist et
        isCompleted: state.isCompleted, // anketin tamamlanıp tamamlanmadığını persist et
        answers: state.answers, // cevapları persist et
        remainingTime: state.remainingTime, // geri sayımı persist et
      }),
    }
  )
);

// persist middleware ile store'u kalıcı hale getirerek, kullanıcı uygulamadan çıktığında verilerin kaybolmasını engelliyoruz..
