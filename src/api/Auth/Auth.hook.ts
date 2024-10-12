import { useMutation, useQuery } from "@tanstack/react-query";
import UserServiceApi from "./Auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/StorageKeys";
import { queryClient } from "@/providers/QueryProvider";
import { useAuthStore } from "@/store/AuthStore";

export const getAuthMeQueryConfig = {
  queryKey: ["getAuthMe"],
  queryFn: UserServiceApi.getMe,
};

export const useGetAuthMeQuery = () => {
  return useQuery(getAuthMeQueryConfig);
};

export const useAuthLoginMutation = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: UserServiceApi.login,
    onSuccess: async (data) => {
      await AsyncStorage.setItem(StorageKeys.ACCESS_TOKEN, data.access_token);
      const user = await queryClient.fetchQuery(getAuthMeQueryConfig);
      setUser(user);
    },
  });
};
