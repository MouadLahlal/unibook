import { Store } from "@/types/store";
import { create } from "zustand";

const useStore = create<Store>()((set) => ({
    user: {
        id: "",
        username: "",
        email: ""
    },
    setUser: (user) => set({ user })
}))

export {
    useStore
}