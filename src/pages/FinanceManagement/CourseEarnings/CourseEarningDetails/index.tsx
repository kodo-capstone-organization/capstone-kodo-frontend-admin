import React, {useEffect, useState} from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { CourseEarningsResp } from "../../../../apis/Entities/Transaction";
import { Course } from "../../../../apis/Entities/Course";
import { getCourseEarningsAdminData } from "../../../../apis/Transaction/TransactionApis";
import { getCourseByCourseId } from "../../../../apis/Course/CourseApis"
import { CourseEarningsContainer, HeadingWrapper, SubHeadingWrapper, Message, MessageContainer, CourseWidgets } from "../CourseEarningsElements"
import CircularProgress from '@material-ui/core/CircularProgress';
import { MONTHSFULL } from "../../../../values/DateTime";
import CourseChart from "../CourseChart";
import { Chart, ChartTitle } from "../../Chart";
import { 
    Featured, 
    FeaturedIconDownward, 
    FeaturedIconUpward, 
    FeaturedItem, 
    FeaturedMoney, 
    FeaturedMoneyContainer, 
    FeaturedMoneyRate, 
    FeaturedSub, 
    FeaturedTitle,
    CourseIcon,
    TutorIcon,
    TooltipWrapper
} from "../../FeaturedInfo";
import {
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    LabelList,
    Label,
    Sector,
  } from "recharts";

function CourseFinance(props: any) {
    const courseId = props.match.params.courseId;
    const [courseEarnings, setCourseEarnings] = useState<CourseEarningsResp>();
    const [course, setCourse] = useState<Course>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const adminId = window.sessionStorage.getItem("loggedInAccountId");
        if (adminId != null) {
            const requestingAccountId = parseInt(adminId);
            getCourseEarningsAdminData(courseId, requestingAccountId).then(receivedData => {
                setCourseEarnings(receivedData);
            })
        }
        getCourseByCourseId(courseId).then(receivedCourse => {
            setCourse(receivedCourse);
        })
        setLoading(false);
    }, [courseId])

    console.log(courseEarnings)
    
    const data = [
        {
          name: "Completed",
          value: courseEarnings?.percentageCompletion,
        },
        {
          name: "In-Progress",
          value: courseEarnings ? (courseEarnings?.numberOfEnrollment - courseEarnings?.percentageCompletion) : 0,
        },
      ];


    const getCurrentMonth = () => {
        const curDate = new Date();
        const curMonthNum = curDate.getMonth();
        return `${MONTHSFULL[curMonthNum]}`
    }
    
    return (
        loading ? <MessageContainer><CircularProgress style={{'color': '#323940'}}/></MessageContainer> :
        <CourseEarningsContainer>
            <HeadingWrapper>Course Insights</HeadingWrapper>
            <SubHeadingWrapper>{courseEarnings?.courseName}</SubHeadingWrapper>
            <Featured>
            <FeaturedItem>
                <FeaturedTitle>Total earnings</FeaturedTitle>
                    <FeaturedSub>Total earnings by course</FeaturedSub>
                    <FeaturedMoneyContainer>
                        <FeaturedMoney>{courseEarnings?.lifetimeCourseEarning}</FeaturedMoney>
                    </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Earnings</FeaturedTitle>
                <FeaturedSub>Profit earned on {getCurrentMonth()}</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{courseEarnings?.currentMonthCourseEarning}</FeaturedMoney>
                    {courseEarnings &&
                    <FeaturedMoneyRate>
                        {courseEarnings?.currentMonthCourseEarning >= courseEarnings?.lastMonthCourseEarning ? <FeaturedIconUpward /> : <FeaturedIconDownward />}
                    </FeaturedMoneyRate>
                    }
                </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Users</FeaturedTitle>
                <FeaturedSub>Users joined on {getCurrentMonth()}</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{courseEarnings?.numEnrollmentMonth}</FeaturedMoney>
                    {courseEarnings &&
                    <FeaturedMoneyRate>
                        {courseEarnings?.numEnrollmentMonth >= courseEarnings?.numEnrollmentLastMonth ? <FeaturedIconUpward /> : <FeaturedIconDownward />}
                    </FeaturedMoneyRate>
                    }
                </FeaturedMoneyContainer>
            </FeaturedItem>
            </Featured>
            <CourseWidgets>
            <Chart>
                <ChartTitle>Student Progress</ChartTitle>
                    <PieChart width={300} height={200}>
                        <Pie 
                            data={data} 
                            dataKey="value" 
                            nameKey="name" 
                            cx="50%" 
                            cy="50%" 
                            innerRadius={60} 
                            outerRadius={80} 
                            fill="#748DE7" 
                            label
                        />
                        <Tooltip />
                    </PieChart>
            </Chart>
            <CourseChart title="Revenue Analytics" monthYear={courseEarnings?.monthlyCourseEarningForLastYear} grid dataKey="earnings" />
            </CourseWidgets>
        </CourseEarningsContainer>
            
    )
}

export default withRouter(CourseFinance)
