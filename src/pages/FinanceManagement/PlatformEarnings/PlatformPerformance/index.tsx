import React, { useState, useEffect } from 'react'
import { PlatformEarningsResp } from "../../../../apis/Entities/Transaction";
import { MONTHSFULL } from "../../../../values/DateTime";
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
    MessageContainer
} from "../../FeaturedInfo";

function PlatformPerformance(props: any) {
    const [platformEarnings, setPlatformEarnings] = useState<PlatformEarningsResp>({...props.platformEarnings});

    useEffect(() => {
        setPlatformEarnings(props.platformEarnings);
    }, [props.platformEarnings]);

    const getCurrentMonth = () => {
        const curDate = new Date();
        const curMonthNum = curDate.getMonth();
        return `${MONTHSFULL[curMonthNum]}`
    }

    return (
        <Featured>
             <FeaturedItem>
                <FeaturedTitle>Users</FeaturedTitle>
                <FeaturedSub>Number joined this month</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.currentMonthNumberOfAccountCreation}</FeaturedMoney>
                    <FeaturedMoneyRate>
                        {platformEarnings?.increaseInMonthlyAccountCreation ? <FeaturedIconUpward /> : <FeaturedIconDownward />}
                    </FeaturedMoneyRate>
                </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Users</FeaturedTitle>
                <FeaturedSub>Number enrolled in courses this month</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.currentMonthNumberOfEnrollments}</FeaturedMoney>
                    <FeaturedMoneyRate>
                        {platformEarnings?.increaseInMonthlyEnrollment ? <FeaturedIconUpward /> : <FeaturedIconDownward />}
                    </FeaturedMoneyRate>
                </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Courses</FeaturedTitle>
                <FeaturedSub>Number of courses created this month</FeaturedSub>
                <FeaturedMoneyContainer>
                    <FeaturedMoney>{platformEarnings?.currentMonthNumberOfCourseCreation}</FeaturedMoney>
                    <FeaturedMoneyRate>
                        {platformEarnings?.increaseInMonthlyCourseCreation ? <FeaturedIconUpward /> : <FeaturedIconDownward />}
                    </FeaturedMoneyRate>
                </FeaturedMoneyContainer>
            </FeaturedItem>
        </Featured>
    )
}

export default PlatformPerformance
