import { useQuery } from "@tanstack/react-query";
import SurveyServiceApi from "./Survey.api";

export const useGetAllSurveysQuery = () => {
  return useQuery({
    queryKey: ["useGetAllSurveys"],
    queryFn: SurveyServiceApi.getAll,
  });
};

export const useGetAvailableSurveysQuery = () => {
  return useQuery({
    queryKey: ["getAvailableSurveys"],
    queryFn: SurveyServiceApi.getAvailableSurveys,
  });
};

export const getSurveyByIdQueryConfig = (id: string) => ({
  queryKey: ["getSurveyById", id],
  queryFn: () => SurveyServiceApi.getById(id),
  enabled: !!id,
});

export const useGetSurveyByIdQuery = (id: string) => {
  return useQuery(getSurveyByIdQueryConfig(id));
};

export const useGetCompletedSurveysQuery = () => {
  return useQuery({
    queryKey: ["getCompletedSurveys"],
    queryFn: SurveyServiceApi.getCompletedSurveys,
  });
};

export const useGetTimeoutSurveysQuery = () => {
  return useQuery({
    queryKey: ["getTimeoutSurveys"],
    queryFn: SurveyServiceApi.getTimeoutSurveys,
  });
};
