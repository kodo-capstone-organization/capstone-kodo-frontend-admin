import { Transaction, TutorCourseEarningsResp, PlatformEarningsResp, CourseEarningsResp, TutorEarningsResp } from "../Entities/Transaction"
import { IHttpClientRequestParameters } from "../HttpClient/IHttpClientRequestParameters"
import { httpClient } from "../HttpClient/HttpClient";

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
        url: `/transaction/getPlatformEarningsAdminData/${requestingAccountId}`
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