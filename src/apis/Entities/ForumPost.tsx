import { Account } from "./Account";

export interface ForumPost {
    forumPostId: number,
    message: string,
    timeStamp: Date,
    parentForumPost: (ForumPost | null)
    account: Account
}