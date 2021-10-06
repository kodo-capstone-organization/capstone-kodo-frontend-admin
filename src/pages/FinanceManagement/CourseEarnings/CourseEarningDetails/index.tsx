import React, {useEffect, useState} from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { CourseEarningsResp } from "../../../../apis/Entities/Transaction";
import { Course } from "../../../../apis/Entities/Course";
import { getCourseEarningsAdminData } from "../../../../apis/Transaction/TransactionApis";
import { getCourseByCourseId } from "../../../../apis/Course/CourseApis"
import { CourseEarningsContainer, HeadingWrapper, SubHeadingWrapper, Message, MessageContainer } from "../CourseEarningsElements"
import CircularProgress from '@material-ui/core/CircularProgress';

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
    })

    console.log(courseEarnings);
    console.log(course);
    
    return (
        <CourseEarningsContainer>
            <HeadingWrapper>{courseId}</HeadingWrapper>
        </CourseEarningsContainer>
            
    )
}

export default withRouter(CourseFinance)
