import { IHttpClientRequestParameters } from "./HttpClientApis/IHttpClientRequestParameters";
import { Course, UpdateCourseReq, ToggleCourseResp, CourseBasicResp } from "../entities/Course";
import { httpClient } from "./HttpClientApis/HttpClient";
import { transformToBlob } from "../utils/BlobCreator";

export async function getAllCourses(): Promise<Course[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: '/course/getAllCourses'
    }

    return httpClient.get<undefined, Course[]>(getParameters)
}

export async function getPendingCourses(): Promise<Course[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: '/course/getPendingCourses'
    }

    return httpClient.get<undefined, Course[]>(getParameters)
}

export async function getCourseByCourseId(courseId: number): Promise<Course> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/course/getCourseByCourseId/${courseId}`
    }

    return httpClient.get<undefined, Course>(getParameters);
}

export async function getBasicCourseByCourseId(courseId: number): Promise<CourseBasicResp> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/course/getBasicCourseByCourseId/${courseId}`
    }

    return httpClient.get<undefined, CourseBasicResp>(getParameters);
}

export async function getCourseByKeyword(keyword: string): Promise<Course[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/course/getAllCoursesByKeyword/${keyword}`
    }

    return httpClient.get<undefined, Course[]>(getParameters)
}

export async function getCourseByTagTitle(tagTitle: string): Promise<Course[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/course/getAllCoursesByTagTitle/${tagTitle}`
    }

    return httpClient.get<undefined, Course[]>(getParameters)
}

export async function toggleReviewRequestStatus(courseId: number, requestingAccountId: number): Promise<ToggleCourseResp> {
    const deleteParameters: IHttpClientRequestParameters<undefined> = {
        url: `/course/toggleReviewRequestStatus/${courseId}&${requestingAccountId}`
    }

    return httpClient.delete<undefined, ToggleCourseResp>(deleteParameters);
}

export async function updateCourse(updateCourseReq: UpdateCourseReq, updatedBannerPicture: File): Promise<Course> {
    const formData = new FormData();
    formData.append('updateCourseReq', transformToBlob(updateCourseReq));
    
    // Check whether it's an empty file
    if (updatedBannerPicture.size !== 0) {
        formData.append('bannerPicture', updatedBannerPicture);
    }

    const putParameters: IHttpClientRequestParameters<FormData> = {
        url: '/course/updateCourse',
        payload: formData
    }

    return httpClient.put<FormData, Course>(putParameters)
}

export async function toggleEnrollmentActiveStatus(courseId: number, requestingAccountId: number): Promise<ToggleCourseResp> {
    const deleteParameters: IHttpClientRequestParameters<undefined> = {
        url: `/course/toggleEnrollmentActiveStatus/${courseId}&${requestingAccountId}`
    }

    return httpClient.delete<undefined, ToggleCourseResp>(deleteParameters);
}