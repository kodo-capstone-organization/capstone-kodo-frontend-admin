import { Account } from "./Account";
import { Course } from "./Course";

export interface Transaction {
    transactionId: number
    dateTimeOfTransaction: Date,
    stripeTransactionId: string,
    stripeFee: number,
    platformFee: number,
    coursePrice: number,
    tutorPayout: number,
    payer: Account,
    payee: Account,
    course: Course
}

export interface GroupedByMonthsTransaction {
    [key: string]: any
}

export interface TutorCourseEarningsResp {
    lifetimeTotalEarnings: number,
    lifetimeEarningsByCourse: any[],
    currentMonthTotalEarnings: number,
    currentMonthEarningsByCourse: any[],
    courseStatsByMonthForLastYear: NestedCourseStats[]
}

export interface NestedCourseStats {
    courseId: string,
    courseName: string,
    data: any // stringified
}

export interface PlatformEarningsResp {
    lifetimePlatformEarnings: number;
    currentMonthPlatformEarnings: number;
    lastMonthPlatformEarnings: number;
    monthlyPlatformEarningsForLastYear: object;
}

export interface CourseEarningsResp {
    courseId: number;
    courseName: string;
    tutorName: string;
    numberOfEnrollment: number;
    lifetimeCourseEarning: number;
    currentMonthCourseEarning: number;
    lastMonthCourseEarning: number;
    numEnrollmentMonth: number;
    numEnrollmentLastMonth: number;
    percentageCompletion: number;
    monthlyCourseEarningForLastYear: NestedMonthEarning[];
  }
  
  export interface NestedMonthEarning {
    month: string;
    earnings: number;
  }

  export interface TutorEarningsResp {
    tutorId: number;
    tutorName: string;
    lifetimeTutorEarning: number;
    currentMonthTutorEarning: number;
    monthlyTutorEarningsForLastYear: NestedMonthEarning[];
    earningsLastMonth: number;
    numCoursesTaught: number;
    numCoursesCreatedCurrentMonth: number;
    numCoursesCreatedLastMonth: number;
  }
