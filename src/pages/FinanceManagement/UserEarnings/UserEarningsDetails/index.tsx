import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { TutorEarningsResp } from "../../../../entities/Transaction"
import { getTutorEarningsAdminData } from "../../../../apis/TransactionApis"
import { UserEarningsContainer, HeadingWrapper, SubHeadingWrapper, Message, MessageContainer, UserWidgets } from "../UserEarningsElements"
import { MONTHSFULL } from "../../../../values/DateTime";
import CircularProgress from '@material-ui/core/CircularProgress';
import UserChart from '../UserChart/UserChart';

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

function UserEarningsDetails(props: any) {
    const accountId = props.match.params.accountId;
    const [tutor, setTutor] = useState<TutorEarningsResp>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const adminId = window.sessionStorage.getItem("loggedInAccountId");
        if (adminId != null) {
            const requestingAccountId = parseInt(adminId);
            getTutorEarningsAdminData(accountId, requestingAccountId).then(receivedData => {
                setTutor(receivedData);
            })
        }
        setLoading(false);
    }, [accountId])

    console.log(tutor);

    const getCurrentMonth = () => {
        const curDate = new Date();
        const curMonthNum = curDate.getMonth();
        return `${MONTHSFULL[curMonthNum]}`
    }

    return (
        loading ? <MessageContainer><CircularProgress style={{'color': '#323940'}}/></MessageContainer> :
        <UserEarningsContainer>
            <HeadingWrapper>Tutor Insights</HeadingWrapper>
            <SubHeadingWrapper>{tutor?.tutorName}</SubHeadingWrapper>
            <Featured>
            <FeaturedItem>
                <FeaturedTitle>Total earnings</FeaturedTitle>
                    <FeaturedSub>Total earnings of tutor</FeaturedSub>
                    <FeaturedMoneyContainer>
                        <FeaturedMoney>{tutor?.lifetimeTutorEarning}</FeaturedMoney>
                    </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Earnings</FeaturedTitle>
                <FeaturedSub>Profit earned on {getCurrentMonth()}</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{tutor?.currentMonthTutorEarning}</FeaturedMoney>
                    {tutor &&
                    <FeaturedMoneyRate>
                        {tutor?.currentMonthTutorEarning >= tutor?.earningsLastMonth ? <FeaturedIconUpward /> : <FeaturedIconDownward />}
                    </FeaturedMoneyRate>
                    }
                </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Courses</FeaturedTitle>
                <FeaturedSub>Total # courses taught</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{tutor?.numCoursesTaught}</FeaturedMoney>
                </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Courses</FeaturedTitle>
                <FeaturedSub>Courses created on {getCurrentMonth()}</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{tutor?.numCoursesCreatedCurrentMonth}</FeaturedMoney>
                    {tutor &&
                    <FeaturedMoneyRate>
                        {tutor?.numCoursesCreatedCurrentMonth >= tutor?.numCoursesCreatedLastMonth ? <FeaturedIconUpward /> : <FeaturedIconDownward />}
                    </FeaturedMoneyRate>
                    }
                </FeaturedMoneyContainer>
            </FeaturedItem>
            </Featured>            
            <UserChart title="Revenue Analytics" monthYear={tutor?.monthlyTutorEarningsForLastYear} grid dataKey="earnings"/>
        </UserEarningsContainer>
    )
}

export default withRouter(UserEarningsDetails);
