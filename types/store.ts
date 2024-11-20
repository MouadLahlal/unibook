type User = {
    id: string;
    username: string;
    email: string;
};

type Store = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
};

export type { Store, User };
