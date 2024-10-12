import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserServiceApi from "./User.api";

export const useGetUserByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["getUserById", id],
    queryFn: () => UserServiceApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserServiceApi.create,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["getUserById", data?.id],
      });
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserServiceApi.update,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["getUserById", data?.id],
      });
    },
  });
};
