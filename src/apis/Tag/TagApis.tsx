import { IHttpClientRequestParameters } from "./../HttpClient/IHttpClientRequestParameters";
import { httpClient } from "../HttpClient/HttpClient";
import { Tag, TagWithAccountsCountAndCoursesCount } from "../Entities/Tag";

export async function getAllTags(): Promise<Tag[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: '/tag/getAllTags'
    }

    return httpClient.get<undefined, Tag[]>(getParameters)
}

export async function getTagCounts(): Promise<TagWithAccountsCountAndCoursesCount[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: '/tag/getAllTagsWithAccountsCountAndCoursesCount'
    }

    return httpClient.get<undefined, TagWithAccountsCountAndCoursesCount[]>(getParameters)
}

export async function deleteTagByTagId(tagId: number): Promise<Tag> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/tag/deleteTagByTagId/${tagId}`
    }
    return httpClient.get<undefined, Tag>(getParameters)
}