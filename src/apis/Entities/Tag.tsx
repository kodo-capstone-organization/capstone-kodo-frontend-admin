export interface Tag {
    tagId: number
    title: string
}

export interface TagWithAccountsCountAndCoursesCount {
    tagId: number
    title: string
    accountsCount: number;
    coursesCount: number
}