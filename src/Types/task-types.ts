export type TaskType = {
    _id: string,
    msg: string,
    date: Date,
    isFinished: boolean,
    tags: tagType[]
}


export type tagType = {
    msg: string,
    id?: string,
    onClick?: () => void,
} 