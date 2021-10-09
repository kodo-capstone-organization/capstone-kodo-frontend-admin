import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom';
import { TagEarningsResp } from "../../../../apis/Entities/Transaction"
import { getTagEarningsAdminData } from "../../../../apis/Transaction/TransactionApis"
import { MONTHSFULL } from "../../../../values/DateTime";
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserEarningsContainer, HeadingWrapper, SubHeadingWrapper, Message, MessageContainer, UserWidgets, TagChip } from "../../UserEarnings/UserEarningsElements"
import TagChart from '../TagChart';

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

const TagEarningDetails = (props: any) => {
    const tagId = props.match.params.tagId;
    const [tagEarnings, setTagEarnings] = useState<TagEarningsResp>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const adminId = window.sessionStorage.getItem("loggedInAccountId");
        if (adminId != null) {
            const requestingAccountId = parseInt(adminId);
            getTagEarningsAdminData(tagId, requestingAccountId).then(receivedData => {
                setTagEarnings(receivedData);
            })
        }
        setLoading(false);
    }, [tagId])

    console.log(tagEarnings);
    
    const getCurrentMonth = () => {
        const curDate = new Date();
        const curMonthNum = curDate.getMonth();
        return `${MONTHSFULL[curMonthNum]}`
    }

    return (
        loading ? <MessageContainer><CircularProgress style={{'color': '#323940'}}/></MessageContainer> :
        <UserEarningsContainer>
            <HeadingWrapper>Tag Insights</HeadingWrapper>
            <TagChip label={tagEarnings?.tagName} />
            <Featured>
            <FeaturedItem>
                <FeaturedTitle>Total earnings</FeaturedTitle>
                    <FeaturedSub>Total earnings of tutor</FeaturedSub>
                    <FeaturedMoneyContainer>
                        <FeaturedMoney>{tagEarnings?.lifetimeTagEarning}</FeaturedMoney>
                    </FeaturedMoneyContainer>
            </FeaturedItem>
            <FeaturedItem>
                <FeaturedTitle>Earnings</FeaturedTitle>
                    <FeaturedSub>Profit earned on {getCurrentMonth()}</FeaturedSub>
                    <FeaturedMoneyContainer>
                        <FeaturedMoney>{tagEarnings?.currentMonthTagEarning}</FeaturedMoney>
                        {tagEarnings &&
                        <FeaturedMoneyRate>
                            {tagEarnings?.currentMonthTagEarning >= tagEarnings?.lastMonthTagEarning ? <FeaturedIconUpward /> : <FeaturedIconDownward />}
                        </FeaturedMoneyRate>
                        }
                    </FeaturedMoneyContainer>
            </FeaturedItem>
            </Featured>
            <TagChart title="Revenue Analytics" monthYear={tagEarnings?.monthlyTagEarningForLastYear} grid dataKey="earnings"/>
        </UserEarningsContainer>
    )
}

export default withRouter(TagEarningDetails)
