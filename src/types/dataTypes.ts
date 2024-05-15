export type UserProps = {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    access: string,
    refresh: string,
    profile_pic?: string,
    is_superuser?: boolean
}

export type AuthResponse = {
    user: UserProps
    access: string
    refresh: string
}

export type ToDoResponse = {
    count: number,
    next: string | null,
    previous: string | null,
    results: ToDoProps[]
}

export type ToDoProps = {
    id?: number | null,
    title: string,
    description: string,
    owner?: number | null,
    due_date?: Date | undefined,
    done_date?: Date | undefined
}