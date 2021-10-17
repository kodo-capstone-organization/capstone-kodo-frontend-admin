import { Account } from "./Account";
import { EnrolledCourse } from "./EnrolledCourse";
import { Tag } from "./Tag";
import { Lesson } from "./Lesson";
import { UpdateLessonReq } from "./Lesson";

export interface Course {
  courseId: number;
  name: string;
  description: string;
  price: number;
  bannerUrl: string;
  dateTimeOfCreation: Date;
  courseTags: Tag[];
  tutor: Account;
  bannerPictureFileName: string;
  isEnrollmentActive: boolean;
  isReviewRequested: boolean;
  courseRating: number;
  enrollmentLength: number;
  enrollmentActive: boolean;
}

export interface UpdateCourseReq {
  course: Course;
  courseTagTitles: string[];
  updateLessonReqs: UpdateLessonReq[];
  enrolledCourseIds: number[];
}

export interface ToggleCourseResp {
  responseBody: string
}

export interface CourseBasicResp {
  courseId: number;
  courseName: string;
  tutorName: string;
}