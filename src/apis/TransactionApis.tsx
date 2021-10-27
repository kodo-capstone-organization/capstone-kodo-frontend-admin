import { Transaction, TutorCourseEarningsResp, PlatformEarningsResp, CourseEarningsResp, TutorEarningsResp, TagEarningsResp, TutorAndEarningsResp } from "../entities/Transaction"
import { IHttpClientRequestParameters } from "./HttpClientApis/IHttpClientRequestParameters"
import { httpClient } from "./HttpClientApis/HttpClient";

export async function getAllPlatformTransactions(accountId: number): Promise<Transaction[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/transaction/getAllPlatformTransactions/${accountId}`
    }
    return httpClient.get<undefined, Transaction[]>(getParameters)
}

export async function getAllPaymentsByAccountId(accountId: number): Promise<Transaction[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/transaction/getAllPaymentsByAccountId/${accountId}`
    }
    return httpClient.get<undefined, Transaction[]>(getParameters)
}

export async function getCourseEarningsPageData(accountId: number): Promise<TutorCourseEarningsResp> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/transaction/getCourseEarningsPageDataByAccountId/${accountId}`
    }
    return httpClient.get<undefined, TutorCourseEarningsResp>(getParameters)
}

export async function getPlatformEarningsAdminData(requestingAccountId: number): Promise<PlatformEarningsResp> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/transaction/getPlatformMetricsAdminData/${requestingAccountId}`
    }
    return httpClient.get<undefined, PlatformEarningsResp>(getParameters)
}

export async function getCourseEarningsAdminData(courseId: number, requestingAccountId: number): Promise<CourseEarningsResp> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/transaction/getCourseEarningsAdminData/${courseId}&${requestingAccountId}`
    }
    return httpClient.get<undefined, CourseEarningsResp>(getParameters)
}

export async function getTutorEarningsAdminData(tutorId: number, requestingAccountId: number): Promise<TutorEarningsResp> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/transaction/getTutorEarningsAdminData/${tutorId}&${requestingAccountId}`
    }
    return httpClient.get<undefined, TutorEarningsResp>(getParameters)
}

export async function getTagEarningsAdminData(tagId: number, requestingAccountId: number): Promise<TagEarningsResp> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/transaction/getTagEarningsAdminData/${tagId}&${requestingAccountId}`
    }
    return httpClient.get<undefined, TagEarningsResp>(getParameters)
}

export async function getAllTutorsWithEarnings(): Promise<TutorAndEarningsResp[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/transaction/getAllTutorsAndEarnings`
    }
    return httpClient.get<undefined, TutorAndEarningsResp[]>(getParameters)
}
