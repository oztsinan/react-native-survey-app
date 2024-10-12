import { StorageKeys } from "@/constants/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const BaseService = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/",
  timeout: 10000,
});

BaseService.interceptors.request.use(
  async (config) => {
    if (!config?.headers?.Authorization) {
      const token = await AsyncStorage.getItem(StorageKeys.ACCESS_TOKEN);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      await AsyncStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    }
    return Promise.reject(error);
  }
);
