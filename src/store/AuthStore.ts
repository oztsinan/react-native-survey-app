import { UserDTO } from "@/api/User";
import { create } from "zustand";

interface AuthStore {
  user: UserDTO | undefined;
  setUser: (user: UserDTO | undefined) => void;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: undefined,
  setUser: (user) => set({ user }),
}));
