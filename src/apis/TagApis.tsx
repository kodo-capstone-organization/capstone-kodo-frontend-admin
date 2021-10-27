import { IHttpClientRequestParameters } from "./HttpClientApis/IHttpClientRequestParameters";
import { httpClient } from "./HttpClientApis/HttpClient";
import { Tag, TagWithAccountsCountAndCoursesCount } from "../entities/Tag";
import { transformToBlob } from "../utils/BlobCreator";
import { CreateNewTagsReq } from "../entities/Tag";
const FormData = require('form-data');

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

export async function createNewTags(createNewTagsReq: CreateNewTagsReq): Promise<String[]> {
    const formData = new FormData();

    formData.append('tags', transformToBlob(createNewTagsReq));
    const postParameters: IHttpClientRequestParameters<FormData> = {
        url: '/tag/createNewTags',
        payload: formData
    }
    return httpClient.post<FormData, String[]>(postParameters)
}