export interface Todo  {
    id: number;
    title: string;
    status: string;
    description: string;
}

export enum TodoStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in progress',
    DONE = 'done',
}