import { Store } from "@/types/store";
import { create } from "zustand";

const useStore = create<Store>()((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));

export { useStore };
