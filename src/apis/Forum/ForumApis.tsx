import { IHttpClientRequestParameters } from "../HttpClient/IHttpClientRequestParameters";
import { httpClient } from "../HttpClient/HttpClient";
import { ForumCategory } from "../Entities/ForumCategory";
import { ForumThread } from "../Entities/ForumThread";
import { ForumPost, ToggleForumPostResp } from "../Entities/ForumPost";

// FORUM CATEGORY //

export async function getAllForumCategoriesByCourseId(courseId: number): Promise<ForumCategory[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumCategory/getAllForumCategoriesByCourseId/${courseId}`
    }
    return httpClient.get<undefined, ForumCategory[]>(getParameters)
}

export async function getAllForumCategoriesWithForumThreadsOnlyByCourseId(courseId: number): Promise<ForumCategory[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumCategory/getAllForumCategoriesWithForumThreadsOnlyByCourseId/${courseId}`
    }
    return httpClient.get<undefined, ForumCategory[]>(getParameters)
}

export async function getForumCategoryByForumCategoryId(forumCategoryId: number): Promise<ForumCategory> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumCategory/getForumCategoryByForumCategoryId/${forumCategoryId}`
    }
    return httpClient.get<undefined, ForumCategory>(getParameters)
}

export async function getForumCategoryWithForumThreadsOnlyByForumCategoryId(forumCategoryId: number): Promise<ForumCategory> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumCategory/getForumCategoryWithForumThreadsOnlyByForumCategoryId/${forumCategoryId}`
    }
    return httpClient.get<undefined, ForumCategory>(getParameters)
}

export async function deleteForumCategory(forumCategoryId: number): Promise<boolean> {
    const deleteParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumCategory/deleteForumCategory/${forumCategoryId}`
    }

    return httpClient.delete<undefined, boolean>(deleteParameters);
}

// FORUM THREAD //

export async function getAllForumThreadsByForumCategoryId(forumCategoryId: number): Promise<ForumThread[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumThread/getAllForumThreadsByForumCategoryId/${forumCategoryId}`
    }
    return httpClient.get<undefined, ForumThread[]>(getParameters)
}

export async function getForumThreadByForumThreadId(forumThreadId: number): Promise<ForumThread> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumThread/getForumThreadByForumThreadId/${forumThreadId}`
    }
    return httpClient.get<undefined, ForumThread>(getParameters)
}

export async function deleteForumThread(forumThreadId: number): Promise<boolean> {
    const deleteParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumThread/deleteForumThread/${forumThreadId}`
    }

    return httpClient.delete<undefined, boolean>(deleteParameters);
}

// FORUM POST //

export async function getAllForumPostsOfAForumThread(forumThreadId: number): Promise<ForumPost[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumPost/getAllForumPostsOfAForumThread/${forumThreadId}`
    }
    return httpClient.get<undefined, ForumPost[]>(getParameters)
} 

export async function getAllReportedForumPostsOfAForumThread(forumThreadId: number): Promise<ForumPost[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumPost/getAllReportedForumPostsByForumThreadId/${forumThreadId}`
    }
    return httpClient.get<undefined, ForumPost[]>(getParameters)
}

export async function deleteForumPost(forumPostId: number): Promise<boolean> {
    const deleteParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumPost/deleteForumPost/${forumPostId}`
    }

    return httpClient.delete<undefined, boolean>(deleteParameters);
}

export async function toggleReport(forumPostId: number, requestingAccountId: number): Promise<ToggleForumPostResp> {
    const deleteParameters: IHttpClientRequestParameters<undefined> = {
        url: `/forumPost/toggleReport/${forumPostId}&${requestingAccountId}`
    }

    return httpClient.delete<undefined, ToggleForumPostResp>(deleteParameters);
}