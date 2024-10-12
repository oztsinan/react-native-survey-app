import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserServiceApi from "./User.api";
import { useAuthStore } from "@/store/AuthStore";
import { getAuthMeQueryConfig } from "../Auth";

export const useGetUserByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["getUserById", id],
    queryFn: () => UserServiceApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateUserMutation = () => {
  return useMutation({
    mutationFn: UserServiceApi.create,
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: UserServiceApi.update,
    onSuccess: async (data) => {
      const user = await queryClient.fetchQuery(getAuthMeQueryConfig);
      setUser(user);
    },
  });
};
