type User = {
    id: string,
    username: string,
    email: string
}

type Store = {
    user: User,
    setUser: (user: User) => void
}

export type {
    Store
}