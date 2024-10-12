import { useQuery } from "@tanstack/react-query";
import SurveyServiceApi from "./Survey.api";

export const getAllSurveysQueryConfig = {
  queryKey: ["useGetAllSurveys"],
  queryFn: SurveyServiceApi.getAll,
};

export const useGetAllSurveysQuery = () => {
  return useQuery(getAllSurveysQueryConfig);
};

export const getSurveyByIdQueryConfig = (id: string) => ({
  queryKey: ["getSurveyById", id],
  queryFn: () => SurveyServiceApi.getById(id),
  enabled: !!id,
});

export const useGetSurveyByIdQuery = (id: string) => {
  return useQuery(getSurveyByIdQueryConfig(id));
};
