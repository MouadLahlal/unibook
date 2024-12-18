type Book = {
	name: string;
	thumbnail: string;
	url: string;
}

type User = {
    id: string;
    username: string;
    email: string;
};

type Store = {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    fetch: () => void;
	books: Book[] | null;
	setBooks: (books: Book[]) => void;
};

export type { Store, User };
