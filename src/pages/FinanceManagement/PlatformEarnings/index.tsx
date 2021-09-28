import React, { useEffect, useState } from 'react'
import { PlatformEarningsResp } from "../../../apis/Entities/Transaction";
import { getPlatformEarningsAdminData } from "../../../apis/Transaction/TransactionApis"
import  { InsightContainer, HeadingWrapper, SubHeadingWrapper } from "./PlatformEarningsElements"


function PlatformEarnings() {
    const [platformEarnings, setPlatformEarnings] = useState<PlatformEarningsResp>();

    useEffect(() => {
        const adminId = window.sessionStorage.getItem("loggedInAccountId");
        if (adminId != null) {
        const requestingAccountId = parseInt(adminId);
        getPlatformEarningsAdminData(requestingAccountId).then(receivedData => {
            setPlatformEarnings(receivedData);
        })
        }
    }, [])

    
    

    return (
        <InsightContainer>
            <HeadingWrapper>Platform Insights</HeadingWrapper>
            <SubHeadingWrapper>Feature Information</SubHeadingWrapper>
            <SubHeadingWrapper>Monthly Earnings</SubHeadingWrapper>
            <SubHeadingWrapper>Course Commission Earnings</SubHeadingWrapper>
        </InsightContainer>
    )
}

export default PlatformEarnings
