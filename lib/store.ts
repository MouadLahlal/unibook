import { Store } from "@/types/store";
import { create } from "zustand";

const useStore = create<Store>()((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    fetch: async () => {
        const res = await fetch("/api/auth");
        set({ user: await res.json().then((body) => body.user) })
    },
	books: null,
	setBooks: (books) => set({ books })
}));

export { useStore };
