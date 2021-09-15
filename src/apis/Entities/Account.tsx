import { Course } from "./Course";
import { EnrolledCourse } from "./EnrolledCourse";
import { StudentAttempt } from "./StudentAttempt";
import { Tag } from "./Tag";

export interface Account {
  accountId: number;
  username: string;
  password: string | null;
  name: string;
  bio: string;
  email: string;
  displayPictureUrl: string;
  displayPictureFilename: string;
  isAdmin: boolean;
  isActive: boolean;
  interests: Tag[];
  enrolledCourses: EnrolledCourse[];
  courses: Course[];
  studentAttempts: StudentAttempt[];
  stripeAccountId: string;
}
