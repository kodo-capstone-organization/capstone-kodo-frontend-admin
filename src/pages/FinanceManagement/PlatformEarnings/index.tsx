import React, { useEffect, useState } from 'react'
import { PlatformEarningsResp } from "../../../apis/Entities/Transaction";
import { getPlatformEarningsAdminData } from "../../../apis/Transaction/TransactionApis"
import  { InsightContainer, HeadingWrapper, SubHeadingWrapper, MessageContainer } from "./PlatformEarningsElements"
import FeaturedInfo from "./FeaturedInfo";
import PlatformEarningsChart from './PlatformChart';
import PlatformPerformance from './PlatformPerformance';
import TransactionTable from './TransactionTable';
import CircularProgress from '@material-ui/core/CircularProgress';

function PlatformEarnings() {
    const [platformEarnings, setPlatformEarnings] = useState<PlatformEarningsResp>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const adminId = window.sessionStorage.getItem("loggedInAccountId");
        if (adminId != null) {
            const requestingAccountId = parseInt(adminId);
            getPlatformEarningsAdminData(requestingAccountId).then(receivedData => {
                setPlatformEarnings(receivedData);
                console.log(receivedData);
                setLoading(false);
            })
        }
    }, [])    

    return (
        loading ? <MessageContainer><CircularProgress style={{'color': '#323940'}}/></MessageContainer> :
        <InsightContainer>
            <HeadingWrapper>Platform Insights</HeadingWrapper>
                <FeaturedInfo platformEarnings={platformEarnings} />
                <PlatformEarningsChart title="Revenue Analytics" monthYear={platformEarnings?.monthlyPlatformEarningsForLastYear} grid dataKey="earnings" />
                <PlatformPerformance platformEarnings={platformEarnings} />
                <TransactionTable transactions={platformEarnings?.transactionWithParticularsResps} />
        </InsightContainer>
        
    )
}

export default PlatformEarnings
