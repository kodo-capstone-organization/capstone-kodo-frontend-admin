import { IHttpClientRequestParameters } from "./HttpClientApis/IHttpClientRequestParameters";
import { httpClient } from "./HttpClientApis/HttpClient";
import { EnrolledCourse, EnrolledCourseWithStudentResp, EnrolledCourseWithStudentCompletion } from "../entities/EnrolledCourse";

export async function getEnrolledCourseByStudentIdAndCourseId(studentId: number, courseId: number): Promise<EnrolledCourse> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/enrolledCourse/getEnrolledCourseByStudentIdAndCourseId/${studentId}/${courseId}`
    }

    return httpClient.get<undefined, EnrolledCourse>(getParameters);
}


export async function setCourseRatingByEnrolledCourseId(enrolledCourseId: number, courseRating: number): Promise<EnrolledCourse> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/enrolledCourse/setCourseRatingByEnrolledCourseId/${enrolledCourseId}/${courseRating}`
    }

    return httpClient.get<undefined, EnrolledCourse>(getParameters);
}


export async function getEnrolledCoursesWithStudentCompletion(courseId: number): Promise<EnrolledCourseWithStudentResp[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/enrolledCourse/getEnrolledCoursesWithStudentCompletion/${courseId}`
    }

    return httpClient.get<undefined, EnrolledCourseWithStudentResp[]>(getParameters);
}

export async function getEnrolledCoursesWithStudents(courseId: number): Promise<EnrolledCourseWithStudentCompletion[]> {
    const getParameters: IHttpClientRequestParameters<undefined> = {
        url: `/enrolledCourse/getEnrolledCoursesWithStudents/${courseId}`
    }

    return httpClient.get<undefined, EnrolledCourseWithStudentCompletion[]>(getParameters);
}




