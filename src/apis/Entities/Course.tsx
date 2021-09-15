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
  tutor: Account;
  enrollment: EnrolledCourse[];
  lessons: Lesson[];
  courseTags: Tag[];
  bannerPictureFileName: string;
  isEnrollmentActive: boolean;
  courseRating: number;
}

export interface UpdateCourseReq {
  course: Course;
  courseTagTitles: string[];
  updateLessonReqs: UpdateLessonReq[];
  enrolledCourseIds: number[];
}
