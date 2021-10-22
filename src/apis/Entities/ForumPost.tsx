import { Account } from "./Account";

export interface ForumPost {
    forumPostId : number,
    message: string,
    timeStamp: Date,
    isReported: boolean,
    reasonForReport: (string | null),
    replies: ForumPost[],
    parentForumPost : (ForumPost | null),
    account: Account
}

export interface ToggleForumPostResp {
    responseBody: string
  }